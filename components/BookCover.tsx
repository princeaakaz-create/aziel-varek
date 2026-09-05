import Image from 'next/image';
import { Book } from '@/data/books';

const TONES: Record<string, [string, string]> = {
  fantasy: ['#16352c', '#0b1a15'],
  'science-fiction': ['#12313a', '#0a1a1e'],
  romance: ['#2a2018', '#140f0a'],
  mystery: ['#1c2420', '#0c1210'],
  adventure: ['#2c2a16', '#14120a'],
  other: ['#1f231f', '#0e110e']
};

export default function BookCover({
  book,
  sizes = '300px'
}: {
  book: Book;
  sizes?: string;
}) {
  const [from, to] = TONES[book.genre] ?? TONES.other;

  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden">
      {book.cover ? (
        <Image
          src={book.cover}
          alt={`Cover of ${book.title}`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center px-6 text-center"
          style={{
            background: `linear-gradient(155deg, ${from} 0%, ${to} 100%)`
          }}
          role="img"
          aria-label={`Cover of ${book.title}`}
        >
          <span className="gold-rule mb-5 opacity-80" />
          <span className="font-display text-2xl italic leading-snug text-ivory/90">
            {book.title}
          </span>
          <span className="mt-5 text-[10px] uppercase tracking-widest2 text-ivory/40">
            Aziel Varek
          </span>
        </div>
      )}
    </div>
  );
}