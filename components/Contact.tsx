'use client';

import { useState } from 'react';
import { site } from '@/data/site';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="bg-teal py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <h2 className="font-display text-4xl font-medium text-ivory md:text-5xl">
          Let&rsquo;s talk.
        </h2>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a href={`mailto:${site.email}`} className="font-display text-xl text-ivory transition-colors hover:text-gold">
            {site.email}
          </a>
          <div className="flex gap-6">
            {site.social.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-ivory/60 transition-colors hover:text-gold">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-md text-left">
          {sent ? (
            <p className="text-center text-sm text-turquoise">
              Message sent. I&rsquo;ll write back soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input id="contact-name" type="text" required placeholder="Name" className="w-full border-b border-ivory/25 bg-transparent px-1 py-2 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold" />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input id="contact-email" type="email" required placeholder="Email" className="w-full border-b border-ivory/25 bg-transparent px-1 py-2 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold" />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea id="contact-message" required rows={4} placeholder="Message" className="w-full resize-none border-b border-ivory/25 bg-transparent px-1 py-2 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold" />
              </div>
              <button type="submit" className="self-center text-sm font-medium text-ivory underline decoration-gold/60 decoration-1 underline-offset-8 transition-colors hover:text-gold">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
