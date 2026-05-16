interface VLogoProps {
  size?: number
  showText?: boolean
}

export default function VLogo({ size = 46, showText = true }: VLogoProps) {
  const h = Math.round(size * 1.125)

  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={h}
        viewBox="0 0 80 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Gracious Grafx logo"
      >
        <defs>
          <filter id="gg-glow-a" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="gg-glow-b" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="gg-glow-c" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <line x1="78" y1="4" x2="40" y2="86" stroke="rgba(225,224,204,0.28)" strokeWidth="7" strokeLinecap="round" />
        <line x1="2" y1="4" x2="40" y2="86" stroke="rgba(225,224,204,0.1)" strokeWidth="7" strokeLinecap="round" />
        <line x1="2" y1="4" x2="40" y2="86" stroke="#1d4ed8" strokeWidth="10" strokeLinecap="round" filter="url(#gg-glow-a)" className="v-glow-outer" />
        <line x1="2" y1="4" x2="40" y2="86" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" filter="url(#gg-glow-b)" className="v-glow-mid" />
        <line x1="2" y1="4" x2="40" y2="86" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" filter="url(#gg-glow-c)" className="v-glow-core" />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none gap-[3px]">
          <span className="font-extrabold text-[10px] sm:text-[11px]" style={{ color: '#E1E0CC', letterSpacing: '0.22em' }}>GRACIOUS</span>
          <span className="font-extrabold text-[10px] sm:text-[11px]" style={{ color: '#3b82f6', letterSpacing: '0.22em' }}>GRAFX</span>
        </div>
      )}
    </div>
  )
}
