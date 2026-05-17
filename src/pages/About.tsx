import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Award, Users } from 'lucide-react'

const ABOUT_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4'

function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        src={ABOUT_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.52)' }} />
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

const values = [
  {
    icon: <Shield size={18} />,
    num: '01',
    title: 'Honesty first.',
    desc: "We don't inflate portfolios, exaggerate results, or make promises we can't keep. You get straight answers, realistic timelines, and work that speaks for itself.",
  },
  {
    icon: <Award size={18} />,
    num: '02',
    title: 'You own everything.',
    desc: 'Once delivered and paid, the entire project is yours — code, files, domain, all of it. No monthly platform fees, no lock-in, no strings attached. Ever.',
  },
  {
    icon: <Zap size={18} />,
    num: '03',
    title: 'Built to convert.',
    desc: 'A beautiful website that brings in zero customers is just expensive decoration. We design with one goal: turning visitors into calls, bookings, and sales.',
  },
  {
    icon: <Users size={18} />,
    num: '04',
    title: 'Fast and accountable.',
    desc: 'We move with urgency and communicate clearly at every step. You will never have to chase us. No ghosting, no delays without explanation, no excuses.',
  },
]

const process = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We learn your business, your customers, and what you actually need online. No guessing — your input shapes every decision.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'We present a direction built around your brand. You review, give feedback, and we refine until it\'s exactly right.',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Every site is hand-coded from scratch — no templates, no page builders. Fast, clean, mobile-first, and built for performance.',
  },
  {
    step: '04',
    title: 'Launch',
    desc: 'We handle everything: deployment, domain connection, final testing. You get a live site and a walkthrough of how it all works.',
  },
]

export default function About() {
  return (
    <PageIn>
      <VideoBackground />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p
            className="text-[11px] tracking-[0.35em] uppercase mb-6"
            style={{ color: 'rgba(147,197,253,0.9)' }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          >
            Our Story
          </motion.p>

          <div className="overflow-hidden mb-3">
            <motion.h1
              className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(52px, 11vw, 140px)', color: '#E1E0CC', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Built for
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(52px, 11vw, 140px)', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span style={{
                background: 'linear-gradient(90deg, #60a5fa 0%, #93c5fd 50%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>businesses.</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(225,224,204,0.65)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }}
          >
            We design and build custom websites for brands that are serious about their presence — and serious about results.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button
              onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'rgba(225,224,204,0.4)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.4)')}
            >
              Learn more ↓
            </button>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(96,165,250,0.8), transparent)' }} />
        </motion.div>
      </section>

      {/* WHO WE ARE */}
      <section id="our-story" className="relative py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="rounded-2xl md:rounded-3xl px-8 md:px-14 py-12 md:py-16"
            style={{
              background: 'rgba(5,8,20,0.8)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] tracking-[0.32em] uppercase mb-6" style={{ color: 'rgba(96,165,250,0.7)' }}>Who We Are</p>

            <h2
              className="font-extrabold tracking-tight leading-tight mb-8"
              style={{ fontSize: 'clamp(26px, 4vw, 48px)', color: '#E1E0CC', letterSpacing: '-0.03em' }}
            >
              We close the gap between
              <span style={{ color: '#60a5fa' }}> great businesses</span> and
              <span style={{ color: '#60a5fa' }}> great websites.</span>
            </h2>

            <div className="flex flex-col gap-5 max-w-3xl">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(225,224,204,0.7)' }}>
                Visionary Web Studio is a boutique creative studio specializing in custom-built, high-performance websites for businesses that want to stand out. We work with restaurants, contractors, beauty studios, automotive brands, service companies, and entrepreneurs who know that their online presence is their first impression — and it needs to be a great one.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }}>
                Everything we build is hand-coded from scratch. No WordPress, no drag-and-drop builders, no templates pulled off a shelf. Every line of code is written for your project, which means faster load times, cleaner design, and a site that actually looks like it cost significantly more than it did.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }}>
                We started because we were tired of seeing talented, hardworking business owners stuck with websites that didn't represent them. The work they do is exceptional — their website should say the same. That's still the mission today, and it drives every project we take on.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative py-12 md:py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-[10px] tracking-[0.32em] uppercase mb-10"
            style={{ color: 'rgba(225,224,204,0.3)' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            What We Stand For
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                className="rounded-2xl p-7 flex gap-5"
                style={{ background: 'rgba(5,8,20,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.1 }}
                whileHover={{ borderColor: 'rgba(96,165,250,0.2)' }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
                    {v.icon}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-base mb-2" style={{ color: '#E1E0CC' }}>{v.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.5)' }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.7)' }}>How It Works</p>
            <h2
              className="font-extrabold tracking-tight"
              style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}
            >
              From idea to live site —<br />
              <span style={{ color: '#60a5fa' }}>in days, not months.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(5,8,20,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <p className="font-extrabold text-3xl mb-4" style={{ color: 'rgba(96,165,250,0.2)', letterSpacing: '-0.04em' }}>{p.step}</p>
                <p className="font-bold text-base mb-2" style={{ color: '#E1E0CC' }}>{p.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.45)' }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(96,165,250,0.7)' }}>Ready to get started?</p>
          <h2
            className="font-extrabold tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 80px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}
          >
            Let's build something
          </h2>
          <h2
            className="font-extrabold tracking-tight leading-none mb-10"
            style={{ fontSize: 'clamp(32px, 6vw, 80px)', letterSpacing: '-0.04em' }}
          >
            <span style={{ color: '#60a5fa' }}>you're proud to share.</span>
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-8 py-4 transition-all duration-300"
            style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 36px rgba(59,130,246,0.5)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 55px rgba(59,130,246,0.8)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(59,130,246,0.5)')}
          >
            <span>Start a Project</span>
            <span className="flex items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:scale-110" style={{ width: 30, height: 30 }}>
              <ArrowRight size={14} />
            </span>
          </Link>
        </motion.div>
      </section>
    </PageIn>
  )
}
