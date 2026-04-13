import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { getPost, getAllPosts } from '../../../lib/posts'

interface Props {
  params: Promise<{ slug: string }>
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

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Dflow Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden">

        {/* Ambient glow blobs */}
        <div
          className="absolute top-0 right-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/2 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-2xl mx-auto px-6 lg:px-8">

          {/* Back link — glass pill */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white transition-colors mb-10"
            style={glassSubtle}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Blog
          </Link>

          {/* Header card */}
          <header className="relative rounded-2xl px-10 py-10 mb-12 overflow-hidden" style={glass}>
            {/* Top accent shimmer */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)' }}
            />

            {/* Date / author chip */}
            {(post.date || post.author) && (
              <div
                className="self-start inline-flex items-center gap-2.5 px-3 py-1 rounded-full text-xs font-mono text-gray-500 mb-5"
                style={glassSubtle}
              >
                {post.date && (
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </time>
                )}
                {post.author && (
                  <>
                    <span className="text-gray-700">·</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Gradient divider */}
            <div
              className="mt-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
            />
          </header>

          {/* Body */}
          <article
            className="prose-dflow"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </main>
    </>
  )
}
