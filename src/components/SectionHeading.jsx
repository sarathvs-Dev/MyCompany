import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

/**
 * The one section header used across the site, so every band shares the same
 * rhythm: mono kicker, display headline, muted supporting line.
 *
 * tone="dark" for the navy sections.
 */
const SectionHeading = ({ kicker, title, sub, tone = 'light', align = 'center', className = '' }) => {
  const centered = align === 'center';

  return (
    <motion.div
      className={`${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'} ${className}`}
      variants={stagger(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {kicker && (
        <motion.p
          variants={fadeUp}
          className={`kicker mb-5 ${tone === 'dark' ? 'text-accent' : 'text-primary/90'}`}
        >
          {kicker}
        </motion.p>
      )}

      <motion.h2
        variants={fadeUp}
        className={`font-display text-[2rem] md:text-[2.5rem] lg:text-[2.9rem] font-semibold leading-[1.1] tracking-[-0.02em] ${
          tone === 'dark' ? 'text-white' : 'text-secondary'
        }`}
      >
        {title}
      </motion.h2>

      {sub && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-base md:text-lg leading-relaxed ${
            tone === 'dark' ? 'text-slate-400' : 'text-secondary/60'
          }`}
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
