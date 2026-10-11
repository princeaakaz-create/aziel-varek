'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/data/site';
import Ornament from './Ornament';

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
        gsap.set(imageRef.current, { opacity: 0, y: 60 });
        gsap.set(textRef.current, { opacity: 0, y: 40 });
        const st = { trigger: sectionRef.current, start: 'top 65%' };
        gsap.to(imageRef.current, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: st });
        gsap.to(textRef.current, { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out', scrollTrigger: st });
      }, sectionRef);
    })();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-44">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16 md:px-10">
        {/* arched window into the story world, framed in wood */}
        <div ref={imageRef} className="mx-auto w-full max-w-[360px] md:max-w-none">
          <div className="plaque plaque-arch p-4 md:p-5">
            <div
              className="relative aspect-[3/4] w-full overflow-hidden"
              style={{ borderRadius: '130px 130px 6px 6px' }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/scenes/scene-bridge.jpg')",
                  animation: 'windowDrift 30s ease-in-out infinite alternate'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <p className="absolute inset-x-0 bottom-8 px-6 text-center font-deco text-lg font-bold gold-text">
                {site.tagline}
              </p>
            </div>
          </div>
        </div>

        <div ref={textRef} className="glass px-7 py-10 md:px-12 md:py-14">
          <p className="font-display text-[12px] uppercase tracking-[0.4em] text-turquoise">
            The Author
          </p>
          <h2 className="gold-text mt-4 font-deco text-3xl font-bold leading-snug md:text-5xl">
            {site.about.heading}
          </h2>
          <Ornament className="!mx-0 mt-5" />
          <p className="mt-6 text-2xl italic leading-snug text-ivory md:text-[1.7rem]">
            {site.intro.heading}
          </p>
          <div className="mt-6 space-y-5">
            {site.about.body.map((para) => (
              <p key={para} className="max-w-prose2 text-[19px] leading-relaxed text-ivory/85">
                {para}
              </p>
            ))}
          </div>
          <a href={site.about.linkHref} className="plaque-btn mt-9">
            {site.about.linkLabel}
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes windowDrift {
          from { transform: scale(1.1) translateX(-4%); }
          to { transform: scale(1.25) translateX(4%); }
        }
      `}</style>
    </section>
  );
}