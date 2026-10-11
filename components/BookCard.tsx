'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Book } from '@/data/books';
import { genreLabel } from '@/data/genres';
import BookCover from './BookCover';

export default function BookCard({ book }: { book: Book }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: [0.6, 0.05, 0.15, 1] }}
      className="group"
    >
      <Link
        href={`/books/${book.slug}`}
        className="plaque plaque-card block px-6 pb-8 pt-8 text-center transition-transform duration-500 ease-editorial group-hover:-translate-y-2"
      >
        <div className="mx-auto w-[150px] shadow-[0_14px_30px_rgba(0,0,0,0.6)] ring-1 ring-gold/50">
          <BookCover book={book} sizes="150px" />
        </div>
        <p className="mt-6 font-display text-[11px] uppercase tracking-[0.3em] text-turquoise">
          {genreLabel(book.genre)}
        </p>
        <h3 className="gold-text mt-3 font-deco text-xl font-bold leading-snug">
          {book.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[16px] italic leading-relaxed text-ivory/80">
          {book.description}
        </p>
        <span className="mt-5 inline-block font-display text-[11px] uppercase tracking-[0.3em] text-gold-bright/85">
          Explore &rarr;
        </span>
      </Link>
    </motion.div>
  );
}