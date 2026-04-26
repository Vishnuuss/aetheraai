'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box } from '@react-three/drei';

function Hero3DObjects() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40 }} className="absolute inset-0 pointer-events-none opacity-50 z-0">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      {/* Object Oriented Motion Graphics - Floating 3D Primitives */}
      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <Sphere args={[1.5, 64, 64]} position={[-5, 2, -2]}>
          <MeshDistortMaterial color="#080808" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.8} roughness={0.2} wireframe />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Box args={[1.2, 1.2, 1.2]} position={[4, -2, -1]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <MeshDistortMaterial color="#00FF94" wireframe distort={0.2} speed={2} />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[0.8, 32, 32]} position={[0, 4, -4]}>
          <MeshDistortMaterial color="#FF4D00" wireframe distort={0.6} speed={3} />
        </Sphere>
      </Float>
    </Canvas>
  );
}

export default function HeroHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtextRef.current || !ctaRef.current) return;

    const chars = titleRef.current.querySelectorAll('.char');
    
    const tl = gsap.timeline({ delay: 3.0 }); // Wait for the new preloader to finish

    tl.fromTo(
      '.eyebrow',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      chars,
      { y: 120, opacity: 0, rotateX: -90, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        scale: 1,
        duration: 1, 
        stagger: 0.03, 
        ease: 'power4.out',
        transformOrigin: '50% 50% -50px'
      },
      '-=0.6'
    )
    .fromTo(
      subtextRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      ctaRef.current.children,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'elastic.out(1,0.7)' },
      '-=0.8'
    )
    .fromTo(
      badgeRef.current,
      { scale: 0, opacity: 0, rotate: -180 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: 'elastic.out(1,0.4)' },
      '-=1'
    );

    gsap.to(badgeRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: 'linear'
    });

  }, []);

  const titleWords = ['INTELLIGENCE.', 'AUTOMATED.', 'AMPLIFIED.'];

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[var(--bg)]">
      
      {/* High-level Object Oriented Motion Graphics via React Three Fiber */}
      <Hero3DObjects />
      
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,148,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full z-10 flex flex-col items-center text-center relative">
        
        <div className="eyebrow font-mono text-[var(--accent)] tracking-[0.3em] text-xs md:text-sm mb-8 opacity-0 uppercase border border-[var(--border)] px-6 py-2 rounded-full backdrop-blur-sm bg-[rgba(17,17,17,0.5)]">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] mr-3 animate-pulse" />
          Next-Gen AI Agency
        </div>

        <h1 ref={titleRef} className="hero-display flex flex-col items-center mb-10 perspective-1000">
          {titleWords.map((word, i) => (
            <span key={i} className="block overflow-hidden pb-2 leading-[0.9]">
              {word.split('').map((char, j) => (
                <span key={j} className="char inline-block opacity-0 text-[clamp(2.5rem,8vw,7.5rem)] font-black tracking-tighter">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p ref={subtextRef} className="text-[var(--text-muted)] text-base md:text-xl max-w-2xl mb-14 opacity-0 leading-relaxed font-medium">
          We architect autonomous systems, intelligent workflows, and high-performance visual experiences that make traditional businesses obsolete.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6">
          <MagneticButton className="px-10 py-5 bg-[var(--accent)] text-black font-bold tracking-widest uppercase text-sm rounded-full hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(0,255,148,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
            <Link href="/contact" className="flex items-center gap-3">
              Deploy AI Agents <span className="text-lg leading-none">→</span>
            </Link>
          </MagneticButton>
          <MagneticButton className="px-10 py-5 border border-[var(--border)] text-[var(--text-primary)] font-bold tracking-widest uppercase text-sm rounded-full hover:border-[var(--text-muted)] transition-colors duration-500 bg-[rgba(8,8,8,0.5)] backdrop-blur-md">
            <Link href="/work" className="flex items-center gap-2">
              Explore Our Architecture
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Decorative Badge */}
      <div 
        ref={badgeRef}
        className="absolute bottom-10 left-10 w-32 h-32 hidden md:flex items-center justify-center pointer-events-none opacity-0 mix-blend-difference"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text fontSize="11.5" fontWeight="700" fill="var(--text-primary)" letterSpacing="2.5">
            <textPath href="#circlePath">
              AIRA AGENCY • SYSTEMS ARCHITECTURE •
            </textPath>
          </text>
        </svg>
        <img src="/logo-mark.png" alt="Logo" className="absolute w-8 h-8 object-contain" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest rotate-90 origin-right translate-y-[-20px]">Scroll</span>
        <div className="w-[1px] h-20 bg-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent)] animate-[float_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
