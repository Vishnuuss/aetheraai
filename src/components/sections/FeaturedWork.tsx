'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { caseStudies } from '@/lib/data/work';
import MagneticButton from '@/components/ui/MagneticButton';

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const workRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Section title reveal
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { y: 60, opacity: 0, rotateX: -45 },
          {
            y: 0, opacity: 1, rotateX: 0,
            stagger: 0.04, duration: 0.9, ease: 'power4.out',
            scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
          }
        );
      }

      workRefs.current.forEach((el, i) => {
        if (!el) return;
        const imageWrapper = el.querySelector('.image-wrapper');
        const img = el.querySelector('.project-img');
        const content = el.querySelector('.project-content');
        const counter = el.querySelector('.project-counter');

        // Counter reveal
        gsap.fromTo(
          counter,
          { scale: 0, opacity: 0, rotate: -30 },
          {
            scale: 1, opacity: 1, rotate: 0,
            duration: 1.2, ease: 'elastic.out(1,0.5)',
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );

        // Reveal image via clip path with stagger
        gsap.fromTo(
          imageWrapper,
          { clipPath: i % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );

        // Parallax on image
        gsap.fromTo(
          img,
          { scale: 1.3, yPercent: -15 },
          {
            scale: 1, yPercent: 15,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          }
        );

        // Stagger content with blur
        const contentChildren = content?.children;
        if (contentChildren) {
          gsap.fromTo(
            contentChildren,
            { y: 50, opacity: 0, filter: 'blur(8px)' },
            {
              y: 0, opacity: 1, filter: 'blur(0px)',
              stagger: 0.12, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: content, start: 'top 85%' },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featured = caseStudies.slice(0, 3);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-[var(--bg)] relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6">
              [ RECENT WORK ]
            </div>
            <h2 ref={titleRef} className="text-5xl md:text-7xl font-black tracking-tighter overflow-hidden">
              {'Selected Projects'.split('').map((char, i) => (
                <span key={i} className="char inline-block" style={{ perspective: '500px' }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>
          <p className="text-[var(--text-muted)] max-w-sm text-lg">
            Systems we've designed for companies that demand results.
          </p>
        </div>

        <div className="space-y-40">
          {featured.map((work, idx) => (
            <div
              key={work.slug}
              ref={(el) => { workRefs.current[idx] = el; }}
              className={`flex flex-col md:flex-row gap-12 md:gap-20 items-center ${
                idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
              } relative`}
            >
              {/* Large counter */}
              <div className="project-counter absolute -top-8 md:-top-12 left-0 md:left-auto font-mono text-[8rem] md:text-[12rem] font-black text-transparent leading-none pointer-events-none select-none z-0"
                   style={{ WebkitTextStroke: '1px var(--border)', opacity: 0.15 }}>
                0{idx + 1}
              </div>

              {/* Image side */}
              <Link href={`/work/${work.slug}`} className="w-full md:w-[58%] group block relative cursor-none z-10">
                <div className="image-wrapper overflow-hidden bg-[var(--surface)] rounded-2xl aspect-[16/10] relative shadow-2xl shadow-black/30">
                  <div 
                    className="project-img absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ background: work.heroGradient }}
                  >
                    <div className="absolute inset-0 opacity-20 bg-noise" />
                    <div className="absolute inset-0 flex items-center justify-center p-12 text-center opacity-30">
                      <span className="text-5xl font-black text-white mix-blend-overlay tracking-tighter">{work.client}</span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                      <span className="text-white text-2xl">↗</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Content side */}
              <div className="w-full md:w-[42%] project-content relative z-10">
                <div className="text-xs font-mono tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-[var(--border)] inline-block" style={{ color: work.categoryColor }}>
                  {work.category}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors leading-tight">
                  <Link href={`/work/${work.slug}`}>{work.title}</Link>
                </h3>
                <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed">
                  {work.outcome}. {work.challenge.split('.')[0]}.
                </p>
                
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {work.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="pill-tag text-[10px]">{tech}</span>
                  ))}
                </div>

                <Link
                  href={`/work/${work.slug}`}
                  className="inline-flex items-center gap-3 font-bold uppercase tracking-widest text-sm group/link hover:text-[var(--accent)] transition-colors"
                >
                  <span className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center group-hover/link:border-[var(--accent)] group-hover/link:bg-[var(--accent)] group-hover/link:text-black transition-all duration-300">
                    →
                  </span>
                  View Case Study
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <MagneticButton className="px-10 py-5 border border-[var(--border)] text-[var(--text-primary)] font-bold tracking-widest uppercase text-sm rounded-full hover:bg-[var(--surface)] transition-colors duration-300">
            <Link href="/work" className="flex items-center gap-3">
              View All Work <span>→</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
