'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const curtain1Ref = useRef<HTMLDivElement>(null);
  const curtain2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    // 1. Reveal logo and text softly from blur
    tl.fromTo(
      [logoRef.current, textRef.current],
      { opacity: 0, y: 20, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    // 2. Animate counter from 0 to 100
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(this.targets()[0].val).toString();
          }
        },
      },
      '-=0.5'
    );

    // 3. Animate progress bar filling
    tl.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
      '< ' // sync with counter
    );

    // 4. Logo subtle pulse at 100%
    tl.to(
      logoRef.current,
      { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'power1.inOut' },
      '+=0.1'
    );

    // 5. Fade out center content
    tl.to(
      [logoRef.current, textRef.current, barRef.current],
      { opacity: 0, scale: 0.95, filter: 'blur(10px)', duration: 0.5, ease: 'power3.in' }
    );

    // 6. Split curtain reveal (super high-end opening)
    tl.to(
      curtain1Ref.current,
      { yPercent: -100, duration: 1, ease: 'power4.inOut' },
      '+=0.1'
    )
    .to(
      curtain2Ref.current,
      { yPercent: 100, duration: 1, ease: 'power4.inOut' },
      '<'
    );

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
      
      {/* High-end cinematic split curtains */}
      <div ref={curtain1Ref} className="absolute inset-x-0 top-0 h-[50vh] bg-[#050505] origin-top border-b border-[var(--border)]" />
      <div ref={curtain2Ref} className="absolute inset-x-0 bottom-0 h-[50vh] bg-[#050505] origin-bottom border-t border-[var(--border)]" />

      {/* Center UI */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Floating Logo */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 mb-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-[var(--accent)] opacity-20 blur-[50px] rounded-full animate-pulse" />
          <img 
            ref={logoRef}
            src="/logo-mark.png" 
            alt="AIRA" 
            className="w-full h-full object-contain relative z-10"
          />
        </div>

        {/* Text Details */}
        <div ref={textRef} className="flex flex-col items-center">
          <div className="flex items-center gap-4 text-xs font-mono tracking-[0.5em] text-[var(--text-muted)] uppercase mb-6">
            <span className="text-[var(--text-primary)]">AIRA</span>
            <span className="w-10 h-px bg-[var(--border)]" />
            <span>LOADING <span ref={counterRef} className="text-[var(--accent)] font-bold inline-block w-[3ch] text-right">0</span>%</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="w-48 md:w-64 h-[1px] bg-[var(--border)] overflow-hidden relative">
            <div 
              ref={barRef}
              className="absolute inset-y-0 left-0 bg-[var(--accent)] origin-left shadow-[0_0_10px_var(--accent)]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
