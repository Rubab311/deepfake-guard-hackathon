const features = [
  {
    title: 'AI-Powered Detection',
    description: 'Our model analyzes face consistency, skin texture, lighting, and edge artifacts to spot signs of manipulation that the human eye often misses.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Real or Fake Verdict',
    description: 'Get a clear, definitive result with confidence scores. No vague metrics—just a straightforward Real or Fake classification backed by explainable factors.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Instant & Private',
    description: 'Upload an image or capture with your camera. Analysis runs in seconds. Your images are processed for detection only—we do not store or share them.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-900 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Deepfake Guard?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            In a world where AI can generate convincing fakes, you need a tool that cuts through the noise and tells you what’s real.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative bg-gray-800/50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50 dark:border-gray-800 hover:border-emerald-500/40 transition-colors group"
            >
              <div className="absolute top-6 right-6 text-6xl font-bold text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">
                0{i + 1}
              </div>
              <div className="text-emerald-400 mb-6 relative">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
