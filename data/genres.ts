export type GenreId = 'science-fiction' | 'fantasy';

export interface Genre {
  id: GenreId;
  label: string;
  description: string;
}

export const genres: Genre[] = [
  {
    id: 'science-fiction',
    label: 'Science Fiction',
    description: 'Time loops, lost memories, and a love that outlasts the reset.'
  },
  {
    id: 'fantasy',
    label: 'Fantasy & Fairytale',
    description: 'Hidden doors, old magic, and places that only exist while you\u2019re reading.'
  }
];

export function genreLabel(id: GenreId): string {
  return genres.find((g) => g.id === id)?.label ?? id;
}