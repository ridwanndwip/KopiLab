import { useEffect } from 'react'
export const dl = (o) => { (window.dataLayer = window.dataLayer || []).push(o) }
// Dipanggil tiap halaman: set title + kirim virtual pageview ke dataLayer (SPA tidak reload)
export function usePage(title, pageType, extra = {}) {
  useEffect(() => {
    document.title = `${title} | Kopi Lab`
    dl({ event: 'spa_page_view', page_title: document.title, page_path: location.pathname, page_type: pageType, ...extra })
    window.scrollTo(0, 0)
  }, [location.pathname])
}
