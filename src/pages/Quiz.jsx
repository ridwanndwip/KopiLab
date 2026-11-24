import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { quizzes, shuffle } from '../data.js'
import { Grid, Hero } from '../Card.jsx'
import { usePage, dl } from '../lib/dl.js'

export function QuizList() {
  usePage('Quiz', 'quiz_list')
  return <><Hero title="Quiz" sub="8 kuis, masing-masing 5 pertanyaan." /><Grid items={quizzes} from="quiz_list" /></>
}

export function QuizDetail() {
  const { cat, slug } = useParams()
  const quiz = quizzes.find((q) => q.cat === cat && q.slug === slug)
  usePage(quiz?.title || 'Tidak ditemukan', 'quiz_play', { quiz_id: slug })
  if (!quiz) return <><h1 className="text-3xl">Quiz tidak ditemukan</h1><Link to="/quiz" className="btn mt-4">Kembali</Link></>
  return <Play key={slug} quiz={quiz} />
}

function Play({ quiz }) {
  // Acak urutan pilihan agar jawaban benar tidak selalu di posisi yang sama
  const qs = useMemo(() => quiz.questions.map((x) => ({ q: x.q, o: shuffle(x.o), c: x.o[x.a] })), [quiz])
  const [i, setI] = useState(0), [score, setScore] = useState(0), [pick, setPick] = useState(null), [fin, setFin] = useState(false)
  const q = qs[i]
  const answer = (o) => {
    if (pick) return
    setPick(o); const ok = o === q.c; if (ok) setScore(score + 1)
    dl({ event: 'quiz_answer', quiz_id: quiz.slug, question_no: i + 1, is_correct: ok })
  }
  const next = () => {
    if (i + 1 === qs.length) { setFin(true); dl({ event: 'quiz_complete', quiz_id: quiz.slug, score, total: qs.length }) } else { setI(i + 1); setPick(null) }
  }
  return (<div className="max-w-xl">
    <Link to="/quiz" className="text-blue font-semibold">← Quiz</Link>
    <h1 className="text-4xl my-4">{quiz.title}</h1>
    {fin ? <div id="quiz-result" className="card p-8 text-center"><p className="text-6xl font-extrabold mb-2">{score}/{qs.length}</p><p className="mb-4">{score >= 4 ? 'Hebat sekali! ☕' : score >= 2 ? 'Lumayan, coba lagi!' : 'Jangan menyerah, ulangi ya!'}</p><button className="btn btn-primary" onClick={() => { setI(0); setScore(0); setPick(null); setFin(false) }}>Ulangi</button></div>
    : <div className="card p-6">
      <p className="text-mut mb-1">Pertanyaan {i + 1} dari {qs.length}</p>
      <h2 className="text-2xl mb-4">{q.q}</h2>
      <div className="grid gap-2">{q.o.map((o) => <button key={o} onClick={() => answer(o)} className={`btn text-left ${pick && o === q.c ? 'bg-green-200' : pick === o ? 'bg-red-200' : ''}`}>{o}</button>)}</div>
      {pick && <button id="btn-quiz-next" className="btn btn-primary mt-4" onClick={next}>{i + 1 === qs.length ? 'Lihat skor' : 'Lanjut'}</button>}
    </div>}
  </div>)
}
