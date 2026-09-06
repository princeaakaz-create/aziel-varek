import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import About from '@/components/About';
import WorldsSection from '@/components/WorldsSection';
import BookGrid from '@/components/BookGrid';
import FeaturedBook from '@/components/FeaturedBook';
import JournalSection from '@/components/JournalSection';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Intro />
      <About />
      <WorldsSection />
      <BookGrid />
      <FeaturedBook />
      <JournalSection />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
}
