import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from '../components/routing/Link';

const guides = [
  { id: 'fake-image-of-you', title: 'You Discovered a Fake Image of You', steps: [
    'Do not panic. Document everything: save the image, URL, platform, date, and any related posts.',
    'Report the content to the platform (Facebook, Twitter, Instagram, etc.) under their impersonation or harassment policies.',
    'Contact the person who posted it and request removal if safe to do so.',
    'Consider reporting to law enforcement if the image is defamatory, harassing, or used for fraud.',
    'Seek legal advice if the impact is serious (reputation, employment, relationships).',
  ]},
  { id: 'spreading-deepfakes', title: 'Someone Is Spreading Deepfakes of Others', steps: [
    'If you know the victim, inform them privately so they can take action.',
    'Report the content to the platform. Most platforms have reporting tools for misinformation and impersonation.',
    'Do not share or amplify the content; sharing increases harm even if intended to expose it.',
    'Support organizations that help victims of deepfake abuse.',
  ]},
  { id: 'suspicious-image', title: 'You Received a Suspicious Image', steps: [
    'Use a tool like Deepfake Guard to analyze the image before trusting or sharing it.',
    'Check the source: is it from a verified account or a random forward?',
    'Look for inconsistencies: unnatural skin texture, odd lighting, blurred edges around the face.',
    'Search for the original image online—many deepfakes are based on existing photos.',
    'Do not forward or react until you have verified authenticity.',
  ]},
  { id: 'protecting-yourself', title: 'Protecting Yourself Proactively', steps: [
    'Limit the number of high-quality photos you share publicly; fewer images make it harder to create convincing deepfakes.',
    'Enable two-factor authentication on social accounts to reduce the risk of impersonation.',
    'Use privacy settings to control who can see and download your photos.',
    'Be cautious with apps that use face data; read permissions carefully.',
  ]},
  { id: 'support', title: 'Emotional Support and Resources', steps: [
    'Being targeted by deepfakes can be distressing. Talk to friends, family, or a mental health professional.',
    'Connect with support groups for victims of online abuse or image-based harm.',
    'Know that you are not alone—many people have faced similar situations and recovered.',
  ]},
];

export default function HelpGuide() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 w-full flex flex-col lg:flex-row">
        {/* Sidebar - On this page */}
        <aside className="lg:w-56 shrink-0 lg:sticky lg:top-20 lg:self-start order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 lg:bg-transparent lg:py-16">
          <div className="max-w-4xl lg:max-w-none mx-auto px-4 sm:px-6 lg:px-8 lg:pl-8 lg:pr-6 py-6 lg:py-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              In this guide
            </h3>
            <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {guides.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors lg:py-1"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 order-1 lg:order-2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <header className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                How to Deal with Fake Images
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                A practical guide when you encounter or are affected by deepfakes and manipulated images.
              </p>
            </header>

            <div className="space-y-10">
              {guides.map((guide, i) => (
                <section
                  key={guide.id}
                  id={guide.id}
                  className="scroll-mt-24"
                >
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Section {i + 1} of {guides.length}
                      </span>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-0.5">
                        {guide.title}
                      </h2>
                    </div>
                    <ul className="px-5 py-4 space-y-3 list-none">
                      {guide.steps.map((step, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-semibold">
                            {j + 1}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pt-0.5">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-3 justify-center">
              <Link href="/" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                ← Home
              </Link>
              <Link href="/cyber-rules" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors">
                Cyber Rules →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
