import Link from 'next/link'
import Navbar from '../components/Navbar'
import { getAllPosts } from '../../lib/posts'

export const metadata = {
  title: 'Blog — Dflow',
  description: 'Thoughts on data pipelines, declarative systems, and engineering.',
}

// ─── Glass constants (mirrors landing page) ───────────────────────────────────

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.10)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
} as const

const glassSubtle = {
  background: 'rgba(255,255,255,0.025)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.07)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
} as const

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden">

        {/* Ambient glow blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8">

          {/* Header card */}
          <div className="relative rounded-2xl px-10 py-9 mb-12 overflow-hidden" style={glass}>
            {/* Top cyan shimmer */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)' }}
            />
            <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
              Blog
            </p>
            <h1 className="text-4xl font-black text-white tracking-tight">
              From the team
            </h1>
            <p className="mt-3 text-gray-400 leading-relaxed">
              Thoughts on data pipelines, declarative systems, and what we&apos;re building.
            </p>
          </div>

          {/* Post list */}
          {posts.length === 0 ? (
            <p className="text-gray-600 px-2">No posts yet.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {posts.map(post => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative flex flex-col gap-3 rounded-2xl p-8 overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
                    style={glassSubtle}
                  >
                    {/* Hover top shimmer */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)' }}
                    />

                    {/* Date / author chip */}
                    <div
                      className="self-start flex items-center gap-2.5 px-3 py-1 rounded-full text-xs font-mono text-gray-500"
                      style={glassSubtle}
                    >
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      {post.author && (
                        <>
                          <span className="text-gray-700">·</span>
                          <span>{post.author}</span>
                        </>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-[#00D4FF] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    <span className="text-[#00D4FF] text-sm font-medium mt-1 group-hover:gap-2 flex items-center gap-1.5 transition-all">
                      Read more
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  )
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
