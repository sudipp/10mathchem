import { Fragment, useMemo } from 'react'
import katex from 'katex'

export function TeX({ math, block = false }) {
  const html = useMemo(() => katex.renderToString(math, { throwOnError: false, displayMode: block }), [math, block])
  return <span className={block ? 'tex-block' : 'tex'} dangerouslySetInnerHTML={{ __html: html }} />
}

function withMath(text) {
  return text.split(/(\$[^$]+\$)/g).map((part, i) =>
    part.startsWith('$') && part.endsWith('$') && part.length > 1 ? <TeX key={i} math={part.slice(1, -1)} /> : <Fragment key={i}>{part}</Fragment>)
}

// Renders text with $inline LaTeX$ and **bold** segments.
export function Rich({ text }) {
  return <>{text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{withMath(part.slice(2, -2))}</strong> : <Fragment key={i}>{withMath(part)}</Fragment>)}</>
}
