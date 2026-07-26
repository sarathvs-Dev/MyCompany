import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from './SectionHeading';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'You launched in 2026 — why should I hire a new studio?',
      a: "Fair question, and we'd rather answer it here than have you wonder. We don't have a client list yet, so we compete on the things a bigger agency can't offer: you deal with the founder directly, we take on very few projects at once, and early clients get founding-client pricing. We also design a custom homepage mockup for free before you commit to anything — so you can judge the work rather than take our word for it.",
    },
    {
      q: 'How long does a project take?',
      a: 'Project timelines vary depending on complexity and scope. A standard corporate website might take 4-6 weeks, while a custom web application or complex e-commerce platform can take 3-6 months. We provide detailed timelines during the discovery phase.'
    },
    {
      q: 'What technologies do you use?',
      a: 'We specialize in modern JavaScript frameworks (React, Next.js, Vue) for the frontend, and Node.js, Python, or Java for the backend. We choose the best technology stack based on your specific project requirements, scalability needs, and budget.'
    },
    {
      q: 'Do you provide maintenance?',
      a: 'Yes, we offer comprehensive ongoing maintenance and support packages. This includes security updates, performance monitoring, regular backups, bug fixes, and feature enhancements to ensure your platform runs smoothly.'
    },
    {
      q: 'Can you redesign existing websites?',
      a: 'Absolutely. We can take your existing website and completely overhaul the UI/UX, modernize the technology stack, improve performance, and optimize it for search engines while preserving your existing data and SEO equity.'
    },
    {
      q: 'Do you build e-commerce stores?',
      a: 'Yes, we build scalable e-commerce solutions using platforms like Shopify, WooCommerce, or custom-built solutions using Next.js and headless CMS approaches, tailored to maximize your conversion rates.'
    },
    {
      q: 'Do you offer SEO services?',
      a: 'Yes. All our websites are built with technical SEO best practices from the ground up. We also offer ongoing SEO services including on-page optimization, content strategy, and performance tuning to improve your search rankings.'
    }
  ];

  return (
    <section className="section bg-slate-50/70">
      <div className="container mx-auto px-6 max-w-3xl">
        <SectionHeading
          kicker="FAQ"
          title={<>Frequently asked <span className="text-primary">questions</span></>}
          sub="Answers to the questions we hear most about our services and process."
          className="mb-14"
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`card overflow-hidden ${openIndex === index ? 'border-primary/30' : ''}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-secondary">{faq.q}</span>
                <ChevronDown
                  className={`text-primary/70 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  size={18}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-sm text-secondary/60 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
