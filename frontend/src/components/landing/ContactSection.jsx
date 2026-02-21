import { useState } from 'react';
import { Link } from '../routing/Link';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(true);
    setSending(false);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-400 text-lg">Have questions or feedback? Send us a message and we will get back to you.</p>
        </div>

        {submitted ? (
          <div className="text-center py-12 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <p className="text-emerald-400 font-medium mb-2">Message sent successfully</p>
            <p className="text-gray-400 text-sm">We will respond as soon as we can.</p>
            <button type="button" onClick={() => setSubmitted(false)} className="mt-4 text-sm text-emerald-400 hover:underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
              <input id="contact-name" name="name" type="text" required value={formData.name} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 dark:border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input id="contact-email" name="email" type="email" required value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 dark:border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-300 mb-1.5">Subject</label>
              <select id="contact-subject" name="subject" required value={formData.subject} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 dark:border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="">Select a topic</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
              <textarea id="contact-message" name="message" required rows={4} value={formData.message} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 dark:border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="Your message..." />
            </div>
            <button type="submit" disabled={sending}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold transition-colors">
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          You can also check our <Link href="/faq" className="text-emerald-400 hover:underline">FAQ</Link> for quick answers.
        </p>
      </div>
    </section>
  );
}
