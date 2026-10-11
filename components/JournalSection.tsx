'use client';

import { site } from '@/data/site';
import SectionHeading from './SectionHeading';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function JournalSection() {
  return (
    <section id="journal" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading
          eyebrow="From the desk"
          title="Journal"
          sub="Notes on writing, reading, and the process behind the stories."
        />

        <div className="mt-14 space-y-8">
          {site.journal.length === 0 && (
            <div className="plaque plaque-card mx-auto max-w-xl px-8 py-12 text-center">
              <p className="gold-text font-deco text-2xl font-bold">Pages are being written</p>
              <p className="mt-4 text-[18px] italic text-ivory/85">
                The first entries will appear here soon.
              </p>
            </div>
          )}
          {site.journal.map((post) => (
            <article key={post.title} className="plaque plaque-card px-8 py-9">
              <p className="font-display text-[11px] uppercase tracking-[0.3em] text-turquoise">
                {post.category}
              </p>
              <h3 className="gold-text mt-3 font-deco text-2xl font-bold">{post.title}</h3>
              <p className="mt-3 max-w-prose2 text-[18px] italic leading-relaxed text-ivory/85">
                {post.excerpt}
              </p>
              <p className="mt-4 text-[14px] text-ivory/55">{formatDate(post.date)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}