'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    // Animate logo and text in
    tl.fromTo(
      [logoRef.current, textRef.current],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    )
    // Giant sliding line (progress) across the screen
    .to(
      progressLineRef.current,
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
      '-=0.5'
    )
    // Pulse logo
    .to(
      logoRef.current,
      { scale: 1.1, duration: 0.4, yoyo: true, repeat: 1, ease: 'power1.inOut' },
      '-=0.5'
    )
    // Scale up everything to exit
    .to(
      [logoRef.current, textRef.current],
      { scale: 2, opacity: 0, filter: 'blur(20px)', duration: 0.6, ease: 'power4.in' },
      '+=0.2'
    )
    // Line fades
    .to(
      progressLineRef.current,
      { opacity: 0, duration: 0.3 },
      '-=0.4'
    )
    // Container slides up
    .to(
      containerRef.current,
      { yPercent: -100, duration: 0.8, ease: 'power4.inOut' },
      '-=0.3'
    );
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="preloader fixed inset-0 z-[99999] bg-[var(--bg)] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Central Logo */}
      <div className="flex flex-col items-center z-10 mix-blend-difference">
        <img 
          ref={logoRef}
          src="/logo-mark.png" 
          alt="AIRA Logo" 
          className="w-24 h-24 md:w-32 md:h-32 object-contain mb-8"
        />
        <div 
          ref={textRef}
          className="text-2xl md:text-4xl font-black tracking-widest text-[var(--text-primary)]"
        >
          INITIALIZING...
        </div>
      </div>

      {/* Massive Sliding Line at bottom */}
      <div className="absolute bottom-12 md:bottom-24 left-0 w-full h-[2px] bg-[var(--border)] px-6 md:px-24 box-border">
        <div className="w-full h-full relative overflow-hidden">
          <div
            ref={progressLineRef}
            className="absolute inset-y-0 left-0 bg-[var(--accent)] origin-left w-full shadow-[0_0_20px_var(--accent)]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
      
    </div>
  );
}
