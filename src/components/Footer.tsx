import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail, Phone, Globe, Clock } from 'lucide-react'
import VLogo from './VLogo'

const SOCIAL_LINKS = [
  { icon: <Facebook size={16} />, href: 'https://facebook.com/visionarywebstudio', label: 'Facebook' },
  { icon: <Mail size={16} />, href: 'mailto:Visionarywebstudio6@gmail.com', label: 'Email' },
  { icon: <Instagram size={16} />, href: 'https://instagram.com/visionarywebstudio', label: 'Instagram' },
]

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Contact', to: '/contact' },
]

const SERVICES = [
  { label: 'Website Creation', to: '/services#website-creation' },
  { label: 'Website Redesign', to: '/services#website-redesign' },
  { label: 'Website Maintenance', to: '/services#support' },
  { label: 'Logo & Branding', to: '/services#logo-branding' },
  { label: 'Get a Quote', to: '/contact' },
]

const CONTACT_ITEMS = [
  { icon: <Phone size={14} />, label: 'Call Us', value: '(561) 889-0507', href: 'tel:5618890507' },
  { icon: <Mail size={14} />, label: 'Email Us', value: 'Visionarywebstudio6@gmail.com', href: 'mailto:Visionarywebstudio6@gmail.com' },
  { icon: <Globe size={14} />, label: 'Serving Worldwide', value: 'Remote collaboration specialists', href: '#' },
  { icon: <Clock size={14} />, label: 'Quick Response', value: '24-hour reply guarantee', href: '#' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#03050e', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Col 1 — Logo + description + socials */}
          <div>
            <Link to="/"><VLogo size={40} showText={true} /></Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(225,224,204,0.38)', maxWidth: '220px' }}>
              Creating professional websites for businesses worldwide. Your success is our mission.
            </p>
            <div className="flex gap-2.5 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ width: 38, height: 38, background: 'rgba(59,130,246,0.16)', border: '1px solid rgba(96,165,250,0.22)', color: '#60a5fa' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.32)'; el.style.borderColor = 'rgba(96,165,250,0.5)'; el.style.color = '#93c5fd' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.16)'; el.style.borderColor = 'rgba(96,165,250,0.22)'; el.style.color = '#60a5fa' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-5" style={{ color: '#60a5fa' }}>Quick Links</p>
            <div className="flex flex-col gap-3">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.to + l.label}
                  to={l.to}
                  className="flex items-center gap-2 text-sm transition-colors duration-200"
                  style={{ color: 'rgba(225,224,204,0.42)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.42)')}
                >
                  <span style={{ color: '#3b82f6', fontSize: '12px', lineHeight: 1 }}>›</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Our Services */}
          <div>
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-5" style={{ color: '#60a5fa' }}>Our Services</p>
            <div className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.label}
                  to={s.to}
                  className="flex items-center gap-2 text-sm transition-colors duration-200"
                  style={{ color: 'rgba(225,224,204,0.42)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E1E0CC')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(225,224,204,0.42)')}
                >
                  <span style={{ color: '#3b82f6', fontSize: '12px', lineHeight: 1 }}>›</span>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 — Get In Touch */}
          <div>
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase mb-5" style={{ color: '#60a5fa' }}>Get In Touch</p>
            <div className="flex flex-col gap-4">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-3 no-underline group"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-105"
                    style={{ width: 30, height: 30, background: 'rgba(59,130,246,0.14)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa', marginTop: '1px' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#E1E0CC' }}>{item.label}</p>
                    <p className="text-xs mt-0.5 transition-colors duration-200 group-hover:text-blue-300" style={{ color: '#60a5fa' }}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-6 rounded-xl font-bold text-sm px-6 py-3 transition-all duration-200"
              style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#2563eb'; el.style.boxShadow = '0 0 32px rgba(59,130,246,0.55)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#3b82f6'; el.style.boxShadow = '0 0 20px rgba(59,130,246,0.3)' }}
            >
              Start Your Project
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span className="text-xs" style={{ color: 'rgba(225,224,204,0.18)' }}>
            © {new Date().getFullYear()} Visionary Web Studio. All rights reserved.
          </span>
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(225,224,204,0.18)' }}>
            Your Vision. Our Digital Reality.
          </span>
        </div>
      </div>
    </footer>
  )
}
