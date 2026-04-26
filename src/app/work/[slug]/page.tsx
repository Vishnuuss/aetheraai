'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import { caseStudyBySlug, nextCaseStudy } from '@/lib/data/work';
import CountUp from '@/components/ui/CountUp';

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const work = caseStudyBySlug(slug);
  const nextWork = nextCaseStudy(slug);
  
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    
    gsap.fromTo(
      heroRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.inOut' }
    );
  }, [slug]);

  if (!work) return <div className="min-h-screen flex items-center justify-center">Not Found</div>;

  return (
    <PageTransition>
      <main className="bg-[var(--bg)]">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-xs font-mono tracking-widest uppercase mb-6" style={{ color: work.categoryColor }}>
              {work.category}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 leading-tight">
              {work.title}
            </h1>
            
            <div 
              ref={heroRef}
              className="w-full aspect-video rounded-sm overflow-hidden relative mb-16"
              style={{ background: work.heroGradient }}
            >
              <div className="absolute inset-0 opacity-20 bg-noise" />
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center opacity-40">
                <span className="text-6xl md:text-8xl font-black text-white mix-blend-overlay tracking-tighter">{work.client}</span>
              </div>
            </div>

            {/* Overview Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[var(--border)] mb-24">
              <div>
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Client</div>
                <div className="font-bold">{work.client}</div>
              </div>
              <div>
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Timeline</div>
                <div className="font-bold">{work.timeline}</div>
              </div>
              <div className="col-span-2 md:col-span-2">
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Services</div>
                <div className="font-bold">{work.services.join(' • ')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto space-y-24">
            
            {/* Challenge */}
            <div>
              <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
              <p className="text-xl text-[var(--text-muted)] leading-relaxed mb-8">
                {work.challenge}
              </p>
              <blockquote className="border-l-4 border-[var(--accent)] pl-6 py-2 my-12">
                <p className="text-2xl font-serif italic text-[var(--text-primary)]">
                  {work.challengeQuote}
                </p>
              </blockquote>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-3xl font-bold mb-12">What We Built</h2>
              <div className="space-y-12 relative">
                <div className="absolute left-6 top-6 bottom-6 w-px bg-[var(--border)]" />
                {work.solution.map((step, i) => (
                  <div key={i} className="flex gap-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg)] border-2 border-[var(--border)] flex items-center justify-center font-bold text-[var(--text-muted)] shrink-0 group-hover:border-[var(--accent)] transition-colors">
                      {step.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl font-bold mb-12">The Impact</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {work.results.map((res, i) => (
                  <div key={i} className="p-8 bg-[var(--surface)] border border-[var(--border)] rounded-sm text-center">
                    <div className="text-5xl font-black text-[var(--accent)] mb-4">
                      <CountUp end={Number(res.value)} suffix={res.suffix} />
                    </div>
                    <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest">{res.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-xl font-bold mb-6">Tech Stack Used</h2>
              <div className="flex flex-wrap gap-2">
                {work.techStack.map(tech => (
                  <span key={tech} className="pill-tag">{tech}</span>
                ))}
              </div>
            </div>
            
          </div>
        </section>

        {/* Next Project */}
        {nextWork && (
          <Link href={`/work/${nextWork.slug}`} className="block relative h-screen max-h-[800px] group cursor-none overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ background: nextWork.heroGradient }}
            >
              <div className="absolute inset-0 opacity-20 bg-noise" />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="text-xs font-mono tracking-widest uppercase mb-8 text-[var(--text-muted)] group-hover:text-white transition-colors">
                Next Project
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8">
                {nextWork.client}
              </h2>
              <div className="px-6 py-3 border border-white/30 text-white font-bold uppercase tracking-widest text-sm rounded-sm group-hover:border-white transition-colors">
                View Case Study →
              </div>
            </div>
          </Link>
        )}
      </main>
    </PageTransition>
  );
}
