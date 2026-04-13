"use client";
import Link from "next/link";
import RSVPModal from "./RSVPModal";
import { useState } from "react";

export default function Navbar() {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0D0F14]/90 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span
            className="text-xl font-bold tracking-[-0.04em] font-[family-name:var(--font-mono)] select-none"
          >
            <span className="text-[#00D4FF] group-hover:brightness-125 transition-[filter]">d</span>
            <span className="text-white/90 group-hover:text-white transition-colors">flow</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRsvpOpen(true)}
            className="inline-flex px-4 py-1.5 text-sm font-semibold bg-[#00D4FF] text-[#0D0F14] rounded-full hover:bg-[#00D4FF]/90 transition-colors"
          >
            Request Access
          </button>
        </div>
      </nav>

    </header>

    <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </>
  );
}
