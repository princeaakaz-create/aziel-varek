import Image from 'next/image';

interface Props {
  src?: string;
  alt?: string;
  priority?: boolean;
  atmosphere?: boolean;
  className?: string;
}

export default function AtmosphericBackground({
  src,
  alt = '',
  priority = false,
  atmosphere = true,
  className = ''
}: Props) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 20%, #1a332b 0%, #0f1e18 45%, #08110d 100%)'
          }}
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(111,167,156,0.10) 0%, rgba(13,23,18,0) 40%), linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0))'
            }}
          />
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.14]"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <rect
                key={i}
                x={i * 7.4 + (i % 2 === 0 ? 0 : 2)}
                y="0"
                width={i % 3 === 0 ? 0.5 : 0.25}
                height="100"
                fill="#0a1512"
              />
            ))}
          </svg>
        </div>
      )}
      {atmosphere && (
        <>
          <div className="grain absolute inset-0" />
          <div className="vignette absolute inset-0" />
        </>
      )}
    </div>
  );
}