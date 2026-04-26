'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import { blogPostBySlug, blogPosts } from '@/lib/data/blog';
import MagneticButton from '@/components/ui/MagneticButton';
import ReactMarkdown from 'react-markdown';
import ScrollProgress from '@/components/ui/ScrollProgress';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPostBySlug(slug);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.inOut' }
    );
  }, [slug]);

  if (!post) return <div className="min-h-screen flex items-center justify-center">Post Not Found</div>;

  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <PageTransition>
      <ScrollProgress />
      <main className="bg-[var(--bg)]">
        {/* Article Hero */}
        <section className="pt-32 pb-12 px-6 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-widest uppercase mb-8 text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-sm mb-12">
            <div className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center justify-center font-bold text-[var(--accent)]">
              {post.author[0]}
            </div>
            <div className="text-left">
              <div className="font-bold text-[var(--text-primary)]">{post.author}</div>
              <div className="text-[var(--text-muted)]">{post.authorRole}</div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <div className="px-6 mb-16 max-w-6xl mx-auto">
          <div 
            ref={heroRef}
            className="w-full aspect-[21/9] rounded-sm overflow-hidden relative"
            style={{ background: post.gradient }}
          >
            <div className="absolute inset-0 opacity-20 bg-noise" />
          </div>
        </div>

        {/* Article Body */}
        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative">
            
            {/* Table of Contents (Sticky sidebar) */}
            <div className="hidden lg:block w-64 shrink-0 relative">
              <div className="sticky top-32">
                <div className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] mb-6 border-b border-[var(--border)] pb-4">
                  Article Contents
                </div>
                {/* Simplified static TOC for demo */}
                <ul className="space-y-4 text-sm text-[var(--text-muted)]">
                  <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">The Shift That's Happening</li>
                  <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Anatomy of an Agent</li>
                  <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Real World Examples</li>
                  <li className="hover:text-[var(--accent)] cursor-pointer transition-colors">Why 2025?</li>
                </ul>
                
                <div className="mt-12 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
                  <h4 className="font-bold mb-2">Want to build this?</h4>
                  <p className="text-xs mb-4 text-[var(--text-muted)]">We build production systems in weeks.</p>
                  <Link href="/contact" className="text-xs font-bold text-[var(--accent)] uppercase tracking-wide">
                    Talk to us →
                  </Link>
                </div>
              </div>
            </div>

            {/* Content */}
            <article className="prose-aira w-full max-w-3xl">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>

          </div>
        </section>

        {/* Related Articles */}
        <section className="py-24 px-6 bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block bg-[var(--bg)] border border-[var(--border)] p-6 rounded-sm hover:border-[var(--accent)] transition-colors duration-300 cursor-none">
                  <div className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-3">{p.category}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors">{p.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4">{p.excerpt}</p>
                  <div className="text-xs font-mono text-[var(--text-muted)]">{p.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 px-6 bg-[var(--bg)] border-t border-[var(--border)] text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">Ready to implement this?</h2>
          <MagneticButton className="px-8 py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-wide hover:bg-white transition-colors">
            <Link href="/contact">Book a technical scoping call →</Link>
          </MagneticButton>
        </section>
      </main>
    </PageTransition>
  );
}
