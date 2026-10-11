'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/data/site';

export default function Hero() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let ctx: any;

    (async () => {
      const { default: gsap } = await import('gsap');

      ctx = gsap.context(() => {
        if (prefersReducedMotion) {
          gsap.set(
            [imageWrapRef.current, nameRef.current, roleRef.current, taglineRef.current, indicatorRef.current],
            { opacity: 1, clearProps: 'transform' }
          );
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.set(imageWrapRef.current, { opacity: 0, scale: 1.05 })
          .set(nameRef.current, { yPercent: 110 })
          .set([roleRef.current, taglineRef.current], { opacity: 0, y: 18 })
          .set(indicatorRef.current, { opacity: 0 })

          .to(imageWrapRef.current, { opacity: 1, duration: 2.2 }, 0)
          .to(imageWrapRef.current, { scale: 1, duration: 6, ease: 'power1.out' }, 0)

          .to(roleRef.current, { opacity: 1, y: 0, duration: 1 }, 0.7)
          .to(nameRef.current, { yPercent: 0, duration: 1.3, ease: 'power4.out' }, 0.9)
          .to(taglineRef.current, { opacity: 1, y: 0, duration: 1 }, 1.7)
          .to(indicatorRef.current, { opacity: 0.7, duration: 1 }, 2.4);
      });
    })();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative z-10 flex h-[100svh] w-full items-end overflow-hidden"
    >
      <div
        ref={imageWrapRef}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />

      <div className="relative z-10 flex w-full flex-col items-center px-6 pb-24 text-center md:pb-28">
        <p
          ref={roleRef}
          className="mb-5 font-display text-[13px] font-medium uppercase tracking-[0.5em] text-gold-bright text-glow"
        >
          Author
        </p>

        <div className="reveal-mask">
          <h1
            ref={nameRef}
            className="gold-text px-2 pb-2 font-deco text-[11vw] font-black leading-[1.05] md:text-[6.5rem]"
          >
            {site.name}
          </h1>
        </div>

        <p
          ref={taglineRef}
          className="mt-6 text-2xl italic text-ivory text-glow md:text-3xl"
        >
          {site.tagline}
        </p>

        <a href="#about" className="plaque-btn mt-10">
          Enter the Stories
        </a>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 opacity-0"
        aria-hidden="true"
      >
        <div className="h-10 w-px overflow-hidden bg-ivory/25">
          <div className="h-full w-full animate-[scrollLine_2.2s_ease-in-out_infinite] bg-gold-bright" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}