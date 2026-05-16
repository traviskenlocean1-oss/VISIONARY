import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Segment { text: string; className?: string }
interface Props { segments: Segment[]; wrapperClassName?: string; delay?: number }

export default function WordsPullUpMultiStyle({ segments, wrapperClassName = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })
  const allWords = segments.flatMap((seg) => seg.text.split(' ').map((word) => ({ word, className: seg.className ?? '' })))

  return (
    <div ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-0 justify-center ${wrapperClassName}`}>
      {allWords.map(({ word, className }, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: '115%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.065 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
