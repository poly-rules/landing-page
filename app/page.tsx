import Link from "next/link";
import Navbar from "./components/Navbar";
import HeroGraph from "./components/HeroGraph";
import RSVPButton from "./components/RSVPButton";

// ─── Icons ────────────────────────────────────────────────────────────────────

function Icon({
  d,
  className = "w-5 h-5",
}: {
  d: string | string[];
  className?: string;
}) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
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
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L60 0 L60 1 L0 1Z' fill='%23ffffff08'/%3E%3Cpath d='M0 0 L0 60 L1 60 L1 0Z' fill='%23ffffff08'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
              Early Access
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-6">
              Your business logic.
              <br />
              <span className="text-[#00D4FF]">Owned by your team.</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
              Dflow is a visual workflow editor that lets business teams build,
              validate, and publish their own rules — without writing code or
              waiting on engineering.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Built-in AI helps you describe what you need and understand what
              went wrong. The engine makes sure nothing broken reaches
              production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <RSVPButton className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00D4FF] text-[#0D0F14] font-semibold rounded-lg hover:bg-[#00D4FF]/90 transition-colors text-sm cursor-pointer">
                <Icon d={icons.arrowRight} className="w-4 h-4" />
                Join the early access list
              </RSVPButton>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-gray-300 font-medium rounded-lg hover:border-white/40 hover:text-white transition-colors text-sm"
              >
                See how it works
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-600 text-center lg:text-left">
              No commitment. We&apos;ll reach out when your spot is ready.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroGraph />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: icons.check, label: "No code required" },
    { icon: icons.shieldCheck, label: "Validated before it ships" },
    { icon: icons.history, label: "Every change traceable" },
  ];
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-gray-500 font-medium">
          {items.map(({ icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <Icon d={icon} className="w-4 h-4" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-24 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
          The problem
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
          with another. You still can&apos;t see what&apos;s running, change it
          yourself, or understand why it failed without technical help.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Engineering sets the guardrails",
      desc: "Define the approved operations once. Everything built after that stays within bounds.",
    },
    {
      num: "02",
      title: "Your team builds the flow",
      desc: "Drag nodes into place or describe the rule — the AI drafts it. Review and publish yourself.",
    },
    {
      num: "03",
      title: "Nothing broken ships",
      desc: "Dflow checks every flow before it goes live. Errors are caught here, not in production.",
    },
    {
      num: "04",
      title: "Run it. Trace it. Fix it fast.",
      desc: "Full execution history on every run. When something breaks, ask the AI what happened.",
    },
  ];
  return (
    <section id="how-it-works" className="py-24 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            From idea to production in four steps
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="text-center md:text-left">
              <div className="text-6xl font-black text-[#00D4FF]/10 leading-none mb-4 font-mono">
                {num}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
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
        "Build and publish workflow changes directly in the visual editor",
        "Describe a rule in plain language — the AI drafts it for you to review",
        "When something breaks, ask what happened instead of filing a request",
      ],
    },
    {
      accent: "#a78bfa",
      label: "Business Lead",
      headline: "Full visibility into what's running",
      bullets: [
        "See every published version, when it went live, and what changed",
        "Understand failures in plain language — no engineering translation needed",
        "Own your business rules without owning a codebase",
      ],
    },
    {
      accent: "#4ade80",
      label: "CTO / Engineering Lead",
      headline: "Empower your team without losing control",
      bullets: [
        "Define the catalog once — AI and business users can only operate within it",
        "Nothing ships unless it passes compile-time type checking",
        "Full version history and execution trace for every flow, always",
      ],
    },
  ];
  return (
    <section id="by-role" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
            Built for every stakeholder
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            One tool. Three teams. No more silos.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map(({ accent, label, headline, bullets }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-5"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                {label}
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
      desc: "Every published flow is an immutable record. Previous versions are always recoverable. You always know what ran, when it was published, and what changed.",
    },
    {
      icon: icons.puzzle,
      title: "Governed operation catalog",
      accent: "#fb923c",
      desc: "Engineering defines the typed building blocks once. Business teams and the AI can only compose flows from approved operations — no surprises, no drift.",
    },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything the team needs. Nothing they don&apos;t.
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A visual editor for business teams, compile-time safety for
            engineering, and an AI layer that helps everyone move faster.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ icon, title, accent, desc }) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                <Icon d={icon} />
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
        "We used to file a ticket every time a routing rule changed. Now the ops team handles it directly in Dflow. What used to take two weeks takes an afternoon.",
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
        "I was nervous about giving non-engineers a tool to publish business logic. Dflow's catalog and compile gate changed that. They build, we govern, nothing broken ships.",
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
            Early feedback
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What teams are saying
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map(({ quote, name, company, accent }) => (
            <div
              key={name}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 flex flex-col gap-6"
            >
              <span style={{ color: accent }}>
                <Icon d={icons.quote} className="w-6 h-6 opacity-40" />
              </span>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </p>
              <div>
                <p className="text-white text-sm font-semibold">{name}</p>
                <p className="text-gray-500 text-xs">{company}</p>
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
        <div
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, #1E293B 0%, #3b1f6e 60%, #7C3AED 100%)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #7C3AED33 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to give your team the controls?
            </h2>
            <p className="text-lg text-purple-200/70 mb-8 max-w-xl mx-auto">
              Dflow is in early access. Join the list and we&apos;ll reach out
              when your spot is ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RSVPButton className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1E293B] font-bold rounded-xl hover:bg-white/90 transition-colors text-sm cursor-pointer">
                Join the early access list
              </RSVPButton>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-sm"
              >
                See how it works
              </a>
            </div>
            <p className="mt-5 text-xs text-purple-200/40">
              No commitment. We&apos;ll reach out when your spot is ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ul className="flex items-center justify-center gap-6 text-sm text-gray-500">
          {["Blog", "Careers", "Privacy"].map((label) => (
            <li key={label}>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
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
