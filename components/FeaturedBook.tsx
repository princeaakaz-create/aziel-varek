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
    <section ref={sectionRef} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <div className="panel px-6 py-12 md:px-14 md:py-16">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[170px_1fr] md:gap-14">
            <div className="mx-auto w-full max-w-[170px]">
              <div ref={coverRef} className="border border-gold/50 shadow-[0_20px_44px_rgba(0,0,0,0.65)]">
                <BookCover book={book} sizes="170px" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="label">Featured &middot; {genreLabel(book.genre)}</p>
              <h2 className="heading mt-4 text-4xl leading-snug md:text-5xl">{book.title}</h2>
              <Ornament className="!mx-0 mt-5" />
              <p className="mt-6 max-w-prose2 text-[21px] italic leading-relaxed text-ivory/90">
                {book.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <Link href={`/books/${book.slug}#excerpt`} className="btn">
                  Read Sample
                </Link>
                <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
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