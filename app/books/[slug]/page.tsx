import { notFound } from 'next/navigation';
import Link from 'next/link';
import { books, getBookBySlug } from '@/data/books';
import { genreLabel } from '@/data/genres';
import { chapters } from '@/data/chapters';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCover from '@/components/BookCover';

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug);
  if (!book) return {};
  return {
    title: `${book.title} \u2014 Aziel Varek`,
    description: book.description
  };
}

export default function BookDetailPage({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug);
  if (!book) notFound();

  const chapterOne = chapters[book.slug];
  const readerHref = chapterOne ? '#chapter-one' : '#excerpt';

  return (
    <main className="bg-forest">
      <Navbar />

      <section className="px-6 pb-20 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 md:grid-cols-[minmax(0,340px)_1fr] md:gap-20">
          <div className="mx-auto w-full max-w-xs md:sticky md:top-32 md:mx-0 md:max-w-none md:self-start">
            <BookCover book={book} sizes="340px" />

            <div className="mt-8 hidden flex-col gap-4 md:flex">
              <Link href={readerHref} className="text-sm font-medium text-ivory transition-colors hover:text-gold">
                Read Chapter One &rarr;
              </Link>
              <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ivory/60 transition-colors hover:text-gold">
                Buy on Amazon &rarr;
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest2 text-turquoise">
              {genreLabel(book.genre)}
              {book.publishedYear ? ` \u00b7 ${book.publishedYear}` : ''}
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium text-ivory md:text-5xl">
              {book.title}
            </h1>
            <p className="mt-6 max-w-prose2 text-[15px] leading-relaxed text-ivory/70">
              {book.description}
            </p>

            <div className="mt-12">
              <span className="gold-rule mb-5 block" />
              <h2 className="font-display text-2xl text-ivory">About the story</h2>
              <p className="mt-4 max-w-prose2 text-[15px] leading-relaxed text-ivory/70">
                {book.aboutTheStory}
              </p>
            </div>

            <div id="excerpt" className="mt-14 scroll-mt-32">
              <span className="gold-rule mb-5 block" />
              <h2 className="font-display text-2xl text-ivory">Excerpt</h2>
              <blockquote className="mt-4 max-w-prose2 font-display text-xl italic leading-relaxed text-ivory/80">
                &ldquo;{book.excerpt}&rdquo;
              </blockquote>
            </div>

            {chapterOne && (
              <div id="chapter-one" className="mt-16 scroll-mt-32">
                <span className="gold-rule mb-5 block" />
                <h2 className="font-display text-2xl text-ivory">Chapter One</h2>
                <div className="mt-6 max-w-prose2 space-y-5">
                  {chapterOne.map((para, i) => {
                    const isHeading = i === 0 || para.startsWith('Part ');
                    return isHeading ? (
                      <p key={i} className="pt-2 font-display text-lg italic text-turquoise">
                        {para}
                      </p>
                    ) : (
                      <p key={i} className="text-[15px] leading-relaxed text-ivory/75">
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-14 flex flex-col gap-4 md:hidden">
              <Link href={readerHref} className="text-sm font-medium text-ivory transition-colors hover:text-gold">
                Read Chapter One &rarr;
              </Link>
              <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ivory/60 transition-colors hover:text-gold">
                Buy on Amazon &rarr;
              </a>
            </div>

            <div className="mt-20">
              <Link href="/#books" className="text-sm font-medium text-ivory/50 transition-colors hover:text-gold">
                &larr; Back to all books
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
