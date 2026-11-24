import { useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { simple, carousels, textSubs, mediaSubs, audioSubs, puzzles } from '../data.js'
import { Grid, Hero, Modal } from '../Card.jsx'
import { usePage, dl } from '../lib/dl.js'

export function SimpleList() {
  usePage('SimpleEng', 'simple_list')
  const groups = [['Carousel', carousels], ['Kirim Tulisan', textSubs], ['Kirim Foto', mediaSubs], ['Kirim Audio', audioSubs], ['Puzzle', puzzles]]
  return (<>
    <Hero title="Simple Engagement" sub="Carousel, kirim karya, dan puzzle." />
    {groups.map(([n, items]) => <section key={n} className="mb-10"><h2 className="text-2xl mb-3">{n}</h2><Grid items={items} from="simple_list" /></section>)}
  </>)
}

function Carousel({ item }) {
  const [i, setI] = useState(0), n = item.slides.length
  const go = (k) => { const x = (k + n) % n; setI(x); dl({ event: 'carousel_slide', carousel_id: item.slug, slide_index: x + 1 }) }
  const s = item.slides[i]
  return (
    <div id="carousel" aria-roledescription="carousel">
      <div className="rounded-2xl p-8 md:p-14 min-h-72 text-white flex flex-col justify-end" style={{ background: `linear-gradient(135deg, hsl(${item.hue + i * 30} 65% 35%), hsl(${item.hue + i * 30 + 40} 70% 52%))` }}>
        <h2 className="text-3xl md:text-4xl mb-3">{s.h}</h2><p className="max-w-[50ch]">{s.p}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button id="carousel-prev" className="btn" onClick={() => go(i - 1)}>← Sebelumnya</button>
        <div className="flex gap-2">{item.slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => go(k)} className={`w-3 h-3 rounded-full ${k === i ? 'bg-ink' : 'bg-line'}`} />)}</div>
        <button id="carousel-next" className="btn btn-primary" onClick={() => go(i + 1)}>Berikutnya →</button>
      </div>
    </div>
  )
}

const KIND = { text_subm: ['text', 'Tulisan'], media_subm: ['image/*', 'Foto'], audio_subm: ['audio/*', 'Audio'] }
function Submission({ item }) {
  const [err, setErr] = useState('')
  const navigate = useNavigate()
  const [accept] = KIND[item.type]
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target), file = f.get('file')
    if (accept !== 'text' && !(file && file.size)) return setErr('Lampirkan file dulu.')
    if (accept !== 'text' && !file.type.startsWith(accept.replace('*', ''))) return setErr('Jenis file tidak sesuai.')
    setErr('')
    // Tidak mengirim nama/email ke dataLayer (data pribadi)
    dl({ event: 'submission_success', submission_type: item.type, submission_id: item.slug, event_goal: f.get('goal'), user_city: f.get('city') })
    navigate(`/simple_engagement/${item.type}/${item.slug}/thank_you`, { state: { event: item.event } })
  }
  return (
    <form id={`form-${item.type}`} onSubmit={submit} className="grid gap-4 max-w-xl">
      <label className="field">Nama<input name="name" required /></label>
      <label className="field">Asal kota<input name="city" required /></label>
      <label className="field">Email<input name="email" type="email" required /></label>
      <label className="field">Motivasi / tujuan event
        <select name="goal" defaultValue={item.event}>{['Lomba Cerita Kampung','Pameran Komunitas Kopi','Festival Literasi Desa','Kampanye Kebersihan Sungai','Pekan Budaya Nusantara'].map((e) => <option key={e}>{e}</option>)}</select></label>
      <label className="field">Ceritakan motivasimu<textarea name="motivation" rows="3" required /></label>
      {accept === 'text' ? <label className="field">Tulisanmu<textarea name="text" rows="8" required /></label>
        : <label className="field">Lampirkan {KIND[item.type][1].toLowerCase()}<input name="file" type="file" accept={accept} /></label>}
      {err && <p role="alert" className="text-red-700 font-semibold">{err}</p>}
      <button id="btn-submit" className="btn btn-primary w-fit" type="submit">Kirim</button>
    </form>
  )
}

export function SubmissionThankYou() {
  const { type, slug } = useParams()
  const { state } = useLocation()
  const item = simple.find((x) => x.type === type && x.slug === slug)
  usePage('Terima Kasih', 'submission_thank_you', { submission_type: type, submission_id: slug })
  return (
    <div id="submission-thanks" className="card p-8 text-center">
      <h1 className="text-3xl mb-2">Terima kasih! 🎉</h1>
      <p className="mb-4 text-mut">Kiriman untuk “{state?.event || item?.event || 'event ini'}” sudah kami terima (simulasi, tidak disimpan ke server).</p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link to="/simple_engagement" className="btn btn-primary">Kembali ke SimpleEng</Link>
        <Link to={`/simple_engagement/${type}/${slug}`} className="btn">Lihat kembali</Link>
      </div>
    </div>
  )
}

const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0]
function scramble() {
  let t = [...solved], z = 8
  for (let k = 0; k < 24; k++) {
    const r = Math.floor(z / 3), c = z % 3, opts = []
    if (r > 0) opts.push(z - 3); if (r < 2) opts.push(z + 3); if (c > 0) opts.push(z - 1); if (c < 2) opts.push(z + 1)
    const m = opts[Math.floor(Math.random() * opts.length)]; [t[z], t[m]] = [t[m], t[z]]; z = m
  }
  return t.join() === solved.join() ? scramble() : t
}
function Puzzle({ item }) {
  const [t, setT] = useState(scramble), [moves, setMoves] = useState(0), [won, setWon] = useState(false)
  const click = (idx) => {
    const z = t.indexOf(0), ok = [idx - 3, idx + 3, idx - 1, idx + 1].includes(z) && !(Math.abs(idx - z) === 1 && Math.floor(idx / 3) !== Math.floor(z / 3))
    if (!ok || won) return
    const n = [...t]; [n[idx], n[z]] = [n[z], n[idx]]; setT(n); setMoves(moves + 1)
    if (n.join() === solved.join()) { setWon(true); dl({ event: 'puzzle_win', puzzle_id: item.slug, moves: moves + 1 }) }
  }
  const reset = () => { setT(scramble()); setMoves(0); setWon(false) }
  return (<div>
    <p className="mb-3 font-semibold">Langkah: {moves}</p>
    <div id="puzzle-board" className="grid grid-cols-3 gap-2 w-72 sm:w-96">
      {t.map((v, i) => <button key={i} aria-label={v ? `Kotak ${v}` : 'Kosong'} onClick={() => click(i)} className={`aspect-square rounded-lg text-4xl font-extrabold ${v ? 'bg-white border-2 border-ink' : 'bg-line/50'}`}>{v ? <>{item.emoji[v - 1]}<span className="block text-sm text-mut">{v}</span></> : ''}</button>)}
    </div>
    <button id="btn-puzzle-reset" className="btn mt-4" onClick={reset}>Acak ulang</button>
    {won && <Modal title="Kamu menang! 🏆"><p className="mb-4">Puzzle selesai dalam {moves} langkah.</p><button className="btn btn-primary" onClick={reset}>Main lagi</button> <Link to="/simple_engagement" className="btn">Puzzle lain</Link></Modal>}
  </div>)
}

export function SimpleDetail() {
  const { type, slug } = useParams()
  const item = simple.find((x) => x.type === type && x.slug === slug)
  usePage(item?.title || 'Tidak ditemukan', `simple_${type}`, { content_id: slug })
  if (!item) return <><h1 className="text-3xl">Halaman tidak ditemukan</h1><Link to="/simple_engagement" className="btn mt-4">Kembali</Link></>
  return (<>
    <Link to="/simple_engagement" className="text-blue font-semibold">← SimpleEng</Link>
    <h1 className="text-4xl my-4">{item.title}</h1>
    {type === 'carousel' ? <Carousel key={slug} item={item} /> : type === 'puzzle' ? <Puzzle key={slug} item={item} /> : <Submission key={slug} item={item} />}
  </>)
}
