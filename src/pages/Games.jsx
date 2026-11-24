import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { games, shuffle } from '../data.js'
import { Grid, Hero } from '../Card.jsx'
import { usePage, dl } from '../lib/dl.js'

export function GameList() {
  usePage('Game', 'game_list')
  return <><Hero title="Game" sub="Tiga game singkat, lengkap dengan skor." /><Grid items={games} from="game_list" /></>
}

const done = (g, score) => dl({ event: 'game_score', game_id: g, score })

function TapGame() {
  const [t, setT] = useState(10), [n, setN] = useState(0), [on, setOn] = useState(false), [best, setBest] = useState(0), end = useRef(false)
  useEffect(() => {
    if (!on) return
    const id = setInterval(() => setT((x) => x - 0.1), 100)
    return () => clearInterval(id)
  }, [on])
  useEffect(() => { if (on && t <= 0 && !end.current) { end.current = true; setOn(false); setT(0); setBest((b) => Math.max(b, n)); done('tap-cepat', n) } }, [t])
  const start = () => { end.current = false; setN(0); setT(10); setOn(true) }
  return (<div className="text-center card p-8 max-w-md">
    <p className="text-6xl font-extrabold mb-1" id="game-score">{n}</p><p className="text-mut mb-4">Sisa waktu: {Math.max(t, 0).toFixed(1)} dtk · Terbaik: {best}</p>
    {on ? <button id="btn-tap" className="btn btn-primary text-3xl w-full py-8" onClick={() => setN(n + 1)}>TAP!</button> : <button id="btn-start" className="btn btn-hl" onClick={start}>{t === 0 ? 'Main lagi' : 'Mulai'}</button>}
  </div>)
}

const FACES = ['☕', '🫘', '🥛', '🍪', '🧁', '🍯']
function MemoryGame() {
  const mk = () => shuffle([...FACES, ...FACES].map((f, i) => ({ f, id: i })))
  const [cards, setCards] = useState(mk), [open, setOpen] = useState([]), [matched, setMatched] = useState([]), [moves, setMoves] = useState(0)
  const win = matched.length === 12, score = Math.max(0, 100 - (moves - 6) * 5)
  useEffect(() => { if (win) done('memory', score) }, [win])
  const flip = (c) => {
    if (open.length === 2 || open.includes(c.id) || matched.includes(c.id)) return
    const o = [...open, c.id]; setOpen(o)
    if (o.length === 2) {
      setMoves(moves + 1)
      const [a, b] = o.map((id) => cards.find((x) => x.id === id))
      setTimeout(() => { if (a.f === b.f) setMatched((m) => [...m, a.id, b.id]); setOpen([]) }, 700)
    }
  }
  const reset = () => { setCards(mk()); setOpen([]); setMatched([]); setMoves(0) }
  return (<div>
    <p className="mb-3 font-semibold">Langkah: {moves} {win && `· Skor: ${score}`}</p>
    <div className="grid grid-cols-4 gap-2 w-80 sm:w-96">{cards.map((c) => { const up = open.includes(c.id) || matched.includes(c.id); return <button key={c.id} aria-label="Kartu" onClick={() => flip(c)} className={`aspect-square rounded-lg text-3xl border-2 border-ink ${up ? 'bg-white' : 'bg-blue'}`}>{up ? c.f : ''}</button> })}</div>
    <button id="btn-memory-reset" className="btn mt-4" onClick={reset}>{win ? 'Main lagi 🎉' : 'Acak ulang'}</button>
  </div>)
}

function GuessGame() {
  const [target, setTarget] = useState(() => 1 + Math.floor(Math.random() * 20)), [v, setV] = useState(''), [tries, setTries] = useState(0), [msg, setMsg] = useState('Tebak angka 1–20'), [won, setWon] = useState(false)
  const guess = (e) => {
    e.preventDefault(); const g = Number(v); if (!g) return
    const t = tries + 1; setTries(t); setV('')
    if (g === target) { const s = Math.max(10, 100 - (t - 1) * 15); setWon(true); setMsg(`Benar! Skor kamu ${s}`); done('tebak-angka', s) }
    else setMsg(g < target ? 'Terlalu kecil' : 'Terlalu besar')
  }
  const reset = () => { setTarget(1 + Math.floor(Math.random() * 20)); setTries(0); setWon(false); setMsg('Tebak angka 1–20') }
  return (<div className="card p-8 max-w-md"><p id="game-msg" className="text-2xl font-bold mb-3">{msg}</p><p className="mb-3 text-mut">Tebakan: {tries}</p>
    {won ? <button className="btn btn-hl" onClick={reset}>Main lagi</button> : <form onSubmit={guess} className="flex gap-2"><input type="number" min="1" max="20" value={v} onChange={(e) => setV(e.target.value)} aria-label="Tebakan" /><button id="btn-guess" className="btn btn-primary">Tebak</button></form>}
  </div>)
}

const MAP = { 'tap-cepat': TapGame, memory: MemoryGame, 'tebak-angka': GuessGame }
export function GameDetail() {
  const { game, slug } = useParams()
  const item = games.find((g) => g.id === game && g.slug === slug)
  usePage(item?.title || 'Tidak ditemukan', 'game_play', { game_id: game })
  if (!item) return <><h1 className="text-3xl">Game tidak ditemukan</h1><Link to="/games" className="btn mt-4">Kembali</Link></>
  const G = MAP[game]
  return <><Link to="/games" className="text-blue font-semibold">← Game</Link><h1 className="text-4xl my-4">{item.title}</h1><G /></>
}
