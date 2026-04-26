'use client';

import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';
import { serviceBySlug } from '@/lib/data/services';
import MagneticButton from '@/components/ui/MagneticButton';

const galleryPlaceholders = [
  { title: "Vaultr", category: "Brand Identity", color: "from-violet-900/40 to-purple-900/40" },
  { title: "Nexus Labs", category: "Motion Graphics", color: "from-pink-900/40 to-rose-900/40" },
  { title: "StyleForge", category: "UI/UX", color: "from-emerald-900/40 to-teal-900/40" },
  { title: "GrowthLab", category: "Presentation Deck", color: "from-orange-900/40 to-red-900/40" },
  { title: "PipelineIQ", category: "Social Media", color: "from-blue-900/40 to-indigo-900/40" },
  { title: "Mercer & Holt", category: "Web Design", color: "from-amber-900/40 to-yellow-900/40" },
];

export default function GraphicsService() {
  const service = serviceBySlug('graphics');
  if (!service) return null;

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 border-b border-[var(--border)] overflow-hidden">
          {/* Abstract geometric shapes background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white rounded-full mix-blend-overlay animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 border border-white rotate-45 mix-blend-overlay" />
            <div className="absolute bottom-0 left-1/2 w-80 h-80 border border-white rounded-tl-[100px] mix-blend-overlay" />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <Link href="/services" className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--accent-2)] mb-8 inline-block transition-colors">
              ← Back to Services
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-tight">
              {service.title.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
              Brand identity, motion graphics, UI/UX, and visual systems engineered to make your brand impossible to ignore.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-8">
                <h2 className="text-3xl font-bold mb-8">What We Design</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-24">
                  {service.features.map(f => (
                    <div key={f.title} className="p-6 bg-[var(--surface)] hover:bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent-2)] transition-colors duration-300 rounded-sm group cursor-none">
                      <div className="text-2xl mb-4 group-hover:scale-110 transition-transform origin-left">{f.icon}</div>
                      <h3 className="font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-2)] transition-colors">{f.title}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mb-8">Design Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
                  {galleryPlaceholders.map((item, i) => (
                    <div key={i} className="group relative aspect-square bg-[var(--surface)] overflow-hidden cursor-none rounded-sm">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                      <div className="absolute inset-0 bg-noise opacity-20" />
                      
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/80 to-transparent">
                        <div className="text-xs font-mono text-[var(--accent-2)] mb-1 uppercase tracking-widest">{item.category}</div>
                        <div className="font-bold">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4 space-y-12">
                <div className="p-8 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
                  <h3 className="font-bold text-xl mb-4">Case Study</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    See how we built a complete brand identity and design system from zero for FinTech startup Vaultr.
                  </p>
                  <Link href="/work/fintech-brand-identity" className="text-[var(--accent-2)] font-bold text-sm hover:underline">
                    Read Case Study →
                  </Link>
                </div>

                <div>
                  <h3 className="text-sm font-mono tracking-widest uppercase text-[var(--text-muted)] mb-6">Tools We Use</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map(tech => (
                      <span key={tech} className="pill-tag hover:border-[var(--accent-2)] hover:text-[var(--accent-2)]">{tech}</span>
                    ))}
                  </div>
                </div>

                <MagneticButton className="w-full py-4 bg-[var(--accent-2)] text-black font-bold uppercase tracking-wide hover:bg-white transition-colors text-center block">
                  <Link href="/contact" className="block w-full h-full">Start Your Visual Identity →</Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
