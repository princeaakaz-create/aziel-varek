'use client';

import Link from 'next/link';
import { genres } from '@/data/genres';
import SectionHeading from './SectionHeading';
import GenreIcon from './GenreIcon';

export default function WorldsSection() {
  return (
    <section id="worlds" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Choose a door"
          title="Worlds"
          sub="My writing moves between worlds rather than staying inside one. Each genre is its own room in the same house."
        />

        <div className="mt-20 grid grid-cols-1 justify-items-center gap-14 sm:grid-cols-2 md:gap-20">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/?genre=${genre.id}#books`}
              className="group block w-full max-w-[320px] transition-transform duration-500 ease-editorial hover:-translate-y-2"
            >
              <div className="plaque plaque-arch px-8 pb-12 pt-16 text-center">
                <div className="float-slow mx-auto flex justify-center drop-shadow-[0_0_14px_rgba(243,220,160,0.45)]">
                  <GenreIcon id={genre.id} />
                </div>
                <h3 className="gold-text mt-6 font-deco text-2xl font-bold leading-snug">
                  {genre.label}
                </h3>
                <span className="mx-auto mt-4 block h-px w-14 bg-gold/70" />
                <p className="mt-4 text-[17px] italic leading-relaxed text-ivory/85">
                  {genre.description}
                </p>
                <span className="mt-6 inline-block font-display text-[11px] uppercase tracking-[0.3em] text-gold-bright/80 transition-colors group-hover:text-gold-bright">
                  Open the door &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}