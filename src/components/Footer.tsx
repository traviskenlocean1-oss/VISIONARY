import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail } from 'lucide-react'
import VLogo from './VLogo'

export default function Footer() {
  return (
    <footer
      className="border-t px-6 md:px-12 pt-14 pb-8"
      style={{ background: '#050505', borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-12">
          <div>
            <Link to="/"><VLogo size={42} showText={true} /></Link>
            <p className="mt-4 text-xs leading-relaxed max-w-[220px]" style={{ color: 'rgba(225,224,204,0.28)' }}>
              Websites that turn attention into results.
            </p>
          </div>

          <nav className="flex flex-col gap-3 md:items-center">
            {[
              { label: 'About', href: '/about' },
              { label: 'Pricing', href: '/#pricing' },
              { label: 'Contact', href: '/contact' },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: 'rgba(225,224,204,0.3)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.3)')}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex md:justify-end gap-5 items-center">
            <a href="mailto:traviskenlocean1@gmail.com" className="transition-colors duration-200" style={{ color: 'rgba(225,224,204,0.35)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.35)')}
              aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200" style={{ color: 'rgba(225,224,204,0.35)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.35)')}
              aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200" style={{ color: 'rgba(225,224,204,0.35)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.35)')}
              aria-label="Facebook">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.04)', color: 'rgba(225,224,204,0.16)' }}
        >
          <span>© {new Date().getFullYear()} Visionary Web Studio. All rights reserved.</span>
          <span style={{ letterSpacing: '0.1em' }}>YOUR VISION. OUR DIGITAL REALITY.</span>
        </div>
      </div>
    </footer>
  )
}
