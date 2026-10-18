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
  }, []);

  const filtered = useMemo(
    () => (active === 'all' ? books : books.filter((b) => b.genre === active)),
    [active]
  );

  return (
    <section id="books" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="The Library"
          title="The Books"
          sub="Stories in different worlds, genres and places."
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
          <p className="mt-6 text-center text-xl italic text-ivory/80 text-glow">
            No tales on this shelf yet.
          </p>
        )}
      </div>
    </section>
  );
}