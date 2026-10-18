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
    let onClick: ((e: MouseEvent) => void) | null = null;
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

        (window as any).__lenis = lenis;

        // Menu links: glide to the section (plain jumps fight the smooth scroll)
        onClick = (e: MouseEvent) => {
          const a = (e.target as HTMLElement | null)?.closest?.('a');
          if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
          const url = new URL(a.href, window.location.href);
          if (!url.hash || url.pathname !== window.location.pathname) return;
          const target = document.querySelector(url.hash);
          if (!target) return;
          e.preventDefault();
          lenis.scrollTo(target as HTMLElement, { duration: 1.8 });
          history.replaceState(null, '', url.hash);
        };
        document.addEventListener('click', onClick);

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
      if (onClick) document.removeEventListener('click', onClick);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}