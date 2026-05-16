import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef, CSSProperties } from 'react'

function Letter({ char, index, total, scrollYProgress }: { char: string; index: number; total: number; scrollYProgress: MotionValue<number> }) {
  const charProgress = index / total
  const opacity = useTransform(scrollYProgress, [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)], [0.18, 1])
  return <motion.span style={{ opacity }} className="inline whitespace-pre">{char}</motion.span>
}

interface ScrollRevealTextProps { text: string; className?: string; style?: CSSProperties }

export default function ScrollRevealText({ text, className = '', style }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.15'] })
  const chars = Array.from(text)
  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => <Letter key={i} char={char} index={i} total={chars.length} scrollYProgress={scrollYProgress} />)}
    </p>
  )
}
