'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import { blogPosts } from '@/lib/data/blog';

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Title reveal
      const chars = titleRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(chars, 
          { y: 80, opacity: 0, rotateX: -45 }, 
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 1, ease: 'power4.out', delay: 0.3 }
        );
      }
      
      // Cards reveal
      gsap.fromTo(
        '.blog-card',
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.5)', delay: 0.5
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)] pt-36 pb-32" ref={containerRef}>
        <div className="max-w-[1400px] mx-auto px-6">
          <header className="mb-24">
            <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6">[ INTELLIGENCE ]</div>
            <h1 ref={titleRef} className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.92] flex flex-wrap gap-x-[0.25em]">
              {'INSIGHTS & ARCHITECTURE'.split(' ').map((word, wIdx) => (
                <span key={wIdx} className="inline-block">
                  {word.split('').map((char, i) => (
                    <span key={i} className="char inline-block" style={{ perspective: '500px' }}>{char}</span>
                  ))}
                </span>
              ))}
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="blog-card group block bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--text-muted)] transition-colors duration-500 flex flex-col cursor-none relative shadow-lg shadow-black/20"
              >
                {/* Glow behind card on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div 
                  className="aspect-video w-full overflow-hidden relative"
                  style={{ background: post.gradient }}
                >
                  <div className="absolute inset-0 opacity-20 bg-noise" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-80 group-hover:scale-110 transition-transform duration-700">
                    <span className="text-4xl font-black text-white mix-blend-overlay uppercase tracking-tighter leading-none">{post.category}</span>
                  </div>
                  
                  {/* Hover Read Tag */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-400 text-white font-bold text-xs uppercase tracking-widest bg-black/20 backdrop-blur-sm">
                      Read
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase mb-6 text-[var(--text-muted)]">
                    <span className="px-3 py-1 rounded-full border border-[var(--border)] text-[var(--accent)]">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-[var(--text-muted)] text-base mb-8 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--border)]">
                    <div className="text-sm font-bold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-black flex items-center justify-center font-bold">
                        {post.author[0]}
                      </div>
                      {post.author}
                    </div>
                    <div className="text-xs font-mono text-[var(--text-muted)] tracking-widest">{post.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
