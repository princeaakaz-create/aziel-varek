export type GenreId =
  | 'fantasy'
  | 'science-fiction'
  | 'romance'
  | 'mystery'
  | 'adventure'
  | 'other';

export interface Genre {
  id: GenreId;
  label: string;
  description: string;
}

export const genres: Genre[] = [
  {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Old magic, older forests, and the cost of power.'
  },
  {
    id: 'science-fiction',
    label: 'Science Fiction',
    description: 'Distant futures and the questions that follow us there.'
  },
  {
    id: 'romance',
    label: 'Romance',
    description: 'Quiet devotions and the courage it takes to stay.'
  },
  {
    id: 'mystery',
    label: 'Mystery',
    description: 'Small towns, long memories, and things left unsaid.'
  },
  {
    id: 'adventure',
    label: 'Adventure',
    description: 'Maps that run out, and the people who keep walking.'
  },
  {
    id: 'other',
    label: 'Literary / Other',
    description: 'Stories that resist a shelf of their own.'
  }
];

export function genreLabel(id: GenreId): string {
  return genres.find((g) => g.id === id)?.label ?? id;
}