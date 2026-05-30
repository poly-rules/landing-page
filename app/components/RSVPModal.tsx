"use client";

import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RSVPModal({ open, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Drive CSS transition separately from mount/unmount
  useEffect(() => {
    if (open) requestAnimationFrame(() => setVisible(true));
    else requestAnimationFrame(() => setVisible(false));
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll without layout shift
  useEffect(() => {
    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  if (!open && !visible) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST to /api/rsvp
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setVisible(false);
    // Let the fade-out finish before unmounting
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail("");
    }, 180);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0D0F14] shadow-2xl transition-all duration-200 overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.96) translateY(8px)",
        }}
      >
        {/* Top glow */}
        <div
          className="absolute top-0 inset-x-0 h-40 pointer-events-none rounded-t-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% -10%, #00D4FF1a 0%, transparent 70%)",
          }}
        />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 py-10">
          {submitted ? (
            // ── Success state ──────────────────────────────────────────────
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/25 flex items-center justify-center mx-auto mb-6">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-[#00D4FF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                You&apos;re on the list.
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                We&apos;ll reach out as soon as your early access spot is ready.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            // ── Form state ─────────────────────────────────────────────────
            <>
              <div className="mb-7">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] text-xs font-medium mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                  Early Access
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Request early access
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Poly is in closed alpha. Leave your email and we&apos;ll
                  invite you when your spot is ready.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00D4FF]/50 focus:bg-white/[0.06] transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#00D4FF] text-[#0D0F14] font-semibold rounded-lg hover:bg-[#00D4FF]/90 transition-colors text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending…" : "Request Access"}
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-600 text-center">
                No spam. Unsubscribe any time.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
