import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import VLogo from './VLogo'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  function handlePricingClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            className="flex items-center gap-10 lg:gap-14 rounded-b-3xl px-10 py-[14px]"
            style={{
              background: 'rgba(5,5,5,0.7)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderTop: 'none',
            }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={l.href === '/#pricing' ? handlePricingClick : undefined}
                className="relative text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ color: pathname === l.href ? '#E1E0CC' : 'rgba(225,224,204,0.45)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = pathname === l.href ? '#E1E0CC' : 'rgba(225,224,204,0.45)')}
              >
                {l.label}
                {pathname === l.href && (
                  <span className="absolute -bottom-[2px] left-0 right-0 h-px" style={{ background: '#60a5fa' }} />
                )}
              </Link>
            ))}
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

      {mobileOpen && (
        <div
          className="md:hidden px-6 pt-2 pb-8 border-t flex flex-col gap-5"
          style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm font-medium tracking-[0.2em] uppercase py-1"
              style={{ color: 'rgba(225,224,204,0.55)' }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="mt-2 text-sm font-bold tracking-widest uppercase" style={{ color: '#60a5fa' }}>
            Start a Project →
          </Link>
        </div>
      )}
    </header>
  )
}
