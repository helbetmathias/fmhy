import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const home = read('docs/.vitepress/dist/index.html')
const social = read('docs/.vitepress/dist/social-media-tools.html')
const reading = read('docs/.vitepress/dist/reading.html')
const theme = read('docs/.vitepress/theme/index.ts')
const style = read('docs/.vitepress/theme/style.scss')
const config = read('docs/.vitepress/config.mts')

// Check the emitted pages, not just the customization source: an upstream
// change can silently disable a build-time overlay without failing Vite.
assert.match(home, /<title>Welcome • Mathy Repo<\/title>/)
assert.match(home, /rel="canonical" href="https:\/\/fmhy\.mathy\.li\/"/)
assert.match(home, /Visit Mathy\.li/)
assert.match(home, /View on GitHub/)
assert.match(home, /mathy-orbit-96\.png/)
assert.match(home, /Checked every six hours against/)
assert.match(
  config,
  /var themeName = localStorage\.getItem\('vitepress-theme-name'\);/
)
assert.match(config, /if \(!themeName\) \{\s*themeName = 'mathy';/)
assert.doesNotMatch(home, /<link rel="canonical" href="https:\/\/fmhy\.net/)

const heading = social.indexOf('id="players-frontends"')
const mobileApps = social.indexOf('Mobile YouTube Apps', heading)
const focusTube = social.indexOf('href="https://focustube.mathy.li/"', heading)
assert.ok(heading >= 0 && mobileApps > heading && focusTube > mobileApps)
assert.ok(
  focusTube - mobileApps < 600,
  'FocusTube must remain immediately after mobile apps'
)
assert.equal(
  social.match(/href="https:\/\/focustube\.mathy\.li\/"/g)?.length,
  1,
  'FocusTube must appear exactly once in the rendered page'
)
assert.match(reading, /The Anarchist Library/)

// This fork previously disabled navigation scrolling by replacing these
// browser methods globally. Search and the right TOC rely on native scrolling.
assert.match(theme, /scheduleScrollToMatch\(hash, query, 16, matchContext\)/)
assert.doesNotMatch(
  theme,
  /(?:window\.scrollTo|Element\.prototype\.scrollIntoView)\s*=/
)
assert.match(
  style,
  /--fmhy-scroll-inset:\s*calc\(var\(--vp-nav-height\) \+ 16px\)/
)
assert.match(
  style,
  /\.vp-doc \[id\],\s*\.vp-search-scroll-target\s*\{\s*scroll-margin-top:\s*var\(--fmhy-scroll-inset\)/
)
assert.doesNotMatch(style, /:root\s*\{\s*scroll-behavior:\s*smooth/)

// Protect the reviewed design port without changing automatic content sync.
const appearance = read('docs/.vitepress/theme/components/AppearancePanel.vue')
assert.match(appearance, /<span>Mathy<\/span>/)
assert.match(appearance, /:aria-pressed="isMathyDefault"/)
assert.match(appearance, /!isMathyDefault\.value && isCurrentMode\(choice\)/)
assert.match(style, /\.mathy\s*\{[\s\S]*?var\(--vp-c-brand-1\) 18%/)
assert.match(style, /\.mathy\s*\{[\s\S]*?var\(--vp-c-brand-1\) 26%/)
assert.match(appearance, /setTheme\('mathy'\)/)
assert.match(appearance, /<ColorPicker compact/)
assert.match(
  read('docs/.vitepress/theme/themes/themeHandler.ts'),
  /root\.classList\.toggle\('monolith', currentTheme === 'monolith'\)/
)
assert.match(style, /\.VPSidebarItem\.is-link > \.item > \.link:hover/)
assert.match(style, /background: var\(--fmhy-c-accent-muted\)/)
assert.doesNotMatch(reading, /Share Feedback/)

// Monthly updates arrive unchanged from upstream. Their wiki/category links
// must be localized in the emitted pages, with section anchors preserved.
const postsDir = new URL('../docs/.vitepress/dist/posts/', import.meta.url)
for (const file of readdirSync(postsDir).filter((file) =>
  file.endsWith('.html')
)) {
  const post = readFileSync(new URL(file, postsDir), 'utf8')
  assert.doesNotMatch(
    post,
    /<a\b[^>]*href="(?:https?:)?\/\/(?:www\.)?fmhy\.net\/[^"?#]/i,
    `${file} must keep mirrored page links on the Mathy site`
  )
}
assert.match(
  read('docs/.vitepress/dist/posts/oct-2026.html'),
  /href="\/video#live-sports"/
)

console.log(
  'Sync build checks passed: branding, canonical URL, FocusTube, search scroll, local post links and wiki content.'
)
