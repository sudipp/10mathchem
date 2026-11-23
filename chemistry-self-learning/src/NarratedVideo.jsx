import { Play } from 'lucide-react'
import { minutes, videoInfo } from './narrated.js'

// A narrated, captioned lesson video hosted with the site (no YouTube needed).
export default function NarratedVideo({ path, title, review = false }) {
  const info = videoInfo(path)
  if (!info) return null
  return <section className="video-card lesson-video">
    <div className="section-label"><Play size={16} /><span className="eyebrow">{review ? 'EXAM REVIEW VIDEO' : 'WATCH THE LESSON'} · {minutes(info.seconds)}</span></div>
    <h3>{title}</h3>
    <p className="muted">Narrated, with captions. Follows your class notes and worksheets.</p>
    <div className="video-frame">
      <video key={path} controls playsInline preload="metadata" poster={`${info.base}.jpg`} aria-label={`Video: ${title}`}>
        <source src={`${info.base}.mp4`} type={'video/mp4; codecs="avc1.640028, mp4a.40.2"'} />
        <source src={`${info.base}.webm`} type={'video/webm; codecs="vp9, opus"'} />
      </video>
    </div>
    <p><strong>Tip:</strong> when the “Your turn” timer appears, pause the video and solve it on paper first.</p>
  </section>
}
