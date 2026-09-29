#!/usr/bin/env bash
set -euo pipefail

# A regular merge pushes upstream commits that edit .github/workflows. The
# default GITHUB_TOKEN cannot push those commits, even if the final merge
# resolves conflicts in favor of the fork. Apply just the upstream content.
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

upstream_repository=${UPSTREAM_REPOSITORY:-fmhy/edit}
if ! git remote get-url upstream >/dev/null 2>&1; then
  git remote add upstream "https://github.com/${upstream_repository}.git"
fi
git fetch upstream main

base_file=.github/upstream-sync-base
if [[ -f "$base_file" ]]; then
  read -r last_upstream < "$base_file"
else
  # Bootstrap from the last upstream commit already merged into the fork.
  last_upstream=$(git merge-base HEAD upstream/main)
fi

if ! git cat-file -e "${last_upstream}^{commit}" 2>/dev/null ||
   ! git merge-base --is-ancestor "$last_upstream" upstream/main; then
  echo "Upstream history changed or the recorded sync base is invalid: $last_upstream" >&2
  exit 1
fi

current_upstream=$(git rev-parse upstream/main)
if [[ "$last_upstream" == "$current_upstream" ]]; then
  echo "The fork has already synced this upstream revision."
  exit 0
fi

patch=$(mktemp)
trap 'rm -f "$patch"' EXIT
git diff --binary --full-index "$last_upstream" "$current_upstream" -- \
  . ':(exclude).github/workflows/**' > "$patch"

if [[ -s "$patch" ]] && ! git apply --3way --index "$patch"; then
  mapfile -d '' conflicts < <(git diff --name-only --diff-filter=U -z)
  if (( ${#conflicts[@]} == 0 )); then
    echo "The upstream patch failed without resolvable file conflicts." >&2
    exit 1
  fi

  summary=${GITHUB_STEP_SUMMARY:-/dev/null}
  printf '## Automatically resolved upstream conflicts\n\n' >> "$summary"
  for path in "${conflicts[@]}"; do
    case "$path" in
      .github/scripts/sync-upstream.sh|\
      .github/upstream-sync-base|\
      docs/.vitepress/config.mts|\
      docs/.vitepress/hooks/Template.vue|\
      docs/.vitepress/hooks/rss.ts|\
      docs/.vitepress/hooks/satoriConfig.ts|\
      docs/.vitepress/markdown/mathyOverlay.ts|\
      docs/.vitepress/shared.ts|\
      docs/.vitepress/theme/Layout.vue|\
      docs/.vitepress/theme/components/ColorPicker.vue|\
      docs/.vitepress/theme/components/ThemeDropdown.vue|\
      docs/.vitepress/theme/index.ts|\
      docs/.vitepress/theme/style.scss|\
      docs/.vitepress/theme/themes/mathy.ts|\
      docs/.vitepress/theme/themes/themeHandler.ts|\
      docs/.vitepress/transformer.ts|\
      docs/public/manifest.json|\
      docs/public/mathy-orbit-*)
        source_ref=HEAD
        resolution="kept fork customization"
        ;;
      *)
        source_ref=upstream/main
        resolution="accepted upstream content"
        ;;
    esac

    if git cat-file -e "${source_ref}:${path}" 2>/dev/null; then
      git restore --source="$source_ref" --staged --worktree -- "$path"
    else
      git rm --ignore-unmatch -- "$path"
    fi
    printf -- '- `%s`: %s\n' "$path" "$resolution" >> "$summary"
  done
fi

if git diff --name-only --diff-filter=U | grep -q .; then
  echo "Some conflicts remain unresolved." >&2
  git diff --name-only --diff-filter=U >&2
  exit 1
fi

# Advance the marker even if an upstream update changed only workflow files.
printf '%s\n' "$current_upstream" > "$base_file"
git add -- "$base_file"

if git diff --cached --name-only -- .github/workflows | grep -q .; then
  echo "Refusing to commit upstream workflow changes." >&2
  exit 1
fi

git commit -m "Sync upstream content at ${current_upstream:0:12}"
