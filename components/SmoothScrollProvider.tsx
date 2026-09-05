'use client';

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    let lenis: any;
    let cancelled = false;

    (async () => {
      try {
        const [{ default: Lenis }, { default: gsap }] = await Promise.all([
          import('lenis'),
          import('gsap')
        ]);

        if (cancelled) return;

        lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          smoothWheel: true,
          syncTouch: false
        });

        lenis.on('scroll', () => {
          window.dispatchEvent(new Event('scroll'));
        });

        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch (err) {
        console.warn('Smooth scroll unavailable, using native scroll.', err);
      }
    })();

    return () => {
      cancelled = true;
      if (lenis) lenis.destroy();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}