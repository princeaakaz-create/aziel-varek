'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { books } from '@/data/books';
import GenreFilter, { FilterValue } from './GenreFilter';
import BookCard from './BookCard';

export default function BookGrid() {
  const [active, setActive] = useState<FilterValue>('all');

  const filtered = useMemo(
    () => (active === 'all' ? books : books.filter((b) => b.genre === active)),
    [active]
  );

  return (
    <section id="books" className="bg-forest py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium text-ivory md:text-5xl">
            Books
          </h2>
          <p className="mt-4 text-[15px] text-ivory/60">
            Stories in different worlds, genres and places.
          </p>
        </div>

        <div className="mt-12 mb-14">
          <GenreFilter active={active} onChange={setActive} />
        </div>

        <motion.div layout className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}