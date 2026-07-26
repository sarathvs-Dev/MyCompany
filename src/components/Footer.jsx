import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
const CONTACT_EMAIL = 'hello@tbf.com';

// TODO: swap the placeholder hrefs for the real profiles
const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(null); // null | 'sent' | 'mail'

  // Same deal as the contact form: post to a real list if one is configured,
  // otherwise hand off to the visitor's mail client rather than pretending.
  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    if (!NEWSLETTER_ENDPOINT) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        'Newsletter signup'
      )}&body=${encodeURIComponent(`Please add ${email} to the TBF newsletter.`)}`;
      setSubscribed('mail');
      return;
    }

    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSubscribed('sent');
      setEmail('');
    } catch {
      setSubscribed('mail');
    }
  };

  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-1">
            <a href="#home" className="inline-block mb-6" aria-label="TBF — Together Build Future">
              <Logo className="h-24 w-auto" withTagline onDark />
            </a>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We build scalable, high-performance websites and web applications for businesses that demand excellence.
            </p>
            <ul className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`TBF on ${label}`}
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">E-Commerce Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Business Websites</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Web Applications</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">SEO Optimization</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Subscribe for occasional notes on what we&apos;re building and learning.
            </p>
            {subscribed ? (
              <p role="status" className="text-sm text-accent leading-relaxed">
                {subscribed === 'sent'
                  ? 'Thanks — check your inbox to confirm.'
                  : `We've opened your email app to finish the signup. If nothing happened, email ${CONTACT_EMAIL}.`}
              </p>
            ) : (
              <form className="flex flex-col gap-2.5" onSubmit={handleSubscribe}>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TBF — Together Build Future. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
