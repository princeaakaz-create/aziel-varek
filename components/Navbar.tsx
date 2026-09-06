'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-editorial ${visible ? 'opacity-100' : 'opacity-0'} ${scrolled ? 'bg-forest/90 backdrop-blur-sm py-4' : 'bg-transparent py-7'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#hero" className="font-display text-lg tracking-wide text-ivory">
          {site.name}
        </a>

        <ul className="hidden gap-9 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-[13px] font-medium tracking-wide text-ivory/80 transition-colors duration-300 hover:text-gold">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="flex h-8 w-8 flex-col items-end justify-center gap-[5px] md:hidden">
          <span className={`h-px bg-ivory transition-all duration-300 ${menuOpen ? 'w-6 translate-y-[3px] rotate-45' : 'w-6'}`} />
          <span className={`h-px bg-ivory transition-all duration-300 ${menuOpen ? 'w-6 -translate-y-[3px] -rotate-45' : 'w-4'}`} />
        </button>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-6 bg-forest px-8 pb-10 pt-4 md:hidden">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setMenuOpen(false)} className="font-display text-2xl text-ivory">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
