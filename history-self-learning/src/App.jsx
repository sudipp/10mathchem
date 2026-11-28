import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, Check, Clock, Compass, Landmark, Map as MapIcon, Play, Sigma, Atom } from 'lucide-react'
import MapPlayer from './MapPlayer.jsx'
import Timeline from './Timeline.jsx'
import { Chain, Flashcards, LeqBuilder, McqSet, Recall, Saq, YouTube } from './Bits.jsx'
import { CHAPTERS, DAY_STEPS, chapterBy, useStored } from './shared.js'
import { chapterVideo, minutes } from './narrated.js'

function useRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '')
  const [route, setRoute] = useState(read)
  useEffect(() => { const on = () => setRoute(read()); window.addEventListener('hashchange', on); return () => window.removeEventListener('hashchange', on) }, [])
  return route
}

export default function App() {
  const route = useRoute()
  const m = /^chapter\/(\d+)/.exec(route)
  const chapter = m ? chapterBy(m[1]) : null
  const isTimeline = route.startsWith('timeline')
  useEffect(() => { window.scrollTo(0, 0) }, [route])
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="nav">
      <a href="#/" className="brand"><Landmark size={22} />Self Learning<span>.</span></a>
      <nav aria-label="Main">
        <a href="#/" aria-current={!chapter && !isTimeline ? 'page' : undefined}>Chapters</a>
        <a href="#/timeline" aria-current={isTimeline ? 'page' : undefined}>Timeline</a>
        <a href="/chemistry/" className="nav-switch"><Atom size={14} /> Chemistry</a>
        <a href="/math/" className="nav-switch"><Sigma size={14} /> Math</a>
      </nav>
    </header>
    <main id="main">{chapter ? <ChapterPage key={chapter.n} ch={chapter} /> : isTimeline ? <TimelinePage /> : <Home />}</main>
    <footer><p><strong>Self Learning · World History.</strong> Original explanations and maps; primary sources are public-domain translations. Map data: Natural Earth. Videos remain with their creators.</p><p>Progress is saved on this device only.</p></footer>
  </>
}

function Home() {
  const next = CHAPTERS[0]
  return <>
    <section className="hero">
      <span className="eyebrow">AP WORLD HISTORY · SELF LEARNING</span>
      <h1>World history,<br /><em>one chapter a day.</em></h1>
      <p>About an hour a day: a big question, a timeline, an animated map, a short lesson, and AP-style practice with answers.</p>
      <a className="btn accent big" href={`#/chapter/${next.n}`}>Start today’s chapter <ArrowRight size={17} /></a>
    </section>
    <section className="wrap">
      <h2 className="sec-title">Chapters</h2>
      <div className="chapter-grid">{CHAPTERS.map(c => <ChapterCard key={c.n} ch={c} />)}
        <div className="chapter-card soon"><span className="eyebrow">NEXT CHAPTERS</span><h3>Coming as they are assigned</h3><p className="muted">Each new chapter gets the same daily plan, map, timeline and practice.</p></div>
      </div>
      <h2 className="sec-title">How a day works</h2>
      <ol className="day-plan">{DAY_STEPS.map((s, i) => <li key={s.id}><span className="num">{i + 1}</span><div><strong>{s.label}</strong><span className="muted"> · {s.mins} min</span><p>{s.note}</p></div></li>)}</ol>
      <div className="tip"><Compass size={20} /><p><strong>Teacher tip:</strong> the next day, start with the five “exit ticket” questions from the chapter before. Remembering yesterday’s lesson is what makes it stick.</p></div>
    </section>
  </>
}

function ChapterCard({ ch }) {
  const [done] = useStored(`hist-done-${ch.n}`, [])
  return <a className="chapter-card" href={`#/chapter/${ch.n}`}>
    <span className="eyebrow">CHAPTER {ch.n} · {ch.era}</span><h3>{ch.title}</h3><p className="muted">{ch.question}</p>
    <div className="progress"><progress max={DAY_STEPS.length} value={done.length} aria-label="Steps done" /><span>{done.length} / {DAY_STEPS.length} steps</span></div>
  </a>
}

function TimelinePage() {
  const events = CHAPTERS.flatMap(c => c.timeline)
  return <section className="wrap"><span className="eyebrow">ALL CHAPTERS SO FAR</span><h1 className="page-title">Master timeline</h1>
    <p className="muted">Every chapter adds its events here, so you can see how the eras connect.</p><Timeline events={events} /></section>
}

function ChapterPage({ ch }) {
  const [done, setDone] = useStored(`hist-done-${ch.n}`, [])
  const [mapStep, setMapStep] = useState(0)
  const toggle = id => setDone(done.includes(id) ? done.filter(d => d !== id) : [...done, id])
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const video = chapterVideo(ch.n)
  const showMap = step => { setMapStep(step); go('map') }
  const doneBtn = id => <button className={`done-btn${done.includes(id) ? ' on' : ''}`} onClick={() => toggle(id)}>{done.includes(id) ? <><Check size={15} /> Done</> : 'Mark this step done'}</button>
  const total = DAY_STEPS.reduce((s, x) => s + x.mins, 0)

  return <>
    <section className="ch-hero">
      <span className="eyebrow">CHAPTER {ch.n} · {ch.part} · {ch.era}</span>
      <h1>{ch.title}</h1>
      <p className="big-q">{ch.question}</p>
      <div className="steps-nav" role="navigation" aria-label="Today’s plan">
        {DAY_STEPS.map((s, i) => <button key={s.id} className={done.includes(s.id) ? 'on' : ''} onClick={() => go(s.id)}><span className="num">{done.includes(s.id) ? <Check size={13} /> : i + 1}</span>{s.label}<small>{s.mins}m</small></button>)}
        <span className="steps-total"><Clock size={14} /> about {total} minutes · {done.length}/{DAY_STEPS.length} done</span>
      </div>
    </section>

    <section id="big" className="wrap step">
      <StepHead n={1} title="The big picture" mins={5} />
      <div className="two">
        <div><p className="hook">{ch.hook}</p>
          <h4>Four big ideas to carry with you</h4><ol className="big-ideas">{ch.bigIdeas.map(b => <li key={b}>{b}</li>)}</ol>
          <div className="ap-note"><BookOpen size={18} /><p>{ch.apNote}</p></div></div>
        <div>{video ? <div className="narrated"><span className="eyebrow">WATCH THE LESSON · {minutes(video.seconds)}</span>
          <video controls playsInline preload="metadata" poster={`${video.base}.jpg`}><source src={`${video.base}.mp4`} type="video/mp4" /><source src={`${video.base}.webm`} type="video/webm" /></video>
          <p className="muted">Narrated with captions. Pause at each “Your turn.”</p></div> : null}
          <YouTube id="oPf27gAup9U" title="The Roman Empire. Or Republic. Or… Which Was It?" creator="CrashCourse" /></div>
      </div>
      {doneBtn('big')}
    </section>

    <section id="timeline" className="wrap step">
      <StepHead n={2} title="Timeline" mins={5} sub="Read it left to right. The purple lane shows what was happening elsewhere at the same time." />
      <Timeline events={ch.timeline} />
      {doneBtn('timeline')}
    </section>

    <section id="map" className="wrap step">
      <StepHead n={3} title="The map" mins={5} sub="Press Play all, or step through. Watch how Rome grows from one city to an empire around the whole Mediterranean." />
      <MapPlayer step={mapStep} setStep={setMapStep} />
      {doneBtn('map')}
    </section>

    <section id="lesson" className="wrap step">
      <StepHead n={4} title="The lesson" mins={20} sub={`${ch.sections.length} short sections. Read, then click through each cause → effect chain.`} />
      <div className="section-index">{ch.sections.map((s, i) => <button key={s.id} onClick={() => go(`sec-${s.id}`)}><span>{i + 1}</span>{s.title}</button>)}</div>
      {ch.sections.map((s, i) => <article key={s.id} id={`sec-${s.id}`} className="lesson-sec">
        <header><span className="sec-num">{String(i + 1).padStart(2, '0')}</span><div><span className="eyebrow">{s.when} · {s.theme.toUpperCase()}</span><h3>{s.title}</h3></div></header>
        <p className="lead">{s.lead}</p>
        {s.body.map(p => <p key={p}>{p}</p>)}
        <ul className="facts">{s.facts.map(f => <li key={f}>{f}</li>)}</ul>
        <div className="chain-box"><span className="eyebrow">CAUSE → EFFECT</span><Chain links={s.chain} /></div>
        <div className="so-what"><strong>So what?</strong> {s.soWhat}</div>
        {s.factCheck && <div className="fact-check"><strong>Fact check:</strong> {s.factCheck}</div>}
        <div className="sec-actions">
          {s.map != null && <button className="btn ghost" onClick={() => showMap(s.map)}><MapIcon size={15} /> Show on the map</button>}
          {s.video && <details className="sec-video"><summary><Play size={14} /> Watch: {s.video[1]} ({s.video[2]})</summary><YouTube id={s.video[0]} title={s.video[1]} creator={s.video[2]} compact /></details>}
        </div>
      </article>)}
      {doneBtn('lesson')}
    </section>

    <section id="compare" className="wrap step">
      <StepHead n={5} title="Compare & key terms" mins={10} sub="AP questions love comparisons. Then flip through the terms until every card is “got it.”" />
      {ch.compare.map(t => <div key={t.title} className="compare"><h4>{t.title}</h4><div className="table-scroll"><table><thead><tr>{t.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{t.rows.map(r => <tr key={r[0]}>{r.map((c, j) => j ? <td key={j}>{c}</td> : <th key={j} scope="row">{c}</th>)}</tr>)}</tbody></table></div></div>)}
      <h4 className="terms-title">Key terms ({ch.terms.length})</h4>
      <Flashcards terms={ch.terms} storeKey={`hist-known-${ch.n}`} />
      {doneBtn('compare')}
    </section>

    <section id="practice" className="wrap step">
      <StepHead n={6} title="AP practice" mins={15} sub="Read each source closely: who wrote it, when, and why? Then answer." />
      <h4 className="prac-title">Multiple choice with sources</h4>
      {ch.mcq.map((set, i) => <McqSet key={set.source.cite} set={set} index={i} />)}
      <h4 className="prac-title">Short answer</h4>
      {ch.saq.map((q, i) => <Saq key={q.parts[0]} saq={q} index={i} />)}
      <h4 className="prac-title">Long essay outline</h4>
      <LeqBuilder leq={ch.leq} />
      <h4 className="prac-title">Exit ticket</h4>
      <p className="muted">Answer from memory, then check. Try these again tomorrow before the next chapter.</p>
      <Recall items={ch.recall} />
      {doneBtn('practice')}
    </section>
  </>
}

function StepHead({ n, title, mins, sub }) {
  return <div className="step-head"><span className="step-n">{n}</span><div><span className="eyebrow">STEP {n} · ABOUT {mins} MIN</span><h2>{title}</h2>{sub && <p className="muted">{sub}</p>}</div></div>
}
