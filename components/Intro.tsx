'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/data/site';

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    let ctx: any;

    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (prefersReducedMotion) return;

        gsap.set(headingRef.current, { clipPath: 'inset(0 0 100% 0)' });
        gsap.set(bodyRef.current, { opacity: 0, y: 24 });

        gsap.to(headingRef.current, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%'
          }
        });

        gsap.to(bodyRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%'
          }
        });

        gsap.to(bgRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }, sectionRef);
    })();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-teal py-32 md:py-44"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute -inset-y-10 inset-x-0 opacity-40"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 30%, rgba(111,167,156,0.18), transparent 70%)'
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <h2
          ref={headingRef}
          className="font-display text-4xl font-medium leading-tight text-ivory md:text-6xl"
        >
          {site.intro.heading}
        </h2>
        <p
          ref={bodyRef}
          className="mx-auto mt-8 max-w-prose2 text-[15px] leading-relaxed text-ivory/70 md:text-base"
        >
          {site.intro.body}
        </p>
      </div>
    </section>
  );
}