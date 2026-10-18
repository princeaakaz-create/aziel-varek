import { site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-transparent to-charcoal/90 py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <p className="heading text-2xl uppercase tracking-[0.18em]">{site.name}</p>
            <p className="mt-1 text-[18px] italic text-ivory/70">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={`/${item.href}`} className="nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-6">
            {site.social.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="nav-link">
                {s.label}
              </a>
            ))}
          </div>

          <svg className="botanical-mark h-5 w-16" viewBox="0 0 64 20" fill="none" aria-hidden="true">
            <line x1="0" y1="10" x2="24" y2="10" stroke="#d4b06a" strokeWidth="0.75" />
            <line x1="40" y1="10" x2="64" y2="10" stroke="#d4b06a" strokeWidth="0.75" />
            <path d="M32 3c3 2.5 3 11.5 0 14c-3-2.5-3-11.5 0-14Z" stroke="#d4b06a" strokeWidth="0.75" />
          </svg>

          <p className="text-[14px] text-ivory/45">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}