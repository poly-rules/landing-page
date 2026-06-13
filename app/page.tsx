import React from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import RSVPButton from "./components/RSVPButton";
import ElectronOrbit from "./components/ElectronOrbit";

// ─── Glass style constants ────────────────────────────────────────────────────

const glass = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
} as const;

const glassSubtle = {
  background: "rgba(255,255,255,0.025)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
} as const;

function glassAccent(hex: string) {
  return {
    background: `color-mix(in srgb, ${hex} 6%, transparent)`,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid color-mix(in srgb, ${hex} 22%, transparent)`,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 0 transparent`,
  } as const;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function Icon({
  d,
  className = "w-5 h-5",
  style,
}: {
  d: string | string[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

const icons = {
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  check: "M20 6L9 17l-5-5",
  layout: ["M3 3h18v18H3z", "M3 9h18", "M9 21V9"],
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  search: ["M21 21l-4.35-4.35", "M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0"],
  shieldCheck: [
    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    "M9 12l2 2 4-4",
  ],
  history: ["M3 3v5h5", "M3.05 13A9 9 0 1 0 6 5.3L3 8"],
  puzzle: [
    "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z",
    "M7 7h.01",
  ],
  quote: [
    "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",
    "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
  ],
};

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F14]/60 via-[#0D0F14]/40 to-[#0D0F14] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Centered text block */}
        <div className="text-center mb-16">
          {/* Glass badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[#00D4FF] text-xs font-medium mb-8"
            style={glassAccent("#00D4FF")}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            Early Access — Visual Rule Engine
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-5">
            Your business logic.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #fff 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Owned by your team.
            </span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Build and publish decision flows without code — validated before
            they ship, traceable after they run.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RSVPButton className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7C3AED] text-white font-semibold rounded-xl hover:bg-[#7C3AED]/90 transition-all shadow-lg hover:shadow-[#7C3AED]/40 text-sm cursor-pointer">
              <Icon d={icons.arrowRight} className="w-4 h-4" />
              Join the early access list
            </RSVPButton>
            {/* Ghost glass CTA */}
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-gray-300 font-medium hover:text-white transition-colors text-sm"
              style={glassSubtle}
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Hero animation */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 pointer-events-none" />
          <div className="relative rounded-3xl p-2 md:p-4 shadow-2xl overflow-hidden" style={glass}>
            <div className="rounded-2xl overflow-hidden border border-white/5 shadow-inner">
              <ElectronOrbit />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: icons.check, label: "No code required", accent: "#00D4FF" },
    { icon: icons.shieldCheck, label: "Validated before it ships", accent: "#a78bfa" },
    { icon: icons.history, label: "Every change is traceable", accent: "#4ade80" },
  ];
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Glass strip */}
        <div
          className="rounded-2xl px-8 py-5"
          style={glassSubtle}
        >
          <ul className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {items.map(({ icon, label, accent }) => (
              <li key={label} className="flex items-center gap-3">
                {/* Accent glass icon chip */}
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={glassAccent(accent)}
                >
                  <Icon d={icon} className="w-3.5 h-3.5" style={{ color: accent }} />
                </span>
                <span className="text-sm font-medium text-gray-400">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-24 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Glass card wrapping the problem statement */}
        <div className="relative rounded-3xl p-10 lg:p-14 text-center" style={glass}>
          {/* Subtle top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)" }}
          />
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
            Sound familiar?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Business logic shouldn&apos;t live where only engineers can reach it
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg mb-4">
            Routing rules, approval conditions, escalation thresholds — this logic
            drives your business, but it&apos;s buried in code. Every change needs
            a ticket, a sprint, and a deployment. Every incident needs engineering
            to explain what happened.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Most automation tools promise to fix this but replace one black box
            with another. Poly is different: your team builds the rules, tracks every
            version, and understands every failure — without touching code.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      accent: "#00D4FF",
      title: "Engineering sets the guardrails",
      desc: "Define the approved operations once. Everything built after that stays within bounds.",
    },
    {
      num: "02",
      accent: "#a78bfa",
      title: "Your team builds the flow",
      desc: "Drag nodes into place or describe the rule — the AI drafts the flow. Review and publish yourself.",
    },
    {
      num: "03",
      accent: "#f59e0b",
      title: "Nothing broken ships",
      desc: "Poly checks every flow before it goes live. Errors are caught here, not in production.",
    },
    {
      num: "04",
      accent: "#4ade80",
      title: "Run it. Trace it. Fix it fast.",
      desc: "Full execution history on every run. When something breaks, ask the AI what happened.",
    },
  ];
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            From idea to production in four steps
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(({ num, accent, title, desc }) => (
            <div
              key={num}
              className="relative rounded-2xl p-7 overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              style={glassAccent(accent)}
            >
              {/* Watermark number */}
              <div
                className="absolute -top-2 -right-1 text-8xl font-black leading-none select-none pointer-events-none"
                style={{ color: accent, opacity: 0.07 }}
              >
                {num}
              </div>
              {/* Accent top edge line */}
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
              />
              {/* Step chip */}
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-5"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                {num}
              </span>
              <h3 className="text-base font-semibold text-white mb-2 leading-snug">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsByRole() {
  const roles = [
    {
      accent: "#00D4FF",
      label: "Operations Lead",
      headline: "Stop waiting on a ticket",
      bullets: [
        "Build and publish rule changes directly in the visual editor",
        "Describe a rule in plain language — the AI drafts it for you to review",
        "When something breaks, ask what happened instead of filing a request",
      ],
    },
    {
      accent: "#a78bfa",
      label: "Business Lead",
      headline: "Full visibility, no surprises",
      bullets: [
        "See every published version, when it went live, and what changed",
        "Understand failures in plain language — no engineering translation needed",
        "Own your business rules without owning a codebase",
      ],
    },
    {
      accent: "#4ade80",
      label: "CTO / Engineering Lead",
      headline: "Move fast. Break nothing.",
      bullets: [
        "Set the catalog once — your team and the AI can only build within it",
        "Nothing ships unless it passes compile-time type checking",
        "Full version history and execution trace on every flow, always",
      ],
    },
  ];
  return (
    <section id="by-role" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
            Who it&apos;s for
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            One tool. Three teams. No more silos.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map(({ accent, label, headline, bullets }) => (
            <div
              key={label}
              className="relative rounded-2xl p-8 overflow-hidden group hover:scale-[1.01] transition-transform duration-300"
              style={glassAccent(accent)}
            >
              {/* Ambient glow blob */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)` }}
              />
              {/* Top edge shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }}
              />

              {/* Role badge */}
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={glassAccent(accent)}
              >
                <span style={{ color: accent }}>{label}</span>
              </span>

              <h3 className="text-xl font-bold text-white mb-4">{headline}</h3>
              <ul className="space-y-3">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed"
                  >
                    <span style={{ color: accent }} className="mt-0.5 shrink-0">
                      <Icon d={icons.check} className="w-4 h-4" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const cards = [
    {
      icon: icons.layout,
      title: "Visual drag-and-drop editor",
      accent: "#00D4FF",
      desc: "Connect operation nodes to build workflows. No code, no YAML, no scripts. If you can draw a diagram, you can build a flow.",
    },
    {
      icon: icons.zap,
      title: "AI-assisted authoring",
      accent: "#a78bfa",
      desc: "Describe a business rule in plain language. The AI proposes a flow for you to review and adjust. No blank canvas, no guesswork.",
    },
    {
      icon: icons.search,
      title: "AI-assisted debugging",
      accent: "#f59e0b",
      desc: "Describe what went wrong in plain language. The AI explains what happened and where. No log files, no stack traces.",
    },
    {
      icon: icons.shieldCheck,
      title: "Compile-time validation",
      accent: "#4ade80",
      desc: "Every flow is type-checked and compiled before publishing. Broken logic, mismatched types, and unresolved references are rejected before they can run.",
    },
    {
      icon: icons.history,
      title: "Versioned audit trail",
      accent: "#38bdf8",
      desc: "Every published flow is a permanent snapshot. Previous versions are always recoverable. You always know what ran, when it was published, and what changed.",
    },
    {
      icon: icons.puzzle,
      title: "Governed operation catalog",
      accent: "#fb923c",
      desc: "Engineering defines the approved building blocks once. Business teams and the AI can only compose flows from that catalog — no surprises, no drift.",
    },
  ];
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
            What you get
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything the team needs. Nothing they don&apos;t.
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A visual editor your business team can use today, compile-time
            safety your engineering team will trust, and an AI layer that
            helps everyone move faster.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(({ icon, title, accent, desc }) => (
            <div
              key={title}
              className="group relative rounded-2xl p-8 overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              style={glass}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 20%, ${accent}0d 0%, transparent 60%)` }}
              />
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
              />

              {/* Glass icon container */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={glassAccent(accent)}
              >
                <Icon d={icon} className="w-5 h-5" style={{ color: accent }} />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      quote:
        "We used to file a ticket every time a routing rule changed. Now the ops team handles it directly in Poly. What used to take two weeks takes an afternoon.",
      name: "Head of Operations",
      company: "Logistics company",
      accent: "#00D4FF",
    },
    {
      quote:
        "For the first time I can see exactly what logic is running and when it was last changed. When something goes wrong, I don't have to wait for engineering to explain it.",
      name: "VP Product",
      company: "Fintech",
      accent: "#a78bfa",
    },
    {
      quote:
        "I was nervous about giving non-engineers a tool to publish business logic. Poly's catalog and compile gate changed that. They build, we govern, nothing broken ships.",
      name: "CTO",
      company: "E-commerce platform",
      accent: "#4ade80",
    },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
            In their words
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Teams that stopped filing tickets
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map(({ quote, name, company, accent }) => (
            <div
              key={name}
              className="relative rounded-2xl p-8 flex flex-col gap-6 overflow-hidden"
              style={glass}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }}
              />
              {/* Large watermark quote icon */}
              <div
                className="absolute -top-2 -right-2 pointer-events-none select-none"
                style={{ color: accent, opacity: 0.06 }}
              >
                <Icon d={icons.quote} className="w-24 h-24" />
              </div>

              {/* Small glass quote icon */}
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={glassAccent(accent)}
              >
                <Icon d={icons.quote} className="w-4 h-4" style={{ color: accent }} />
              </span>

              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Author glass chip */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl self-start"
                style={glassSubtle}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: `${accent}20`, color: accent }}
                >
                  {name[0]}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{name}</p>
                  <p className="text-gray-500 text-xs">{company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-12 lg:p-20 text-center" style={glass}>
          {/* Ambient gradient blobs behind the glass */}
          <div
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }}
          />
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)" }}
          />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Your team shouldn&apos;t need a ticket to change a rule.
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Poly is in early access. Join the list — we&apos;ll reach out
              when your spot is ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RSVPButton className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#7C3AED] text-white font-bold rounded-xl hover:bg-[#7C3AED]/90 transition-all shadow-lg hover:shadow-[#7C3AED]/40 text-sm cursor-pointer">
                Join the early access list
              </RSVPButton>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-gray-300 font-medium hover:text-white transition-colors text-sm"
                style={glassSubtle}
              >
                See how it works
              </a>
            </div>
            <p className="mt-5 text-xs text-gray-600">
              No commitment. No spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl px-8 py-5 flex items-center justify-between" style={glassSubtle}>
          <span className="text-sm font-bold tracking-[-0.04em] font-mono">
            <span className="text-[#00D4FF]">d</span>
            <span className="text-white/50">flow</span>
          </span>
          <ul className="flex items-center gap-6 text-sm text-gray-500">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "#" },
              { label: "Privacy", href: "#" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-gray-300 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Problem />
        <HowItWorks />
        <BenefitsByRole />
        <Features />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
