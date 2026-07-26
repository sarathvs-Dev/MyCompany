import React from 'react';
import { motion } from 'framer-motion';

const Trust = () => {
  const stats = [
    { value: '100%', label: 'Founder-Led Attention' },
    { value: '24 Hrs', label: 'First Custom UI Draft' },
    { value: '0%', label: 'Bloated Corporate Overhead' },
    { value: '100%', label: 'Direct Transparency' },
  ];

  return (
    <section className="py-14 md:py-16 bg-secondary text-white relative z-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-4 md:divide-x md:divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center px-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 text-accent tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-slate-400 font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
