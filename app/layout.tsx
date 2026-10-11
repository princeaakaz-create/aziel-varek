import type { Metadata } from 'next';
import { Cinzel, Cinzel_Decorative, EB_Garamond } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import AmbientBackground from '@/components/AmbientBackground';

const display = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});

const deco = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-deco',
  display: 'swap'
});

const body = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
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
    <html lang="en" className={`${display.variable} ${deco.variable} ${body.variable}`}>
      <body>
        <AmbientBackground />
        <div className="relative z-10">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </div>
      </body>
    </html>
  );
}