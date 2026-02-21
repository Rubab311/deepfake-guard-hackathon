import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from '../components/routing/Link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About Deepfake Guard
        </h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-400">
          <p>
            Deepfake Guard was created to help people verify the authenticity of images in an era 
            where AI-generated and manipulated media are becoming increasingly prevalent.
          </p>
          <p>
            With advances in generative AI, it has become difficult to distinguish real photographs 
            from synthetic ones. Our tool uses AI-powered analysis to examine images for common 
            signs of manipulation or AI generation, giving you a clear verdict and confidence score.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white pt-4">
            Our Mission
          </h2>
          <p>
            We aim to promote transparency and trust in digital media. By providing accessible 
            deepfake detection, we help users make informed decisions about the content they 
            encounter online.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white pt-4">
            How It Works
          </h2>
          <p>
            Simply upload an image or capture one with your camera. Our analysis checks face 
            consistency, skin texture, lighting alignment, and edge artifacts. You receive a 
            straightforward result: Real or Fake, along with a detailed breakdown of the factors 
            we analyzed.
          </p>
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
