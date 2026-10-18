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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.6, 0.05, 0.15, 1] }}
      className="group"
    >
      <Link href={`/books/${book.slug}`} className="block text-center">
        <div className="mx-auto w-[160px] border border-gold/40 shadow-[0_18px_40px_rgba(0,0,0,0.55)] transition-all duration-500 ease-editorial group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:border-gold-bright group-hover:shadow-[0_26px_55px_rgba(0,0,0,0.65),0_0_34px_rgba(184,154,98,0.2)]">
          <BookCover book={book} sizes="160px" />
        </div>
        <p className="label mt-7 text-glow">{genreLabel(book.genre)}</p>
        <h3 className="heading mt-3 text-2xl leading-snug">{book.title}</h3>
        <span className="nav-link mt-4 inline-block">Discover</span>
      </Link>
    </motion.div>
  );
}