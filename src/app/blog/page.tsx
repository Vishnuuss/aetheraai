'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import { blogPosts } from '@/lib/data/blog';

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      '.blog-card',
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)] pt-32 pb-24" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-16">
            INSIGHTS FROM AIRA
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="blog-card group block bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--text-muted)] transition-colors duration-300 flex flex-col cursor-none"
              >
                <div 
                  className="aspect-video w-full overflow-hidden relative"
                  style={{ background: post.gradient }}
                >
                  <div className="absolute inset-0 opacity-20 bg-noise" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-80 group-hover:scale-105 transition-transform duration-700">
                    <span className="text-3xl font-black text-white mix-blend-overlay uppercase tracking-tighter leading-none">{post.category}</span>
                  </div>
                  
                  {/* Hover Read Tag */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Read Article
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase mb-4 text-[var(--text-muted)]">
                    <span className="text-[var(--accent)]">{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                    <div className="text-sm font-bold">{post.author}</div>
                    <div className="text-xs font-mono text-[var(--text-muted)]">{post.date}</div>
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
