import type { MetadataRoute } from 'next';
import { books } from '@/data/books';

const base = 'https://aziel-varek.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified: new Date() },
    ...books.map((b) => ({
      url: `${base}/books/${b.slug}`,
      lastModified: new Date()
    }))
  ];
}