'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { services } from '@/lib/data/services';
import { cn } from '@/lib/utils';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei';

function FloatingShapes() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="absolute inset-0 pointer-events-none opacity-40">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron args={[1, 0]} position={[-3, 1, -2]}>
          <MeshDistortMaterial color="#00FF94" wireframe distort={0.4} speed={2} />
        </Icosahedron>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2.5}>
        <Icosahedron args={[1.5, 0]} position={[3, -1, -3]}>
          <MeshDistortMaterial color="#FF4D00" wireframe distort={0.5} speed={1.5} />
        </Icosahedron>
      </Float>
    </Canvas>
  );
}

export default function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Title animation
    const titleChars = titleRef.current?.querySelectorAll('.char');
    if (titleChars) {
      gsap.fromTo(
        titleChars,
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Cards animation
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );

      // Object Oriented Motion Graphics via GSAP QuickSetter for performant hover
      const xTo = gsap.quickTo(card.querySelector('.hover-glow'), 'x', { duration: 0.4, ease: 'power3' });
      const yTo = gsap.quickTo(card.querySelector('.hover-glow'), 'y', { duration: 0.4, ease: 'power3' });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };

      card.addEventListener('mousemove', handleMouseMove);
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
      };
    });
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative bg-[var(--bg)] overflow-hidden">
      {/* 3D Object Oriented Motion Graphics Background */}
      <FloatingShapes />

      {/* Marquee Strip */}
      <div className="absolute top-0 left-0 w-full bg-[var(--surface)] border-y border-[var(--border)] py-4 z-10 overflow-hidden transform -skew-y-1 backdrop-blur-md bg-opacity-80">
        <div className="marquee-wrapper">
          <div className="marquee-track flex gap-8 text-[var(--accent)] font-mono text-sm tracking-widest uppercase">
            {[...Array(4)].map((_, i) => (
              <span key={i}>
                AI AGENTS — WORKFLOW AUTOMATION — RAG SYSTEMS — CREATIVE GRAPHICS —{' '}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-32 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-black tracking-tighter uppercase max-w-2xl flex flex-wrap gap-x-[0.25em]">
            {'Core Offerings'.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="inline-block">
                {word.split('').map((char, i) => (
                  <span key={i} className="char inline-block">{char}</span>
                ))}
              </span>
            ))}
          </h2>
          <p className="text-[var(--text-muted)] max-w-sm text-lg md:text-xl">
            We architect systems that run businesses. Not toys. Not prototypes. Production-grade infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Link
              href={`/services/${service.slug}`}
              key={service.slug}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="group relative block bg-[rgba(17,17,17,0.6)] backdrop-blur-xl border border-[var(--border)] p-10 md:p-14 rounded-3xl hover:border-[var(--text-muted)] transition-colors duration-500 overflow-hidden"
            >
              {/* Dynamic Mouse Tracking Glow (Object Oriented approach) */}
              <div 
                className="hover-glow absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-0 group-hover:opacity-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-opacity duration-500"
                style={{ background: service.accentColor || 'var(--accent)' }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                    {service.icon}
                  </div>
                  <div className="text-xs font-mono tracking-widest uppercase border border-[var(--border)] px-4 py-2 rounded-full group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                    0{idx + 1}
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
                  {service.title}
                </h3>
                
                <p className="text-[var(--text-muted)] text-lg mb-12 leading-relaxed max-w-lg">
                  {service.description}
                </p>
                
                <div className="mt-auto flex items-center gap-3 text-sm font-bold tracking-widest uppercase group-hover:text-[var(--accent)] transition-colors">
                  <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                    <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </div>
                  Explore Architecture
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
