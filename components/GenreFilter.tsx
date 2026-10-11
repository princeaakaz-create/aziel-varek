'use client';

import { genres, GenreId } from '@/data/genres';

export type FilterValue = GenreId | 'all';

export default function GenreFilter({
  active,
  onChange
}: {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  const options: { id: FilterValue; label: string }[] = [
    { id: 'all', label: 'All' },
    ...genres.map((g) => ({ id: g.id as FilterValue, label: g.label }))
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter books by genre"
      className="flex flex-wrap justify-center gap-4"
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          role="tab"
          aria-selected={active === opt.id}
          onClick={() => onChange(opt.id)}
          className="plaque-btn plaque-tab"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}