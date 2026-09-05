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
      <Link href={`/books/${book.slug}`} className="block">
        <div className="overflow-hidden">
          <div className="transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
            <BookCover book={book} />
          </div>
        </div>
        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-widest2 text-turquoise">
            {genreLabel(book.genre)}
          </p>
          <h3 className="mt-2 font-display text-xl text-ivory">{book.title}</h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ivory/60">
            {book.description}
          </p>
          <span className="mt-3 inline-block text-[13px] font-medium text-ivory/80 transition-colors group-hover:text-gold">
            Explore &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}