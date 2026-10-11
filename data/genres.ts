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
    description: 'Time, memory, and the questions that follow us into the future.'
  },
  {
    id: 'fantasy',
    label: 'Fantasy & Fairytale',
    description: 'Old magic, hidden doors, and worlds that glow just out of sight.'
  }
];

export function genreLabel(id: GenreId): string {
  return genres.find((g) => g.id === id)?.label ?? id;
}