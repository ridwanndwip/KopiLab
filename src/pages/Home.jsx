import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { all, shuffle, articles, videos, simple, games, quizzes } from '../data.js'
import { Grid } from '../Card.jsx'
import { usePage, dl } from '../lib/dl.js'
export default function Home() {
  usePage('Beranda', 'home')
  // 1 kartu acak dari tiap kategori, lalu tambah acak hingga 9
  const picks = useMemo(() => { const base = [articles, videos, simple, games, quizzes].map((g) => shuffle(g)[0]); return shuffle([...base, ...shuffle(all).slice(0, 4)].filter((v, i, a) => a.indexOf(v) === i)).slice(0, 9) }, [])
  return (<>
    <section className="rounded-2xl bg-ink text-white p-8 md:p-14 mb-10">
      <p className="text-hl font-serif italic text-xl mb-3">Seduh rasa ingin tahu.</p>
      <h1 className="text-5xl md:text-6xl max-w-[16ch] mb-5">Baca, tonton, main, lalu uji dirimu.</h1>
      <p className="max-w-[55ch] mb-6 text-white/80">Cerita panjang, video, tantangan puzzle, game singkat, dan kuis. Semuanya ada di satu tempat, dan setiap klikmu tercatat di dataLayer.</p>
      <div className="flex flex-wrap gap-3">
        <Link id="btn-hero-content" to="/content" className="btn btn-hl border-hl text-ink" onClick={() => dl({ event: 'klik_cta', cta_name: 'hero_mulai_baca', cta_location: 'hero' })}>Mulai membaca</Link>
        <Link id="btn-hero-game" to="/games" className="btn border-white text-white" onClick={() => dl({ event: 'klik_cta', cta_name: 'hero_main_game', cta_location: 'hero' })}>Main game</Link>
      </div>
    </section>
    <h2 className="text-2xl mb-4">Pilihan acak untukmu</h2>
    <Grid items={picks} from="home_random" />
  </>)
}
