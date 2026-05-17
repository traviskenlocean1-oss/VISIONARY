interface VLogoProps {
  size?: number
  showText?: boolean
}

export default function VLogo({ size = 54, showText = true }: VLogoProps) {
  const h = Math.round(size * 1.175)

  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={h}
        viewBox="0 0 80 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Visionary Web Studio logo"
      >
        <defs>
          {/* Outer bloom — spreads wide */}
          <filter id="vws-glow-a" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Mid glow */}
          <filter id="vws-glow-b" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Tight core glow */}
          <filter id="vws-glow-c" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* SHIELD OUTER FRAME — octagon with flat top + pointed bottom */}
        <path
          d="M 11,2 L 69,2 L 78,11 L 78,67 L 40,91 L 2,67 L 2,11 Z"
          stroke="rgba(225,224,204,0.18)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.02)"
        />

        {/* SHIELD INNER DEPTH LINE — creates 3-D layered look */}
        <path
          d="M 15,7 L 65,7 L 73,15 L 73,64 L 40,86 L 7,64 L 7,15 Z"
          stroke="rgba(225,224,204,0.07)"
          strokeWidth="1"
          fill="none"
        />

        {/* TOP-LEFT CORNER BRACKET — fills gap between outer & inner at top-left */}
        <path
          d="M 2,11 L 11,2 L 25,2 L 25,7 L 15,7 L 7,15 Z"
          fill="rgba(225,224,204,0.09)"
          stroke="rgba(225,224,204,0.15)"
          strokeWidth="0.5"
        />

        {/* TOP-RIGHT CORNER BRACKET */}
        <path
          d="M 78,11 L 69,2 L 55,2 L 55,7 L 65,7 L 73,15 Z"
          fill="rgba(225,224,204,0.09)"
          stroke="rgba(225,224,204,0.15)"
          strokeWidth="0.5"
        />

        {/* V RIGHT ARM — solid bold polygon, light/static */}
        <polygon
          points="77,4 61,4 40,80 37,80"
          fill="rgba(225,224,204,0.28)"
        />

        {/* V LEFT ARM — dim base polygon */}
        <polygon
          points="3,4 19,4 40,80 37,80"
          fill="rgba(225,224,204,0.08)"
        />

        {/* V LEFT ARM — deep blue outer bloom */}
        <polygon
          points="3,4 19,4 40,80 37,80"
          fill="#1d4ed8"
          filter="url(#vws-glow-a)"
          className="v-glow-outer"
        />

        {/* V LEFT ARM — mid blue fill */}
        <polygon
          points="5,4 17,4 40,78 38,78"
          fill="#3b82f6"
          filter="url(#vws-glow-b)"
          className="v-glow-mid"
        />

        {/* V LEFT ARM — bright core edge line along the inner edge */}
        <line
          x1="19" y1="4" x2="40" y2="80"
          stroke="#e0f2fe"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#vws-glow-c)"
          className="v-glow-core"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none gap-[3px]">
          <span
            className="font-extrabold text-[10px] sm:text-[11px]"
            style={{ color: '#E1E0CC', letterSpacing: '0.22em' }}
          >
            VISIONARY
          </span>
          <span
            className="font-extrabold text-[10px] sm:text-[11px]"
            style={{ color: '#60a5fa', letterSpacing: '0.22em' }}
          >
            WEB STUDIO
          </span>
        </div>
      )}
    </div>
  )
}
