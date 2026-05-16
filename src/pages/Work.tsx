import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import WordsPullUp from '../components/WordsPullUp'

function PageIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

const projects = [
  {
    title: 'El Duro Construction',
    category: 'Web Design',
    desc: 'Concrete & general construction contractor landing page.',
    url: 'https://contractor-demo.traviskenlocean1.workers.dev',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 55%, #1a3050 100%)',
  },
  {
    title: 'KŌSAI Miami',
    category: 'Web Design',
    desc: 'Japanese restaurant — dark, luxury dining experience.',
    url: 'https://restaurant-chi-two-55.vercel.app',
    gradient: 'linear-gradient(135deg, #1c0a00 0%, #3d1a00 55%, #5c2a0a 100%)',
  },
  {
    title: 'Solène Atelier',
    category: 'Web Design',
    desc: 'Luxury beauty & wellness studio.',
    url: 'https://beauty.traviskenlocean1.workers.dev',
    gradient: 'linear-gradient(135deg, #2d0f1a 0%, #4a1a2e 55%, #6b2a45 100%)',
  },
  {
    title: 'Nova Black',
    category: 'Web Design',
    desc: 'Premium automotive & luxury services.',
    url: 'https://nova-black-murex.vercel.app',
    gradient: 'linear-gradient(135deg, #09090f 0%, #0f1629 55%, #161e3a 100%)',
  },
  {
    title: 'Summit Roofing Co',
    category: 'Web Design',
    desc: 'Residential & commercial roofing contractor.',
    url: 'https://profound-puppy-6dab0b.netlify.app',
    gradient: 'linear-gradient(135deg, #0f1a2e 0%, #1a2f4a 55%, #243d60 100%)',
  },
  {
    title: 'Lala Sweets',
    category: 'Web Design',
    desc: 'Custom cakes, sweets, and bakery experience.',
    url: 'https://lalasweets.vercel.app',
    gradient: 'linear-gradient(135deg, #2d0a14 0%, #4a1224 55%, #6b1a36 100%)',
  },
]

export default function Work() {
  return (
    <PageIn>
      <section className="pt-[100px] pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p
            className="text-[10px] tracking-[0.32em] uppercase mb-5"
            style={{ color: 'rgba(225,224,204,0.3)' }}
          >
            Portfolio
          </p>
          <h1
            className="font-extrabold leading-[0.9] tracking-tight mb-5"
            style={{
              fontSize: 'clamp(48px, 9vw, 130px)',
              color: '#E1E0CC',
              letterSpacing: '-0.04em',
            }}
          >
            <WordsPullUp text="Our Work." />
          </h1>
          <p className="text-sm md:text-base max-w-lg" style={{ color: 'rgba(225,224,204,0.45)' }}>
            Every project built from scratch — custom-designed, not templated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden"
              style={{ background: '#111' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
            >
              <div
                className="h-52 relative overflow-hidden"
                style={{ background: p.gradient }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ background: p.gradient }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(15,23,42,0.55)' }}
                >
                  <span
                    className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2"
                    style={{ background: '#3b82f6', color: '#fff' }}
                  >
                    View Live
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: '#3b82f6' }}>
                  {p.category}
                </p>
                <p className="font-bold text-base mb-1" style={{ color: '#E1E0CC' }}>
                  {p.title}
                </p>
                <p className="text-xs" style={{ color: 'rgba(225,224,204,0.4)' }}>
                  {p.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </PageIn>
  )
}
