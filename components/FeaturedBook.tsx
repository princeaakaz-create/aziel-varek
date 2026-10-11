'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { getFeaturedBook } from '@/data/books';
import { genreLabel } from '@/data/genres';
import BookCover from './BookCover';
import Ornament from './Ornament';

export default function FeaturedBook() {
  const book = getFeaturedBook();
  const sectionRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx: any;
    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          coverRef.current,
          { scale: 1.08, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }, sectionRef);
    })();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-44">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="plaque plaque-card px-6 py-12 md:px-14 md:py-16">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[200px_1fr] md:gap-14">
            <div className="mx-auto w-full max-w-[180px]">
              <div ref={coverRef} className="float-slow shadow-[0_20px_44px_rgba(0,0,0,0.7)] ring-1 ring-gold/60">
                <BookCover book={book} sizes="180px" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="font-display text-[12px] uppercase tracking-[0.4em] text-turquoise">
                Featured &middot; {genreLabel(book.genre)}
              </p>
              <h2 className="gold-text mt-4 font-deco text-3xl font-bold leading-snug md:text-5xl">
                {book.title}
              </h2>
              <Ornament className="!mx-0 mt-5" />
              <p className="mt-6 max-w-prose2 text-[19px] italic leading-relaxed text-ivory/90">
                {book.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-5 md:justify-start">
                <Link href={`/books/${book.slug}#excerpt`} className="plaque-btn">
                  Read an excerpt
                </Link>
                <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="plaque-btn alt">
                  Buy on Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}