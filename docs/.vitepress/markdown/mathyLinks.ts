import type { MarkdownRenderer } from 'vitepress'

/** Keep upstream wiki/article links on this mirror without editing synced posts. */
export function mathyLinksPlugin(md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'mathy-internal-links', (state) => {
    for (const token of state.tokens) {
      if (token.type !== 'inline' || !token.children) continue

      for (const child of token.children) {
        if (child.type !== 'link_open') continue
        const href = child.attrGet('href') || ''
        if (!/^(?:https?:)?\/\/(?:www\.)?fmhy\.net(?:[/?#]|$)/i.test(href))
          continue

        const url = new URL(href, 'https://fmhy.net')
        if (!['fmhy.net', 'www.fmhy.net'].includes(url.hostname)) continue
        // A link to the original project's homepage is attribution, not a
        // mirrored category. Preserve it along with unrelated external links.
        if (url.pathname === '/') continue

        child.attrSet('href', `${url.pathname}${url.search}${url.hash}`)
      }
    }
  })
}
