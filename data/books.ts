import { GenreId } from './genres';

export interface Book {
  slug: string;
  title: string;
  genre: GenreId;
  description: string;
  aboutTheStory: string;
  excerpt: string;
  cover?: string;
  amazonUrl: string;
  featured?: boolean;
  publishedYear?: number;
}

export const books: Book[] = [
  {
    slug: 'through-the-loop-of-us',
    title: 'Through the Loop of Us',
    genre: 'science-fiction',
    description:
      'Emma doesn\u2019t remember the crash. Liam remembers every time it happens. A lyrical, heart-wrenching story about memory, time, and a love that survives the reset.',
    aboutTheStory:
      'When a chance encounter in a quiet caf\u00e9 triggers echoes of something long lost, Emma is pulled into a world where time loops, reality glitches, and strangers feel far too familiar. Liam insists they\u2019ve met before, dozens of times. And each time, the world resets \u2014 a little more broken than before. As memories flicker and timelines blur, the two must navigate a collapsing loop where love is both the curse and the key. But every reset costs them something, and this time, the loop is fighting back. If memory is unreliable and time can lie, how do you hold on to the only thing that ever felt real? Through the Loop of Us is a lyrical, heart-wrenching debut exploring the ache of forgotten love, the fragility of time, and the soul\u2019s stubborn refusal to let go. Perfect for readers of V.E. Schwab and Blake Crouch \u2014 and anyone who believes time can break, but love breaks through.',
    excerpt:
      'Some memories are fragile. Some are buried. And some refuse to stay forgotten.',
    cover: '/images/books/through-the-loop-of-us.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0D42JPGWX',
    featured: true
  }
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getFeaturedBook(): Book {
  return books.find((b) => b.featured) ?? books[0];
}
