'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1400);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ease-editorial ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${scrolled ? 'py-3' : 'py-6'}`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 md:px-8 ${
          scrolled
            ? 'glass mx-3 rounded-full py-2 md:mx-auto md:max-w-5xl'
            : ''
        }`}
      >
        <a href="#hero" className="gold-text font-deco text-lg font-bold tracking-wide">
          {site.name}
        </a>

        <ul className="hidden gap-8 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-display text-[12px] font-medium uppercase tracking-[0.22em] text-ivory/85 transition-colors duration-300 hover:text-gold-bright"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-end justify-center gap-[5px] md:hidden"
        >
          <span className={`h-px bg-gold-bright transition-all duration-300 ${menuOpen ? 'w-6 translate-y-[3px] rotate-45' : 'w-6'}`} />
          <span className={`h-px bg-gold-bright transition-all duration-300 ${menuOpen ? 'w-6 -translate-y-[3px] -rotate-45' : 'w-4'}`} />
        </button>
      </nav>

      {menuOpen && (
        <ul className="glass mx-3 mt-2 flex flex-col gap-5 px-8 py-8 md:hidden">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-xl tracking-wide text-ivory"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}