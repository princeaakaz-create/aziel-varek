export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`mx-auto h-6 w-56 ${className}`}
      viewBox="0 0 224 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="orn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d4b06a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f3dca0" />
          <stop offset="1" stopColor="#d4b06a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="12" x2="86" y2="12" stroke="url(#orn)" strokeWidth="1" />
      <line x1="138" y1="12" x2="224" y2="12" stroke="url(#orn)" strokeWidth="1" />
      {/* elven leaf pair */}
      <path d="M112 3c5 4 5 14 0 18c-5-4-5-14 0-18Z" stroke="#f3dca0" strokeWidth="1" fill="rgba(243,220,160,0.12)" />
      <path d="M100 12c4-5 10-5 12 0c-2 5-8 5-12 0Z" stroke="#d4b06a" strokeWidth="0.9" fill="none" />
      <path d="M124 12c-4-5-10-5-12 0c2 5 8 5 12 0Z" stroke="#d4b06a" strokeWidth="0.9" fill="none" />
      <circle cx="92" cy="12" r="1.4" fill="#f3dca0" />
      <circle cx="132" cy="12" r="1.4" fill="#f3dca0" />
    </svg>
  );
}