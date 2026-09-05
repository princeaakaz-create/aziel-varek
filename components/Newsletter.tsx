'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('submitted');
  }

  return (
    <section className="bg-forest py-28 md:py-36">
      <div className="mx-auto max-w-xl px-6 text-center md:px-10">
        <h2 className="font-display text-3xl font-medium text-ivory md:text-4xl">
          Letters from the author
        </h2>
        <p className="mx-auto mt-4 max-w-prose2 text-[14px] leading-relaxed text-ivory/60">
          Occasional notes about new books and the writing behind them.
          Nothing more frequent than that.
        </p>

        {status === 'submitted' ? (
          <p className="mt-8 text-sm text-turquoise">
            You&rsquo;re on the list. Thank you.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-4 sm:flex-row"
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
              className="w-full border-b border-ivory/25 bg-transparent px-1 py-2 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold"
            />
            <button
              type="submit"
              className="whitespace-nowrap text-sm font-medium text-ivory underline decoration-gold/60 decoration-1 underline-offset-8 transition-colors hover:text-gold"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}