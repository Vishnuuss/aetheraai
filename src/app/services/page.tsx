'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import { services } from '@/lib/data/services';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Hero text
      gsap.fromTo('.srv-hero-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.srv-hero-desc', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 });

      // Cards
      document.querySelectorAll('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen pt-36 pb-32 bg-[var(--bg)]" ref={containerRef}>
        <div className="max-w-[1400px] mx-auto px-6">
          <header className="mb-32 max-w-4xl">
            <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6">[ WHAT WE BUILD ]</div>
            <h1 className="srv-hero-title text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
              OUR SERVICES
            </h1>
            <p className="srv-hero-desc text-[var(--text-muted)] text-lg md:text-xl leading-relaxed max-w-2xl">
              We don&apos;t build toys. We build production-grade AI systems, rock-solid automation pipelines, and visual identities that command attention.
            </p>
          </header>

          <div className="space-y-24">
            {services.map((service, idx) => (
              <div key={service.slug} className="service-card relative">
                {idx > 0 && <div className="accent-line mb-24" />}
                
                <div className="grid md:grid-cols-12 gap-12 items-start group">
                  <div className="md:col-span-4">
                    <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-8">
                      {service.techStack.slice(0, 5).map(tech => (
                        <span key={tech} className="pill-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-8 bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 rounded-2xl group-hover:border-[var(--text-muted)] transition-colors duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" style={{ background: service.accentColor }} />
                    
                    <p className="text-lg md:text-xl text-[var(--text-muted)] mb-12 leading-relaxed relative z-10">
                      {service.description}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-8 mb-12 relative z-10">
                      {service.features.map(f => (
                        <div key={f.title} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xl">{f.icon}</span>
                            <h4 className="font-bold">{f.title}</h4>
                          </div>
                          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                    
                    <MagneticButton className="px-8 py-4 bg-[var(--accent)] text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white transition-colors duration-300 relative z-10">
                      <Link href={`/services/${service.slug}`}>
                        {service.cta}
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
