import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from '../components/routing/Link';


const faqs = [
  {
    q: 'What is Deepfake Guard?',
    a: 'Deepfake Guard is an AI-powered tool that analyzes images to detect signs of AI generation or manipulation. It helps you verify whether a photo is authentic or synthetic.',
  },
  {
    q: 'How does the analysis work?',
    a: 'Our tool examines multiple factors including face consistency, skin texture, lighting alignment, and edge artifacts. Based on these signals, it provides a clear verdict: Real or Fake, along with a confidence percentage.',
  },
  {
    q: 'What image formats are supported?',
    a: 'We support common image formats including JPEG, PNG, and WebP. Upload a file or capture an image directly with your camera.',
  },
  {
    q: 'Is my uploaded image stored?',
    a: 'Images are processed for analysis only. We do not store or share your uploaded content. Your privacy is important to us.',
  },
  {
    q: 'How accurate is the detection?',
    a: 'Detection accuracy depends on the quality of the image and the sophistication of the manipulation. Our tool provides confidence scores to help you interpret the results. No system is 100% accurate, so use results as a guide.',
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Find answers to common questions about Deepfake Guard.
        </p>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
            </div>
          ))}
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
