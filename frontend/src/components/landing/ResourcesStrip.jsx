import { Link } from '../routing/Link';

const links = [
  { href: '/help', label: 'Deal with fake images' },
  { href: '/cyber-rules', label: 'Laws & rules' },
  { href: '/faq', label: 'FAQ' },
];

export default function ResourcesStrip() {
  return (
    <section className="py-10 bg-gray-900/50 dark:bg-gray-950/50 border-y border-gray-800 dark:border-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm mb-6">
          Resources
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
