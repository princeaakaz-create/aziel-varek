export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`mx-auto h-5 w-44 ${className}`}
      viewBox="0 0 176 20"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="orn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B89A62" stopOpacity="0" />
          <stop offset="0.5" stopColor="#D6BC86" />
          <stop offset="1" stopColor="#B89A62" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="10" x2="68" y2="10" stroke="url(#orn)" strokeWidth="0.8" />
      <line x1="108" y1="10" x2="176" y2="10" stroke="url(#orn)" strokeWidth="0.8" />
      <path d="M88 3c4 3.5 4 10.5 0 14c-4-3.5-4-10.5 0-14Z" stroke="#D6BC86" strokeWidth="0.8" />
      <circle cx="76" cy="10" r="1" fill="#D6BC86" />
      <circle cx="100" cy="10" r="1" fill="#D6BC86" />
    </svg>
  );
}