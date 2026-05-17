import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Check, Zap, Star } from 'lucide-react'
import Hls from 'hls.js'
import VLogo from '../components/VLogo'

const HLS_SRC = 'https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8'

function HLSVideoBackground() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(3,5,10,0.58)' }} />
    </div>
  )
}

function PageIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

const plans = [
  {
    name: 'Starter',
    price: '$500',
    desc: 'Perfect for getting online fast with a clean, professional presence.',
    features: [
      'Single page website',
      'Mobile responsive design',
      'Contact form',
      'Basic SEO setup',
      '2 revision rounds',
      'Delivered in 5 days',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Standard',
    price: '$750',
    desc: 'The sweet spot — more pages, more power, built to grow your business.',
    features: [
      'Up to 5 pages',
      'Everything in Starter',
      'Custom animations',
      'Google Analytics',
      'Social media links',
      '3 revision rounds',
    ],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Full Build',
    price: '$1,000',
    desc: 'The complete package — every integration, every page, fully launched.',
    features: [
      'Unlimited pages',
      'Everything in Standard',
      'All third-party integrations',
      'Booking / e-commerce ready',
      'Priority 7-day delivery',
      'Unlimited revisions',
    ],
    cta: 'Build Everything',
    featured: false,
  },
]

function PricingCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      whileHover={{ y: -8, rotateX: -2, rotateY: plan.featured ? 0 : (index === 0 ? 3 : -3) }}
      style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
      className="relative flex flex-col rounded-2xl p-7 cursor-default transition-shadow duration-300"
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: plan.featured
            ? 'linear-gradient(135deg, rgba(37,99,235,0.28) 0%, rgba(96,165,250,0.12) 100%)'
            : 'rgba(5,8,20,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: plan.featured
            ? '1px solid rgba(96,165,250,0.4)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: plan.featured
            ? '0 0 40px rgba(59,130,246,0.2), 0 20px 60px rgba(0,0,0,0.5)'
            : '0 20px 60px rgba(0,0,0,0.4)',
        }}
      />

      {plan.featured && (
        <div
          className="absolute -top-px left-0 right-0 h-px rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)' }}
        />
      )}

      {plan.featured && (
        <div className="relative flex items-center gap-1.5 mb-5">
          <Star size={11} fill="#fbbf24" stroke="none" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#fbbf24' }}>Most Popular</span>
        </div>
      )}

      <div className="relative">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: plan.featured ? '#93c5fd' : 'rgba(225,224,204,0.4)' }}>
          {plan.name}
        </p>
        <p
          className="font-extrabold mb-1"
          style={{ fontSize: 'clamp(36px, 5vw, 52px)', color: '#E1E0CC', letterSpacing: '-0.04em', lineHeight: 1 }}
        >
          {plan.price}
        </p>
        <p className="text-xs mb-6" style={{ color: 'rgba(225,224,204,0.35)' }}>one-time</p>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }}>{plan.desc}</p>

        <ul className="flex flex-col gap-3 mb-8">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(225,224,204,0.7)' }}>
              <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.featured ? '#60a5fa' : '#4ade80' }} />
              {f}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="block w-full text-center py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200"
          style={{
            background: plan.featured ? '#3b82f6' : 'rgba(255,255,255,0.07)',
            color: plan.featured ? '#fff' : '#E1E0CC',
            border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.1)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            if (!plan.featured) { el.style.background = 'rgba(59,130,246,0.15)'; el.style.borderColor = 'rgba(96,165,250,0.4)' }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            if (!plan.featured) { el.style.background = 'rgba(255,255,255,0.07)'; el.style.borderColor = 'rgba(255,255,255,0.1)' }
          }}
        >
          {plan.cta}
        </Link>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const pricingRef = useRef<HTMLElement>(null)
  const pricingInView = useInView(pricingRef, { once: true, margin: '-80px' })
  const heroRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const btnX = useMotionValue(0)
  const btnY = useMotionValue(0)
  const springX = useSpring(btnX, { stiffness: 200, damping: 18 })
  const springY = useSpring(btnY, { stiffness: 200, damping: 18 })

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = btnRef.current?.getBoundingClientRect()
    if (!rect) return
    btnX.set((e.clientX - rect.left - rect.width / 2) * 0.4)
    btnY.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }

  const handleBtnMouseLeave = () => {
    btnX.set(0)
    btnY.set(0)
  }

  return (
    <PageIn>
      <HLSVideoBackground />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      >
        {/* Blue orb blobs — parallax for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${mouse.x * 38}px, ${mouse.y * 38}px)`,
            transition: 'transform 0.12s linear',
          }}
        >
          <div
            className="absolute"
            style={{
              bottom: '-15%', left: '-5%',
              width: '75%', height: '80%',
              background: 'radial-gradient(ellipse at 40% 60%, rgba(37,99,235,0.4) 0%, rgba(79,70,229,0.2) 35%, transparent 70%)',
              filter: 'blur(70px)',
              animation: 'cosmicDrift1 16s ease-in-out infinite',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: '-20%', right: '-8%',
              width: '65%', height: '75%',
              background: 'radial-gradient(ellipse at 60% 50%, rgba(6,182,212,0.28) 0%, rgba(37,99,235,0.18) 40%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'cosmicDrift2 20s ease-in-out infinite',
            }}
          />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Vignettes */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '35%', background: 'linear-gradient(to top, rgba(3,5,10,0.7), transparent)' }} />
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '20%', background: 'linear-gradient(to bottom, rgba(3,5,10,0.4), transparent)' }} />

        {/* Hero content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{
            transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          <motion.div
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(96,165,250,0.25)',
              backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#60a5fa', boxShadow: '0 0 6px #60a5fa' }} />
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase" style={{ color: '#93c5fd' }}>
              Custom websites for bold businesses
            </span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(48px, 10vw, 130px)', color: '#E1E0CC', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Your Vision.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(48px, 10vw, 130px)', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            >
              <span style={{
                background: 'linear-gradient(90deg, #60a5fa 0%, #93c5fd 50%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Our Digital Reality.</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-base md:text-lg max-w-xl mb-10 leading-relaxed"
            style={{ color: 'rgba(225,224,204,0.55)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            We build websites that turn attention into results — for businesses that refuse to blend in.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <motion.div
              ref={btnRef}
              style={{ x: springX, y: springY, display: 'inline-flex' }}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-7 py-3.5 transition-shadow duration-300"
                style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 55px rgba(59,130,246,0.75)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(59,130,246,0.4)')}
              >
                <span>Start a Project</span>
                <span className="flex items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:scale-110" style={{ width: 28, height: 28 }}>
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: 'rgba(225,224,204,0.45)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.45)')}
            >
              View Pricing ↓
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(96,165,250,0.8), transparent)' }} />
        </motion.div>
      </section>

      {/* ── WHAT WE DO STRIP ── */}
      <section className="relative py-20 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Zap size={18} />, title: 'Fast Delivery', desc: 'Most sites are live within 5–7 days. No waiting weeks for something simple.' },
              { icon: <Check size={18} />, title: 'You Own Everything', desc: 'Files, domain, code — all yours. No subscriptions, no lock-in, ever.' },
              { icon: <Star size={18} />, title: 'Built to Convert', desc: 'We design for results — calls, bookings, sales. Not just to look good.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-2xl p-7"
                style={{
                  background: 'rgba(5,8,20,0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
                  {item.icon}
                </div>
                <p className="font-bold text-base mb-2" style={{ color: '#E1E0CC' }}>{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.45)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" ref={pricingRef} className="relative py-24 md:py-32 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div
            style={{
              position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
              width: '80%', height: '60%',
              background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.6)' }}>Transparent Pricing</p>
            <h2
              className="font-extrabold tracking-tight"
              style={{ fontSize: 'clamp(32px, 6vw, 72px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}
            >
              Simple. Flat-rate. No surprises.
            </h2>
            <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>
              One-time payment. You own everything on day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 perspective-1000">
            {plans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>

          <motion.div
            className="mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{
              background: 'rgba(5,8,20,0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <Zap size={14} style={{ color: '#60a5fa' }} />
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: '#E1E0CC' }}>Monthly Maintenance — <span style={{ color: '#60a5fa' }}>$150/mo</span> <span className="font-normal text-xs" style={{ color: 'rgba(225,224,204,0.35)' }}>optional add-on</span></p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(225,224,204,0.45)' }}>
                  Content updates · Security monitoring · Performance optimization · Priority support
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg transition-all duration-200"
              style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.25)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.12)' }}
            >
              Add On
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 px-6 text-center overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(37,99,235,0.1) 0%, transparent 65%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex justify-center mb-8">
            <VLogo size={72} showText={false} />
          </div>
          <h2
            className="font-extrabold tracking-tight leading-none mb-6"
            style={{ fontSize: 'clamp(32px, 6vw, 80px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}
          >
            Ready to build something<br />
            <span style={{ color: '#60a5fa' }}>worth looking at?</span>
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>
            Tell us about your project. We'll respond within 24 hours.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-8 py-4 transition-all duration-300"
            style={{ background: '#E1E0CC', color: '#000' }}
          >
            <span>Start a Project</span>
            <span className="flex items-center justify-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110" style={{ width: 32, height: 32 }}>
              <ArrowRight size={14} color="#E1E0CC" />
            </span>
          </Link>
        </motion.div>
      </section>
    </PageIn>
  )
}
