'use client';

import { site } from '@/data/site';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function JournalSection() {
  return (
    <section id="journal" className="bg-teal py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium text-ivory md:text-5xl">
            Journal
          </h2>
          <p className="mt-4 text-[15px] text-ivory/60">
            Notes on writing, reading, and the process behind the stories.
          </p>
        </div>

        <div className="mt-14 divide-y divide-ivory/10">
          {site.journal.map((post) => (
            <article
              key={post.title}
              className="group grid grid-cols-1 gap-2 py-8 transition-colors md:grid-cols-[160px_1fr] md:gap-8"
            >
              <p className="text-[12px] uppercase tracking-widest2 text-turquoise">
                {post.category}
              </p>
              <div>
                <h3 className="font-display text-xl text-ivory transition-colors group-hover:text-gold md:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-prose2 text-[14px] leading-relaxed text-ivory/60">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-[12px] text-ivory/40">
                  {formatDate(post.date)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}