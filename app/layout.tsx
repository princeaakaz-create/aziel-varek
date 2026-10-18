import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, Montserrat } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import AmbientBackground from '@/components/AmbientBackground';
import { Analytics } from '@vercel/analytics/next';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap'
});

const heading = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-heading',
  display: 'swap'
});

const label = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-label',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Aziel Varek — Author',
  description:
    'Official site of fiction author Aziel Varek. Science fiction, fantasy and fairytale. Read a sample and find the books.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${heading.variable} ${label.variable}`}>
      <body>
        <AmbientBackground />
        <div className="relative z-10">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}