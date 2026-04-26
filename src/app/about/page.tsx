'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import MagneticButton from '@/components/ui/MagneticButton';

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const values = [
  { icon: "⚡", title: "Speed", desc: "Deploy in weeks, not quarters. In AI, slow is dead." },
  { icon: "🎯", title: "Precision", desc: "No hallucinations in production. No fragile pipelines." },
  { icon: "💡", title: "Innovation", desc: "We only use state-of-the-art models and architectures." },
  { icon: "🤝", title: "Partnership", desc: "We don't just write code; we solve business problems." }
];

const team = [
  { name: "Aryan Mehta", role: "Founder & AI Architect", bio: "Former ML engineer. Obsessed with making AI useful for businesses rather than just a party trick.", color: "#00FF94" },
  { name: "Priya Nair", role: "AI Systems Lead", bio: "Specializes in complex RAG architectures and multi-agent orchestration. The brain behind our hardest deployments.", color: "#FF4D00" },
  { name: "David Chen", role: "Head of Automation", bio: "If an API exists, David has connected it to an n8n workflow. Masters in distributed systems.", color: "#3B82F6" }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo('.about-hero-title', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.3 });
      gsap.fromTo('.about-hero-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.55 });

      // Word-by-word scrub
      const words = missionRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(words, { opacity: 0.08, y: 10 }, {
          opacity: 1, y: 0, stagger: 0.08,
          scrollTrigger: { trigger: missionRef.current, start: 'top 75%', end: 'bottom 30%', scrub: 1.5 }
        });
      }

      // Values cards
      gsap.fromTo('.value-card', { y: 50, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.values-section', start: 'top 80%' }
      });

      // Team cards
      gsap.fromTo('.team-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.team-section', start: 'top 80%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)]" ref={containerRef}>

        {/* Hero */}
        <section className="pt-40 pb-32 px-6 border-b border-[var(--border)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,255,148,0.03)_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto">
            <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-8">[ ABOUT AIRA ]</div>
            <h1 className="about-hero-title text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.92] max-w-5xl">
              BUILT BY BUILDERS.<br />OBSESSED WITH OUTCOMES.
            </h1>
            <p className="about-hero-sub text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
              We started AIRA because we were tired of seeing businesses sold AI hype that never made it to production. We build systems that actually work.
            </p>
          </div>
        </section>

        {/* Mission Statement — Word scrub */}
        <section className="py-40 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div ref={missionRef} className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {"We believe the future of work isn't about humans doing less. It's about humans doing what only humans can do, while AI and automation handle the rest.".split(' ').map((word, i) => (
                <span key={i} className="word mr-3 inline-block">{word}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="values-section py-32 px-6 bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6">[ WHAT WE BELIEVE ]</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="value-card p-10 border border-[var(--border)] bg-[var(--bg)] rounded-2xl hover:border-[var(--text-muted)] transition-colors duration-500 group">
                  <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">{v.icon}</div>
                  <h3 className="font-bold text-xl mb-4 text-[var(--text-primary)]">{v.title}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="team-section py-32 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6">[ WHO WE ARE ]</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20">The Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div key={i} className="team-card group bg-[var(--surface)] border border-[var(--border)] rounded-2xl relative overflow-hidden hover:border-[var(--text-muted)] transition-colors duration-500">
                  {/* Gradient accent top bar */}
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${member.color}, transparent)` }} />
                  
                  <div className="p-8 md:p-10">
                    {/* Avatar with initials */}
                    <div className="w-20 h-20 rounded-2xl mb-8 flex items-center justify-center text-2xl font-black text-black"
                      style={{ background: member.color }}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <div className="text-xs font-mono tracking-widest uppercase mb-6" style={{ color: member.color }}>{member.role}</div>
                    <p className="text-[var(--text-muted)] mb-8 leading-relaxed">{member.bio}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors text-sm font-mono">
                      <LinkedinIcon size={16} /> Connect on LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 px-6 bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6 text-center">[ COMPARE ]</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-20 text-center">Why AIRA?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-[var(--border)] w-1/4" />
                    <th className="p-4 border border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent)] font-bold text-center w-1/4 rounded-t-xl">AIRA</th>
                    <th className="p-4 border-b border-[var(--border)] text-[var(--text-muted)] text-center w-1/4">Freelancer</th>
                    <th className="p-4 border-b border-[var(--border)] text-[var(--text-muted)] text-center w-1/4">Big Agency</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  {[
                    { label: "Speed to Deploy", aira: "2–6 weeks", free: "Unpredictable", big: "3–6 months" },
                    { label: "Cost", aira: "Value-based ($)", free: "Hourly ($)", big: "Retainer ($$$)" },
                    { label: "AI Expertise", aira: "Specialized Deep", free: "Surface Level", big: "Outsourced" },
                    { label: "Communication", aira: "Direct to Builders", free: "Hit or Miss", big: "Account Managers" },
                    { label: "Code Quality", aira: "Production Grade", free: "Prototype Level", big: "Over-engineered" }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-4 border-b border-[var(--border)] font-bold">{row.label}</td>
                      <td className="p-4 border-x border-b border-[var(--accent)] bg-[var(--bg)] text-center font-bold text-white">{row.aira}</td>
                      <td className="p-4 border-b border-[var(--border)] text-center text-[var(--text-muted)]">{row.free}</td>
                      <td className="p-4 border-b border-[var(--border)] text-center text-[var(--text-muted)]">{row.big}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-20 flex justify-center">
              <MagneticButton className="px-10 py-5 bg-[var(--accent)] text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white transition-colors duration-300">
                <Link href="/contact">Meet Us Over A Call →</Link>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
