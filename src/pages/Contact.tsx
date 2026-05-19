import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Facebook, Mail, Phone, ArrowRight, Copy, Check as CheckIcon, Plus, Minus } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4'

const CONTACT_EMAIL = 'Visionarywebstudio6@gmail.com'
const CONTACT_PHONE = '5618890507'
const CONTACT_PHONE_DISPLAY = '(561) 889-0507'

const FAQS = [
  {
    q: 'How long does it take to build a website?',
    a: 'Most projects are completed within 5–10 business days depending on the package. Starter sites typically take 5 days, Standard around 7, and Full Builds up to 10. We move fast without cutting corners.',
  },
  {
    q: 'What do I need to provide to get started?',
    a: 'Just your business name, a general idea of what you want, any photos or logos you have, and your preferred color direction. We guide you through the rest — no tech knowledge needed.',
  },
  {
    q: "Do I own my website after it's built?",
    a: "Yes, 100%. Once your project is delivered and paid in full, everything is yours — the code, the files, the domain. No ongoing fees, no lock-in, no strings.",
  },
  {
    q: "What's the difference between Starter, Standard, and Full Build?",
    a: 'Starter is a single-page site great for getting online fast. Standard gives you up to 5 pages with animations and analytics. Full Build is the complete package — unlimited pages, all integrations, e-commerce ready, priority delivery.',
  },
  {
    q: 'Can you match a specific style or vibe I have in mind?',
    a: 'Absolutely. We build completely custom — no templates. Share references, a mood board, or just a description and we design around your vision. Luxury, bold, clean, industrial, minimal — whatever direction fits your brand, we bring it to life.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. Redesigns fall under the Standard or Full Build packages depending on the scope. We start fresh with a clean design — no patching over old work.',
  },
  {
    q: 'Do you offer payment plans?',
    a: "Yes. We typically split projects 50% upfront and 50% on delivery. For larger builds we can discuss a 3-payment structure. Reach out and we'll work something out.",
  },
  {
    q: 'Will my website show up on Google?',
    a: "Every site we build includes basic on-page SEO — meta tags, Open Graph, semantic HTML, and fast load times. For deeper SEO campaigns, we can discuss that separately as an add-on.",
  },
  {
    q: "What's included in the $100/month maintenance plan?",
    a: "Monthly content updates, security monitoring, performance checks, and priority support for any issues. It's for clients who want someone to handle everything after launch so they never have to think about it.",
  },
  {
    q: 'What if I need changes after the site goes live?',
    a: 'All packages include revision rounds before launch. Post-launch changes can be handled through the maintenance plan or quoted individually depending on the scope of work.',
  },
]

function PageIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )
}

function ContactCard({ icon, label, value, href, delay }: {
  icon: React.ReactNode; label: string; value: string; href: string; delay: number
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl p-5 flex items-center gap-4 overflow-hidden"
      style={{ background: 'rgba(5,8,20,0.7)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.09)' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1), transparent)' }} />
      <div className="absolute -top-px left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.6), transparent)' }} />

      <div className="relative w-13 h-13 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ width: 52, height: 52, background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa' }}>
        {icon}
      </div>

      <div className="relative flex-1 min-w-0">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(225,224,204,0.35)' }}>{label}</p>
        <a href={href} target={isEmail ? undefined : '_blank'} rel={isEmail ? undefined : 'noopener noreferrer'}
          className="text-base font-semibold truncate block transition-colors duration-200" style={{ color: '#E1E0CC' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93c5fd')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}>
          {value}
        </a>
      </div>

      {isEmail && (
        <button onClick={handleCopy}
          className="relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.05)', color: copied ? '#4ade80' : 'rgba(225,224,204,0.35)' }}
          title="Copy email">
          {copied ? <CheckIcon size={13} /> : <Copy size={13} />}
        </button>
      )}
    </motion.div>
  )
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 5) * 0.06 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(5,8,20,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: open ? '1px solid rgba(96,165,250,0.25)' : '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.3s' }}
    >
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left">
        <span className="text-base font-medium leading-snug" style={{ color: open ? '#E1E0CC' : 'rgba(225,224,204,0.8)' }}>{q}</span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: open ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)', color: open ? '#60a5fa' : 'rgba(225,224,204,0.4)' }}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
            <div className="px-7 pb-6">
              <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <p className="text-base leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      {/* VIDEO BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={VIDEO_URL} />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.62)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(5,15,50,0.3)', mixBlendMode: 'multiply' }} />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }} />
        <div className="relative z-10">
          <motion.p className="text-[12px] tracking-[0.35em] uppercase mb-6" style={{ color: 'rgba(147,197,253,0.9)' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            Get In Touch
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1 className="font-extrabold tracking-tight leading-none" style={{ fontSize: 'clamp(56px, 13vw, 160px)', color: '#E1E0CC', letterSpacing: '-0.05em' }} initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
              Start a
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1 className="font-extrabold tracking-tight leading-none" style={{ fontSize: 'clamp(56px, 13vw, 160px)', letterSpacing: '-0.05em' }} initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}>
              <span style={{ background: 'linear-gradient(90deg, #60a5fa, #93c5fd, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Project.</span>
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-xl max-w-xl mx-auto mb-12" style={{ color: 'rgba(225,224,204,0.6)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.7 }}>
            Tell us what you're building. We respond within 24 hours — no fluff, no runaround.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 rounded-full font-bold text-base px-8 py-4 transition-all duration-300"
              style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 32px rgba(59,130,246,0.55)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(59,130,246,0.8)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(59,130,246,0.55)')}>
              <span>Send a Message</span>
              <span className="flex items-center justify-center rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-200" style={{ width: 30, height: 30 }}>
                <ArrowRight size={15} />
              </span>
            </button>
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-base font-medium transition-colors duration-200"
              style={{ color: 'rgba(225,224,204,0.45)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.45)')}>
              Common Questions ↓
            </button>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(96,165,250,0.8), transparent)' }} />
        </motion.div>
      </section>

      {/* CONTACT FORM + METHODS */}
      <section id="contact-form" className="relative py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <h2 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 4.5vw, 56px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
              Ready to Get Started?
            </h2>
            <p className="text-lg max-w-lg mx-auto" style={{ color: 'rgba(225,224,204,0.45)' }}>
              Tell us about your project and we'll get back to you within 24 hours with a custom proposal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* LEFT — Form */}
            <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
              {status === 'sent' ? (
                <div className="rounded-2xl p-14 text-center" style={{ background: 'rgba(5,8,20,0.8)', backdropFilter: 'blur(24px)', border: '1px solid rgba(96,165,250,0.2)' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)' }}>
                    <CheckIcon size={28} style={{ color: '#4ade80' }} />
                  </div>
                  <p className="font-bold text-2xl mb-3" style={{ color: '#E1E0CC' }}>Message received.</p>
                  <p className="text-base" style={{ color: 'rgba(225,224,204,0.45)' }}>We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl p-8 md:p-10 flex flex-col gap-6"
                  style={{ background: 'rgba(5,8,20,0.8)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="font-bold text-xl mb-1" style={{ color: '#E1E0CC' }}>Send Us a Message</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                    ].map((f) => (
                      <div key={f.name} className="flex flex-col gap-2.5">
                        <label className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(225,224,204,0.5)' }}>{f.label}</label>
                        <input name={f.name} type={f.type} required placeholder={f.placeholder}
                          className="w-full px-4 py-3.5 text-base rounded-xl outline-none transition-all duration-200"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }} />
                      </div>
                    ))}
                  </div>

                  {/* Project Type Dropdown */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(225,224,204,0.5)' }}>Project Type</label>
                    <select name="project_type"
                      className="w-full px-4 py-3.5 text-base rounded-xl outline-none appearance-none transition-all duration-200 cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)')}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')}>
                      <option value="" style={{ background: '#080c1a', color: '#E1E0CC' }}>Select your project type</option>
                      <option value="New Website Creation" style={{ background: '#080c1a', color: '#E1E0CC' }}>New Website Creation</option>
                      <option value="Website Redesign" style={{ background: '#080c1a', color: '#E1E0CC' }}>Website Redesign</option>
                      <option value="Website Maintenance" style={{ background: '#080c1a', color: '#E1E0CC' }}>Website Maintenance</option>
                      <option value="Logo & Branding" style={{ background: '#080c1a', color: '#E1E0CC' }}>Logo &amp; Branding</option>
                      <option value="Consultation Only" style={{ background: '#080c1a', color: '#E1E0CC' }}>Consultation Only</option>
                      <option value="Other" style={{ background: '#080c1a', color: '#E1E0CC' }}>Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(225,224,204,0.5)' }}>Project Details</label>
                    <textarea name="message" rows={5} placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      className="w-full px-4 py-3.5 text-base rounded-xl outline-none resize-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }} />
                  </div>

                  <input type="hidden" name="_replyto" value={CONTACT_EMAIL} />
                  {status === 'error' && <p className="text-sm" style={{ color: '#f87171' }}>Something went wrong. Email us at {CONTACT_EMAIL}</p>}

                  <button type="submit" disabled={status === 'sending'}
                    className="group w-full py-4 rounded-xl font-bold text-base tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3"
                    style={{ background: status === 'sending' ? 'rgba(96,165,250,0.4)' : '#3b82f6', color: '#fff', boxShadow: status === 'sending' ? 'none' : '0 0 28px rgba(59,130,246,0.4)' }}>
                    {status === 'sending' ? 'Sending...' : (
                      <><span>Submit</span><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" /></>
                    )}
                  </button>
                  <p className="text-center text-sm" style={{ color: 'rgba(225,224,204,0.35)' }}>
                    We'll respond within 24 hours with a detailed proposal
                  </p>
                </form>
              )}
            </motion.div>

            {/* RIGHT — Contact Info + What Happens Next */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
                <p className="text-[11px] tracking-[0.32em] uppercase mb-3" style={{ color: 'rgba(96,165,250,0.7)' }}>Contact Methods</p>
                <h3 className="font-extrabold tracking-tight mb-5" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', color: '#E1E0CC', letterSpacing: '-0.03em' }}>Get In Touch</h3>
                <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(225,224,204,0.45)' }}>
                  Ready to transform your online presence? We're here every step of the way.
                </p>
              </motion.div>

              <ContactCard icon={<Phone size={22} />} label="Call Us" value={CONTACT_PHONE_DISPLAY} href={`tel:${CONTACT_PHONE}`} delay={0.2} />
              <ContactCard icon={<Mail size={22} />} label="Email Us" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} delay={0.3} />
              <ContactCard icon={<Instagram size={22} />} label="Instagram" value="@visionarywebstudio" href="https://instagram.com/visionarywebstudio" delay={0.4} />
              <ContactCard icon={<Facebook size={22} />} label="Facebook" value="Visionary Web Studio" href="https://facebook.com" delay={0.5} />

              <motion.div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(5,8,20,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(96,165,250,0.15)' }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                  <span className="text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color: '#4ade80' }}>Quick Response</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.5)' }}>
                  We respond within <span style={{ color: '#E1E0CC' }}>24 hours</span>. Available for urgent projects.
                </p>
              </motion.div>

              {/* What Happens Next */}
              <motion.div
                className="rounded-2xl p-7"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(79,70,229,0.18) 100%)', border: '1px solid rgba(96,165,250,0.25)' }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
              >
                <p className="font-bold text-base mb-5" style={{ color: '#E1E0CC' }}>What Happens Next?</p>
                <div className="flex flex-col gap-4">
                  {[
                    'We review your project details within 24 hours',
                    'Schedule a free consultation to discuss your vision',
                    'Receive a custom proposal with timeline and pricing',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5" style={{ background: 'rgba(96,165,250,0.2)', border: '1px solid rgba(96,165,250,0.35)', color: '#93c5fd' }}>
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.7)' }}>{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[11px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.7)' }}>Got Questions</p>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(30px, 5vw, 60px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>Common Questions</h2>
            <p className="mt-4 text-base" style={{ color: 'rgba(225,224,204,0.4)' }}>Everything you need to know before we get started.</p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
          </div>
          <motion.div className="mt-14 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <p className="text-base mb-5" style={{ color: 'rgba(225,224,204,0.4)' }}>Still have questions?</p>
            <a href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-base font-bold tracking-wide transition-colors duration-200"
              style={{ color: '#60a5fa' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93c5fd')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#60a5fa')}>
              <Mail size={16} /> Email us directly
            </a>
          </motion.div>
        </div>
      </section>
    </PageIn>
  )
}
