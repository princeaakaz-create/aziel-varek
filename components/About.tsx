'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/data/site';
import Ornament from './Ornament';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let ctx: any;
    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', end: 'top 40%', scrub: true }
          }
        );
      }, sectionRef);
    })();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-44">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <div ref={textRef} className="panel px-7 py-12 text-center md:px-16 md:py-16">
          <p className="label">The Author</p>
          <h2 className="heading mt-4 text-4xl md:text-5xl">{site.about.heading}</h2>
          <Ornament className="mt-6" />
          <p className="mt-7 text-[26px] italic leading-snug text-ivory md:text-[30px]">
            {site.intro.heading}
          </p>
          <div className="mt-7 space-y-5 text-left md:text-center">
            {site.about.body.map((para) => (
              <p key={para} className="text-[20px] leading-relaxed text-ivory/85">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}