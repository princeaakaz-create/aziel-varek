# Aziel Varek — Author Website

A premium, editorial author website built with Next.js (App Router), Tailwind CSS,
GSAP + ScrollTrigger, Lenis smooth scroll, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Adding a real photograph

Every image on the site (hero, author portrait, book covers, genre cards) currently
renders as a generated placeholder in the site's palette, so the site works out of
the box with no images required. To swap in a real photo:

1. Drop the file into `public/images/` (e.g. `public/images/hero.jpg`).
2. Pass its path to the relevant component:
   - Hero background: edit `components/Hero.tsx`, pass `src="/images/hero.jpg"` to `<AtmosphericBackground />`.
   - Author portrait: same pattern in `components/About.tsx`.
   - Book covers: set the `cover` field on the book in `data/books.ts`, e.g. `cover: '/images/books/the-quiet-orchard.jpg'`.

Everything else (overlays, grain, vignette, hover states) stays exactly the same.

## Adding or editing a book

Open `data/books.ts` and add an entry to the `books` array:

```ts
{
  slug: 'my-new-book',           // used in the URL: /books/my-new-book
  title: 'My New Book',
  genre: 'fantasy',               // must match an id in data/genres.ts
  description: '...',             // shown on cards
  aboutTheStory: '...',           // shown on the book detail page
  excerpt: '...',                 // shown on the book detail page
  amazonUrl: 'https://...',
  featured: false,                // set true on exactly one book
  publishedYear: 2026
}
```

The homepage grid, filters, featured section, and the book's own detail page
(`/books/my-new-book`) all update automatically — no other file needs to change.

## Adding or editing a genre

Open `data/genres.ts` and add an entry to the `genres` array. It will automatically
appear in the Books filter bar and the Worlds section.

## Editing your biography, journal, and contact details

All of this lives in `data/site.ts`:

- `site.about` — the About section heading and biography paragraphs.
- `site.intro` — the statement section just below the hero.
- `site.journal` — journal/blog cards (add, remove, or edit freely).
- `site.email`, `site.social` — contact details and social links.
- `site.nav` — the navigation labels and anchors.

## Project structure

```
app/
  layout.tsx          Root layout, fonts, smooth scroll
  page.tsx            Homepage — assembles all sections
  template.tsx         Page-transition wrapper
  books/[slug]/page.tsx   Book detail page template
components/            One component per section (see brief for names)
data/                  books.ts, genres.ts, site.ts — all editable content
```

## Notes

- Animations respect `prefers-reduced-motion` and are disabled on touch devices
  where native scrolling feels better.
- If GSAP or Lenis fail to load in a given environment, the site falls back to
  plain CSS/native scrolling rather than breaking.
