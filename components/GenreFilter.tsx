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
      className="flex flex-wrap justify-center gap-x-7 gap-y-3"
    >
      {options.map((opt) => {
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.id)}
            className={`relative pb-1 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
              isActive ? 'text-ivory' : 'text-ivory/45 hover:text-ivory/80'
            }`}
          >
            {opt.label}
            <span
              className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ease-editorial ${
                isActive ? 'w-full' : 'w-0'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}