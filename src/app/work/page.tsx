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
      // Out animation
      gsap.to('.work-card', {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          // Filter data
          const newFiltered = activeFilter === 'ALL' 
            ? caseStudies 
            : caseStudies.filter(c => c.category.toUpperCase() === activeFilter);
          setFilteredWork(newFiltered);
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter]);

  // In animation after state updates
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-card', 
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [filteredWork]);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-16">
            OUR WORK
          </h1>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 md:gap-8 mb-16 border-b border-[var(--border)] pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative text-sm md:text-base font-mono tracking-widest uppercase transition-colors duration-300 py-2 ${
                  activeFilter === cat ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <div className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[var(--accent)] origin-left animate-in zoom-in-50 duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-8 md:gap-y-24">
            {filteredWork.map((work) => (
              <Link 
                key={work.slug} 
                href={`/work/${work.slug}`}
                className="work-card group block cursor-none"
              >
                <div className="overflow-hidden bg-[var(--surface)] rounded-sm aspect-[4/3] relative mb-6">
                  {/* Image Placeholder */}
                  <div 
                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                    style={{ background: work.heroGradient }}
                  >
                    <div className="absolute inset-0 opacity-20 bg-noise" />
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center opacity-30">
                      <span className="text-3xl font-black text-white mix-blend-overlay">{work.client}</span>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Case Study →
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: work.categoryColor }}>
                    {work.category}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {work.outcome}
                  </p>
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
