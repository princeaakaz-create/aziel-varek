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
    slug: 'the-quiet-orchard',
    title: 'The Quiet Orchard',
    genre: 'fantasy',
    description:
      'A gardener inherits an orchard that remembers every hand that has tended it — and every hand it has refused.',
    aboutTheStory:
      'When Isolde returns to the coastal estate she fled as a girl, she finds the orchard exactly as she left it: unnaturally alive, and unwilling to forget her. The Quiet Orchard follows her attempt to make peace with a piece of land that keeps its own counsel, and with a family history that grows back no matter how often it is cut down.',
    excerpt:
      'The trees did not so much grow in rows as remember them, the way a person remembers a room in the dark — by habit, and by what still hurts to touch.',
    amazonUrl: 'https://www.amazon.com',
    featured: true,
    publishedYear: 2024
  },
  {
    slug: 'signal-drift',
    title: 'Signal Drift',
    genre: 'science-fiction',
    description:
      'A communications officer on a generation ship starts receiving replies to messages that haven\u2019t been sent yet.',
    aboutTheStory:
      'Three centuries into a one-way voyage, Kesh Amara maintains the ship\u2019s dwindling line to a home that no longer remembers it exists. When a message arrives answering a transmission she hasn\u2019t written, she has to decide whether to trust a future she cannot verify.',
    excerpt:
      'Somewhere ahead of her, someone was already living with the answer. She only had the question, and the long dark to carry it in.',
    amazonUrl: 'https://www.amazon.com',
    publishedYear: 2023
  },
  {
    slug: 'the-long-correspondence',
    title: 'The Long Correspondence',
    genre: 'romance',
    description:
      'Two lighthouse keepers on opposite shores of the same strait write to each other for a decade before they meet.',
    aboutTheStory:
      'A slow, restrained love story told entirely through the letters exchanged between two keepers who share a single stretch of water and almost nothing else. The Long Correspondence is about the patience of affection, and what it costs to finally close the distance.',
    excerpt:
      'I have loved you, I think, in every season this water has shown me, which is to say: in every way I know how.',
    amazonUrl: 'https://www.amazon.com',
    publishedYear: 2022
  },
  {
    slug: 'what-the-house-kept',
    title: 'What the House Kept',
    genre: 'mystery',
    description:
      'A restorer hired to renovate an old estate keeps finding rooms that were never on the blueprints.',
    aboutTheStory:
      'Every house keeps a record, and the Averlyn estate has kept its own for a hundred years. What the House Kept follows one restorer\u2019s discovery that the missing heir the town still gossips about may never have left the building at all.',
    excerpt:
      'The blueprints said four bedrooms. She had now stood in five, and the fifth had a window that looked out onto a garden that, from the outside, was not there.',
    amazonUrl: 'https://www.amazon.com',
    publishedYear: 2021
  },
  {
    slug: 'the-cartographer-s-debt',
    title: "The Cartographer's Debt",
    genre: 'adventure',
    description:
      'A mapmaker sets out to finish her late mentor\u2019s final survey \u2014 of a coastline that keeps changing shape.',
    aboutTheStory:
      "Hired to complete a survey no one believes is finishable, cartographer Reyna Osk follows her mentor's last notes toward a coastline that refuses to hold still on paper. The Cartographer's Debt is a journey story about unfinished work, and what we owe the people who started it.",
    excerpt:
      'A map is a promise about a place that no longer exists the moment you finish drawing it. She had made her peace with that. The coastline, apparently, had not.',
    amazonUrl: 'https://www.amazon.com',
    publishedYear: 2020
  },
  {
    slug: 'a-smaller-kind-of-forever',
    title: 'A Smaller Kind of Forever',
    genre: 'other',
    description:
      'A quiet, literary novel about three siblings closing their childhood home after their mother\u2019s death.',
    aboutTheStory:
      'Over one final week in the house they grew up in, three estranged siblings sort what stays, what goes, and what they were never told. A Smaller Kind of Forever sits outside genre by design \u2014 a book about the ordinary, enormous work of grief.',
    excerpt:
      'Grief, it turned out, was mostly logistics: boxes, phone calls, the particular grammar of past tense. The rest of it arrived later, uninvited, and stayed.',
    amazonUrl: 'https://www.amazon.com',
    publishedYear: 2019
  }
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getFeaturedBook(): Book {
  return books.find((b) => b.featured) ?? books[0];
}