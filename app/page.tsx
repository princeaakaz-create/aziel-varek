import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WorldsSection from '@/components/WorldsSection';
import BookGrid from '@/components/BookGrid';
import FeaturedBook from '@/components/FeaturedBook';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

export default function HomePage() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <WorldsSection />
      <BookGrid />
      <FeaturedBook />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}