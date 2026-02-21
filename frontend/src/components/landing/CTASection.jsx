import { Link } from '../routing/Link';

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-emerald-600 dark:bg-emerald-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Verify an Image Now
        </h2>
        <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
          Don’t let fake images spread. Upload or capture a photo and get an instant Real or Fake verdict.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
        >
          Analyze an Image
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
