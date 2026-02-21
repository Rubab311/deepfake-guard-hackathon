import { Link } from '../routing/Link';

export default function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          What is Deepfake Guard?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-4 leading-relaxed">
          Deepfake Guard is an AI-powered tool that analyzes images to detect signs of AI generation or manipulation.
          With the rise of generative AI, it has become harder to tell real photos from synthetic ones. Our tool examines
          face consistency, skin texture, lighting, and edge artifacts to give you a clear verdict: <strong className="text-emerald-600 dark:text-emerald-400">Real</strong> or <strong className="text-red-600 dark:text-red-400">Fake</strong>.
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          Upload an image or capture one with your camera to get an instant analysis.
        </p>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
            How it works
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4">
            <div className="flex-1 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold mb-2">1</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Upload or capture</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Image from device or camera</p>
            </div>
            <span className="hidden sm:block text-gray-400">→</span>
            <div className="flex-1 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold mb-2">2</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">We analyze it</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">AI checks multiple factors</p>
            </div>
            <span className="hidden sm:block text-gray-400">→</span>
            <div className="flex-1 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold mb-2">3</span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Get your verdict</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Real or Fake + breakdown</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/analyze" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
              Try it now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
