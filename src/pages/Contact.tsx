import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Mail, ArrowRight, Copy, Check as CheckIcon } from 'lucide-react'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4'

function PageIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )
}

function ContactCard({
  icon, label, value, href, delay,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  delay: number
}) {
  const [copied, setCopied] = useState(false)
  const isEmail = href.startsWith('mailto:')

  function handleCopy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="group relative rounded-2xl p-6 flex items-center gap-5 cursor-pointer overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={{ y: -3 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08), transparent)' }}
      />
      <div
        className="absolute -top-px left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }}
      />

      <div
        className="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa' }}
      >
        {icon}
      </div>

      <div className="relative flex-1 min-w-0">
        <p className="text-[10px] tracking-[0.22em] uppercase mb-0.5" style={{ color: 'rgba(225,224,204,0.35)' }}>{label}</p>
        <a
          href={href}
          target={isEmail ? undefined : '_blank'}
          rel={isEmail ? undefined : 'noopener noreferrer'}
          className="text-sm font-medium truncate block transition-colors duration-200"
          style={{ color: '#E1E0CC' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93c5fd')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
        >
          {value}
        </a>
      </div>

      {isEmail && (
        <button
          onClick={handleCopy}
          className="relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.05)', color: copied ? '#4ade80' : 'rgba(225,224,204,0.4)' }}
          title="Copy email"
        >
          {copied ? <CheckIcon size={13} /> : <Copy size={13} />}
        </button>
      )}
    </motion.div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); form.reset() } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  return (
    <PageIn>
      {/* ── VIDEO HERO ── */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
        />

        {/* Dark overlays for readability */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />

        {/* Blue tint overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(10,30,80,0.25)', mixBlendMode: 'multiply' }} />

        <div className="noise-overlay absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />

        {/* Hero text */}
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-[11px] tracking-[0.35em] uppercase mb-5"
            style={{ color: 'rgba(147,197,253,0.8)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Get In Touch
          </motion.p>

          <div className="overflow-hidden mb-3">
            <motion.h1
              className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(52px, 11vw, 140px)', color: '#E1E0CC', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Start a Project.
            </motion.h1>
          </div>

          <motion.p
            className="text-base md:text-lg max-w-lg mx-auto mt-5"
            style={{ color: 'rgba(225,224,204,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            Tell us what you're building. We respond within 24 hours — no fluff, no runaround.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-8"
          >
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-7 py-3.5 transition-all duration-300"
              style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}
            >
              <span>Send a Message</span>
              <span className="flex items-center justify-center rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-200" style={{ width: 28, height: 28 }}>
                <ArrowRight size={14} />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact-form" className="bg-black py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

            {/* Left — contact methods */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="mb-6">
                <p className="text-[10px] tracking-[0.32em] uppercase mb-3" style={{ color: 'rgba(96,165,250,0.6)' }}>Contact Methods</p>
                <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(24px, 4vw, 40px)', color: '#E1E0CC', letterSpacing: '-0.03em' }}>
                  Multiple ways<br />to reach us.
                </h2>
              </div>

              <ContactCard
                icon={<Mail size={18} />}
                label="Email Us"
                value="traviskenlocean1@gmail.com"
                href="mailto:traviskenlocean1@gmail.com"
                delay={0.1}
              />
              <ContactCard
                icon={<Instagram size={18} />}
                label="Instagram"
                value="@visionarywebstudio"
                href="https://instagram.com"
                delay={0.2}
              />
              <ContactCard
                icon={<Facebook size={18} />}
                label="Facebook"
                value="Visionary Web Studio"
                href="https://facebook.com"
                delay={0.3}
              />

              {/* Response time badge */}
              <motion.div
                className="mt-2 rounded-2xl p-5"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(96,165,250,0.15)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: '#4ade80' }}>Available Now</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(225,224,204,0.5)' }}>
                  We typically respond within <span style={{ color: '#E1E0CC' }}>24 hours</span>. For urgent projects, reach out directly via email.
                </p>
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              {status === 'sent' ? (
                <div
                  className="rounded-2xl p-14 text-center"
                  style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(96,165,250,0.2)', backdropFilter: 'blur(20px)' }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)' }}>
                    <CheckIcon size={24} style={{ color: '#4ade80' }} />
                  </div>
                  <p className="font-bold text-xl mb-2" style={{ color: '#E1E0CC' }}>Message received.</p>
                  <p className="text-sm" style={{ color: 'rgba(225,224,204,0.45)' }}>We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8 md:p-10 flex flex-col gap-5"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Name</label>
                      <input name="name" required placeholder="Your name"
                        className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                        onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
                        onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Email</label>
                      <input name="email" type="email" required placeholder="your@email.com"
                        className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                        onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
                        onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Project Type</label>
                    <select name="project_type"
                      className="w-full px-4 py-3 text-sm rounded-xl outline-none appearance-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)')}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')}>
                      <option value="" style={{ background: '#111' }}>Select a package</option>
                      <option value="Starter" style={{ background: '#111' }}>Starter — $500</option>
                      <option value="Standard" style={{ background: '#111' }}>Standard — $750</option>
                      <option value="Full Build" style={{ background: '#111' }}>Full Build — $1,000</option>
                      <option value="Maintenance" style={{ background: '#111' }}>+ Maintenance $150/mo</option>
                      <option value="Other" style={{ background: '#111' }}>Something Else</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Tell us about your project</label>
                    <textarea name="message" rows={5} placeholder="What are you building? Who is it for? What's the goal?"
                      className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }} />
                  </div>

                  <input type="hidden" name="_replyto" value="traviskenlocean1@gmail.com" />

                  {status === 'error' && (
                    <p className="text-xs" style={{ color: '#f87171' }}>
                      Something went wrong. Email us directly at traviskenlocean1@gmail.com
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3"
                    style={{
                      background: status === 'sending' ? 'rgba(96,165,250,0.4)' : '#3b82f6',
                      color: '#fff',
                      boxShadow: status === 'sending' ? 'none' : '0 0 24px rgba(59,130,246,0.35)',
                    }}
                  >
                    {status === 'sending' ? 'Sending...' : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageIn>
  )
}
