import { useEffect } from 'react'
import { SITE_URL } from '../config/site'

function upsert(selector, attrs, content) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  el.setAttribute(selector.startsWith('link') ? 'href' : 'content', content)
}

export function useSeo({ title, description, path = '/' }) {
  useEffect(() => {
    const url = SITE_URL + path
    document.title = title
    upsert('meta[name="description"]', { name: 'description' }, description)
    upsert('link[rel="canonical"]', { rel: 'canonical' }, url)
    upsert('meta[property="og:title"]', { property: 'og:title' }, title)
    upsert('meta[property="og:description"]', { property: 'og:description' }, description)
    upsert('meta[property="og:url"]', { property: 'og:url' }, url)
    upsert('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
    upsert('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
  }, [title, description, path])
}
