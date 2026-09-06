'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { getFeaturedBook } from '@/data/books';
import { genreLabel } from '@/data/genres';
import BookCover from './BookCover';

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
    <section ref={sectionRef} className="bg-teal py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-[220px_1fr] md:gap-20 md:px-10">
        <div className="mx-auto w-full max-w-[220px] overflow-hidden">
          <div ref={coverRef}>
            <BookCover book={book} sizes="220px" />
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-turquoise">
            {genreLabel(book.genre)}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ivory md:text-4xl">
            {book.title}
          </h2>
          <p className="mt-6 max-w-prose2 text-[15px] leading-relaxed text-ivory/70">
            {book.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href={`/books/${book.slug}#excerpt`} className="text-sm font-medium text-ivory transition-colors hover:text-gold">
              Read an excerpt &rarr;
            </Link>
            <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ivory/60 transition-colors hover:text-gold">
              Buy on Amazon &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}