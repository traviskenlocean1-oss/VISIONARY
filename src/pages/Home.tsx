import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Check, Zap, Star, TrendingUp, Globe, Wrench, Palette, Phone, Clock } from 'lucide-react'
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
      <video ref={ref} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
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
    features: ['Single page website', 'Mobile responsive design', 'Contact form', 'Basic SEO setup', '2 revision rounds', 'Delivered in 5 days'],
    cta: 'Get Basic',
    featured: false,
  },
  {
    name: 'Standard',
    price: '$750',
    desc: 'The sweet spot — more pages, more power, built to grow your business.',
    features: ['Up to 5 pages', 'Everything in Starter', 'Custom animations', 'Google Analytics', 'Social media links', '3 revision rounds'],
    cta: 'Choose Standard',
    featured: true,
  },
  {
    name: 'Full Build',
    price: '$1,000',
    desc: 'The complete package — every integration, every page, fully launched.',
    features: ['Up to 8–10 pages', 'Everything in Standard', 'All third-party integrations', 'Booking / e-commerce ready', 'Priority 7-day delivery', 'Unlimited revisions'],
    cta: 'Get Premium',
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
          background: plan.featured ? 'linear-gradient(135deg, rgba(37,99,235,0.28) 0%, rgba(96,165,250,0.12) 100%)' : 'rgba(5,8,20,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: plan.featured ? '1px solid rgba(96,165,250,0.4)' : '1px solid rgba(255,255,255,0.08)',
          boxShadow: plan.featured ? '0 0 40px rgba(59,130,246,0.2), 0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.4)',
        }}
      />
      {plan.featured && (
        <div className="absolute -top-px left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)' }} />
      )}
      {plan.featured && (
        <div className="relative flex items-center gap-2 mb-5">
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 6px rgba(251,191,36,0.7)', flexShrink: 0 }} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#fbbf24' }}>Most Popular</span>
        </div>
      )}
      <div className="relative">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: plan.featured ? '#93c5fd' : 'rgba(225,224,204,0.4)' }}>{plan.name}</p>
        <p className="font-extrabold mb-1" style={{ fontSize: 'clamp(36px, 5vw, 52px)', color: '#E1E0CC', letterSpacing: '-0.04em', lineHeight: 1 }}>{plan.price}</p>
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
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; if (!plan.featured) { el.style.background = 'rgba(59,130,246,0.15)'; el.style.borderColor = 'rgba(96,165,250,0.4)' } }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; if (!plan.featured) { el.style.background = 'rgba(255,255,255,0.07)'; el.style.borderColor = 'rgba(255,255,255,0.1)' } }}
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
    setMouse({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 })
  }

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = btnRef.current?.getBoundingClientRect()
    if (!rect) return
    btnX.set((e.clientX - rect.left - rect.width / 2) * 0.4)
    btnY.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }

  const handleBtnMouseLeave = () => { btnX.set(0); btnY.set(0) }

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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translate(${mouse.x * 38}px, ${mouse.y * 38}px)`, transition: 'transform 0.12s linear' }}
        >
          <div className="absolute" style={{ bottom: '-15%', left: '-5%', width: '75%', height: '80%', background: 'radial-gradient(ellipse at 40% 60%, rgba(37,99,235,0.4) 0%, rgba(79,70,229,0.2) 35%, transparent 70%)', filter: 'blur(70px)', animation: 'cosmicDrift1 16s ease-in-out infinite' }} />
          <div className="absolute" style={{ bottom: '-20%', right: '-8%', width: '65%', height: '75%', background: 'radial-gradient(ellipse at 60% 50%, rgba(6,182,212,0.28) 0%, rgba(37,99,235,0.18) 40%, transparent 70%)', filter: 'blur(80px)', animation: 'cosmicDrift2 20s ease-in-out infinite' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '35%', background: 'linear-gradient(to top, rgba(3,5,10,0.7), transparent)' }} />
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '20%', background: 'linear-gradient(to bottom, rgba(3,5,10,0.4), transparent)' }} />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`, transition: 'transform 0.1s linear' }}
        >
          <motion.div
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(96,165,250,0.25)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#60a5fa', boxShadow: '0 0 6px #60a5fa' }} />
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase" style={{ color: '#93c5fd' }}>for service businesses and local brands that want a cleaner online presence</span>
          </motion.div>
          <div className="overflow-hidden mb-4">
            <motion.h1 className="font-extrabold tracking-tight leading-none" style={{ fontSize: 'clamp(38px, 8vw, 100px)', color: '#E1E0CC', letterSpacing: '-0.05em' }} initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>Websites Built to Turn</motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1 className="font-extrabold tracking-tight leading-none" style={{ fontSize: 'clamp(38px, 8vw, 100px)', letterSpacing: '-0.05em' }} initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}>
              <span style={{ background: 'linear-gradient(90deg, #60a5fa 0%, #93c5fd 50%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Local Searches Into Calls</span>
            </motion.h1>
          </div>
          <motion.p className="text-base md:text-lg max-w-xl mb-10 leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}>
            Visionary Web Studio builds clean, mobile-friendly websites for service businesses so customers can quickly see your services, photos, reviews, and contact you faster.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
            <motion.div ref={btnRef} style={{ x: springX, y: springY, display: 'inline-flex' }} onMouseMove={handleBtnMouseMove} onMouseLeave={handleBtnMouseLeave}>
              <Link to="/contact" className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-7 py-3.5 transition-shadow duration-300" style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 30px rgba(59,130,246,0.4)' }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 55px rgba(59,130,246,0.75)')} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(59,130,246,0.4)')}>
                <span>Start a Project</span>
                <span className="flex items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:scale-110" style={{ width: 28, height: 28 }}><ArrowRight size={14} /></span>
              </Link>
            </motion.div>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium tracking-wide transition-colors duration-200" style={{ color: 'rgba(225,224,204,0.45)' }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.45)')}>
              View Pricing ↓
            </button>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
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
                style={{ background: 'rgba(5,8,20,0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>{item.icon}</div>
                <p className="font-bold text-base mb-2" style={{ color: '#E1E0CC' }}>{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.45)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="relative py-24 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.6)' }}>Our Process</p>
            <h2 className="font-extrabold tracking-tight mb-5" style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>How We Transform Your Vision Into Reality</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>A streamlined process that gets you a professional website — fast, clean, and built to convert.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[
              { num: 1, title: 'Discovery & Strategy', desc: 'We learn your business, goals, and audience to map out a custom plan tailored to your brand.', points: ['Business Analysis', 'Competitor Research', 'Strategy Planning'], color: '#3b82f6' },
              { num: 2, title: 'Design & Prototype', desc: 'Every pixel designed from scratch — no templates. Conversion-focused layouts built for your brand.', points: ['Custom Design', 'Mobile Mockups', 'User Experience'], color: '#818cf8' },
              { num: 3, title: 'Development & Testing', desc: 'We build your site with clean code — fast load times and flawless performance across all devices.', points: ['Clean Coding', 'Performance Testing', 'Cross-browser Testing'], color: '#f59e0b' },
              { num: 4, title: 'Launch & Support', desc: 'Your site goes live fully ready. We handle handover and are available every step after launch.', points: ['Website Launch', 'Training & Handover', 'Ongoing Support'], color: '#818cf8' },
            ].map((step, i) => (
              <motion.div key={step.num} className="relative rounded-2xl p-6 flex flex-col" style={{ background: 'rgba(5,8,20,0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg mb-5 flex-shrink-0" style={{ border: `2px solid ${step.color}`, color: step.color, background: 'rgba(255,255,255,0.04)' }}>{step.num}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#E1E0CC' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(225,224,204,0.45)' }}>{step.desc}</p>
                <ul className="mt-auto flex flex-col gap-2">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(225,224,204,0.55)' }}>
                      <Check size={11} style={{ color: step.color, flexShrink: 0 }} />{point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div className="rounded-2xl p-8 md:p-10 text-center" style={{ background: 'rgba(5,8,20,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: 'rgba(225,224,204,0.35)' }}>Typical Project Timeline</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[{ time: '1–2 Days', label: 'Discovery & Planning' }, { time: '5–7 Days', label: 'Design & Development' }, { time: '1–2 Days', label: 'Testing & Launch' }].map((t, i) => (
                <div key={i}>
                  <p className="font-extrabold mb-1" style={{ fontSize: 'clamp(18px, 3vw, 28px)', color: '#60a5fa', letterSpacing: '-0.02em' }}>{t.time}</p>
                  <p className="text-xs" style={{ color: 'rgba(225,224,204,0.45)' }}>{t.label}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300" style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 24px rgba(59,130,246,0.35)' }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(59,130,246,0.6)')} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(59,130,246,0.35)')}>
              Start Your Project Today <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE OFFER (Services) ── */}
      <section className="relative py-24 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.6)' }}>Services</p>
            <h2 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>What We Offer</h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>Everything your business needs to get online, stay competitive, and grow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Custom Website */}
            <motion.div
              className="rounded-2xl p-8 flex flex-col"
              style={{ background: 'rgba(5,8,20,0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 }}
              whileHover={{ borderColor: 'rgba(96,165,250,0.25)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.5) 0%, rgba(96,165,250,0.35) 100%)', boxShadow: '0 0 24px rgba(59,130,246,0.2)' }}>
                <Globe size={24} color="#fff" />
              </div>
              <p className="font-extrabold text-xl mb-2" style={{ color: '#E1E0CC' }}>Custom Website</p>
              <p className="font-bold text-2xl mb-1" style={{ color: '#60a5fa', letterSpacing: '-0.02em' }}>$750 <span className="text-sm font-normal" style={{ color: 'rgba(225,224,204,0.35)' }}>starting</span></p>
              <p className="text-xs mb-6" style={{ color: 'rgba(225,224,204,0.3)' }}>one-time fee</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(225,224,204,0.5)' }}>Custom-designed websites that convert visitors into customers. Mobile-responsive, fast-loading, and built from scratch.</p>
              <ul className="flex flex-col gap-3 mt-auto">
                {['Custom Design & Development', 'Mobile-First Approach', 'SEO Optimization'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(225,224,204,0.65)' }}>
                    <Check size={13} style={{ color: '#60a5fa', flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Website Maintenance */}
            <motion.div
              className="rounded-2xl p-8 flex flex-col relative overflow-hidden"
              style={{ background: 'rgba(5,8,20,0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              whileHover={{ borderColor: 'rgba(245,158,11,0.25)' }}
            >
              <div className="absolute top-4 right-4 text-[9px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>Optional Add-On</div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, rgba(217,119,6,0.5) 0%, rgba(245,158,11,0.35) 100%)', boxShadow: '0 0 24px rgba(245,158,11,0.18)' }}>
                <Wrench size={24} color="#fff" />
              </div>
              <p className="font-extrabold text-xl mb-2" style={{ color: '#E1E0CC' }}>Website Maintenance</p>
              <p className="font-bold text-2xl mb-1" style={{ color: '#fbbf24', letterSpacing: '-0.02em' }}>$100 <span className="text-sm font-normal" style={{ color: 'rgba(225,224,204,0.35)' }}>/month</span></p>
              <p className="text-xs mb-6" style={{ color: 'rgba(225,224,204,0.3)' }}>ongoing add-on</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(225,224,204,0.5)' }}>Keep your website running flawlessly with regular updates, security monitoring, and performance optimization.</p>
              <ul className="flex flex-col gap-3 mt-auto">
                {['Regular Content Updates', 'Security Monitoring', 'Performance Optimization'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(225,224,204,0.65)' }}>
                    <Check size={13} style={{ color: '#fbbf24', flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Logo & Brand Design */}
            <motion.div
              className="rounded-2xl p-8 flex flex-col"
              style={{ background: 'rgba(5,8,20,0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              whileHover={{ borderColor: 'rgba(52,211,153,0.25)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.5) 0%, rgba(52,211,153,0.35) 100%)', boxShadow: '0 0 24px rgba(52,211,153,0.18)' }}>
                <Palette size={24} color="#fff" />
              </div>
              <p className="font-extrabold text-xl mb-2" style={{ color: '#E1E0CC' }}>Logo & Branding</p>
              <p className="font-bold text-2xl mb-1" style={{ color: '#34d399', letterSpacing: '-0.02em' }}>Let's Talk</p>
              <p className="text-xs mb-6" style={{ color: 'rgba(225,224,204,0.3)' }}>custom pricing</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(225,224,204,0.5)' }}>Make a lasting first impression with a professional, custom logo that captures your brand's essence and stands out.</p>
              <ul className="flex flex-col gap-3 mt-auto">
                {['Custom Brand Identity', 'Multiple Design Concepts', 'Full Vector Files'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(225,224,204,0.65)' }}>
                    <Check size={13} style={{ color: '#34d399', flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE COMPARISON ── */}
      <section className="relative py-24 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {/* Blue side accent bars */}
        <div className="absolute left-0 top-0 bottom-0 w-3 md:w-6" style={{ background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8, #3b82f6)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-3 md:w-6" style={{ background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8, #3b82f6)' }} />

        <div className="max-w-2xl mx-auto text-center">
          <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', boxShadow: '0 0 40px rgba(59,130,246,0.45)' }}>
              <TrendingUp size={28} color="#fff" />
            </div>
          </motion.div>

          <motion.h2 className="font-extrabold tracking-tight mb-5" style={{ fontSize: 'clamp(32px, 6vw, 64px)', color: '#E1E0CC', letterSpacing: '-0.04em', lineHeight: 1.05 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            76% More Likely to Buy
          </motion.h2>

          <motion.p className="text-base md:text-lg mb-5 leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            With a professional website for your business, potential clients are{' '}
            <span style={{ color: '#60a5fa', fontWeight: 700 }}>76% more likely to buy from you.</span>
          </motion.p>

          <motion.p className="text-sm md:text-base mb-10 leading-relaxed" style={{ color: 'rgba(225,224,204,0.42)' }} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.28 }}>
            76% of consumers look at a company's online presence before physically visiting a business.{' '}
            <span style={{ color: 'rgba(225,224,204,0.65)' }}>Your website is part of that first impression.</span>
          </motion.p>

          <div className="w-full h-px mb-10" style={{ background: 'rgba(255,255,255,0.08)' }} />

          <motion.div className="grid grid-cols-2 gap-4 mb-10" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 }}>
            <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: 'rgba(5,8,20,0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: 'rgba(225,224,204,0.35)' }}>Typical Web Agencies</p>
              <p className="font-extrabold mb-1 leading-none" style={{ fontSize: 'clamp(20px, 4vw, 38px)', color: 'rgba(225,224,204,0.25)', textDecoration: 'line-through', letterSpacing: '-0.03em', textDecorationColor: 'rgba(239,68,68,0.6)' }}>$3k–$15k</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span style={{ color: '#ef4444', fontSize: '16px', fontWeight: 900 }}>✗</span>
                <span className="text-sm font-semibold" style={{ color: '#ef4444' }}>Expensive &amp; Slow</span>
              </div>
            </div>
            <div className="rounded-2xl p-6 md:p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(29,78,216,0.12) 100%)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(59,130,246,0.4)', boxShadow: '0 0 40px rgba(59,130,246,0.12)' }}>
              <div className="absolute -top-px left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)' }} />
              <p className="text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: '#93c5fd' }}>Visionary</p>
              <p className="font-extrabold mb-1 leading-none" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>$750</p>
              <p className="text-xs mb-4" style={{ color: 'rgba(225,224,204,0.35)' }}>One-Time Fee</p>
              <div className="flex items-center justify-center gap-2">
                <span style={{ color: '#4ade80', fontSize: '16px', fontWeight: 900 }}>✓</span>
                <span className="text-sm font-semibold" style={{ color: '#4ade80' }}>Affordable &amp; Fast</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-8 py-4 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)', color: '#fff', boxShadow: '0 0 30px rgba(59,130,246,0.35)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(59,130,246,0.6)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(59,130,246,0.35)')}
            >
              Get Your Professional Website Now
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" ref={pricingRef} className="relative py-24 md:py-32 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 24 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.6)' }}>Transparent Pricing</p>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(32px, 6vw, 72px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>Simple. Flat-rate. No surprises.</h2>
            <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>One-time payment. You own everything on day one.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 perspective-1000">
            {plans.map((plan, i) => <PricingCard key={plan.name} plan={plan} index={i} />)}
          </div>
          <motion.div
            className="mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{ background: 'rgba(5,8,20,0.65)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <Zap size={14} style={{ color: '#60a5fa' }} />
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: '#E1E0CC' }}>Monthly Maintenance — <span style={{ color: '#60a5fa' }}>$100/mo</span> <span className="font-normal text-xs" style={{ color: 'rgba(225,224,204,0.35)' }}>optional add-on</span></p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(225,224,204,0.45)' }}>Content updates · Security monitoring · Performance optimization · Priority support</p>
              </div>
            </div>
            <Link to="/contact" className="flex-shrink-0 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg transition-all duration-200" style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.25)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.12)' }}>
              Add On
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── READY TO LAUNCH ── */}
      <section className="relative py-24 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(29,78,216,0.08) 50%, rgba(3,5,10,0) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.15) 0%, transparent 65%)' }} />
        <div className="max-w-4xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] tracking-[0.32em] uppercase mb-5" style={{ color: 'rgba(96,165,250,0.6)' }}>Get Started Today</p>
            <h2 className="font-extrabold tracking-tight mb-5" style={{ fontSize: 'clamp(30px, 5.5vw, 64px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
              Ready to Launch Your <span style={{ color: '#60a5fa' }}>Dream Website?</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-14" style={{ color: 'rgba(225,224,204,0.5)' }}>
              Join businesses that chose Visionary to create a stunning, high-converting website that drives real results.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
              {[
                { icon: <Zap size={22} color="#60a5fa" />, label: 'Fast Delivery', sub: 'Launch in 5–7 days', bg: 'rgba(37,99,235,0.15)', border: 'rgba(96,165,250,0.2)' },
                { icon: <Check size={22} color="#4ade80" />, label: 'No Hidden Fees', sub: '100% transparent pricing', bg: 'rgba(22,163,74,0.12)', border: 'rgba(74,222,128,0.2)' },
                { icon: <Star size={22} color="#fbbf24" fill="#fbbf24" stroke="none" />, label: 'Support Included', sub: 'Always here to help', bg: 'rgba(180,83,9,0.12)', border: 'rgba(251,191,36,0.2)' },
              ].map((badge) => (
                <motion.div
                  key={badge.label}
                  className="rounded-2xl px-6 py-7 flex flex-col items-center gap-3"
                  style={{ background: badge.bg, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${badge.border}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>{badge.icon}</div>
                  <p className="font-bold text-base" style={{ color: '#E1E0CC' }}>{badge.label}</p>
                  <p className="text-sm" style={{ color: 'rgba(225,224,204,0.45)' }}>{badge.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full font-bold text-sm px-8 py-4 transition-all duration-300"
                style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(59,130,246,0.7)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(59,130,246,0.4)')}
              >
                Start Your Project <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm px-8 py-4 transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#E1E0CC', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.12)'; el.style.borderColor = 'rgba(96,165,250,0.3)' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.06)'; el.style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                View Pricing
              </button>
            </div>

            <div className="mt-12 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <p className="text-base font-semibold mb-6" style={{ color: 'rgba(225,224,204,0.55)' }}>Have questions? We're here to help!</p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                {[
                  { icon: <Phone size={14} />, text: 'Free consultation call', href: 'tel:5618890507' },
                  { icon: <Clock size={14} />, text: 'Quick 24-hour response', href: '/contact' },
                  { icon: <Globe size={14} />, text: 'Serving clients worldwide', href: '/contact' },
                ].map((item) => (
                  <a
                    key={item.text}
                    href={item.href}
                    className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: 'rgba(225,224,204,0.5)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93c5fd')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.5)')}
                  >
                    <span style={{ color: '#60a5fa' }}>{item.icon}</span>
                    {item.text}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 px-6 text-center overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(37,99,235,0.1) 0%, transparent 65%)' }} />
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative">
          <div className="flex justify-center mb-8"><VLogo size={72} showText={false} /></div>
          <h2 className="font-extrabold tracking-tight leading-none mb-6" style={{ fontSize: 'clamp(32px, 6vw, 80px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
            Ready to build something<br /><span style={{ color: '#60a5fa' }}>worth looking at?</span>
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>Tell us about your project. We'll respond within 24 hours.</p>
          <Link to="/contact" className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-8 py-4 transition-all duration-300" style={{ background: '#E1E0CC', color: '#000' }}>
            <span>Start a Project</span>
            <span className="flex items-center justify-center rounded-full bg-black transition-transform duration-200 group-hover:scale-110" style={{ width: 32, height: 32 }}><ArrowRight size={14} color="#E1E0CC" /></span>
          </Link>
        </motion.div>
      </section>
    </PageIn>
  )
}
