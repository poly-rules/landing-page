import Link from 'next/link'
import Navbar from '../components/Navbar'
import { getAllPosts } from '../../lib/posts'

export const metadata = {
  title: 'Blog — Dflow',
  description: 'Thoughts on data pipelines, declarative systems, and engineering.',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="mb-16">
            <p className="text-[#00D4FF] text-sm font-semibold tracking-widest uppercase mb-3">
              Blog
            </p>
            <h1 className="text-4xl font-black text-white tracking-tight">
              From the team
            </h1>
            <p className="mt-3 text-gray-400">
              Thoughts on data pipelines, declarative systems, and what we&apos;re building.
            </p>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-white/5">
              {posts.map(post => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-2 py-8 hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      {post.author && (
                        <>
                          <span>·</span>
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
                    <span className="text-[#00D4FF] text-sm font-medium mt-1">
                      Read more →
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
