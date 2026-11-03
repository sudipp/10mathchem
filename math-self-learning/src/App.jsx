import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, ExternalLink, FlaskConical, Layers, Sigma } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HomeworkPage from './Homework.jsx'
import { minutes } from './format.js'
import { AnimationPlayer, Button, LessonVideo, Quiz, Video } from './Lesson.jsx'
import { Rich } from './TeX.jsx'
import { UNITS, findUnit, videoSeconds } from './units/index.js'

gsap.registerPlugin(ScrollTrigger)

const LEGACY_UNIT = 'unit-4'
const LEGACY_SECTIONS = ['home', 'lessons', 'day', 'resources']

// Routes: #/ (all units) · #/unit-4[/section] · #/unit-4/homework/hw3.
// Links from before units existed (#lessons, #/homework/hw3) go to Unit 4.
function parseHash() {
  const h = window.location.hash.replace(/^#/, '')
  if (!h.startsWith('/')) {
    if (LEGACY_SECTIONS.includes(h)) return { page: 'unit', unit: findUnit(LEGACY_UNIT), section: h === 'home' ? null : h, legacy: true }
    return { page: 'units' }
  }
  const [first, second, third] = h.slice(1).split('/').filter(Boolean)
  if (first === 'homework') return { page: 'homework', unit: findUnit(LEGACY_UNIT), tab: second, legacy: true }
  const unit = findUnit(first)
  if (!unit) return { page: 'units' }
  if (second === 'homework') return { page: 'homework', unit, tab: third }
  return { page: 'unit', unit, section: second ?? null }
}

const hashFor = r => r.page === 'units' ? '#/' : r.page === 'homework' ? `#/${r.unit.slug}/homework/${r.tab ?? r.unit.homework[0].id}` : `#/${r.unit.slug}${r.section ? `/${r.section}` : ''}`
const scrollToId = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// A hash link that still scrolls when the address already matches it.
function SectionLink({ href, section, children, ...props }) {
  return <a href={href} onClick={e => { if (window.location.hash === href) { e.preventDefault(); scrollToId(section) } }} {...props}>{children}</a>
}

function UnitsHome() {
  return <main>
    <section id="home" className="hero math-hero units-hero">
      <div className="hero-content">
        <div className="eyebrow hero-reveal"><span className="status-dot" /> {UNITS[0].course.toUpperCase()}</div>
        <h1 className="hero-reveal">Math,<br /><em>one unit at a time.</em></h1>
        <p className="hero-reveal">Short video lessons, step-by-step animations,<br />and homework help for every unit.</p>
        <button className="hero-link hero-reveal" onClick={() => scrollToId('units')}>Choose a unit <ArrowDown size={18} /></button>
      </div>
    </section>
    <section id="units" className="units-section">
      <div className="lesson-header"><div><span className="eyebrow">YOUR UNITS</span><h2>Pick a unit. <em>Start small.</em></h2></div></div>
      <div className="unit-grid">
        {UNITS.map(u => <a key={u.slug} className="unit-card" href={`#/${u.slug}`}>
          <span className="unit-num">UNIT {u.number}</span>
          <h3>{u.title}</h3>
          <p>{u.summary}</p>
          <div className="unit-meta">
            <span>{u.lessons.length} lessons</span>
            {videoSeconds(u) > 0 && <span>{Math.round(videoSeconds(u) / 60)} min of video</span>}
            <span>{u.homework.filter(h => h.id !== 'notes').length} homework sets</span>
          </div>
          <span className="text-link">Open Unit {u.number} <ArrowRight size={15} /></span>
        </a>)}
        <div className="unit-card soon" aria-label="More units coming soon">
          <span className="unit-num">MORE UNITS</span>
          <h3>Coming soon</h3>
          <p>New units will appear here as they are added, each with its own videos, lessons, and homework help.</p>
        </div>
      </div>
    </section>
  </main>
}

function UnitPage({ unit, active, setActive, completed, markDone, openLesson }) {
  const lessons = unit.lessons, lesson = lessons[active], count = lessons.length
  const L = section => `#/${unit.slug}/${section}`
  const H = id => `#/${unit.slug}/homework/${id}`
  const hwFor = unit.hwFor[active]
  const total = videoSeconds(unit)
  return <main>
    <section id="home" className="hero math-hero">
      <div className="hero-content">
        <div className="eyebrow hero-reveal"><span className="status-dot" /> UNIT {unit.number} · {unit.title.toUpperCase()}</div>
        <h1 className="hero-reveal">{unit.hero.title}<br /><em>{unit.hero.em}</em></h1>
        <p className="hero-reveal">{unit.hero.text}<br />{unit.hero.sub}</p>
        <SectionLink className="hero-link hero-reveal" href={L('lessons')} section="lessons">Start your first lesson <ArrowDown size={18} /></SectionLink>
        <div className="hero-meta hero-reveal">{String(count).padStart(2, '0')} VIDEO LESSONS {total > 0 && <><span> / </span> ABOUT {Math.round(total / 60)} MINUTES OF VIDEO</>} <span> / </span> HOMEWORK HELP</div>
      </div>
      <span className="hero-side">{unit.hero.side}</span>
    </section>

    <section className="intro-section reveal">
      <div><span className="eyebrow">{unit.course.toUpperCase()} · UNIT {unit.number}</span><h2>See it. Try it.<br /><em>Check it.</em></h2></div>
      <div className="intro-copy"><p>Each lesson follows your class notes, step by step. Watch the short video, try a quick question, then use homework help to check your work.</p><div className="learning-path"><span>01 Watch the video</span><ArrowRight size={14} /><span>02 Try one yourself</span><ArrowRight size={14} /><span>03 Check your homework</span></div></div>
    </section>

    {unit.dayPlan && <section id="day" className="day-plan reveal">
      <div className="day-head"><span className="eyebrow">{unit.dayPlan.title.toUpperCase()}</span><h2>{['One', 'Two', 'Three', 'Four', 'Five', 'Six'][unit.dayPlan.sessions.length - 1] ?? unit.dayPlan.sessions.length} sessions. <em>One unit.</em></h2><p>Watch the videos in order, practise after each session, and take a real break in between. Short sessions keep your focus sharp.</p></div>
      <div className={`day-sessions n${unit.dayPlan.sessions.length}`}>{unit.dayPlan.sessions.map((s, k) => {
        const secs = s.lessons.reduce((a, i) => a + (unit.videos[unit.videoIds[i]]?.seconds ?? 0), 0)
        return <div key={s.name} className="day-card">
          <span className="eyebrow">{s.name.toUpperCase()}{secs > 0 && ` · ${Math.round(secs / 60)} MIN OF VIDEO`}</span>
          <h3>{s.title}</h3>
          <ol>{s.lessons.map(i => { const v = unit.videos[unit.videoIds[i]]; return <li key={i}><button className="as-button day-lesson" onClick={() => openLesson(i)}><span>{String(i + 1).padStart(2, '0')}</span>{lessons[i].title}{v && <small>{minutes(v.seconds)}</small>}</button></li> })}</ol>
          <div className="day-practice">Then practise: {s.hw.map(h => <a key={h} href={H(h)}>{h.replace('hw', 'HW #')}</a>)}</div>
          {k < unit.dayPlan.sessions.length - 1 && <span className="day-break">Take a 10-minute break</span>}
        </div>
      })}</div>
    </section>}

    <section id="lessons" className="lesson-section">
      <div className="lesson-header"><div><span className="eyebrow">YOUR LEARNING PATH · UNIT {unit.number}</span><h2>{unit.path.title} <em>{unit.path.em}</em></h2></div><div className="progress-summary"><span>{completed.length} / {count} checks passed</span><progress max={count} value={completed.length} aria-label="Lesson checks passed" /><small>Progress lasts for this visit.</small></div></div>
      <div className="lesson-layout">
        <aside className="lesson-nav"><span className="eyebrow">{count} LESSONS</span>
          <div role="tablist" aria-label={`Unit ${unit.number} lessons`} aria-orientation="vertical">{lessons.map((item, i) => <button key={item.short} role="tab" id={`tab-${i}`} aria-controls="lesson-panel" aria-selected={active === i} tabIndex={active === i ? 0 : -1} className={`lesson-tab ${active === i ? 'active' : ''}`} onClick={() => setActive(i)} onKeyDown={e => {
            const keys = { ArrowDown: (i + 1) % count, ArrowUp: (i + count - 1) % count, Home: 0, End: count - 1 }
            if (Object.hasOwn(keys, e.key)) { e.preventDefault(); setActive(keys[e.key]); document.getElementById(`tab-${keys[e.key]}`).focus() }
          }}><span className="lesson-number">{completed.includes(i) ? <Check size={16} /> : String(i + 1).padStart(2, '0')}</span><span>{item.short}</span><ChevronRight size={15} /></button>)}</div>
          <div className="sidebar-note"><BookOpen size={22} /><p>Stuck on a step?<br />Go back one and replay it.<br /><strong>Slow is smooth. Smooth is fast.</strong></p></div>
        </aside>
        <article id="lesson-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0}>
          <div className="lesson-title"><span className="eyebrow">LESSON {String(active + 1).padStart(2, '0')} <span className="separator">/</span> {lesson.tag}</span><h2>{lesson.title}</h2><p className="lesson-intro"><Rich text={lesson.intro} /></p></div>
          <LessonVideo key={`lesson-video-${unit.slug}-${active}`} unit={unit} index={active} title={lesson.title} />
          <AnimationPlayer key={`animation-${unit.slug}-${active}`} lesson={lesson} />
          <div className="reading">{lesson.points.map(([title, text], i) => <section key={title}><span className="reading-number">0{i + 1}</span><div><h3>{title}</h3><p><Rich text={text} /></p></div></section>)}</div>
          <Quiz key={`quiz-${unit.slug}-${active}`} lesson={lesson} completed={completed.includes(active)} onComplete={() => markDone(active)} />
          {hwFor && <a className="table-callout" href={H(hwFor)}><div><span className="eyebrow">PRACTICE</span><h3>{hwFor.replace('hw', 'HW #')} help</h3><p>Work through the homework with step-by-step solutions you reveal when you are ready.</p></div><ArrowRight size={22} /></a>}
          {lesson.video && <Video key={`video-${unit.slug}-${active}`} lesson={lesson} />}
          <div className="lesson-bottom"><Button disabled={active === 0} onClick={() => setActive(active - 1)}><ChevronLeft size={17} /> Previous lesson</Button><Button className="primary" disabled={active === count - 1} onClick={() => setActive(active + 1)}>Next lesson <ChevronRight size={17} /></Button></div>
        </article>
      </div>
    </section>

    <section className="manifesto reveal"><span className="eyebrow">LESS GUESSING. MORE UNDERSTANDING.</span><p>Math is not about being fast.<br />It is about knowing <em>the next step.</em></p><span>Replay an animation. Rewatch a video. Try the problem again.</span></section>
    {unit.shelf && <section id="resources" className="resources reveal">
      <div><span className="eyebrow">KEEP A TEACHER CLOSE</span><h2>Your video <em>bookshelf.</em></h2><p>More explanations for Unit {unit.number}, in lesson order, mostly from Khan Academy. All are hosted on YouTube.</p></div>
      <a className="resource featured-resource" href={H(unit.homework[0].id)}><span className="eyebrow">HOMEWORK HELP</span><h3>{unit.homework.filter(h => h.id !== 'notes').map(h => h.title).join(', ')}{unit.homework.some(h => h.id === 'notes') && ', plus class notes'}</h3><p>Every problem, solved step by step and checked against your answer keys.</p><span className="text-link">Open homework help <ArrowRight size={16} /></span></a>
      <div className="resource-links">{(() => { let n = 0; return unit.shelf.map((group, i) => <div key={i} className="shelf-group">
        <span className="eyebrow shelf-lesson">LESSON {String(i + 1).padStart(2, '0')} · {lessons[i].title.toUpperCase()}</span>
        {group.map(([id, title, creator]) => { n++; return <a key={id} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer"><span className="shelf-num">{String(n).padStart(2, '0')}</span><div><strong>{title}</strong><span>{creator ?? 'Khan Academy'}</span></div><ExternalLink size={18} /></a> })}
      </div>) })()}</div>
    </section>}
    <section className="get-started reveal"><Sigma size={36} /><h2>One step is <em>still progress.</em></h2><p>Go back to the basics whenever you need. Everything else is built on them.</p><button className="hero-link" onClick={() => openLesson(0)}>Back to lesson one <ArrowRight size={18} /></button></section>
  </main>
}

export default function App() {
  const [route, setRoute] = useState(parseHash)
  const [activeBy, setActiveBy] = useState({})
  const [doneBy, setDoneBy] = useState({})
  const [scrolled, setScrolled] = useState(false)
  const root = useRef(null)
  const unit = route.unit
  const slug = unit?.slug
  const viewKey = `${route.page}:${slug ?? ''}`

  useEffect(() => {
    const sync = () => {
      const next = parseHash()
      if (next.legacy) window.history.replaceState(null, '', hashFor(next))
      setRoute(next)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    document.title = unit ? `Unit ${unit.number}: ${unit.title} · Self Learning Math` : 'Self Learning · Math'
  }, [unit])

  useEffect(() => {
    if (route.page === 'unit' && route.section) document.getElementById(route.section)?.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route])

  useEffect(() => {
    const hero = document.getElementById('home')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0.2 })
    observer.observe(hero)
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.hero-reveal', { y: 40, opacity: 0, stagger: 0.08, duration: 1.1, ease: 'power3.out' })
      gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 25, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true }, clearProps: 'all' }))
    }, root)
    return () => { observer.disconnect(); ctx.revert() }
  }, [viewKey])

  const active = activeBy[slug] ?? 0
  const setActive = i => setActiveBy(prev => ({ ...prev, [slug]: i }))
  const openLesson = i => {
    setActive(i)
    const target = `#/${slug}/lessons`
    if (window.location.hash === target) scrollToId('lessons')
    else window.location.assign(target)
  }
  const L = section => `#/${slug}/${section}`

  return <div ref={root}>
    <a className="skip-link" href={unit ? L('lessons') : '#/'}>{unit ? 'Skip to lessons' : 'Skip to units'}</a>
    <header className={`navbar ${scrolled || route.page === 'homework' ? 'scrolled' : ''}`}>
      <a href="#/" className="brand"><Sigma size={25} />Self Learning<span className="brand-dot">.</span></a>
      <nav aria-label="Main navigation">
        <a href="#/" className="nav-units" aria-current={route.page === 'units' ? 'page' : undefined}><Layers size={15} /> <span className="nav-long">All units</span><span className="nav-short">Units</span></a>
        {unit && <>
          <SectionLink href={L('lessons')} section="lessons">Unit {unit.number}</SectionLink>
          <a href={`#/${slug}/homework/${unit.homework[0].id}`} aria-current={route.page === 'homework' ? 'page' : undefined}><span className="nav-long">Homework help</span><span className="nav-short">Homework</span></a>
          {unit.shelf && <SectionLink href={L('resources')} section="resources">Videos</SectionLink>}
        </>}
        <a href="/chemistry/#lessons" className="nav-switch"><FlaskConical size={15} /> Chemistry</a>
      </nav>
      {unit
        ? <SectionLink className="nav-cta" href={L('lessons')} section="lessons">Start learning <ArrowRight size={15} /></SectionLink>
        : <button className="nav-cta" onClick={() => scrollToId('units')}>Choose a unit <ArrowRight size={15} /></button>}
    </header>

    {route.page === 'units' && <UnitsHome />}
    {route.page === 'unit' && <UnitPage unit={unit} active={active} setActive={setActive} completed={doneBy[slug] ?? []} markDone={i => setDoneBy(prev => ({ ...prev, [slug]: (prev[slug] ?? []).includes(i) ? prev[slug] : [...(prev[slug] ?? []), i] }))} openLesson={openLesson} />}
    {route.page === 'homework' && <HomeworkPage key={`${slug}-${route.tab}`} unit={unit} tab={route.tab} openLesson={openLesson} />}

    <footer><div><a href="#/" className="brand"><Sigma />Self Learning.</a><p>A little clearer, one step at a time.</p></div><div className="footer-links"><a href="#/">All math units</a>{unit && <><a href={L('lessons')}>Unit {unit.number} lessons</a><a href={`#/${slug}/homework/${unit.homework[0].id}`}>Unit {unit.number} homework help</a></>}<a href="/chemistry/#lessons">Chemistry site</a><span><span className="status-dot" /> Free to explore · No account needed</span></div><small>Independent learning resource. Lesson videos, animations, and worked solutions are original. Not affiliated with Khan Academy; their videos remain with them. Homework problems are from your class worksheets.</small></footer>
  </div>
}
