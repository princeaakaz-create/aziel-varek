import { notFound } from 'next/navigation';
import Link from 'next/link';
import { books, getBookBySlug } from '@/data/books';
import { genreLabel } from '@/data/genres';
import { chapters } from '@/data/chapters';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCover from '@/components/BookCover';
import Ornament from '@/components/Ornament';

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
    <main>
      <Navbar />

      <section className="px-5 pb-20 pt-32 md:px-10 md:pt-40">
        <div className="panel mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-[minmax(0,220px)_1fr] md:gap-16 md:px-14 md:py-16">
          <div className="mx-auto w-full max-w-[200px] md:sticky md:top-32 md:mx-0 md:self-start">
            <div className="border border-gold/50 shadow-[0_20px_44px_rgba(0,0,0,0.65)]">
              <BookCover book={book} sizes="200px" />
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <Link href={readerHref} className="btn !px-4">
                Read Chapter One
              </Link>
              <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid !px-4">
                Buy on Amazon
              </a>
            </div>
          </div>

          <div>
            <p className="label">
              {genreLabel(book.genre)}
              {book.publishedYear ? ` \u00b7 ${book.publishedYear}` : ''}
            </p>
            <h1 className="heading mt-4 text-3xl leading-tight md:text-5xl">
              {book.title}
            </h1>
            <Ornament className="!mx-0 mt-5" />
            <p className="mt-6 max-w-prose2 text-[22px] italic leading-relaxed text-ivory/90">
              {book.description}
            </p>

            <div className="mt-12">
              <h2 className="heading text-2xl">About the book</h2>
              <p className="mt-4 max-w-prose2 text-[20px] leading-relaxed text-ivory/85">
                {book.aboutTheStory}
              </p>
            </div>

            <div id="excerpt" className="mt-14 scroll-mt-32">
              <h2 className="heading text-2xl">Excerpt</h2>
              <blockquote className="mt-4 max-w-prose2 border-l border-gold/60 pl-5 text-2xl italic leading-relaxed text-ivory/90">
                &ldquo;{book.excerpt}&rdquo;
              </blockquote>
            </div>

            {chapterOne && (
              <div id="chapter-one" className="mt-16 scroll-mt-32">
                <h2 className="heading text-2xl">Chapter One</h2>
                <div className="mt-6 max-w-prose2 space-y-5">
                  {chapterOne.map((para, i) => {
                    const isHeading = i === 0 || para.startsWith('Part ');
                    return isHeading ? (
                      <p key={i} className="pt-2 label !text-[0.72rem]">
                        {para}
                      </p>
                    ) : (
                      <p key={i} className="text-[20px] leading-relaxed text-ivory/85">
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-20">
              <Link href="/#books" className="btn">
                &larr; Back to the books
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}