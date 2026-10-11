'use client';

import { useState } from 'react';
import { site } from '@/data/site';
import Ornament from './Ornament';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="plaque plaque-card px-7 py-14 text-center md:px-14">
          <h2 className="gold-text font-deco text-4xl font-bold md:text-5xl">
            Let&rsquo;s talk.
          </h2>
          <Ornament className="mt-5" />

          <div className="mt-8 flex flex-col items-center gap-4">
            <a href={`mailto:${site.email}`} className="font-display text-lg tracking-wide text-ivory transition-colors hover:text-gold-bright md:text-xl">
              {site.email}
            </a>
            <div className="flex gap-4">
              {site.social.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="plaque-btn alt !px-6 !py-2.5 !text-[11px]">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-md text-left">
            {sent ? (
              <p className="text-center text-xl italic text-gold-bright">
                Message sent. I&rsquo;ll write back soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input id="contact-name" type="text" required placeholder="Name" className="field" />
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input id="contact-email" type="email" required placeholder="Email" className="field" />
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea id="contact-message" required rows={4} placeholder="Message" className="field resize-none" />
                <button type="submit" className="plaque-btn self-center">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}