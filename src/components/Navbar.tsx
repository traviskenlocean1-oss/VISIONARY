import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Code2, Server, Headphones } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import VLogo from './VLogo'

const SERVICE_ITEMS = [
  { label: 'Website Development', href: '/services#web-development', icon: <Code2 size={14} /> },
  { label: 'Hosting & Domain', href: '/services#hosting', icon: <Server size={14} /> },
  { label: 'Support', href: '/services#support', icon: <Headphones size={14} /> },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setServicesOpen(false) }, [pathname])

  function handlePricingClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isServicesActive = pathname.startsWith('/services')

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex-shrink-0 select-none">
          <VLogo size={46} showText={true} />
        </Link>

        {/* Desktop pill nav */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0">
          <div
            className="flex items-center gap-10 lg:gap-12 rounded-b-3xl px-10 py-[14px]"
            style={{
              background: 'rgba(5,5,5,0.7)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderTop: 'none',
            }}
          >
            <Link
              to="/about"
              className="relative text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: pathname === '/about' ? '#E1E0CC' : 'rgba(225,224,204,0.45)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = pathname === '/about' ? '#E1E0CC' : 'rgba(225,224,204,0.45)')}
            >
              About
              {pathname === '/about' && <span className="absolute -bottom-[2px] left-0 right-0 h-px" style={{ background: '#60a5fa' }} />}
            </Link>

            {/* Services dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ color: isServicesActive ? '#E1E0CC' : 'rgba(225,224,204,0.45)', background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isServicesActive ? '#E1E0CC' : 'rgba(225,224,204,0.45)')}
              >
                Services
                <ChevronDown size={10} style={{ transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                {isServicesActive && <span className="absolute -bottom-[2px] left-0 right-0 h-px" style={{ background: '#60a5fa' }} />}
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 pt-4"
                    style={{ transform: 'translateX(-50%)', zIndex: 100 }}
                  >
                    <div
                      className="rounded-2xl py-2 px-1.5 min-w-[220px] flex flex-col gap-0.5"
                      style={{ background: 'rgba(5,8,20,0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
                    >
                      {/* Top blue accent line */}
                      <div className="absolute -top-px left-8 right-8 h-px rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }} />
                      {SERVICE_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-150"
                          style={{ color: 'rgba(225,224,204,0.65)' }}
                          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(37,99,235,0.15)'; el.style.color = '#E1E0CC' }}
                          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(225,224,204,0.65)' }}
                        >
                          <span style={{ color: '#60a5fa' }}>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/#pricing"
              onClick={handlePricingClick}
              className="relative text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(225,224,204,0.45)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.45)')}
            >
              Pricing
            </Link>

            <Link
              to="/contact"
              className="relative text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: pathname === '/contact' ? '#E1E0CC' : 'rgba(225,224,204,0.45)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = pathname === '/contact' ? '#E1E0CC' : 'rgba(225,224,204,0.45)')}
            >
              Contact
              {pathname === '/contact' && <span className="absolute -bottom-[2px] left-0 right-0 h-px" style={{ background: '#60a5fa' }} />}
            </Link>
          </div>
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center text-[11px] font-bold tracking-[0.18em] uppercase px-5 py-[10px] transition-all duration-200"
          style={{ color: '#E1E0CC', border: '1px solid rgba(225,224,204,0.18)' }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#60a5fa'; el.style.color = '#60a5fa' }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(225,224,204,0.18)'; el.style.color = '#E1E0CC' }}
        >
          Start a Project
        </Link>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          style={{ color: '#E1E0CC' }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="px-6 pt-4 pb-8 flex flex-col gap-1">
              <Link to="/about" className="text-sm font-medium tracking-[0.2em] uppercase py-3 border-b" style={{ color: 'rgba(225,224,204,0.55)', borderColor: 'rgba(255,255,255,0.05)' }}>About</Link>

              {/* Mobile Services accordion */}
              <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="w-full flex items-center justify-between text-sm font-medium tracking-[0.2em] uppercase py-3"
                  style={{ color: 'rgba(225,224,204,0.55)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Services
                  <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pb-2 flex flex-col gap-0.5">
                        {SERVICE_ITEMS.map((item) => (
                          <Link key={item.href} to={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
                            style={{ color: 'rgba(225,224,204,0.5)' }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.5)')}
                          >
                            <span style={{ color: '#60a5fa' }}>{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/#pricing" className="text-sm font-medium tracking-[0.2em] uppercase py-3 border-b" style={{ color: 'rgba(225,224,204,0.55)', borderColor: 'rgba(255,255,255,0.05)' }}>Pricing</Link>
              <Link to="/contact" className="text-sm font-medium tracking-[0.2em] uppercase py-3 border-b" style={{ color: 'rgba(225,224,204,0.55)', borderColor: 'rgba(255,255,255,0.05)' }}>Contact</Link>
              <Link to="/contact" className="mt-3 text-sm font-bold tracking-widest uppercase" style={{ color: '#60a5fa' }}>Start a Project →</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
