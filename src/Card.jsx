import { Link } from 'react-router-dom'
import { dl } from './lib/dl.js'
export default function Card({ item, from = 'list' }) {
  return (
    <Link to={item.url} className="card" data-kind={item.kind} onClick={() => dl({ event: 'select_content', content_type: item.kind, content_id: item.slug || item.id, item_title: item.title, click_from: from })}>
      <div className="h-24 flex items-end p-3 font-bold text-white" style={{ background: `linear-gradient(135deg, hsl(${item.hue} 70% 38%), hsl(${item.hue + 40} 70% 55%))` }}>{item.kind}</div>
      <div className="p-4"><h3 className="text-lg mb-1">{item.title}</h3><p className="text-sm text-mut">{item.desc}</p></div>
    </Link>
  )
}
export const Grid = ({ items, from }) => <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((i) => <Card key={i.url} item={i} from={from} />)}</div>
export const Hero = ({ title, sub }) => <div className="mb-6"><h1 className="text-4xl md:text-5xl mb-2">{title}</h1><p className="text-mut font-serif italic text-xl">{sub}</p></div>
export const Modal = ({ title, children }) => <div role="dialog" aria-modal="true" id="popup-modal" className="fixed inset-0 z-30 bg-ink/70 grid place-items-center p-5"><div className="bg-white rounded-2xl p-8 max-w-sm text-center"><h2 className="text-3xl mb-3">{title}</h2>{children}</div></div>
