'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import MagneticButton from '@/components/ui/MagneticButton';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most AI Agents and Workflow Automation projects take 2-4 weeks from discovery to deployment. Complex RAG systems or multi-agent orchestrations might take 4-6 weeks. We work in 1-week sprints so you see progress constantly."
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Every project includes 30 days of post-launch support and bug fixes. After that, we offer monthly maintenance retainers to monitor, tweak, and upgrade your systems as models evolve."
  },
  {
    q: "Who owns the code and the IP?",
    a: "You do. Upon final payment, all intellectual property, source code, workflows, and documentation are transferred fully to your organization."
  },
  {
    q: "Do I need technical knowledge to manage these systems?",
    a: "No. We build interfaces (like Streamlit, Next.js, or direct Slack integrations) so your non-technical team can operate everything. We also provide full documentation and training handover."
  },
  {
    q: "What if the AI hallucinates?",
    a: "We architect systems to prevent this. We use strict RAG implementations with citation requirements, temperature controls, and 'confidence thresholds' that route uncertain queries to human review rather than guessing."
  },
  {
    q: "How do you price your projects?",
    a: "We price based on value and complexity, not hourly rates. A typical focused automation might be $2k-$5k, while a comprehensive agentic system might be $10k-$20k+. We provide a fixed-price proposal after the discovery call."
  }
];

export default function ProcessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero */}
        <section className="pt-40 pb-16 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,148,0.05)_0%,transparent_50%)] pointer-events-none" />
          <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6">[ FRAMEWORK ]</div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            HOW WE WORK
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
            No endless discovery phases. No vague deliverables. We build fast, show progress weekly, and deploy to production.
          </p>
        </section>

        {/* Timeline Component */}
        <ProcessTimeline />

        {/* FAQ */}
        <section className="py-32 px-6 bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-16 text-center">Common Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[var(--border)] rounded-2xl bg-[var(--bg)] overflow-hidden transition-all duration-300 hover:border-[var(--text-muted)]">
                  <button 
                    className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-xl pr-8">{faq.q}</span>
                    <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openFaq === i ? 'bg-[var(--accent)] text-black' : 'bg-[var(--surface)] text-[var(--accent)]'}`}>
                      {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  
                  <div 
                    className="accordion-content transition-all duration-500 ease-in-out"
                    style={{ 
                      maxHeight: openFaq === i ? '300px' : '0px',
                      opacity: openFaq === i ? 1 : 0
                    }}
                  >
                    <div className="px-8 pb-8 pt-2 text-[var(--text-muted)] text-lg leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-32 text-center bg-[var(--bg)] border border-[var(--border)] p-16 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,148,0.05)_0%,transparent_100%)]" />
              <h3 className="text-4xl font-black mb-8 relative z-10">Ready to initiate?</h3>
              <MagneticButton className="px-10 py-5 bg-[var(--accent)] text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,255,148,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] relative z-10">
                <Link href="/contact" className="flex items-center gap-3">
                  Start The Process <span>→</span>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
