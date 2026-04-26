'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import MagneticButton from '@/components/ui/MagneticButton';
const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const values = [
  { icon: "⚡", title: "Speed", desc: "We deploy in weeks, not quarters. In AI, slow is dead." },
  { icon: "🎯", title: "Precision", desc: "No hallucinations in production. No fragile pipelines." },
  { icon: "💡", title: "Innovation", desc: "We only use state-of-the-art models and architectures." },
  { icon: "🤝", title: "Partnership", desc: "We don't just write code; we solve business problems." }
];

const team = [
  { 
    name: "Aryan Mehta", 
    role: "Founder & AI Architect", 
    bio: "Former ML engineer. Obsessed with making AI useful for businesses rather than just a party trick.",
    color: "from-[#00FF9420] to-[#080808]"
  },
  { 
    name: "Priya Nair", 
    role: "AI Systems Lead", 
    bio: "Specializes in complex RAG architectures and multi-agent orchestration. The brain behind our hardest deployments.",
    color: "from-[#FF4D0020] to-[#080808]"
  },
  { 
    name: "David Chen", 
    role: "Head of Automation", 
    bio: "If an API exists, David has connected it to an n8n workflow. Masters in distributed systems.",
    color: "from-[#3B82F620] to-[#080808]"
  }
];

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!missionRef.current) return;
    const words = missionRef.current.querySelectorAll('.word');
    
    gsap.fromTo(words, 
      { opacity: 0.1 },
      { 
        opacity: 1, 
        stagger: 0.1, 
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero */}
        <section className="pt-40 pb-24 px-6 border-b border-[var(--border)]">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight max-w-4xl">
              BUILT BY BUILDERS.<br />OBSESSED WITH OUTCOMES.
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
              We started AIRA because we were tired of seeing businesses sold AI hype that never made it to production. We build systems that actually work.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div ref={missionRef} className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {"We believe the future of work isn't about humans doing less. It's about humans doing what only humans can do, while AI and automation handle the rest.".split(' ').map((word, i) => (
                <span key={i} className="word mr-3 inline-block">{word}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-6 bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-16">What We Believe</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-8 border border-[var(--border)] bg-[var(--bg)] rounded-sm">
                  <div className="text-4xl mb-6">{v.icon}</div>
                  <h3 className="font-bold text-xl mb-3">{v.title}</h3>
                  <p className="text-[var(--text-muted)]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-16">The Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div key={i} className="tilt-card group bg-[var(--surface)] border border-[var(--border)] p-8 rounded-sm relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Photo placeholder */}
                  <div className="w-full aspect-square mb-8 bg-[var(--bg)] border border-[var(--border)] overflow-hidden relative">
                     <div className="absolute inset-0 opacity-20 bg-noise" />
                     <div className="absolute inset-0 flex items-center justify-center text-5xl font-black text-[var(--border)]">
                       {member.name.split(' ').map(n => n[0]).join('')}
                     </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <div className="text-sm font-mono tracking-widest uppercase text-[var(--accent)] mb-4">{member.role}</div>
                    <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors">
                      <LinkedinIcon size={20} /> LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AIRA Table */}
        <section className="py-24 px-6 bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-16 text-center">Why AIRA</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-[var(--border)] w-1/4"></th>
                    <th className="p-4 border border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent)] font-bold text-center w-1/4 rounded-t-sm">AIRA</th>
                    <th className="p-4 border-b border-[var(--border)] text-[var(--text-muted)] text-center w-1/4">Generic Freelancer</th>
                    <th className="p-4 border-b border-[var(--border)] text-[var(--text-muted)] text-center w-1/4">Big Agency</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  {[
                    { label: "Speed to Deploy", aira: "2-6 weeks", free: "Unpredictable", big: "3-6 months" },
                    { label: "Cost", aira: "Value-based ($)", free: "Hourly ($)", big: "Retainer ($$$)" },
                    { label: "AI Expertise", aira: "Specialized Deep", free: "Surface Level", big: "Outsourced" },
                    { label: "Communication", aira: "Direct to Builders", free: "Hit or Miss", big: "Account Managers" },
                    { label: "Code Quality", aira: "Production Grade", free: "Prototype Level", big: "Over-engineered" }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-4 border-b border-[var(--border)] font-bold">{row.label}</td>
                      <td className="p-4 border-x border-b border-[var(--accent)] bg-[var(--bg)] text-center font-bold text-white relative">
                        {row.aira}
                        {i === 4 && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)]" />}
                      </td>
                      <td className="p-4 border-b border-[var(--border)] text-center text-[var(--text-muted)]">{row.free}</td>
                      <td className="p-4 border-b border-[var(--border)] text-center text-[var(--text-muted)]">{row.big}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-24 flex justify-center">
              <MagneticButton className="px-8 py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-wide hover:bg-white transition-colors">
                <Link href="/contact">Meet Us Over A Call →</Link>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
