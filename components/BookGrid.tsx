'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { books } from '@/data/books';
import { genres } from '@/data/genres';
import GenreFilter, { FilterValue } from './GenreFilter';
import BookCard from './BookCard';
import SectionHeading from './SectionHeading';

export default function BookGrid() {
  const [active, setActive] = useState<FilterValue>('all');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const genre = params.get('genre');
    if (genre && genres.some((g) => g.id === genre)) {
      setActive(genre as FilterValue);
    }
    // Clicking a world card on the same page
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent).detail;
      if (genres.some((g) => g.id === id)) setActive(id as FilterValue);
    };
    window.addEventListener('select-genre', onSelect);
    return () => window.removeEventListener('select-genre', onSelect);
  }, []);

  const filtered = useMemo(
    () => (active === 'all' ? books : books.filter((b) => b.genre === active)),
    [active]
  );

  return (
    <section id="books" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Bookshelf"
          title="The Books"
          sub="Everything I’ve published so far."
        />

        <div className="mb-16 mt-12">
          <GenreFilter active={active} onChange={setActive} />
        </div>

        <motion.div
          layout
          className="grid justify-center gap-x-10 gap-y-14"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 240px))' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-6 text-center text-glow">
            <p className="heading text-lg uppercase tracking-[0.12em] text-gold-light">Coming soon</p>
            <p className="mt-3 text-xl italic text-ivory/80">
              This shelf is still being written. Stay tuned, a new story is on its way.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}