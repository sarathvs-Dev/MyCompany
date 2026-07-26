import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

// Listed in the order the sections actually appear on the page — a menu that
// runs in a different order than the content it points at quietly disorients people.
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy: highlight whichever section is currently under the header, so
  // people always know where they are in a long single-page site.
  //
  // Deliberately scroll-position based rather than IntersectionObserver: these
  // sections are far taller than any sensible observation band, so the
  // intersection *ratio* stays near zero and never crosses a useful threshold.
  // "Last section whose top has passed the marker line" is exact at any height.
  useEffect(() => {
    // Sorted by document position, not menu position: "the last section whose
    // top has passed the marker" is only correct if we walk them in page order.
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );
    if (!sections.length) return;

    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.3;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top + window.scrollY <= marker) {
          current = section.id;
        }
      }

      // the final section is often too short to ever reach the marker, so give
      // it the highlight once we've hit the bottom of the page
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      setActiveSection(current);
    };

    // Measured synchronously: six getBoundingClientRect reads is far cheaper
    // than the rAF bookkeeping it would take to defer them.
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Escape closes the menu; body scroll is locked while it's open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-3.5'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center group" aria-label="TBF — Together Build Future">
            <Logo className="h-9 w-auto transition-transform group-hover:scale-105" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive ? 'text-primary' : 'text-secondary/70 hover:text-primary'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 rounded-full ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-secondary text-white text-sm font-medium hover:bg-primary transition-colors flex items-center gap-1.5 group"
            >
              Get Free Consultation
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-secondary p-2 -mr-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200/60 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-base font-medium py-3 border-b border-slate-100 transition-colors ${
                      isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                className="mt-4 px-6 py-3 rounded-xl bg-primary text-white text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
