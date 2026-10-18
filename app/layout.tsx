import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import AmbientBackground from '@/components/AmbientBackground';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
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
    'Aziel Varek writes stories that move between science fiction, fantasy, and fairytale. Stories across worlds.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${label.variable}`}>
      <body>
        <AmbientBackground />
        <div className="relative z-10">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </div>
      </body>
    </html>
  );
}