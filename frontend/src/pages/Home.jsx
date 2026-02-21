import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import ResourcesStrip from '../components/landing/ResourcesStrip';
import CTASection from '../components/landing/CTASection';
import ContactSection from '../components/landing/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ResourcesStrip />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
