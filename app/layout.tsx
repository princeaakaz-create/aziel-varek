import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, Montserrat } from 'next/font/google';
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
  metadataBase: new URL('https://aziel-varek.vercel.app'),
  title: 'Aziel Varek — Author',
  description:
    'Official site of fiction author Aziel Varek. Science fiction, fantasy and fairytale. Read a sample and find the books.',
  openGraph: {
    title: 'Aziel Varek — Author',
    description: 'Stories across worlds. Science fiction, fantasy and fairytale.',
    url: 'https://aziel-varek.vercel.app',
    siteName: 'Aziel Varek',
    type: 'website',
    images: [{ url: '/images/share.jpg', width: 1200, height: 630, alt: 'Aziel Varek, fiction author' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aziel Varek — Author',
    description: 'Stories across worlds. Science fiction, fantasy and fairytale.',
    images: ['/images/share.jpg']
  }
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
      </body>
    </html>
  );
}