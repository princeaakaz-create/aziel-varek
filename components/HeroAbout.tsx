'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';

export default function HeroAbout() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const [durationReady, setDurationReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    let ctx: any;
    let cleanupFns: (() => void)[] = [];

    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const video = videoRef.current;

      const onLoaded = () => setDurationReady(true);
      if (video) {
        video.addEventListener('loadedmetadata', onLoaded);
        cleanupFns.push(() => video.removeEventListener('loadedmetadata', onLoaded));
      }

      ctx = gsap.context(() => {
        gsap.set(heroContentRef.current, { opacity: 0, y: 20 });
        gsap.to(heroContentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.4,
          ease: 'power3.out'
        });

        gsap.set(aboutContentRef.current, { opacity: 0, y: 20 });

        if (!prefersReducedMotion) {
          const st = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;

              if (video && video.duration && !Number.isNaN(video.duration)) {
                video.currentTime = progress * video.duration;
              }

              const heroOpacity = gsap.utils.clamp(0, 1, 1 - progress * 2.4);
              const aboutOpacity = gsap.utils.clamp(0, 1, (progress - 0.42) * 2.4);

              gsap.set(heroContentRef.current, { opacity: heroOpacity });
              gsap.set(aboutContentRef.current, { opacity: aboutOpacity });
            }
          });
          cleanupFns.push(() => st.kill());
        } else {
          gsap.set(aboutContentRef.current, { opacity: 1 });
          if (video) video.play().catch(() => {});
        }
      }, wrapperRef);
    })();

    return () => {
      ctx && ctx.revert();
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      id="hero"
      ref={wrapperRef}
      className="relative bg-forest"
      style={{ height: '220vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="grain absolute inset-0" />
        <div className="vignette absolute inset-0" />

        <div
          ref={heroContentRef}
          id="about"
          className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-24 text-center md:pb-28"
        >
          <p className="mb-4 text-[13px] font-medium tracking-widest2 text-turquoise">
            Author
          </p>
          <h1 className="font-display text-[15vw] font-medium leading-[0.95] text-ivory md:text-[7.5rem]">
            {site.name}
          </h1>
          <p className="mt-6 font-display text-xl italic text-ivory/80 md:text-2xl">
            {site.tagline}
          </p>
        </div>

        <div
          ref={aboutContentRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
        >
          <div className="max-w-xl text-center">
            <span className="gold-rule mb-6 inline-block" />
            <p className="font-display text-xl italic leading-snug text-ivory/90 md:text-2xl">
              {site.intro.heading}
            </p>
            <div className="mt-6 space-y-4">
              {site.about.body.map((para) => (
                <p key={para} className="text-[14px] leading-relaxed text-ivory/75">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}