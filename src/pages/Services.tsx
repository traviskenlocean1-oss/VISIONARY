import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Code2, Server, Headphones, Palette, Smartphone, Gauge, Search, Plug, FileCode, Globe, Lock, Mail, Cpu, Shield, Clock, RefreshCw, BarChart3, MessageSquare } from 'lucide-react'
import Hls from 'hls.js'

const SERVICES_HLS = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

function HLSVideoBackground() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(SERVICES_HLS)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = SERVICES_HLS
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
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.42)' }} />
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

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      className="flex gap-4 rounded-2xl p-5"
      style={{ background: 'rgba(5,8,20,0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}
      whileHover={{ borderColor: 'rgba(96,165,250,0.25)', background: 'rgba(10,20,50,0.75)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
        style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: '#E1E0CC' }}>{title}</p>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(225,224,204,0.45)' }}>{desc}</p>
      </div>
    </motion.div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.7)' }}>{children}</p>
  )
}

export default function Services() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.hash])

  return (
    <PageIn>
      <HLSVideoBackground />

      {/* HERO */}
      <section className="relative pt-[130px] pb-24 px-6 md:px-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
            <SectionLabel>What We Offer</SectionLabel>
          </motion.div>
          <div className="overflow-hidden mb-3">
            <motion.h1
              className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(44px, 9vw, 110px)', color: '#E1E0CC', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Everything
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
                we do.
              </span>
            </motion.h1>
          </div>
          <motion.p
            className="text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: 'rgba(225,224,204,0.55)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}
          >
            Custom websites, hosting, and ongoing support — everything your business needs online, handled by one team.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mt-10"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { label: 'Website Development', href: '#web-development', icon: <Code2 size={13} /> },
              { label: 'Hosting & Domain', href: '#hosting', icon: <Server size={13} /> },
              { label: 'Support', href: '#support', icon: <Headphones size={13} /> },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 rounded-full text-xs font-medium px-4 py-2 transition-all duration-200"
                style={{ background: 'rgba(37,99,235,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(96,165,250,0.2)', color: '#93c5fd' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.28)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.15)' }}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WEBSITE DEVELOPMENT ── */}
      <section id="web-development" className="relative py-24 md:py-32 px-6 md:px-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa' }}>
                <Code2 size={22} />
              </div>
              <SectionLabel>Service 01</SectionLabel>
            </div>
            <h2 className="font-extrabold tracking-tight mb-4"
              style={{ fontSize: 'clamp(30px, 5.5vw, 68px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
              Website Development
            </h2>
            <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }}>
              Every site we build is hand-coded from scratch — no templates, no drag-and-drop builders. You get a custom design built around your brand, your audience, and your goals. The result is faster, cleaner, and more unique than anything a page builder can produce.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
            {[
              { icon: <Palette size={16} />, title: 'Custom Visual Design', desc: 'Every layout, color, and detail is designed for your brand — not borrowed from a template library.' },
              { icon: <Smartphone size={16} />, title: 'Mobile-First & Responsive', desc: 'Built for phones first, then scaled up beautifully to tablet and desktop. Every visitor gets the best experience.' },
              { icon: <Gauge size={16} />, title: 'Performance Optimized', desc: 'Fast load times, compressed assets, and clean code. A slow site loses customers — yours won\'t.' },
              { icon: <Search size={16} />, title: 'SEO Foundation Built In', desc: 'Meta tags, Open Graph, schema markup, semantic HTML, and fast load speeds. Set up to be found from day one.' },
              { icon: <Plug size={16} />, title: 'All Integrations', desc: 'Contact forms, booking systems, payment processors, Google Analytics, social links — connected and working on launch day.' },
              { icon: <FileCode size={16} />, title: 'You Receive the Source Code', desc: 'We hand over every file at delivery. Your site is yours completely — take it anywhere, no lock-in.' },
              { icon: <Cpu size={16} />, title: 'Custom Animations', desc: 'Smooth motion, scroll-triggered reveals, and interactive elements that feel premium without slowing anything down.' },
              { icon: <Globe size={16} />, title: 'Any Type of Business', desc: 'Restaurants, contractors, beauty studios, automotive, e-commerce, service companies — we\'ve built them all.' },
              { icon: <Check size={16} />, title: 'Revision Rounds Included', desc: 'You review the design before we build. We refine until it\'s right — every package includes revision rounds.' },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}>
                <FeatureItem {...f} />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-2xl p-7 md:p-8"
            style={{ background: 'rgba(5,8,20,0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(96,165,250,0.15)' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.6)' }}>Industries We Work With</p>
            <div className="flex flex-wrap gap-2">
              {['Restaurants', 'Contractors', 'Beauty Studios', 'Automotive', 'Law Firms', 'Real Estate', 'Fitness & Gyms', 'Medical & Dental', 'E-Commerce', 'Service Companies', 'Event Venues', 'Photographers'].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(225,224,204,0.6)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-sm mb-4" style={{ color: 'rgba(225,224,204,0.5)' }}>Ready to see what's possible for your business?</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-colors duration-200"
                style={{ color: '#60a5fa' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93c5fd')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#60a5fa')}
              >
                Start a project <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOSTING & DOMAIN ── */}
      <section id="hosting" className="relative py-24 md:py-32 px-6 md:px-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa' }}>
                <Server size={22} />
              </div>
              <SectionLabel>Service 02</SectionLabel>
            </div>
            <h2 className="font-extrabold tracking-tight mb-4"
              style={{ fontSize: 'clamp(30px, 5.5vw, 68px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
              Hosting & Domain
            </h2>
            <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }}>
              Getting online shouldn't be complicated. We handle domain setup, connect everything, and host your site on fast, globally-distributed infrastructure. You just need to show up — we handle the technical side.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
            {[
              { icon: <Globe size={16} />, title: 'Domain Registration Guidance', desc: 'We help you find and register the right domain name for your business. We\'ll point you exactly where to go and what to set up.' },
              { icon: <Gauge size={16} />, title: 'Fast Global Hosting', desc: 'Your site is deployed to Cloudflare\'s global network — pages load fast for visitors anywhere in the world, not just your city.' },
              { icon: <Lock size={16} />, title: 'SSL Certificate Included', desc: 'Every site ships with HTTPS enabled. The padlock in the browser bar is standard, not an upgrade — your visitors\' trust is protected.' },
              { icon: <Mail size={16} />, title: 'Custom Email Setup Guidance', desc: 'We walk you through setting up a professional email (you@yourbusiness.com) via Google Workspace or your provider of choice.' },
              { icon: <Cpu size={16} />, title: 'DNS Configuration Handled', desc: 'We configure all DNS records, connect your domain to your hosting, and make sure everything resolves correctly before launch.' },
              { icon: <Clock size={16} />, title: '30-Day Post-Launch Support', desc: 'After launch, we\'re available for 30 days to handle any hosting issues, redirection fixes, or configuration questions at no extra cost.' },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}>
                <FeatureItem {...f} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT ── */}
      <section id="support" className="relative py-24 md:py-32 px-6 md:px-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa' }}>
                <Headphones size={22} />
              </div>
              <SectionLabel>Service 03</SectionLabel>
            </div>
            <h2 className="font-extrabold tracking-tight mb-4"
              style={{ fontSize: 'clamp(30px, 5.5vw, 68px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
              Support
            </h2>
            <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }}>
              The work doesn't stop at launch. We stay available for updates, fixes, and improvements so your site keeps performing the way it should — and you never have to worry about it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mb-10">
            {[
              { icon: <RefreshCw size={16} />, title: 'Content Updates', desc: 'Need to update your prices, swap out a photo, or change your hours? We handle it fast — no hassle, no delays.' },
              { icon: <Shield size={16} />, title: 'Security Monitoring', desc: 'We keep an eye on your site for anything unusual. Fast response to any security issue before it becomes a problem.' },
              { icon: <BarChart3 size={16} />, title: 'Performance Checks', desc: 'Regular checks to make sure your site is loading fast, all links are working, and nothing has broken over time.' },
              { icon: <Code2 size={16} />, title: 'Post-Launch Bug Fixes', desc: 'If something breaks after launch — layout issues, broken forms, display glitches — we fix it, no back-and-forth needed.' },
              { icon: <Plug size={16} />, title: 'New Feature Additions', desc: 'Want to add a booking widget, a new page, or a product section later? We quote and build it with priority turnaround.' },
              { icon: <MessageSquare size={16} />, title: 'Direct Priority Access', desc: 'Maintenance clients skip the queue. You get a direct line to our team — faster response, faster results, every time.' },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}>
                <FeatureItem {...f} />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-2xl p-7 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: 'rgba(5,8,20,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(96,165,250,0.2)' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: 'rgba(96,165,250,0.7)' }}>Monthly Plan</p>
              <p className="font-extrabold text-2xl mb-1" style={{ color: '#E1E0CC', letterSpacing: '-0.03em' }}>
                $150<span className="font-normal text-base" style={{ color: 'rgba(225,224,204,0.4)' }}>/month</span>
              </p>
              <p className="text-sm max-w-sm" style={{ color: 'rgba(225,224,204,0.5)' }}>
                Content updates, security monitoring, performance optimization, and priority support — all included. Cancel any time.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 group inline-flex items-center gap-3 rounded-full font-bold text-sm px-6 py-3 transition-all duration-300"
              style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 24px rgba(59,130,246,0.35)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(59,130,246,0.6)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(59,130,246,0.35)')}
            >
              <span>Get Started</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 px-6 text-center border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] tracking-[0.32em] uppercase mb-5" style={{ color: 'rgba(96,165,250,0.6)' }}>Ready to move?</p>
          <h2 className="font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: 'clamp(28px, 5.5vw, 72px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
            Let's build your site<br />
            <span style={{ color: '#60a5fa' }}>the right way.</span>
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
