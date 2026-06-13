export default function ElectronOrbit() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 510 368"
        className="w-full h-auto block"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Panel gradient */}
          <linearGradient id="eo-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#141820" />
            <stop offset="100%" stopColor="#0e1118" />
          </linearGradient>

          {/* Dot grid */}
          <pattern id="eo-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#00D4FF" opacity="0.08" />
          </pattern>

          {/* Nucleus core radial gradient */}
          <radialGradient id="eo-core" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
          </radialGradient>

          {/* Ambient bloom radial gradient */}
          <radialGradient id="eo-bloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0"   />
          </radialGradient>

          {/* Electron corona blur */}
          <filter id="eo-glow-sm" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="5" />
          </filter>

          {/* Nucleus halo blur */}
          <filter id="eo-glow-lg" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="14" />
          </filter>

          {/*
            Orbit paths for <animateMotion> — un-rotated ellipses centered at (255,184).
            Rotation is applied via the parent <g> transform; these paths are used as-is
            in that local coordinate space, producing the correct rotated orbit in screen space.
          */}
          <path id="eo-path-a" d="M 395 184 A 140 55 0 1 0 394.999 184" fill="none" />
          <path id="eo-path-b" d="M 355 184 A 100 90 0 1 0 354.999 184" fill="none" />
          <path id="eo-path-c" d="M 335 184 A 80  40 0 1 0 334.999 184" fill="none" />
        </defs>

        {/* ── Panel background ── */}
        <rect x="8" y="8" width="494" height="352" rx="18" fill="url(#eo-panel)" />
        <rect x="8" y="8" width="494" height="352" rx="18" fill="url(#eo-dots)"  />
        <rect x="8" y="8" width="494" height="352" rx="18" fill="none"
          stroke="#1e2535" strokeWidth="1.5" />

        {/* ── Ambient bloom ── */}
        <ellipse cx="255" cy="184" rx="200" ry="160" fill="url(#eo-bloom)" />

        {/* ── Orbit A — cyan, rx=140 ry=55, rotated −20° ── */}
        <g transform="rotate(-20,255,184)">
          <ellipse cx="255" cy="184" rx="140" ry="55"
            fill="none" stroke="#00D4FF" strokeWidth="0.8" strokeOpacity="0.12" />
          <ellipse cx="255" cy="184" rx="140" ry="55"
            fill="none" stroke="#00D4FF" strokeWidth="1.3" strokeOpacity="0.35"
            strokeDasharray="10 50">
            <animate attributeName="stroke-dashoffset" from="0" to="-60"
              dur="1.8s" repeatCount="indefinite" />
          </ellipse>
          <g className="eo-electron">
            <animateMotion dur="7s" repeatCount="indefinite">
              <mpath href="#eo-path-a" />
            </animateMotion>
            <circle r="12" fill="#00D4FF" opacity="0.3"  filter="url(#eo-glow-sm)" />
            <circle r="4"  fill="#00D4FF" opacity="0.9" />
          </g>
        </g>

        {/* ── Orbit B — purple, rx=100 ry=90, rotated 40°, counter-clockwise ── */}
        <g transform="rotate(40,255,184)">
          <ellipse cx="255" cy="184" rx="100" ry="90"
            fill="none" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.12" />
          <ellipse cx="255" cy="184" rx="100" ry="90"
            fill="none" stroke="#a78bfa" strokeWidth="1.3" strokeOpacity="0.35"
            strokeDasharray="8 60">
            <animate attributeName="stroke-dashoffset" from="0" to="68"
              dur="2.4s" repeatCount="indefinite" />
          </ellipse>
          <g className="eo-electron">
            {/* keyPoints="1;0" reverses direction for visual variety */}
            <animateMotion dur="9s" repeatCount="indefinite"
              keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath href="#eo-path-b" />
            </animateMotion>
            <circle r="10"  fill="#c084fc" opacity="0.28" filter="url(#eo-glow-sm)" />
            <circle r="3.5" fill="#c084fc" opacity="0.9" />
          </g>
        </g>

        {/* ── Orbit C — green, rx=80 ry=40, no rotation ── */}
        <g>
          <ellipse cx="255" cy="184" rx="80" ry="40"
            fill="none" stroke="#4ade80" strokeWidth="0.8" strokeOpacity="0.12" />
          <ellipse cx="255" cy="184" rx="80" ry="40"
            fill="none" stroke="#4ade80" strokeWidth="1.3" strokeOpacity="0.35"
            strokeDasharray="6 40">
            <animate attributeName="stroke-dashoffset" from="0" to="-46"
              dur="1.4s" repeatCount="indefinite" />
          </ellipse>
          <g className="eo-electron">
            <animateMotion dur="5.5s" repeatCount="indefinite">
              <mpath href="#eo-path-c" />
            </animateMotion>
            <circle r="9"   fill="#4ade80" opacity="0.25" filter="url(#eo-glow-sm)" />
            <circle r="3.5" fill="#4ade80" opacity="0.9" />
          </g>
        </g>

        {/* ── Nucleus halo ── */}
        <circle cx="255" cy="184" r="38" fill="#00D4FF" filter="url(#eo-glow-lg)">
          <animate attributeName="r"       values="38;54;38"       dur="3s"   repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.12;0.04;0.12" dur="3s"   repeatCount="indefinite" />
        </circle>

        {/* ── Nucleus core ── */}
        <circle cx="255" cy="184" r="16" fill="url(#eo-core)"
          stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.6">
          <animate attributeName="r" values="16;20;16" dur="2.4s" repeatCount="indefinite" />
        </circle>

        {/* ── Nucleus pip ── */}
        <circle cx="255" cy="184" r="7" fill="#00D4FF">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
        </circle>

        {/* ── Floating monospace labels ── */}
        <text x="340" y="90" fill="#00D4FF" fontSize="9"
          fontFamily="var(--font-mono), JetBrains Mono, monospace">
          10110
          <animate attributeName="opacity" values="0.4;0;0.4"
            dur="3.2s" repeatCount="indefinite" />
        </text>
        <text x="140" y="262" fill="#a78bfa" fontSize="9"
          fontFamily="var(--font-mono), JetBrains Mono, monospace">
          0xFF
          <animate attributeName="opacity" values="0.35;0;0.35"
            dur="4.5s" begin="1s" repeatCount="indefinite" />
        </text>
        <text x="362" y="210" fill="#4ade80" fontSize="9"
          fontFamily="var(--font-mono), JetBrains Mono, monospace">
          &lt;sig&gt;
          <animate attributeName="opacity" values="0.35;0;0.35"
            dur="3.8s" begin="2s" repeatCount="indefinite" />
        </text>
        <text x="102" y="112" fill="#818cf8" fontSize="9"
          fontFamily="var(--font-mono), JetBrains Mono, monospace">
          Δ=42
          <animate attributeName="opacity" values="0.3;0;0.3"
            dur="5s" begin="0.5s" repeatCount="indefinite" />
        </text>

        {/* ── Legend strip ── */}
        <rect x="22" y="322" width="466" height="28" rx="7" fill="#0D0F14" opacity="0.88" />
        <text x="255" y="340" textAnchor="middle" fill="#6b7280" fontSize="10.5"
          fontFamily="var(--font-mono), JetBrains Mono, monospace">
          electron activity · quantum data flow
        </text>
      </svg>
    </div>
  )
}
