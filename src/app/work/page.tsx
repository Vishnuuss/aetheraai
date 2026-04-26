'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import { caseStudies } from '@/lib/data/work';

const categories = ['ALL', 'AI AGENTS', 'AUTOMATION', 'RAG SYSTEMS', 'CREATIVE GRAPHICS'];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [filteredWork, setFilteredWork] = useState(caseStudies);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.work-card', {
        scale: 0.92, opacity: 0, y: -20, duration: 0.3, stagger: 0.04, ease: 'power2.in',
        onComplete: () => {
          const newFiltered = activeFilter === 'ALL'
            ? caseStudies
            : caseStudies.filter(c => c.category.toUpperCase() === activeFilter);
          setFilteredWork(newFiltered);
        }
      });
    }, gridRef);
    return () => ctx.revert();
  }, [activeFilter]);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-card',
        { scale: 0.92, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)' }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [filteredWork]);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)] pt-36 pb-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <header className="mb-20">
            <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6">[ PORTFOLIO ]</div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.92]">OUR WORK</h1>
          </header>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-20 border-b border-[var(--border)] pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative text-xs font-mono tracking-widest uppercase transition-all duration-300 px-5 py-2.5 rounded-full border ${
                  activeFilter === cat
                    ? 'text-black bg-[var(--accent)] border-[var(--accent)]'
                    : 'text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredWork.map((work) => (
              <Link
                key={work.slug}
                href={`/work/${work.slug}`}
                className="work-card group block cursor-none"
              >
                <div className="overflow-hidden bg-[var(--surface)] rounded-2xl aspect-[4/3] relative mb-6 shadow-lg shadow-black/20">
                  <div
                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                    style={{ background: work.heroGradient }}
                  >
                    <div className="absolute inset-0 opacity-20 bg-noise" />
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center opacity-30">
                      <span className="text-3xl font-black text-white mix-blend-overlay">{work.client}</span>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-400 text-2xl text-white">
                      ↗
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: work.categoryColor }}>
                    {work.category}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                    {work.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed text-sm">{work.outcome}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {work.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="pill-tag text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}

            {filteredWork.length === 0 && (
              <div className="col-span-full py-24 text-center text-[var(--text-muted)] font-mono">
                No projects found in this category.
              </div>
            )}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
