import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Facebook, Mail, ArrowRight, Copy, Check as CheckIcon, Plus, Minus } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4'

const CONTACT_EMAIL = 'Visionarywebstudio6@gmail.com'

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
    q: 'Do I own my website after it\'s built?',
    a: 'Yes, 100%. Once your project is delivered and paid in full, everything is yours — the code, the files, the domain. No ongoing fees, no lock-in, no strings.',
  },
  {
    q: 'What\'s the difference between Starter, Standard, and Full Build?',
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
    a: 'Yes. We typically split projects 50% upfront and 50% on delivery. For larger builds we can discuss a 3-payment structure. Reach out and we\'ll work something out.',
  },
  {
    q: 'Will my website show up on Google?',
    a: 'Every site we build includes basic on-page SEO — meta tags, Open Graph, semantic HTML, and fast load times. For deeper SEO campaigns, we can discuss that separately as an add-on.',
  },
  {
    q: 'What\'s included in the $150/month maintenance plan?',
    a: 'Monthly content updates, security monitoring, performance checks, and priority support for any issues. It\'s for clients who want someone to handle everything after launch so they never have to think about it.',
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

      <div className="relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(96,165,250,0.25)', color: '#60a5fa' }}>
        {icon}
      </div>

      <div className="relative flex-1 min-w-0">
        <p className="text-[9px] tracking-[0.25em] uppercase mb-0.5" style={{ color: 'rgba(225,224,204,0.3)' }}>{label}</p>
        <a href={href} target={isEmail ? undefined : '_blank'} rel={isEmail ? undefined : 'noopener noreferrer'}
          className="text-sm font-medium truncate block transition-colors duration-200" style={{ color: '#E1E0CC' }}
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
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm md:text-base font-medium leading-snug" style={{ color: open ? '#E1E0CC' : 'rgba(225,224,204,0.8)' }}>
          {q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: open ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)', color: open ? '#60a5fa' : 'rgba(225,224,204,0.4)' }}
        >
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5">
              <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.55)' }}>{a}</p>
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
      {/* FIXED VIDEO BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={VIDEO_URL} />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.62)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(5,15,50,0.3)', mixBlendMode: 'multiply' }} />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }} />

        <div className="relative z-10">
          <motion.p className="text-[11px] tracking-[0.35em] uppercase mb-6"
            style={{ color: 'rgba(147,197,253,0.9)' }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            Get In Touch
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h1 className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(56px, 13vw, 160px)', color: '#E1E0CC', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
              Start a
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1 className="font-extrabold tracking-tight leading-none"
              style={{ fontSize: 'clamp(56px, 13vw, 160px)', letterSpacing: '-0.05em' }}
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}>
              <span style={{ background: 'linear-gradient(90deg, #60a5fa, #93c5fd, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Project.
              </span>
            </motion.h1>
          </div>

          <motion.p className="text-base md:text-xl max-w-xl mx-auto mb-10" style={{ color: 'rgba(225,224,204,0.6)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.7 }}>
            Tell us what you're building. We respond within 24 hours — no fluff, no runaround.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 rounded-full font-bold text-sm px-7 py-3.5 transition-all duration-300"
              style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 32px rgba(59,130,246,0.55)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(59,130,246,0.8)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(59,130,246,0.55)')}>
              <span>Send a Message</span>
              <span className="flex items-center justify-center rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-200" style={{ width: 28, height: 28 }}>
                <ArrowRight size={14} />
              </span>
            </button>
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'rgba(225,224,204,0.45)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.45)')}>
              Common Questions ↓
            </button>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(96,165,250,0.8), transparent)' }} />
        </motion.div>
      </section>

      {/* CONTACT FORM + METHODS */}
      <section id="contact-form" className="relative py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* Left */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="mb-4">
                <p className="text-[10px] tracking-[0.32em] uppercase mb-3" style={{ color: 'rgba(96,165,250,0.7)' }}>Contact Methods</p>
                <h2 className="font-extrabold tracking-tight leading-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', color: '#E1E0CC', letterSpacing: '-0.03em' }}>
                  Multiple ways<br />to reach us.
                </h2>
              </div>

              <ContactCard icon={<Mail size={22} />} label="Email Us Directly" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} delay={0.1} />
              <ContactCard icon={<Instagram size={22} />} label="Instagram" value="@visionarywebstudio" href="https://instagram.com/visionarywebstudio" delay={0.2} />
              <ContactCard icon={<Facebook size={22} />} label="Facebook" value="Visionary Web Studio" href="https://facebook.com" delay={0.3} />

              <motion.div className="mt-1 rounded-2xl p-5"
                style={{ background: 'rgba(5,8,20,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(96,165,250,0.15)' }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: '#4ade80' }}>Available Now</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(225,224,204,0.5)' }}>
                  We respond within <span style={{ color: '#E1E0CC' }}>24 hours</span>. For urgent projects, email us directly.
                </p>
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
              {status === 'sent' ? (
                <div className="rounded-2xl p-14 text-center"
                  style={{ background: 'rgba(5,8,20,0.8)', backdropFilter: 'blur(24px)', border: '1px solid rgba(96,165,250,0.2)' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)' }}>
                    <CheckIcon size={24} style={{ color: '#4ade80' }} />
                  </div>
                  <p className="font-bold text-xl mb-2" style={{ color: '#E1E0CC' }}>Message received.</p>
                  <p className="text-sm" style={{ color: 'rgba(225,224,204,0.45)' }}>We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl p-8 md:p-10 flex flex-col gap-5"
                  style={{ background: 'rgba(5,8,20,0.8)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                      { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    ].map((f) => (
                      <div key={f.name} className="flex flex-col gap-2">
                        <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>{f.label}</label>
                        <input name={f.name} type={f.type} required placeholder={f.placeholder}
                          className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }} />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Project Package</label>
                    <select name="project_type" className="w-full px-4 py-3 text-sm rounded-xl outline-none appearance-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)')}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')}>
                      <option value="" style={{ background: '#080c1a' }}>Select a package</option>
                      <option value="Starter" style={{ background: '#080c1a' }}>Starter — $500</option>
                      <option value="Standard" style={{ background: '#080c1a' }}>Standard — $750</option>
                      <option value="Full Build" style={{ background: '#080c1a' }}>Full Build — $1,000</option>
                      <option value="Maintenance" style={{ background: '#080c1a' }}>+ Maintenance $150/mo</option>
                      <option value="Other" style={{ background: '#080c1a' }}>Something Else</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Tell us about your project</label>
                    <textarea name="message" rows={5} placeholder="What are you building? Who is it for? What's the goal?"
                      className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }} />
                  </div>

                  <input type="hidden" name="_replyto" value={CONTACT_EMAIL} />
                  {status === 'error' && <p className="text-xs" style={{ color: '#f87171' }}>Something went wrong. Email us at {CONTACT_EMAIL}</p>}

                  <button type="submit" disabled={status === 'sending'}
                    className="group w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3"
                    style={{ background: status === 'sending' ? 'rgba(96,165,250,0.4)' : '#3b82f6', color: '#fff', boxShadow: status === 'sending' ? 'none' : '0 0 28px rgba(59,130,246,0.4)' }}>
                    {status === 'sending' ? 'Sending...' : (
                      <><span>Send Message</span><ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" /></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] tracking-[0.32em] uppercase mb-4" style={{ color: 'rgba(96,165,250,0.7)' }}>Got Questions</p>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}>
              Common Questions
            </h2>
            <p className="mt-4 text-sm" style={{ color: 'rgba(225,224,204,0.4)' }}>
              Everything you need to know before we get started.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

          <motion.div className="mt-14 text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <p className="text-sm mb-5" style={{ color: 'rgba(225,224,204,0.4)' }}>Still have questions?</p>
            <a href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-colors duration-200"
              style={{ color: '#60a5fa' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#93c5fd')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#60a5fa')}>
              <Mail size={15} />
              Email us directly
            </a>
          </motion.div>
        </div>
      </section>
    </PageIn>
  )
}
