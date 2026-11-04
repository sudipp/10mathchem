import { useMemo, useState } from 'react'
import { ArrowRight, Check, Eye, EyeOff } from 'lucide-react'
import { solve } from './solve.jsx'
import { Rich, TeX } from './TeX.jsx'

function ProblemCard({ problem, number, revealAll, tag }) {
  const s = useMemo(() => solve(problem), [problem])
  const [shown, setShown] = useState(0)
  const [answerOnly, setAnswerOnly] = useState(false)
  const n = revealAll ? s.steps.length : shown
  const done = n >= s.steps.length
  const visual = n > 0 && s.visual ? s.visual(n) : null
  return <article className="hw-card">
    <header><span className="ws-num">{number}.</span><div className="hw-prompt"><TeX math={s.prompt} /></div>{tag && <span className={`hw-tag ${tag}`}>{tag === 'assigned' ? 'Assigned' : 'Extra practice'}</span>}</header>
    {visual && <div className="hw-visual">{visual}</div>}
    {n > 0 && <ol className="hw-steps">{s.steps.slice(0, n).map((t, i) => <li key={i} className={i === n - 1 && !done ? 'current' : ''}><Rich text={t} /></li>)}</ol>}
    {(done || answerOnly) && <div className="hw-answer"><span className="eyebrow">ANSWER</span><TeX math={s.answer} /></div>}
    {!revealAll && <div className="ws-actions">
      {!done && <button className="ws-btn primary" onClick={() => setShown(shown + 1)}>{shown === 0 ? 'I tried it — show step 1' : 'Next step'} <ArrowRight size={14} /></button>}
      {!done && <button className="ws-btn" onClick={() => setShown(s.steps.length)}><Eye size={14} /> All steps</button>}
      {!done && <button className="ws-btn ghost" aria-pressed={answerOnly} onClick={() => setAnswerOnly(!answerOnly)}>{answerOnly ? 'Hide answer' : 'Answer only'}</button>}
      {shown > 0 && <button className="ws-btn ghost" onClick={() => { setShown(0); setAnswerOnly(false) }}><EyeOff size={14} /> Reset</button>}
    </div>}
  </article>
}

export default function HomeworkPage({ unit, tab, openLesson }) {
  const HOMEWORK = unit.homework
  const hw = HOMEWORK.find(h => h.id === tab) ?? HOMEWORK[0]
  const lessonNames = unit.lessons.map(l => l.title)
  const [revealAll, setRevealAll] = useState(false)
  const [onlyAssigned, setOnlyAssigned] = useState(true)
  const total = hw.sections.reduce((a, s) => a + s.problems.length, 0)
  const lastOdd = total % 2 ? total : total - 1
  let count = 0
  return <main className="pt-page ws-page">
    <section className="pt-hero">
      <span className="eyebrow">HOMEWORK HELP · UNIT {unit.number} · {unit.title.toUpperCase()}</span>
      <h1>Homework <em>help.</em></h1>
      <p>Try each problem on paper first. Then reveal one step at a time and compare. Every answer here has been checked against your answer keys.</p>
      <div className="ws-tabs" role="group" aria-label="Choose an assignment">
        {HOMEWORK.map(h => <a key={h.id} href={`#/${unit.slug}/homework/${h.id}`} aria-current={h.id === hw.id ? 'page' : undefined} onClick={() => setRevealAll(false)}>{h.title}<span>{h.name}</span></a>)}
      </div>
    </section>
    <section className="ws-section">
      <div className="hw-head">
        <div>
          <h2>{hw.title}: <em>{hw.name}.</em></h2>
          {hw.due && <p className="muted">Due {hw.due}</p>}
          {hw.assigned && <p className="hw-assigned">Assigned: #1–{lastOdd} odd. <button className="text-link as-button" onClick={() => setOnlyAssigned(!onlyAssigned)}>{onlyAssigned ? 'Show the even problems too (extra practice)' : 'Show assigned problems only'}</button></p>}
          <button className="text-link as-button" onClick={() => openLesson(hw.lesson)}>Review the lesson first: {lessonNames[hw.lesson]} <ArrowRight size={14} /></button>
        </div>
        <button className="ws-btn" onClick={() => setRevealAll(!revealAll)}>{revealAll ? <><EyeOff size={14} /> Hide all answers</> : <><Check size={14} /> Show every step & answer</>}</button>
      </div>
      {hw.sections.map(section => <div key={section.title} className="hw-section">
        <h3><Rich text={section.title} /></h3>
        <div className="hw-grid">{section.problems.map(p => { count++; const tag = hw.assigned ? (count % 2 === 1 ? 'assigned' : 'extra') : null; return tag === 'extra' && onlyAssigned ? null : <ProblemCard key={`${hw.id}-${count}-${revealAll}`} problem={p} number={count} revealAll={revealAll} tag={tag} /> })}</div>
      </div>)}
    </section>
  </main>
}
