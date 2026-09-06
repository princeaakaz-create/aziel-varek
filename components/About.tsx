'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/data/site';
import AtmosphericBackground from './AtmosphericBackground';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx: any;

    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (prefersReducedMotion) return;

        gsap.set(imageRef.current, { clipPath: 'inset(100% 0 0 0)' });
        gsap.set(textRef.current, { opacity: 0, y: 20 });

        const st = { trigger: sectionRef.current, start: 'top 65%' };

        gsap.to(imageRef.current, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: st
        });

        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.45,
          ease: 'power3.out',
          scrollTrigger: st
        });
      }, sectionRef);
    })();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-forest py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        <div ref={imageRef} className="relative aspect-[4/5] w-full overflow-hidden">
          <AtmosphericBackground alt="Portrait of Aziel Varek" atmosphere={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
        </div>

        <div ref={textRef}>
          <span className="gold-rule mb-6 block" />
          <p className="font-display text-2xl italic leading-snug text-ivory/90 md:text-3xl">
            {site.intro.heading}
          </p>
          <h2 className="mt-6 font-display text-3xl font-medium text-ivory md:text-4xl">
            {site.about.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {site.about.body.map((para) => (
              <p key={para} className="max-w-prose2 text-[15px] leading-relaxed text-ivory/70">
                {para}
              </p>
            ))}
          </div>
          <a href={site.about.linkHref} className="mt-8 inline-block text-sm font-medium text-turquoise transition-colors hover:text-gold">
            {site.about.linkLabel} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}