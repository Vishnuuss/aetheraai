'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { caseStudies } from '@/lib/data/work';
import MagneticButton from '@/components/ui/MagneticButton';

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const workRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    workRefs.current.forEach((el, i) => {
      if (!el) return;
      const imageWrapper = el.querySelector('.image-wrapper');
      const img = el.querySelector('.project-img');
      const content = el.querySelector('.project-content');

      // Reveal image via clip path
      gsap.fromTo(
        imageWrapper,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      );

      // Parallax on image
      gsap.fromTo(
        img,
        { scale: 1.2, yPercent: -10 },
        {
          scale: 1,
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Stagger content
      gsap.fromTo(
        content?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  // Show top 3 case studies
  const featured = caseStudies.slice(0, 3);

  return (
    <section ref={containerRef} className="py-32 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-16">
          [ RECENT WORK ]
        </h2>

        <div className="space-y-32">
          {featured.map((work, idx) => (
            <div
              key={work.slug}
              ref={(el) => { workRefs.current[idx] = el; }}
              className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${
                idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image side */}
              <Link href={`/work/${work.slug}`} className="w-full md:w-[55%] group block relative cursor-none">
                <div className="image-wrapper overflow-hidden bg-[var(--surface)] rounded-sm aspect-[4/3] relative">
                  {/* Placeholder gradient image since we don't have real assets */}
                  <div 
                    className="project-img absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ background: work.heroGradient }}
                  >
                    <div className="absolute inset-0 opacity-20 bg-noise" />
                    <div className="absolute inset-0 flex items-center justify-center p-12 text-center opacity-30">
                      <span className="text-4xl font-black text-white mix-blend-overlay">{work.client}</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Content side */}
              <div className="w-full md:w-[45%] project-content">
                <div className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: work.categoryColor }}>
                  {work.category}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                  <Link href={`/work/${work.slug}`}>{work.title}</Link>
                </h3>
                <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
                  {work.outcome}. {work.challenge.split('.')[0]}.
                </p>
                <Link
                  href={`/work/${work.slug}`}
                  className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-sm group"
                >
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                      View Case Study
                    </span>
                    <span className="absolute top-full left-0 block transition-transform duration-300 group-hover:-translate-y-full text-[var(--accent)]">
                      View Case Study
                    </span>
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <MagneticButton className="px-8 py-4 border border-[var(--border)] text-[var(--text-primary)] font-medium rounded-sm hover:bg-[var(--surface)] transition-colors duration-300">
            <Link href="/work" className="flex items-center gap-2">
              View All Work <span>→</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
