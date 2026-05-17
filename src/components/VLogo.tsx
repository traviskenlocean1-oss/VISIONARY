interface VLogoProps {
  size?: number
  showText?: boolean
}

export default function VLogo({ size = 54, showText = true }: VLogoProps) {
  const h = Math.round(size * 1.125)

  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={h}
        viewBox="0 0 80 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Visionary Web Studio logo"
      >
        <defs>
          <filter id="vws-glow-a" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="vws-glow-b" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="vws-glow-c" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Right arm — static */}
        <line x1="78" y1="4" x2="40" y2="86" stroke="rgba(225,224,204,0.28)" strokeWidth="11" strokeLinecap="round" />
        {/* Left arm — dim base */}
        <line x1="2" y1="4" x2="40" y2="86" stroke="rgba(225,224,204,0.1)" strokeWidth="11" strokeLinecap="round" />
        {/* Left arm — outer bloom */}
        <line x1="2" y1="4" x2="40" y2="86" stroke="#1d4ed8" strokeWidth="18" strokeLinecap="round" filter="url(#vws-glow-a)" className="v-glow-outer" />
        {/* Left arm — mid glow */}
        <line x1="2" y1="4" x2="40" y2="86" stroke="#60a5fa" strokeWidth="10" strokeLinecap="round" filter="url(#vws-glow-b)" className="v-glow-mid" />
        {/* Left arm — bright core */}
        <line x1="2" y1="4" x2="40" y2="86" stroke="#e0f2fe" strokeWidth="4" strokeLinecap="round" filter="url(#vws-glow-c)" className="v-glow-core" />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none gap-[3px]">
          <span className="font-extrabold text-[10px] sm:text-[11px]" style={{ color: '#E1E0CC', letterSpacing: '0.22em' }}>VISIONARY</span>
          <span className="font-extrabold text-[10px] sm:text-[11px]" style={{ color: '#60a5fa', letterSpacing: '0.22em' }}>WEB STUDIO</span>
        </div>
      )}
    </div>
  )
}
