'use client'

import { useEffect, useRef } from 'react'

// ─── Data ──────────────────────────────────────────────────────────────────────

type Vec2 = [number, number]
type Seg  = [Vec2, Vec2, Vec2, Vec2]   // P0  CP1  CP2  P3

const NODES = [
  { id: 'src',   cx: 88,  cy: 188, r: 30, color: '#00D4FF', label: 'source',    sub: 'postgres_extract' },
  { id: 'trans', cx: 262, cy: 110, r: 24, color: '#818cf8', label: 'transform', sub: 'sql_transform'    },
  { id: 'filt',  cx: 262, cy: 268, r: 24, color: '#a78bfa', label: 'filter',    sub: 'row_filter'       },
  { id: 'out',   cx: 420, cy: 188, r: 30, color: '#4ade80', label: 'sink',      sub: 's3_sink'          },
]

// Edges drawn center-to-center; node fills cover the endpoints
const EDGE_PATHS = [
  { d: 'M 88 188 C 162 188, 162 110, 262 110', color: '#818cf8' },
  { d: 'M 88 188 C 162 188, 162 268, 262 268', color: '#a78bfa' },
  { d: 'M 262 110 C 338 110, 338 188, 420 188', color: '#818cf8' },
  { d: 'M 262 268 C 338 268, 338 188, 420 188', color: '#a78bfa' },
]

// Full chain paths: two bezier segs each, plus the node IDs + their t-positions (0–1)
const CHAINS: {
  color: string
  period: number
  delay: number
  segs: Seg[]
  nodeIds: string[]
  nodeTs: number[]
}[] = [
  {
    color: '#00D4FF',
    period: 3800,
    delay: 0,
    segs: [
      [[88, 188], [162, 188], [162, 110], [262, 110]],
      [[262, 110], [338, 110], [338, 188], [420, 188]],
    ],
    nodeIds: ['src', 'trans', 'out'],
    nodeTs:  [0,     0.5,     1],
  },
  {
    color: '#c084fc',
    period: 3800,
    delay: 0,
    segs: [
      [[88, 188], [162, 188], [162, 268], [262, 268]],
      [[262, 268], [338, 268], [338, 188], [420, 188]],
    ],
    nodeIds: ['src', 'filt', 'out'],
    nodeTs:  [0,     0.5,     1],
  },
]

// ─── Math ──────────────────────────────────────────────────────────────────────

function cubicBezier(t: number, p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2): Vec2 {
  const mt = 1 - t
  return [
    mt ** 3 * p0[0] + 3 * mt ** 2 * t * p1[0] + 3 * mt * t ** 2 * p2[0] + t ** 3 * p3[0],
    mt ** 3 * p0[1] + 3 * mt ** 2 * t * p1[1] + 3 * mt * t ** 2 * p2[1] + t ** 3 * p3[1],
  ]
}

function chainPos(t: number, segs: Seg[]): Vec2 {
  const n  = segs.length
  const st = t * n
  const si = Math.min(Math.floor(st), n - 1)
  const [p0, p1, p2, p3] = segs[si]
  return cubicBezier(st - si, p0, p1, p2, p3)
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function HeroGraph() {
  const glowRefs = useRef<Map<string, SVGCircleElement>>(new Map())
  const ballRefs = useRef<Array<SVGGElement | null>>([null, null])
  const startRef = useRef<number | null>(null)
  const rafRef   = useRef<number>(0)

  useEffect(() => {
    const glows     = glowRefs.current
    const balls     = ballRefs.current
    const intensity = new Map<string, number>(NODES.map(n => [n.id, 0]))

    const DECAY_RATE  = 0.025   // per frame ≈60fps → ~1.5s fade
    const GLOW_THRESH = 0.07    // fraction of chain where node glows

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current

      // Decay all node glows
      intensity.forEach((v, k) => intensity.set(k, Math.max(0, v - DECAY_RATE)))

      CHAINS.forEach((chain, ci) => {
        const adj  = elapsed - chain.delay
        const ball = balls[ci]
        if (!ball) return

        if (adj < 0) {
          ball.setAttribute('display', 'none')
          return
        }
        ball.setAttribute('display', 'inline')

        const t        = (adj % chain.period) / chain.period
        const [px, py] = chainPos(t, chain.segs)
        ball.setAttribute('transform', `translate(${px.toFixed(1)},${py.toFixed(1)})`)

        // Raise glow of any node the ball is passing near
        chain.nodeIds.forEach((nodeId, ni) => {
          let dist = Math.abs(t - chain.nodeTs[ni])
          if (dist > 0.5) dist = 1 - dist          // wrap
          if (dist < GLOW_THRESH) {
            const boost   = 1 - dist / GLOW_THRESH
            const current = intensity.get(nodeId) ?? 0
            if (boost > current) intensity.set(nodeId, boost)
          }
        })
      })

      // Write glow values to DOM
      NODES.forEach(n => {
        const el = glows.get(n.id)
        if (!el) return
        const g = intensity.get(n.id)!
        el.setAttribute('r',       String((n.r + g * 26).toFixed(1)))
        el.setAttribute('opacity', (g * 0.65).toFixed(3))
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="relative w-full max-w-lg">
      {/* Ambient background bloom */}
      <div
        className="absolute inset-0 rounded-2xl blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #00D4FF08 0%, transparent 70%)' }}
      />

      <svg viewBox="0 0 510 368" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Panel gradient */}
          <linearGradient id="hg-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#141820" />
            <stop offset="100%" stopColor="#0e1118" />
          </linearGradient>

          {/* Dot grid */}
          <pattern id="hg-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#00D4FF" opacity="0.08" />
          </pattern>

          {/* Node fill gradients */}
          {NODES.map(n => (
            <radialGradient key={n.id} id={`hg-nf-${n.id}`} cx="35%" cy="30%" r="65%">
              <stop offset="0%"   stopColor={n.color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.03" />
            </radialGradient>
          ))}

          {/* Outer glow for light ball */}
          <filter id="hg-ball-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          {/* Node expulsion glow */}
          <filter id="hg-node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="13" />
          </filter>
        </defs>

        {/* ── Panel ── */}
        <rect x="8" y="8" width="494" height="352" rx="18" fill="url(#hg-panel)" />
        <rect x="8" y="8" width="494" height="352" rx="18" fill="url(#hg-dots)"  />
        <rect x="8" y="8" width="494" height="352" rx="18" fill="none" stroke="#1e2535" strokeWidth="1.5" />

        {/* ── Edges ── */}
        {EDGE_PATHS.map((ep, i) => (
          <g key={i}>
            {/* Soft ambient trace */}
            <path d={ep.d} fill="none" stroke={ep.color}
              strokeWidth="7" strokeOpacity="0.06" strokeLinecap="round" />
            {/* Flowing dashes */}
            <path d={ep.d} fill="none" stroke={ep.color}
              strokeWidth="1.4" strokeOpacity="0.32" strokeLinecap="round"
              strokeDasharray="5 8"
              className={
                i === 0 ? 'animate-flow'
                : i === 1 ? 'animate-flow-delay-1'
                : i === 2 ? 'animate-flow-delay-2'
                : 'animate-flow'
              }
            />
          </g>
        ))}

        {/* ── Node glow halos (driven by rAF) ── */}
        {NODES.map(n => (
          <circle
            key={`hg-glow-${n.id}`}
            ref={el => { if (el) glowRefs.current.set(n.id, el) }}
            cx={n.cx} cy={n.cy} r={n.r}
            fill={n.color} opacity="0"
            filter="url(#hg-node-glow)"
          />
        ))}

        {/* ── Node circles ── */}
        {NODES.map(n => (
          <g key={`hg-node-${n.id}`}>
            {/* Body */}
            <circle cx={n.cx} cy={n.cy} r={n.r}
              fill={`url(#hg-nf-${n.id})`}
              stroke={n.color} strokeWidth="1.8" strokeOpacity="0.72" />
            {/* Center pip */}
            <circle cx={n.cx} cy={n.cy} r={3.5}
              fill={n.color} opacity="0.55" />
            {/* Label above */}
            <text
              x={n.cx} y={n.cy - n.r - 9}
              textAnchor="middle" fill="#e5e7eb"
              fontSize="11" fontWeight="600"
              fontFamily="var(--font-inter), Inter, sans-serif"
            >
              {n.label}
            </text>
            {/* Type label below */}
            <text
              x={n.cx} y={n.cy + n.r + 13}
              textAnchor="middle" fill={n.color}
              fontSize="8.5" opacity="0.6"
              fontFamily="var(--font-mono), JetBrains Mono, monospace"
            >
              {n.sub}
            </text>
          </g>
        ))}

        {/* ── Light balls (driven by rAF) ── */}
        {CHAINS.map((chain, ci) => (
          <g
            key={`hg-ball-${ci}`}
            ref={el => { ballRefs.current[ci] = el }}
            display="none"
          >
            {/* Blurred outer corona */}
            <circle r="20" fill={chain.color} opacity="0.35" filter="url(#hg-ball-glow)" />
            {/* Colored mid */}
            <circle r="8"  fill={chain.color} opacity="0.55" />
            {/* Bright white core */}
            <circle r="4"  fill="white"       opacity="0.95" />
          </g>
        ))}

        {/* ── Legend ── */}
        <rect x="22" y="322" width="466" height="28" rx="7" fill="#0D0F14" opacity="0.88" />
        {[
          { cx: 42,  color: '#00D4FF', label: 'Source'    },
          { cx: 126, color: '#818cf8', label: 'Transform' },
          { cx: 238, color: '#4ade80', label: 'Sink'      },
        ].map(({ cx, color, label }) => (
          <g key={label}>
            <circle cx={cx} cy="336" r="4.5" fill={color} opacity="0.8" />
            <text x={cx + 11} y="340" fill="#6b7280" fontSize="10.5"
              fontFamily="var(--font-mono), JetBrains Mono, monospace">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
