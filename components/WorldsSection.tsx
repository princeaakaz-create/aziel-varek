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

function Plaque({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 200 260"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>

      {/* outer plaque body with arched top */}
      <path
        d="M8,46 Q8,10 100,10 Q192,10 192,46 L192,252 L8,252 Z"
        fill={`url(#grad-${id})`}
        stroke="#b6975f"
        strokeWidth="1.1"
      />

      {/* inner carved border line */}
      <path
        d="M17,48 Q17,20 100,20 Q183,20 183,48 L183,243 L17,243 Z"
        fill="none"
        stroke="#b6975f"
        strokeOpacity="0.55"
        strokeWidth="0.6"
      />

      {/* corner flourishes */}
      {[
        [21, 47],
        [179, 47],
        [21, 239],
        [179, 239]
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`} opacity="0.75">
          <path d="M0,-5 L1.4,-1.4 L5,0 L1.4,1.4 L0,5 L-1.4,1.4 L-5,0 L-1.4,-1.4 Z" fill="#b6975f" />
        </g>
      ))}

      {/* small apex ornament at the top of the arch */}
      <path
        d="M92,15 L100,7 L108,15"
        fill="none"
        stroke="#b6975f"
        strokeWidth="0.8"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

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

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {genres.map((genre) => {
            const [from, to] = TONES[genre.id] ?? TONES.other;
            return (
              <Link
                key={genre.id}
                href={`/?genre=${genre.id}#books`}
                className="group relative mx-auto block aspect-[200/260] w-full max-w-[180px] transition-transform duration-500 ease-editorial hover:-translate-y-1"
              >
                <Plaque id={genre.id} from={from} to={to} />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
                  <h3 className="font-display text-lg leading-snug text-ivory transition-colors duration-300 group-hover:text-gold md:text-xl">
                    {genre.label}
                  </h3>
                  <span className="mt-3 block h-px w-6 bg-gold/70" />
                  <p className="mt-3 text-[11px] leading-relaxed text-ivory/55">
                    {genre.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}