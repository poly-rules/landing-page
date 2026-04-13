"use client";
import Link from "next/link";
import RSVPModal from "./RSVPModal";
import { useState } from "react";

export default function Navbar() {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className="text-xl font-bold tracking-[-0.04em] font-[family-name:var(--font-mono)] select-none">
            <span className="text-[#00D4FF] group-hover:brightness-125 transition-[filter]">d</span>
            <span className="text-white/90 group-hover:text-white transition-colors">flow</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#how-it-works" className="hover:text-[#00D4FF] transition-colors">How it works</a>
          <a href="#by-role" className="hover:text-[#00D4FF] transition-colors">Who it&apos;s for</a>
          <a href="#features" className="hover:text-[#00D4FF] transition-colors">Features</a>
        </div>

        {/* Actions */}
        <button
          onClick={() => setRsvpOpen(true)}
          className="inline-flex px-5 py-2 text-sm font-semibold bg-[#7C3AED] text-white rounded-xl hover:bg-[#7C3AED]/90 transition-all shadow-lg hover:shadow-[#7C3AED]/40"
        >
          Request Access
        </button>
      </nav>
    </header>

    <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </>
  );
}
