import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface WordsPullUpProps {
  text: string
  className?: string
  delay?: number
}

export default function WordsPullUp({ text, className = '', delay = 0 }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-[0.22em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.08 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
