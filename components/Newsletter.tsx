'use client';

import { useState } from 'react';
import Ornament from './Ornament';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('submitted');
  }

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <div className="glass px-8 py-12 text-center md:px-14">
          <h2 className="gold-text font-deco text-3xl font-bold leading-snug md:text-4xl">
            Letters from the author
          </h2>
          <Ornament className="mt-5" />
          <p className="mx-auto mt-5 max-w-prose2 text-[19px] italic leading-relaxed text-ivory/85">
            Occasional notes about new books and the writing behind them.
            Nothing more frequent than that.
          </p>

          {status === 'submitted' ? (
            <p className="mt-8 text-xl italic text-gold-bright">
              You&rsquo;re on the list. Thank you.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-9 flex max-w-md flex-col items-stretch gap-5"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="field text-center"
              />
              <button type="submit" className="plaque-btn self-center">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}