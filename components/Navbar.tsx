'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // "/#section" works from the home page and from book pages
  const link = (href: string) => `/${href}`;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ease-editorial ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${scrolled ? 'bg-charcoal/70 py-3 backdrop-blur-sm' : 'py-6'}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8">
        <a href={link('#hero')} className="heading text-xl uppercase tracking-[0.18em]">
          {site.name}
        </a>

        <ul className="hidden gap-9 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={link(item.href)} className="nav-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-end justify-center gap-[6px] md:hidden"
        >
          <span className={`h-px bg-gold-bright transition-all duration-300 ${menuOpen ? 'w-6 translate-y-[3.5px] rotate-45' : 'w-6'}`} />
          <span className={`h-px bg-gold-bright transition-all duration-300 ${menuOpen ? 'w-6 -translate-y-[3.5px] -rotate-45' : 'w-4'}`} />
        </button>
      </nav>

      {menuOpen && (
        <ul className="mx-4 mt-2 flex flex-col gap-6 border border-gold/30 bg-charcoal/90 px-8 py-8 md:hidden">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={link(item.href)}
                onClick={() => setMenuOpen(false)}
                className="heading text-2xl"
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