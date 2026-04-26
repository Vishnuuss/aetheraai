'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'Deep audit of systems, workflows, and pain points.', icon: '🔍' },
  { num: '02', title: 'ARCHITECT', desc: 'Blueprint the solution. Design flows that scale.', icon: '⚙️' },
  { num: '03', title: 'BUILD', desc: 'Agile sprints with weekly demos. Progress, not promises.', icon: '🚀' },
  { num: '04', title: 'LAUNCH', desc: 'Deploy to production. Train your team. 30-day support.', icon: '✅' }
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 40%', scrub: 1 },
      });
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(step.querySelector('.step-dot'), { scale: 0 }, {
          scale: 1, duration: 0.8, ease: 'elastic.out(1,0.5)',
          scrollTrigger: { trigger: step, start: 'top 75%' },
        });
        gsap.fromTo(step.querySelector('.step-content'),
          { x: i % 2 === 0 ? 80 : -80, opacity: 0, filter: 'blur(10px)' },
          { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 75%' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-[var(--bg)] relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6">[ OUR METHODOLOGY ]</div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">How We Ship</h2>
        </div>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border)] -translate-x-1/2">
            <div ref={lineRef} className="absolute inset-0 bg-[var(--accent)] origin-top shadow-[0_0_15px_var(--accent-glow)]" style={{ transform: 'scaleY(0)' }} />
          </div>
          <div className="space-y-24 md:space-y-32">
            {steps.map((step, idx) => (
              <div key={step.num} ref={(el) => { stepsRef.current[idx] = el; }}
                className={`relative flex items-start gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="step-dot absolute left-8 md:left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-[var(--accent)] border-4 border-[var(--bg)] shadow-[0_0_20px_var(--accent-glow)]" />
                <div className={`step-content pl-20 md:pl-0 md:w-[45%] ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 md:p-10 hover:border-[var(--text-muted)] transition-colors duration-500">
                    <div className="flex items-center gap-4 mb-6" style={{ justifyContent: idx % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <span className="text-3xl">{step.icon}</span>
                      <span className="font-mono text-sm tracking-widest text-[var(--accent)]">{step.num}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-[var(--text-muted)] text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
