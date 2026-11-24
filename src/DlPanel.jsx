import { useEffect, useState } from 'react'
// Panel inspector dataLayer (alat bantu belajar). Hapus <DlPanel /> di App.jsx bila tak diperlukan.
const format = (o) => {
  try {
    const seen = new WeakSet()
    return JSON.stringify(o, (k, v) => {
      if (typeof v === 'function') return `[Function${v.name ? ' ' + v.name : ''}]`
      if (v && typeof v === 'object') {
        if (v.nodeType === 1) return `<${v.tagName.toLowerCase()}${v.id ? '#' + v.id : ''}>`
        if (v.nodeType) return `[Node ${v.nodeType}]`
        if (seen.has(v)) return '[Circular]'
        seen.add(v)
      }
      return v
    }, 1) ?? String(o)
  } catch { return String(o) }
}
export default function DlPanel() {
  const [log, setLog] = useState([]), [open, setOpen] = useState(true)
  useEffect(() => {
    const dl = (window.dataLayer = window.dataLayer || [])
    const add = (o) => setLog((l) => [format(o), ...l].slice(0, 60))
    dl.forEach((x) => add(x))
    const orig = dl.push
    dl.push = function (...a) { const r = orig.apply(dl, a); try { a.forEach((x) => add(x)) } catch {} return r }
    const err = (e) => add({ jsError: e.message })
    window.addEventListener('error', err)
    return () => { dl.push = orig; window.removeEventListener('error', err) }
  }, [])
  return (
    <aside id="dl-panel" className="fixed right-3 bottom-3 z-20 w-[min(380px,calc(100vw-24px))] bg-ink text-white rounded-lg font-mono text-xs shadow-xl">
      <header className="flex justify-between items-center p-2 font-bold">
        <span>dataLayer ({log.length})</span>
        <span><button id="dl-clear" className="border border-mut rounded px-2 mr-1" onClick={() => setLog([])}>Bersihkan</button><button id="dl-hide" className="border border-mut rounded px-2" onClick={() => setOpen(!open)}>Tutup/Buka</button></span>
      </header>
      {open && <ul id="dl-log" className="max-h-[35vh] overflow-auto px-3 pb-2">{log.map((t, i) => <li key={i} className="border-t border-mut/40 py-1 whitespace-pre-wrap break-all">{t}</li>)}</ul>}
    </aside>
  )
}
