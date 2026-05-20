import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight, Zap, TrendingUp, Globe, Wrench, Palette } from 'lucide-react'
import Hls from 'hls.js'

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

const plans = [
  {
    name: 'Starter',
    price: '$500',
    desc: 'Perfect for getting online fast with a clean, professional presence.',
    features: ['Single page website', 'Mobile responsive design', 'Contact form', 'Basic SEO setup', '2 revision rounds', 'Delivered in 5 days'],
    cta: 'Get Starter',
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
    features: ['Unlimited pages', 'Everything in Standard', 'All third-party integrations', 'Booking / e-commerce ready', 'Priority 7-day delivery', 'Unlimited revisions'],
    cta: 'Get Full Build',
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

function PageIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <PageIn>
      <HLSVideoBackground />

      {/* HERO */}
      <section className="relative pt-[130px] pb-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-[10px] tracking-[0.32em] uppercase mb-5"
            style={{ color: 'rgba(96,165,250,0.7)' }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
          >
            Transparent Pricing
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(44px, 9vw, 110px)', color: '#E1E0CC', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Simple.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(44px, 9vw, 110px)', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span style={{ background: 'linear-gradient(90deg, #60a5fa, #93c5fd, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Flat-rate.
              </span>
            </motion.h1>
          </div>
          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'rgba(225,224,204,0.55)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}
          >
            One-time payment. No surprises. You own everything on day one.
          </motion.p>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="relative py-16 px-6 md:px-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.6)' }}>Services</p>
            <h2 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>What We Offer</h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>Everything your business needs to get online, stay competitive, and grow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Custom Website */}
            <motion.div
              className="rounded-2xl p-8 flex flex-col"
              style={{ background: 'rgba(5,8,20,0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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

            {/* Logo & Branding */}
            <motion.div
              className="rounded-2xl p-8 flex flex-col"
              style={{ background: 'rgba(5,8,20,0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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

      {/* PRICING CARDS */}
      <section className="relative px-6 md:px-10 pb-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto pt-16">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.6)' }}>Choose Your Plan</p>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>Simple. Flat-rate. No surprises.</h2>
            <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>One-time payment. You own everything on day one.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5" style={{ perspective: '1000px' }}>
            {plans.map((plan, i) => <PricingCard key={plan.name} plan={plan} index={i} />)}
          </div>

          {/* Maintenance add-on row */}
          <motion.div
            className="mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{ background: 'rgba(5,8,20,0.65)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            <Link to="/contact" className="flex-shrink-0 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-lg transition-all duration-200" style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.25)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.12)' }}>
              Add On
            </Link>
          </motion.div>
        </div>
      </section>

      {/* VALUE COMPARISON */}
      <section className="relative py-24 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="absolute left-0 top-0 bottom-0 w-3 md:w-6" style={{ background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8, #3b82f6)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-3 md:w-6" style={{ background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8, #3b82f6)' }} />

        <div className="max-w-2xl mx-auto text-center">
          <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', boxShadow: '0 0 40px rgba(59,130,246,0.45)' }}>
              <TrendingUp size={28} color="#fff" />
            </div>
          </motion.div>
          <motion.h2 className="font-extrabold tracking-tight mb-5" style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#E1E0CC', letterSpacing: '-0.04em' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            Why Visionary?
          </motion.h2>
          <motion.p className="text-base mb-10 leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            Businesses with a professional website are <span style={{ color: '#60a5fa', fontWeight: 700 }}>76% more likely to attract customers.</span> You get that — without the agency price tag.
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
              <p className="font-extrabold mb-1 leading-none" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>$500</p>
              <p className="text-xs mb-4" style={{ color: 'rgba(225,224,204,0.35)' }}>Starting Price</p>
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

      {/* CTA */}
      <section className="relative py-24 px-6 text-center border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <p className="text-[10px] tracking-[0.32em] uppercase mb-5" style={{ color: 'rgba(96,165,250,0.6)' }}>Ready to move?</p>
          <h2 className="font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: 'clamp(28px, 5.5vw, 64px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
            Ready to get started?<br />
            <span style={{ color: '#60a5fa' }}>Let's build it.</span>
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>
            Tell us about your project and we'll get back to you within 24 hours.
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
