import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Mail } from 'lucide-react'
import WordsPullUp from '../components/WordsPullUp'

function PageIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
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
      <section className="pt-[100px] pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.32em] uppercase mb-5" style={{ color: 'rgba(225,224,204,0.3)' }}>Get In Touch</p>
          <h1
            className="font-extrabold leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(48px, 9vw, 130px)', color: '#E1E0CC', letterSpacing: '-0.04em' }}
          >
            <WordsPullUp text="Let's Build." />
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          <motion.div
            className="lg:col-span-2 flex flex-col gap-10"
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <p className="text-sm md:text-base leading-loose" style={{ color: 'rgba(225,224,204,0.55)' }}>
              Tell us about your project. We'll get back to you fast — no forms that disappear into the void.
            </p>
            <div className="flex flex-col gap-5">
              <a href="mailto:traviskenlocean1@gmail.com" className="flex items-center gap-3 text-sm transition-colors duration-200" style={{ color: 'rgba(225,224,204,0.5)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.5)')}>
                <Mail size={16} />traviskenlocean1@gmail.com
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors duration-200" style={{ color: 'rgba(225,224,204,0.5)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.5)')}>
                <Instagram size={16} />Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors duration-200" style={{ color: 'rgba(225,224,204,0.5)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.5)')}>
                <Facebook size={16} />Facebook
              </a>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            {status === 'sent' ? (
              <div className="rounded-2xl p-12 text-center" style={{ background: '#101010', border: '1px solid rgba(59,130,246,0.2)' }}>
                <p className="font-bold text-xl mb-2" style={{ color: '#E1E0CC' }}>Message received.</p>
                <p className="text-sm" style={{ color: 'rgba(225,224,204,0.45)' }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl p-8 md:p-10 flex flex-col gap-5" style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Name</label>
                    <input name="name" required placeholder="Your name"
                      className="w-full px-4 py-3 text-sm rounded-lg outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)')}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Email</label>
                    <input name="email" type="email" required placeholder="your@email.com"
                      className="w-full px-4 py-3 text-sm rounded-lg outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)')}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Project Type</label>
                  <select name="project_type" className="w-full px-4 py-3 text-sm rounded-lg outline-none appearance-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}>
                    <option value="" style={{ background: '#111' }}>Select one</option>
                    <option value="Starter" style={{ background: '#111' }}>Starter — $500</option>
                    <option value="Standard" style={{ background: '#111' }}>Standard — $750</option>
                    <option value="Full Build" style={{ background: '#111' }}>Full Build — $1,000</option>
                    <option value="Maintenance" style={{ background: '#111' }}>+ Maintenance $150/mo</option>
                    <option value="Other" style={{ background: '#111' }}>Something Else</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(225,224,204,0.4)' }}>Tell us about your project</label>
                  <textarea name="message" rows={5} placeholder="What are you building? Who is it for?"
                    className="w-full px-4 py-3 text-sm rounded-lg outline-none resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#E1E0CC' }}
                    onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.5)')}
                    onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')} />
                </div>
                <input type="hidden" name="_replyto" value="traviskenlocean1@gmail.com" />
                {status === 'error' && (
                  <p className="text-xs text-red-400">Something went wrong. Email us at traviskenlocean1@gmail.com</p>
                )}
                <button type="submit" disabled={status === 'sending'}
                  className="w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-200"
                  style={{ background: status === 'sending' ? 'rgba(96,165,250,0.4)' : '#3b82f6', color: '#fff' }}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageIn>
  )
}
