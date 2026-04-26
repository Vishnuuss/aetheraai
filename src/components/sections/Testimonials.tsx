'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

const testimonials = [
  {
    quote: "AIRA gave us a working system in weeks, not months. Our AEs were burning out doing manual qualification. Now they walk into every call with a full intelligence brief.",
    author: "Sarah Jenkins",
    role: "VP Sales, PipelineIQ",
    metric: "3x",
    metricLabel: "Pipeline Velocity"
  },
  {
    quote: "We can't afford hallucinations. Our liability is real. AIRA built us something that cites every claim with the exact document and page number.",
    author: "Marcus Holt",
    role: "Senior Partner, Mercer & Holt LLP",
    metric: "99.4%",
    metricLabel: "Citation Accuracy"
  },
  {
    quote: "We had a product that could compete with Robinhood, but we looked like a weekend hackathon project. AIRA transformed how we show up in the world.",
    author: "David Chen",
    role: "Founder & CEO, Vaultr",
    metric: "400%",
    metricLabel: "User Signup Increase"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<(HTMLDivElement | null)[]>([]);
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      }
    );
  }, []);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate current quote in
    const currentQuote = quotesRef.current[activeIndex];
    if (!currentQuote) return;

    quotesRef.current.forEach((q, i) => {
      if (!q) return;
      if (i === activeIndex) {
        gsap.fromTo(q,
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
        );
      } else {
        gsap.set(q, { opacity: 0, y: 30 });
      }
    });

    // Animate metric
    if (metricRef.current) {
      gsap.fromTo(metricRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1,0.6)' }
      );
    }
  }, [activeIndex]);

  const changeTestimonial = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  return (
    <section ref={containerRef} className="py-32 md:py-40 bg-[var(--surface)] overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.02] blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-16 text-center">
          [ CLIENT VOICES ]
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-16 items-center min-h-[400px]">
          {/* Quotes Container */}
          <div className="relative">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                ref={(el) => { quotesRef.current[idx] = el; }}
                className="w-full"
                style={{ 
                  display: idx === activeIndex ? 'block' : 'none',
                }}
              >
                <svg className="w-10 h-10 mb-8 text-[var(--accent)] opacity-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <h3 className="text-2xl md:text-4xl font-bold leading-snug mb-10 text-[var(--text-primary)]">
                  &ldquo;{t.quote}&rdquo;
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-bold text-lg">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="text-base font-bold text-[var(--text-primary)]">{t.author}</div>
                    <div className="text-sm font-mono text-[var(--text-muted)] tracking-wide">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Metric Card */}
          <div ref={metricRef} className="hidden md:flex flex-col items-center justify-center bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-10 text-center">
            <div className="text-6xl font-black text-[var(--accent)] mb-3 font-mono tracking-tighter">
              {testimonials[activeIndex].metric}
            </div>
            <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest">
              {testimonials[activeIndex].metricLabel}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-16">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => changeTestimonial(idx)}
              className="group py-4 px-1"
              aria-label={`Testimonial ${idx + 1}`}
            >
              <div className={`w-14 h-[3px] rounded-full transition-all duration-500 ${
                idx === activeIndex 
                  ? 'bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]' 
                  : 'bg-[var(--border)] group-hover:bg-[var(--text-muted)]'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
