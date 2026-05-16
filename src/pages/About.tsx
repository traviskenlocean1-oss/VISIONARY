import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import WordsPullUp from '../components/WordsPullUp'
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle'
import ScrollRevealText from '../components/ScrollRevealText'

function PageIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

const values = [
  {
    num: '01',
    title: 'Honesty first.',
    desc: 'We don\'t make claims we can\'t back up. No inflated portfolios, no fake credentials. Just real work that speaks for itself.',
  },
  {
    num: '02',
    title: 'You own everything.',
    desc: 'Once a project is delivered, it\'s yours — files, domain, code. No subscriptions, no lock-in, no excuses.',
  },
  {
    num: '03',
    title: 'Built to convert.',
    desc: 'Design that looks great is table stakes. We build sites that actually get people to call, book, and buy.',
  },
  {
    num: '04',
    title: 'Fast and accountable.',
    desc: 'We move quickly, communicate clearly, and deliver on what we say. No chasing, no ghosting.',
  },
]

export default function About() {
  return (
    <PageIn>
      <section className="pt-[100px] pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <p
          className="text-[10px] tracking-[0.32em] uppercase mb-5"
          style={{ color: 'rgba(225,224,204,0.3)' }}
        >
          Our Story
        </p>
        <h1
          className="font-extrabold leading-[0.9] tracking-tight"
          style={{
            fontSize: 'clamp(48px, 9vw, 130px)',
            color: '#E1E0CC',
            letterSpacing: '-0.04em',
          }}
        >
          <WordsPullUp text="About Us." />
        </h1>
      </section>

      <section className="pb-20 px-4 md:px-6">
        <div
          className="max-w-5xl mx-auto rounded-2xl md:rounded-[2rem] px-8 md:px-14 py-14 md:py-20 text-center"
          style={{ background: '#101010' }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Gracious Grafx is a creative studio', className: 'font-normal' },
              { text: 'built around one idea:', className: 'font-serif italic' },
              { text: 'great design should work as hard as you do.', className: 'font-normal' },
            ]}
            wrapperClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto leading-[1.0]"
          />

          <ScrollRevealText
            text="We started building websites for small businesses and local service companies — people who had great work but nothing online that showed it. That's still what drives us. We believe every business deserves a website that actually represents them, and we build exactly that."
            className="mt-10 max-w-2xl mx-auto text-sm md:text-base leading-loose"
            style={{ color: '#DEDBC8' } as React.CSSProperties}
          />
        </div>
      </section>

      <section className="pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <p
          className="text-[10px] tracking-[0.32em] uppercase mb-12"
          style={{ color: 'rgba(225,224,204,0.3)' }}
        >
          What We Stand For
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              className="rounded-2xl p-8 flex gap-6"
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.12 }}
            >
              <span
                className="font-bold text-2xl flex-shrink-0"
                style={{ color: 'rgba(59,130,246,0.2)', fontFamily: '"Instrument Serif", serif' }}
              >
                {v.num}
              </span>
              <div>
                <p className="font-bold text-base mb-2" style={{ color: '#E1E0CC' }}>
                  {v.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.45)' }}>
                  {v.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-extrabold tracking-tight leading-none mb-8"
            style={{
              fontSize: 'clamp(32px, 5.5vw, 80px)',
              color: '#E1E0CC',
              letterSpacing: '-0.04em',
            }}
          >
            Ready to get started?
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-7 py-3 transition-all duration-200"
            style={{ background: '#E1E0CC', color: '#000' }}
          >
            <span>Let's Talk</span>
            <span
              className="flex items-center justify-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110"
              style={{ width: 30, height: 30 }}
            >
              <ArrowRight size={13} color="#E1E0CC" />
            </span>
          </Link>
        </motion.div>
      </section>
    </PageIn>
  )
}
