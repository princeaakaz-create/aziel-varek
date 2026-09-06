'use client';

import Link from 'next/link';
import { genres } from '@/data/genres';

const TONES: Record<string, [string, string]> = {
  fantasy: ['#1a3a30', '#0b1a15'],
  'science-fiction': ['#153842', '#0a1a1e'],
  romance: ['#332619', '#160f0a'],
  mystery: ['#20291f', '#0d1210'],
  adventure: ['#33301a', '#16130a'],
  other: ['#242923', '#0f120e']
};

export default function WorldsSection() {
  return (
    <section id="worlds" className="bg-forest py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium text-ivory md:text-5xl">
            Worlds
          </h2>
          <p className="mt-4 text-[15px] text-ivory/60">
            My writing moves between worlds rather than staying inside one
            {' \u2014 '}
            each genre is its own room in the same house.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {genres.map((genre) => {
            const [from, to] = TONES[genre.id] ?? TONES.other;
            return (
              <Link
                key={genre.id}
                href={`/?genre=${genre.id}#books`}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden p-7"
                style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
              >
                <div className="absolute inset-0 origin-center scale-100 transition-transform duration-700 ease-editorial group-hover:scale-110">
                  <div className="grain absolute inset-0 opacity-60" />
                </div>
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

                <span className="relative z-10 mb-3 block h-px w-0 bg-gold transition-all duration-500 ease-editorial group-hover:w-10" />
                <h3 className="relative z-10 translate-y-0 font-display text-2xl text-ivory transition-transform duration-500 ease-editorial group-hover:-translate-y-1">
                  {genre.label}
                </h3>
                <p className="relative z-10 mt-2 max-w-[26ch] text-[13px] text-ivory/60">
                  {genre.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
