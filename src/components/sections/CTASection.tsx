'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const chars = textRef.current.querySelectorAll('.char');
    gsap.fromTo(chars,
      { opacity: 0, y: 60, scale: 0.8, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        stagger: 0.03, duration: 0.8, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[var(--bg)] py-32">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <img src="/logo-mark.png" alt="" className="w-[40vw] max-w-[500px] opacity-[0.03]" />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,148,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10 text-center">
        <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-10">
          [ LET&apos;S BUILD ]
        </div>

        <h2 ref={textRef} className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-16 leading-[1.05] flex flex-wrap justify-center gap-x-[0.3em]">
          {'READY TO BUILD SOMETHING THAT SCALES?'.split(' ').map((word, i) => (
            <span key={i} className="inline-block">
              {word.split('').map((char, j) => (
                <span key={j} className="char inline-block">{char}</span>
              ))}
            </span>
          ))}
        </h2>

        <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
          Stop iterating. Start deploying. Tell us what you&apos;re building and we&apos;ll show you how AI makes it unstoppable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticButton className="px-12 py-5 bg-[var(--accent)] text-black font-bold tracking-widest uppercase text-sm rounded-full hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(0,255,148,0.3)]">
            <Link href="/contact" className="flex items-center gap-3">
              Start a Project <span className="text-lg">→</span>
            </Link>
          </MagneticButton>
          <MagneticButton className="px-12 py-5 border border-[var(--border)] text-[var(--text-primary)] font-bold tracking-widest uppercase text-sm rounded-full hover:border-[var(--text-muted)] transition-colors duration-300">
            <a href="mailto:hello@aira.agency" className="flex items-center gap-3">
              Email Us
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
