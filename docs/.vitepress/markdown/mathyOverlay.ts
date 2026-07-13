const androidIosEntry = /^([-*] .* - Mobile YouTube Apps)$/m

const focusTubeEntry =
  /^[-*] .*?FocusTube.*?https:\/\/focustube\.mathy\.li\/.*$/m

const promotedFocusTubeEntry =
  '* ⭐ **[⁠FocusTube](https://focustube.mathy.li/)** - YouTube Frontend / [GitHub](https://github.com/helbetmathias/focustube)'

/**
 * Applies Mathy-specific content placement without modifying upstream pages.
 * Keeping the source Markdown untouched reduces conflicts during daily merges.
 */
export function applyMathyOverlay(code: string, filename: string): string {
  if (filename !== 'social-media-tools.md') return code
  if (!androidIosEntry.test(code) || !focusTubeEntry.test(code)) return code

  return code
    .replace(focusTubeEntry, '')
    .replace(androidIosEntry, `$1\n${promotedFocusTubeEntry}`)
}
