'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { gsap } from '@/lib/gsap';
import PageTransition from '@/components/ui/PageTransition';
import MagneticButton from '@/components/ui/MagneticButton';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

const TwitterIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  description: z.string().min(20, 'Please provide more detail (min 20 chars)'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { service: '', budget: '' }
  });

  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(chars,
          { y: 80, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.05, ease: 'power4.out', delay: 0.3 }
        );
      }
      gsap.fromTo('.fade-in-up', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus('success');
        if (formRef.current) {
          gsap.to(formRef.current, { y: -50, opacity: 0, duration: 0.5 });
        }
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please check your connection.');
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--bg)] pt-36 pb-32 relative overflow-hidden">
        
        {/* Background 3D element */}
        <div className="absolute right-0 top-0 w-[800px] h-[800px] pointer-events-none opacity-30 z-0 hidden lg:block">
          <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <Sphere args={[1.5, 64, 64]} position={[1, 0, 0]}>
                <MeshDistortMaterial color="#00FF94" wireframe distort={0.5} speed={2} />
              </Sphere>
            </Float>
          </Canvas>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
            
            {/* Left Column */}
            <div>
              <div className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-6 fade-in-up">[ INITIATE ]</div>
              <h1 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.92]">
                {"LET'S BUILD SOMETHING.".split('').map((char, i) => (
                  <span key={i} className="char inline-block" style={{ perspective: '500px' }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </h1>
              
              <p className="text-[var(--text-muted)] text-xl leading-relaxed mb-16 max-w-lg fade-in-up">
                Tell us about your project. We architect intelligent systems that replace manual workflows. Expect a response within 24 hours.
              </p>

              <div className="space-y-10 mb-20 fade-in-up border-l-2 border-[var(--accent)] pl-8">
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Direct Channel</div>
                  <a href="mailto:hello@aira.agency" className="text-2xl font-bold hover:text-[var(--accent)] transition-colors">hello@aira.agency</a>
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">SLA / Response</div>
                  <div className="text-2xl font-bold">&lt; 24 hours</div>
                </div>
              </div>

              <div className="flex gap-4 fade-in-up">
                {[LinkedinIcon, TwitterIcon, InstagramIcon].map((Icon, idx) => (
                  <MagneticButton key={idx} className="w-14 h-14 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all duration-300">
                    <Icon size={20} />
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative fade-in-up lg:mt-12">
              {status === 'success' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-2xl">
                  <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center text-black mb-8 shadow-[0_0_40px_var(--accent-glow)]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-4xl font-black mb-4">Transmission Received</h3>
                  <p className="text-[var(--text-muted)] text-xl leading-relaxed">
                    Our architecture team is reviewing your project details. We will initiate contact within 24 hours.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 rounded-3xl shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">Name *</label>
                      <input 
                        {...register('name')}
                        type="text" 
                        className={`w-full bg-[var(--bg)] border ${errors.name ? 'border-red-500' : 'border-[var(--border)]'} px-5 py-4 rounded-xl text-white focus:outline-none focus:border-[var(--accent)] transition-colors`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">Email *</label>
                      <input 
                        {...register('email')}
                        type="email" 
                        className={`w-full bg-[var(--bg)] border ${errors.email ? 'border-red-500' : 'border-[var(--border)]'} px-5 py-4 rounded-xl text-white focus:outline-none focus:border-[var(--accent)] transition-colors`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">Company (Optional)</label>
                    <input 
                      {...register('company')}
                      type="text" 
                      className="w-full bg-[var(--bg)] border border-[var(--border)] px-5 py-4 rounded-xl text-white focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">Service Needed *</label>
                      <select 
                        {...register('service')}
                        className={`w-full bg-[var(--bg)] border ${errors.service ? 'border-red-500' : 'border-[var(--border)]'} px-5 py-4 rounded-xl text-white focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none`}
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="AI Agents">AI Agents</option>
                        <option value="Workflow Automation">Workflow Automation</option>
                        <option value="RAG Systems">RAG Systems</option>
                        <option value="Creative Graphics">Creative Graphics</option>
                        <option value="Multiple">Multiple / Not Sure</option>
                      </select>
                      {errors.service && <p className="text-red-500 text-xs mt-2">{errors.service.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">Budget Range *</label>
                      <select 
                        {...register('budget')}
                        className={`w-full bg-[var(--bg)] border ${errors.budget ? 'border-red-500' : 'border-[var(--border)]'} px-5 py-4 rounded-xl text-white focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none`}
                      >
                        <option value="" disabled>Select budget</option>
                        <option value="<$1K">&lt;$1K</option>
                        <option value="$1K–5K">$1K–5K</option>
                        <option value="$5K–15K">$5K–15K</option>
                        <option value="$15K+">$15K+</option>
                      </select>
                      {errors.budget && <p className="text-red-500 text-xs mt-2">{errors.budget.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">Project Description *</label>
                    <textarea 
                      {...register('description')}
                      rows={5}
                      className={`w-full bg-[var(--bg)] border ${errors.description ? 'border-red-500' : 'border-[var(--border)]'} px-5 py-4 rounded-xl text-white focus:outline-none focus:border-[var(--accent)] transition-colors resize-none`}
                      placeholder="Tell us what you're trying to achieve..."
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-2">{errors.description.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <MagneticButton 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full py-5 bg-[var(--accent)] text-black font-bold tracking-widest uppercase text-sm rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                  >
                    {status === 'submitting' ? 'Initiating...' : 'Submit Request →'}
                  </MagneticButton>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
    </PageTransition>
  );
}
