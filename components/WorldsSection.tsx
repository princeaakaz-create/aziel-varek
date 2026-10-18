'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { genres } from '@/data/genres';
import SectionHeading from './SectionHeading';

// Which part of the artwork each doorway looks into
const ART: Record<string, { img: string; pos: string }> = {
  'science-fiction': { img: '/images/scene-bridge.jpg', pos: '62% 40%' },
  fantasy: { img: '/images/ambient-hero.jpg', pos: '52% 38%' }
};

export default function WorldsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Doorways rise in with the scroll, staggered, and reverse when you scroll back up
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let ctx: any;
    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-door]').forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: `top ${95 - i * 6}%`,
                end: `top ${60 - i * 6}%`,
                scrub: true
              }
            }
          );
        });
      }, sectionRef);
    })();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="worlds" ref={sectionRef} className="relative py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Where to start"
          title="Explore the Worlds"
          sub="I write in two worlds: the aching, near-future kind of science fiction, and the old-magic hush of fantasy and fairytale. Pick a door."
        />

        <div className="mt-20 grid grid-cols-1 justify-items-center gap-14 sm:grid-cols-2 md:gap-20">
          {genres.map((genre) => {
            const art = ART[genre.id] ?? ART.fantasy;
            return (
              <Link
                key={genre.id}
                data-door
                href={`/?genre=${genre.id}#books`}
                className="door group relative block w-full max-w-[300px]"
                aria-label={`${genre.label}: open this world`}
              >
                <div className="door-frame relative aspect-[3/4.4] w-full overflow-hidden">
                  <div
                    className="door-img absolute inset-0 bg-cover"
                    style={{ backgroundImage: `url('${art.img}')`, backgroundPosition: art.pos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-charcoal/10" />
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-center">
                    <h3 className="heading text-xl uppercase tracking-[0.08em]">{genre.label}</h3>
                    <span className="mx-auto mt-3 block h-px w-10 bg-gold/70 transition-all duration-500 group-hover:w-20" />
                    <p className="mt-3 text-[18px] italic leading-snug text-ivory/85">
                      {genre.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .door-frame {
          border: 1px solid rgba(184, 154, 98, 0.55);
          border-radius: 999px 999px 2px 2px / 160px 160px 2px 2px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
          transition: border-color 0.5s, box-shadow 0.5s, transform 0.6s cubic-bezier(0.6, 0.05, 0.15, 1);
        }
        .door-img {
          transform: scale(1.12);
          filter: saturate(0.9) brightness(0.85);
          transition: transform 1.2s cubic-bezier(0.6, 0.05, 0.15, 1), filter 0.8s;
        }
        .door:hover .door-frame {
          border-color: #d6bc86;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55), 0 0 40px rgba(184, 154, 98, 0.18);
          transform: translateY(-6px);
        }
        .door:hover .door-img {
          transform: scale(1.22);
          filter: saturate(1.05) brightness(1);
        }
      `}</style>
    </section>
  );
}