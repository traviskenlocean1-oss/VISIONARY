import { Link } from 'react-router-dom'
import { Instagram, Facebook } from 'lucide-react'
import VLogo from './VLogo'

export default function Footer() {
  return (
    <footer
      className="border-t px-6 md:px-12 pt-14 pb-8"
      style={{ background: '#050505', borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-12">
          <Link to="/">
            <VLogo size={40} showText={true} />
          </Link>

          <nav className="flex flex-col gap-3 md:items-center">
            {[
              { label: 'Our Work', href: '/work' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: 'rgba(225,224,204,0.3)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.3)')
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex md:justify-end gap-5 items-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'rgba(225,224,204,0.35)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.35)')
              }
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'rgba(225,224,204,0.35)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.35)')
              }
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.04)', color: 'rgba(225,224,204,0.16)' }}
        >
          <span>© {new Date().getFullYear()} Gracious Grafx. All rights reserved.</span>
          <span style={{ letterSpacing: '0.1em' }}>BRINGING STORIES TO LIFE VISUALLY</span>
        </div>
      </div>
    </footer>
  )
}
