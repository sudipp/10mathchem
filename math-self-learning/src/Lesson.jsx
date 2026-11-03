// Shared lesson building blocks used by every unit.
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, ChevronLeft, ChevronRight, ExternalLink, Pause, Play, RotateCcw } from 'lucide-react'
import gsap from 'gsap'
import { minutes } from './format.js'
import { Rich } from './TeX.jsx'
export function Button({ children, className = '', ...props }) {
  return <button className={`button ${className}`} {...props}><span className="button-wash" aria-hidden="true" /><span className="button-label">{children}</span></button>
}

export function AnimationPlayer({ lesson }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const ref = useRef(null)
  const steps = lesson.steps
  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setStep(s => { if (s >= steps.length - 1) { setPlaying(false); return s } return s + 1 }), 4500)
    return () => clearInterval(timer)
  }, [playing, steps.length])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = ref.current?.querySelectorAll('.new, .math-line.current, .sf-slot.filled')
    if (!targets?.length) return
    const tween = gsap.from(targets, { opacity: 0, y: 6, duration: 0.45, ease: 'power2.out' })
    return () => tween.revert()
  }, [step])
  const move = next => { setPlaying(false); setStep(next) }
  return <div className="animation-player" ref={ref}>
    <div className="player-top"><span className="eyebrow">REPLAY THE STEPS · AT YOUR OWN PACE</span><span className="mono">STEP {step + 1} / {steps.length}</span></div>
    <div className="drawing">{lesson.visual(step)}</div>
    <div className="step-caption" aria-live="polite"><Rich text={steps[step]} /></div>
    <div className="player-controls">
      <Button className="icon-button" aria-label="Restart animation" onClick={() => move(0)}><RotateCcw size={17} /></Button>
      <Button className="icon-button" aria-label="Previous step" disabled={step === 0} onClick={() => move(step - 1)}><ChevronLeft size={20} /></Button>
      <Button className="accent" onClick={() => { if (step === steps.length - 1) setStep(0); setPlaying(!playing) }}>{playing ? <Pause size={16} /> : <Play size={16} />}{playing ? 'Pause' : 'Play steps'}</Button>
      <Button className="icon-button" aria-label="Next step" disabled={step === steps.length - 1} onClick={() => move(step + 1)}><ChevronRight size={20} /></Button>
    </div>
  </div>
}

export function LessonVideo({ unit, index, title }) {
  const id = unit.videoIds?.[index]
  const info = unit.videos?.[id]
  if (!info) return null
  const base = `${import.meta.env.BASE_URL}videos/${unit.slug}/${id}`
  return <section className="video-card lesson-video">
    <div className="section-label"><Play size={16} /><span className="eyebrow">WATCH THE LESSON · {minutes(info.seconds)}</span></div>
    <h3>{title}</h3>
    <p className="muted">Narrated, with captions. Follows your class notes.</p>
    <div className="video-frame">
      <video key={id} controls playsInline preload="metadata" poster={`${base}.jpg`} aria-label={`Video lesson: ${title}`}>
        <source src={`${base}.mp4`} type={'video/mp4; codecs="avc1.640028, mp4a.40.2"'} />
        <source src={`${base}.webm`} type={'video/webm; codecs="vp9, opus"'} />
      </video>
    </div>
    <p><strong>Tip:</strong> when the “Your turn” timer appears, pause the video and solve it on paper first.</p>
  </section>
}


export function Video({ lesson }) {
  const [loaded, setLoaded] = useState(false)
  return <section className="video-card">
    <div className="section-label"><Play size={16} /><span className="eyebrow">ANOTHER EXPLANATION · KHAN ACADEMY</span></div>
    <h3>{lesson.videoTitle}</h3>
    <p className="muted">Khan Academy · YouTube</p>
    <div className="video-frame">
      {loaded ? <iframe title={lesson.videoTitle} src={`https://www.youtube-nocookie.com/embed/${lesson.video}?rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
        <Button className="accent" onClick={() => setLoaded(true)}><Play size={18} /> Load video</Button>}
    </div>
    <p><strong>While watching:</strong> {lesson.watch}</p>
    <a className="text-link" href={`https://www.youtube.com/watch?v=${lesson.video}`} target="_blank" rel="noreferrer">Watch on YouTube <ExternalLink size={14} /></a>
    {lesson.more?.length > 0 && <div className="more-videos"><span className="eyebrow">{lesson.more.every(m => !m[2]) ? 'MORE FROM KHAN ACADEMY' : 'MORE VIDEOS'}</span>{lesson.more.map(([id, title, creator]) => <a key={id} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">{title}{lesson.more.some(m => m[2]) && <span className="muted"> · {creator ?? 'Khan Academy'}</span>} <ExternalLink size={13} /></a>)}</div>}
    <small>Videos need an internet connection and may be restricted on some networks. If the player does not load, use the direct link.</small>
  </section>
}

export function Quiz({ lesson, onComplete, completed }) {
  const [answer, setAnswer] = useState(null)
  const [checked, setChecked] = useState(false)
  const correct = answer === lesson.correct
  return <section className="quiz">
    <span className="eyebrow">CHECK YOUR UNDERSTANDING</span>
    <h3><Rich text={lesson.question} /></h3>
    <div className="answers" role="group" aria-label="Answer choices">{lesson.options.map((option, i) =>
      <button key={option} className={`answer ${answer === i ? 'chosen' : ''}`} aria-pressed={answer === i} onClick={() => { setAnswer(i); setChecked(false) }}><span>{String.fromCharCode(65 + i)}</span><Rich text={option} /></button>)}</div>
    <Button className="primary" disabled={answer === null} onClick={() => { setChecked(true); if (correct) onComplete() }}>Check answer <ArrowRight size={16} /></Button>
    {checked && <p className={`feedback ${correct ? 'correct' : ''}`} role="status"><strong>{correct ? 'Exactly right. ' : 'Not quite — try again. '}</strong><Rich text={lesson.explanation} /></p>}
    {completed && <p className="completed"><Check size={16} /> Lesson check passed</p>}
  </section>
}
