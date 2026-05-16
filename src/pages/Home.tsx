import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import WordsPullUp from '../components/WordsPullUp'
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle'
import ScrollRevealText from '../components/ScrollRevealText'

function PageIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function useCardReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return {
    ref,
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(20px)',
      transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    },
  }
}

export default function Home() {
  const card1 = useCardReveal(0)
  const card2 = useCardReveal(0.15)
  const card3 = useCardReveal(0.3)
  const card4 = useCardReveal(0.45)

  return (
    <PageIn>
      {/* HERO */}
      <section className="h-screen p-3 md:p-5">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">

          {/* Cosmic background */}
          <div className="absolute inset-0 bg-black">
            <div
              className="absolute cosmic-orb-1 pointer-events-none"
              style={{
                width: '65%', height: '75%',
                top: '-15%', left: '-8%',
                background:
                  'radial-gradient(ellipse, rgba(88,28,235,0.42) 0%, rgba(37,99,235,0.22) 45%, transparent 72%)',
                filter: 'blur(50px)',
              }}
            />
            <div
              className="absolute cosmic-orb-2 pointer-events-none"
              style={{
                width: '55%', height: '65%',
                top: '10%', right: '-8%',
                background:
                  'radial-gradient(ellipse, rgba(6,182,212,0.25) 0%, rgba(37,99,235,0.18) 45%, transparent 72%)',
                filter: 'blur(55px)',
              }}
            />
            <div
              className="absolute cosmic-orb-3 pointer-events-none"
              style={{
                width: '45%', height: '55%',
                bottom: '-10%', left: '22%',
                background:
                  'radial-gradient(ellipse, rgba(139,92,246,0.28) 0%, rgba(236,72,153,0.1) 45%, transparent 72%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'repeating-linear-gradient(108deg, transparent 0%, transparent 7%, rgba(37,99,235,0.018) 7.6%, transparent 8.2%)',
              }}
            />
          </div>

          <div className="noise-overlay absolute inset-0 opacity-[0.55] mix-blend-overlay pointer-events-none" />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.7) 100%)',
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 pb-10 md:pb-14">
            <div className="grid grid-cols-12 items-end gap-4">
              <div className="col-span-12 lg:col-span-8">
                <div className="overflow-hidden">
                  <motion.h1
                    className="font-extrabold leading-[0.85] tracking-[-0.06em] relative inline-block"
                    style={{
                      fontSize: 'clamp(72px, 22vw, 320px)',
                      color: '#E1E0CC',
                    }}
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  >
                    GRAFX
                    <sup
                      className="absolute font-medium"
                      style={{
                        top: '0.62em',
                        right: '-0.32em',
                        fontSize: '0.29em',
                        color: '#3b82f6',
                      }}
                    >
                      *
                    </sup>
                  </motion.h1>
                </div>
                <motion.p
                  className="mt-3 text-[11px] tracking-[0.28em] uppercase"
                  style={{ color: 'rgba(225,224,204,0.38)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.7 }}
                >
                  * bringing stories to life visually
                </motion.p>
              </div>

              <div className="col-span-12 lg:col-span-4 lg:pb-2 flex flex-col gap-5">
                <motion.p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: 'rgba(225,224,204,0.6)', lineHeight: 1.7 }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  Gracious Grafx is a digital creative agency. We design and build websites that turn
                  attention into results — for businesses that refuse to blend in.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.72, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to="/work"
                    className="group inline-flex items-center gap-2 rounded-full font-medium text-sm md:text-base px-6 py-3 transition-all duration-200"
                    style={{
                      background: '#E1E0CC',
                      color: '#000',
                    }}
                  >
                    <span>View Our Work</span>
                    <span
                      className="flex items-center justify-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110"
                      style={{ width: 32, height: 32 }}
                    >
                      <ArrowRight size={15} color="#E1E0CC" />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div
              className="w-px"
              style={{
                height: 40,
                background: 'linear-gradient(to bottom, rgba(59,130,246,0.7), transparent)',
                animation: 'cosmicDrift1 2s ease-in-out infinite',
              }}
            />
            <span
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(225,224,204,0.22)' }}
            >
              Scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="bg-black py-20 md:py-28 px-4 md:px-6">
        <div
          className="max-w-5xl mx-auto rounded-2xl md:rounded-[2rem] px-8 md:px-14 py-14 md:py-20 text-center"
          style={{ background: '#101010' }}
        >
          <p
            className="text-[10px] tracking-[0.32em] uppercase mb-8"
            style={{ color: '#DEDBC8' }}
          >
            Digital Agency
          </p>

          <WordsPullUpMultiStyle
            segments={[
              { text: 'We are Gracious Grafx,', className: 'font-normal' },
              { text: 'a digital creative studio.', className: 'font-serif italic' },
              { text: 'We build websites and digital experiences that drive real results.', className: 'font-normal' },
            ]}
            wrapperClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-[0.95]"
            delay={0}
          />

          <ScrollRevealText
            text="From concept to launch, we craft every pixel with intention. Our work lives at the intersection of bold design and sharp strategy — built for businesses ready to be taken seriously online. If it goes on the internet, we build it right."
            className="mt-10 max-w-2xl mx-auto text-sm md:text-base leading-loose"
            style={{ color: '#DEDBC8' } as React.CSSProperties}
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-black min-h-screen py-20 md:py-28 px-4 md:px-6 relative">
        <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12 md:mb-16">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Studio-grade work for ambitious brands.', className: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal' } as never,
              ]}
              wrapperClassName="justify-center mb-3"
            />
            <p
              className="text-lg md:text-xl font-normal"
              style={{ color: 'rgba(225,224,204,0.35)' }}
            >
              <WordsPullUp text="Built for pure vision. Powered by craft." delay={0.2} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:h-[480px]">
            <div
              ref={card1.ref}
              style={card1.style}
              className="card-hero-bg rounded-2xl overflow-hidden relative flex flex-col justify-end p-6 min-h-[280px] lg:min-h-0"
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }}
              />
              <p className="relative text-lg md:text-xl font-bold tracking-tight" style={{ color: '#E1E0CC' }}>
                Your visual story,<br />told right.
              </p>
            </div>

            <div
              ref={card2.ref}
              style={{ ...card2.style, background: '#212121' }}
              className="rounded-2xl p-6 flex flex-col justify-between min-h-[280px] lg:min-h-0"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-lg mb-5 flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.2)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                  </svg>
                </div>
                <p className="text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: 'rgba(225,224,204,0.35)' }}>01</p>
                <p className="text-base md:text-lg font-bold mb-4" style={{ color: '#E1E0CC' }}>Web Design & Build.</p>
                <ul className="flex flex-col gap-2">
                  {['Custom-designed, not templated', 'Mobile-first, fast, and clean', 'Built to convert visitors into leads', 'Full ownership — yours to keep'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: '#9ca3af' }}>
                      <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/work"
                className="flex items-center gap-2 text-xs tracking-widest uppercase mt-4 transition-colors duration-200"
                style={{ color: 'rgba(225,224,204,0.4)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.4)')}
              >
                See examples
                <ArrowRight size={12} style={{ transform: 'rotate(-45deg)' }} />
              </Link>
            </div>

            <div
              ref={card3.ref}
              style={{ ...card3.style, background: '#212121' }}
              className="rounded-2xl p-6 flex flex-col justify-between min-h-[280px] lg:min-h-0"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-lg mb-5 flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.2)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                  </svg>
                </div>
                <p className="text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: 'rgba(225,224,204,0.35)' }}>02</p>
                <p className="text-base md:text-lg font-bold mb-4" style={{ color: '#E1E0CC' }}>Brand & Identity.</p>
                <ul className="flex flex-col gap-2">
                  {['Logo and visual direction', 'Color systems and typography', 'Consistent across every touchpoint'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: '#9ca3af' }}>
                      <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-xs tracking-widest uppercase mt-4 transition-colors duration-200"
                style={{ color: 'rgba(225,224,204,0.4)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.4)')}
              >
                Start a project
                <ArrowRight size={12} style={{ transform: 'rotate(-45deg)' }} />
              </Link>
            </div>

            <div
              ref={card4.ref}
              style={{ ...card4.style, background: '#212121' }}
              className="rounded-2xl p-6 flex flex-col justify-between min-h-[280px] lg:min-h-0"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-lg mb-5 flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.2)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <p className="text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: 'rgba(225,224,204,0.35)' }}>03</p>
                <p className="text-base md:text-lg font-bold mb-4" style={{ color: '#E1E0CC' }}>Launch & Maintain.</p>
                <ul className="flex flex-col gap-2">
                  {['Deployed and live fast', 'You own everything, always', 'Optional ongoing support'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: '#9ca3af' }}>
                      <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-xs tracking-widest uppercase mt-4 transition-colors duration-200"
                style={{ color: 'rgba(225,224,204,0.4)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.4)')}
              >
                Learn more
                <ArrowRight size={12} style={{ transform: 'rotate(-45deg)' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-black py-24 md:py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-[10px] tracking-[0.32em] uppercase mb-6"
            style={{ color: 'rgba(225,224,204,0.3)' }}
          >
            Ready?
          </p>
          <h2
            className="font-extrabold tracking-tight leading-none mb-8"
            style={{
              fontSize: 'clamp(36px, 7vw, 100px)',
              color: '#E1E0CC',
              letterSpacing: '-0.04em',
            }}
          >
            Let's build something<br />
            <span style={{ color: '#3b82f6' }}>worth looking at.</span>
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full font-bold text-sm md:text-base px-8 py-4 transition-all duration-200"
            style={{ background: '#E1E0CC', color: '#000' }}
          >
            <span>Start a Project</span>
            <span
              className="flex items-center justify-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110"
              style={{ width: 34, height: 34 }}
            >
              <ArrowRight size={15} color="#E1E0CC" />
            </span>
          </Link>
        </motion.div>
      </section>
    </PageIn>
  )
}
