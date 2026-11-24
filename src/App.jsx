import { Routes, Route, NavLink, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { ContentList, ContentDetail } from './pages/Content.jsx'
import { SimpleList, SimpleDetail, SubmissionThankYou } from './pages/Simple.jsx'
import { GameList, GameDetail } from './pages/Games.jsx'
import { QuizList, QuizDetail } from './pages/Quiz.jsx'
import DlPanel from './DlPanel.jsx'

const NAV = [['/', 'Beranda', 'beranda'], ['/content', 'Content', 'content'], ['/simple_engagement', 'SimpleEng', 'simpleeng'], ['/games', 'Game', 'game'], ['/quiz', 'Quiz', 'quiz']]
const cls = ({ isActive }) => `px-3 py-1 rounded-md font-semibold ${isActive ? 'bg-ink text-white' : 'hover:underline'}`

export default function App() {
  return (<>
    <header className="sticky top-0 z-10 bg-bg border-b-2 border-ink">
      <div className="max-w-5xl mx-auto px-5 py-3 flex flex-wrap items-center justify-between gap-2">
        <Link id="logo-link" to="/" className="text-2xl font-extrabold">Kopi<span className="bg-hl px-1 ml-0.5 rounded">Lab</span></Link>
        <nav id="main-nav" className="flex flex-wrap gap-1" aria-label="Navigasi utama">
          {NAV.map(([to, label, id]) => <NavLink key={id} id={`nav-${id}`} to={to} end={to === '/'} className={cls}>{label}</NavLink>)}
        </nav>
      </div>
    </header>
    <main className="max-w-5xl mx-auto px-5 py-8 min-h-[70vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<ContentList />} />
        <Route path="/content/:type/:slug" element={<ContentDetail />} />
        <Route path="/simple_engagement" element={<SimpleList />} />
        <Route path="/simple_engagement/:type/:slug/thank_you" element={<SubmissionThankYou />} />
        <Route path="/simple_engagement/:type/:slug" element={<SimpleDetail />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/:game/:slug" element={<GameDetail />} />
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/:cat/:slug" element={<QuizDetail />} />
        <Route path="*" element={<div><h1 className="text-4xl">Halaman tidak ditemukan</h1><Link to="/" className="btn btn-primary mt-4">Ke Beranda</Link></div>} />
      </Routes>
    </main>
    <footer className="border-t-2 border-ink px-5 py-8 text-mut text-center">Kopi Lab: situs latihan GA, GTM, dan dataLayer (SPA).</footer>
    <DlPanel />
  </>)
}
