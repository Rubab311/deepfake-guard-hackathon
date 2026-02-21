import { Link } from '../routing/Link';

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/analyze', label: 'Analyze Image' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
  ];

  const resources = [
    { href: '/help', label: 'Help Guide' },
    { href: '/cyber-rules', label: 'Cyber Rules' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 dark:border-gray-900 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <span className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">
                Deepfake Guard
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Verify the authenticity of images and protect yourself from manipulated and AI-generated media.
            </p>
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resources.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © {year} Deepfake Guard. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
