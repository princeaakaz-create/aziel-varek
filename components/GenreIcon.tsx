export default function GenreIcon({ id }: { id: string }) {
  const common = {
    className: 'h-16 w-16',
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: '#f3dca0',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  };
  if (id === 'science-fiction') {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="12" fill="rgba(243,220,160,0.12)" />
        <ellipse cx="32" cy="32" rx="26" ry="8" transform="rotate(-22 32 32)" />
        <path d="M10 12l1.5 3.5L15 17l-3.5 1.5L10 22l-1.5-3.5L5 17l3.5-1.5Z" fill="#f3dca0" />
        <circle cx="52" cy="14" r="1.3" fill="#f3dca0" />
        <circle cx="50" cy="52" r="1.3" fill="#f3dca0" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M40 8a22 22 0 1 0 14 38A18 18 0 0 1 40 8Z" fill="rgba(243,220,160,0.12)" />
      <path d="M46 14l1.5 3.5L51 19l-3.5 1.5L46 24l-1.5-3.5L41 19l3.5-1.5Z" fill="#f3dca0" />
      <path d="M14 56c0-12 8-18 18-20c-2 10-8 18-18 20Z" />
      <path d="M16 54c5-6 10-10 15-14" />
    </svg>
  );
}