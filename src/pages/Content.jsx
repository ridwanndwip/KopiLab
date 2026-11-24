import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { articles, videos, story } from '../data.js'
import { Grid, Hero } from '../Card.jsx'
import { usePage, dl } from '../lib/dl.js'
export function ContentList() {
  usePage('Content', 'content_list')
  const [f, setF] = useState('all')
  const items = f === 'article' ? articles : f === 'video' ? videos : [...articles, ...videos]
  return (<>
    <Hero title="Content" sub="30 artikel cerita dan 30 artikel video." />
    <div className="flex gap-2 mb-5">{[['all', 'Semua'], ['article', 'Artikel'], ['video', 'Video']].map(([k, l]) => <button key={k} id={`filter-${k}`} className={`btn ${f === k ? 'btn-primary' : ''}`} onClick={() => { setF(k); dl({ event: 'filter_content', filter: k }) }}>{l}</button>)}</div>
    <Grid items={items} from="content_list" />
  </>)
}
export function ContentDetail() {
  const { type, slug } = useParams()
  const isVid = type === 'contentVideoArticle'
  const item = (isVid ? videos : articles).find((x) => x.slug === slug)
  usePage(item?.title || 'Tidak ditemukan', isVid ? 'content_video' : 'content_article', { content_id: slug })
  if (!item) return <><h1 className="text-3xl">Konten tidak ditemukan</h1><Link to="/content" className="btn mt-4">Kembali</Link></>
  return (
    <article className="max-w-2xl mx-auto prose-story">
      <Link to="/content" className="text-blue font-semibold">← Semua content</Link>
      <h1 className="text-4xl md:text-5xl my-4 font-sans">{item.title}</h1>
      <p className="text-mut mb-6 font-sans">{isVid ? 'Artikel video' : 'Artikel cerita'} · Kopi Lab</p>
      {isVid && <div className="aspect-video mb-8 rounded-xl overflow-hidden bg-ink"><iframe id="yt-player" className="w-full h-full" src={`https://www.youtube.com/embed/${item.yt}?enablejsapi=1`} title={item.title} allowFullScreen /></div>}
      {story(item.i, item.title).slice(0, isVid ? 4 : 9).map((p, k) => <p key={k}>{p}</p>)}
      <div id="end-of-article" className="border-t-2 border-ink pt-4 font-sans"><button id="btn-bagikan" className="btn btn-hl" onClick={() => dl({ event: 'share_click', content_id: slug })}>Bagikan</button></div>
    </article>
  )
}
