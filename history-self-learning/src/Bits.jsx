import { useState } from 'react'
import { ArrowRight, Check, Eye, EyeOff, RotateCcw, Shuffle, X } from 'lucide-react'
import { shuffleQuestion, useStored } from './shared.js'

// Cause → effect chain revealed one link at a time.
export function Chain({ links }) {
  const [shown, setShown] = useState(1)
  return <div className="chain">
    <div className="chain-row">{links.map((l, i) => <div key={l} className={`chain-link${i < shown ? ' on' : ''}`} style={{ transitionDelay: `${i < shown ? 0 : 0}s` }}>
      {i > 0 && <ArrowRight className="chain-arrow" size={18} />}<span>{l}</span></div>)}</div>
    <div className="chain-ctl">
      <button className="btn" disabled={shown >= links.length} onClick={() => setShown(shown + 1)}>Next link <ArrowRight size={14} /></button>
      <button className="btn ghost" onClick={() => setShown(shown >= links.length ? 1 : links.length)}>{shown >= links.length ? <><RotateCcw size={14} /> Reset</> : 'Show all'}</button>
    </div>
  </div>
}

// Lazy YouTube card: nothing loads until the student asks.
export function YouTube({ id, title, creator, compact = false }) {
  const [on, setOn] = useState(false)
  return <div className={`yt${compact ? ' compact' : ''}`}>
    <div className="yt-frame">{on ? <iframe title={title} src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      : <button className="yt-load" onClick={() => setOn(true)}><img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" /><span className="yt-play">▶ Play video</span></button>}</div>
    <div className="yt-meta"><strong>{title}</strong><span className="muted">{creator} · YouTube · <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">open</a></span></div>
  </div>
}

// Flip cards with a "got it" pile saved on this device.
export function Flashcards({ terms, storeKey }) {
  const [known, setKnown] = useStored(storeKey, [])
  const [order, setOrder] = useState(() => terms.map((_, i) => i))
  const [flipped, setFlipped] = useState([])
  const [hideKnown, setHideKnown] = useState(false)
  const list = order.filter(i => !(hideKnown && known.includes(terms[i][0])))
  return <div className="cards-block">
    <div className="cards-ctl">
      <span className="muted">{known.length} of {terms.length} marked “got it”</span>
      <button className="btn ghost" onClick={() => setOrder([...order].sort(() => Math.random() - 0.5))}><Shuffle size={14} /> Shuffle</button>
      <button className="btn ghost" onClick={() => setHideKnown(!hideKnown)}>{hideKnown ? <Eye size={14} /> : <EyeOff size={14} />} {hideKnown ? 'Show all' : 'Hide “got it”'}</button>
      <button className="btn ghost" onClick={() => setFlipped(flipped.length ? [] : terms.map(t => t[0]))}>{flipped.length ? 'Flip all back' : 'Flip all'}</button>
    </div>
    <div className="flash-grid">{list.map(i => { const [term, def, why] = terms[i]; const f = flipped.includes(term), k = known.includes(term)
      return <div key={term} className={`flash${f ? ' flipped' : ''}${k ? ' known' : ''}`}>
        <button className="flash-face" onClick={() => setFlipped(f ? flipped.filter(t => t !== term) : [...flipped, term])} aria-label={f ? `${term}: ${def}` : `Show meaning of ${term}`}>
          {f ? <><span className="flash-def">{def}</span><span className="flash-why">Why it matters: {why}</span></> : <span className="flash-term">{term}</span>}
        </button>
        <button className={`flash-known${k ? ' on' : ''}`} onClick={() => setKnown(k ? known.filter(t => t !== term) : [...known, term])}>{k ? <><Check size={13} /> Got it</> : 'Mark got it'}</button>
      </div> })}</div>
  </div>
}

// Stimulus-based multiple choice set.
export function McqSet({ set: raw, index }) {
  const [set] = useState(() => ({ ...raw, questions: raw.questions.map(shuffleQuestion) }))
  const [picked, setPicked] = useState({})
  const [checked, setChecked] = useState(false)
  const right = set.questions.filter((q, i) => picked[i] === q.correct).length
  return <div className="mcq">
    <figure className="source"><figcaption><span className="eyebrow">SOURCE {index + 1}</span>{set.source.title}</figcaption><blockquote>{set.source.text}</blockquote><cite>{set.source.cite}</cite></figure>
    <ol className="mcq-qs">{set.questions.map((q, qi) => <li key={q.q}>
      <p>{q.q}</p>
      <div className="mcq-opts" role="radiogroup">{q.options.map((o, oi) => {
        const state = checked ? (oi === q.correct ? 'right' : picked[qi] === oi ? 'wrong' : '') : ''
        return <button key={o} role="radio" aria-checked={picked[qi] === oi} className={`opt ${state}${picked[qi] === oi ? ' picked' : ''}`} onClick={() => { if (!checked) setPicked({ ...picked, [qi]: oi }) }}>
          <span className="opt-letter">{'ABCD'[oi]}</span>{o}{state === 'right' && <Check size={15} />}{state === 'wrong' && <X size={15} />}</button>
      })}</div>
      {checked && <p className="why"><strong>{picked[qi] === q.correct ? 'Correct.' : `Answer: ${'ABCD'[q.correct]}.`}</strong> {q.why}</p>}
    </li>)}</ol>
    <div className="mcq-ctl">{checked ? <><span className="score">{right} / {set.questions.length} correct</span><button className="btn ghost" onClick={() => { setPicked({}); setChecked(false) }}><RotateCcw size={14} /> Try again</button></>
      : <button className="btn accent" disabled={Object.keys(picked).length < set.questions.length} onClick={() => setChecked(true)}>Check answers</button>}</div>
  </div>
}

// Short-answer question: write, then compare with the scoring guide and a model answer.
export function Saq({ saq, index }) {
  const [text, setText] = useState({})
  const [shown, setShown] = useState(false)
  const [points, setPoints] = useState([])
  return <div className="saq">
    <span className="eyebrow">SHORT ANSWER {index + 1} · 3 POINTS</span>
    <p className="muted">{saq.prompt}</p>
    {saq.parts.map((p, i) => <div key={p} className="saq-part">
      <label htmlFor={`saq-${index}-${i}`}><strong>{'abc'[i]})</strong> {p}</label>
      <textarea id={`saq-${index}-${i}`} rows={3} value={text[i] ?? ''} onChange={e => setText({ ...text, [i]: e.target.value })} placeholder="Write 1–3 sentences. Name a specific example." />
      {shown && <div className="saq-guide"><p><span className="eyebrow">SCORING GUIDE</span> {saq.guide[i]}</p><p><span className="eyebrow">MODEL ANSWER</span> {saq.model[i]}</p>
        <label className="self"><input type="checkbox" checked={points.includes(i)} onChange={() => setPoints(points.includes(i) ? points.filter(x => x !== i) : [...points, i])} /> My answer earns this point</label></div>}
    </div>)}
    <div className="mcq-ctl">{shown ? <span className="score">Self-score: {points.length} / 3</span> : <button className="btn accent" onClick={() => setShown(true)}>Show scoring guide</button>}</div>
  </div>
}

// Long essay outline builder: thesis → context → evidence → complexity.
export function LeqBuilder({ leq }) {
  const [thesis, setThesis] = useState(null)
  const [context, setContext] = useState('')
  const [showContext, setShowContext] = useState(false)
  const [sorted, setSorted] = useState({})
  const [checkedEv, setCheckedEv] = useState(false)
  const evRight = leq.evidence.filter((e, i) => sorted[i] === e.side).length
  const sides = [...new Set(leq.evidence.map(e => e.side))] // e.g. change / continuity, cause / effect
  return <div className="leq">
    <span className="eyebrow">LONG ESSAY PRACTICE · BUILD AN OUTLINE</span>
    <p className="leq-prompt">{leq.prompt}</p>
    <div className="leq-step"><h4>1. Pick the strongest thesis</h4>
      {leq.theses.map((t, i) => <button key={t.text} className={`opt${thesis === i ? (t.ok ? ' right' : ' wrong') : ''}`} onClick={() => setThesis(i)}><span className="opt-letter">{'ABC'[i]}</span>{t.text}</button>)}
      {thesis != null && <p className="why"><strong>{leq.theses[thesis].ok ? 'Yes.' : 'Not quite.'}</strong> {leq.theses[thesis].why}</p>}
    </div>
    <div className="leq-step"><h4>2. Write 2–3 sentences of context</h4>
      <p className="muted">{leq.contextHint ?? 'What was happening before this period that matters for the question?'}</p>
      <textarea rows={3} value={context} onChange={e => setContext(e.target.value)} placeholder={leq.contextStart ?? 'Before this period…'} />
      <button className="btn ghost" onClick={() => setShowContext(!showContext)}>{showContext ? 'Hide' : 'Compare with a model'}</button>
      {showContext && <p className="why">{leq.context}</p>}
    </div>
    <div className="leq-step"><h4>3. Sort the evidence: {sides.join(' or ')}?</h4>
      <div className="ev-list">{leq.evidence.map((e, i) => <div key={e.text} className={`ev${checkedEv ? (sorted[i] === e.side ? ' right' : ' wrong') : ''}`}>
        <span>{e.text}</span>
        <div className="ev-btns">{sides.map(side => <button key={side} aria-pressed={sorted[i] === side} onClick={() => { setCheckedEv(false); setSorted({ ...sorted, [i]: side }) }}>{side}</button>)}</div>
      </div>)}</div>
      <div className="mcq-ctl">{checkedEv ? <span className="score">{evRight} / {leq.evidence.length} sorted correctly</span> : <button className="btn accent" disabled={Object.keys(sorted).length < leq.evidence.length} onClick={() => setCheckedEv(true)}>Check sorting</button>}</div>
    </div>
    <div className="leq-step"><h4>4. Add complexity</h4><p>{leq.complexity}</p></div>
  </div>
}

// Exit ticket: quick recall, answers hidden until asked.
export function Recall({ items }) {
  const [open, setOpen] = useState([])
  return <ol className="recall">{items.map((r, i) => <li key={r.q}><span>{r.q}</span>
    {open.includes(i) ? <strong>{r.a}</strong> : <button className="btn ghost" onClick={() => setOpen([...open, i])}>Show</button>}</li>)}</ol>
}
