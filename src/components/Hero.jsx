import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Layout, Smartphone } from 'lucide-react';
import WorldMap from './WorldMap';
import { fadeUp, stagger } from '../lib/motion';

const capabilities = [
  { icon: Code, label: 'React & Node' },
  { icon: Layout, label: 'Figma Design' },
  { icon: Smartphone, label: 'Mobile First' },
];

const Hero = () => {
  return (
    <section id="home" className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-white">
      {/* The TBF network, quiet in the background: neutral land, blue only where it moves */}
      <div className="absolute inset-0 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_78%_70%_at_50%_48%,#000_40%,transparent_100%)]">
        <WorldMap className="w-full h-full" theme="light" />
      </div>

      {/* scrim: clears the centre so the copy reads cleanly, map keeps breathing at the edges */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_52%_46%_at_50%_45%,rgba(255,255,255,0.94)_30%,rgba(255,255,255,0)_100%)]" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        {/* on-load choreography: each line arrives just behind the one above it */}
        <motion.div variants={stagger(0.09, 0.1)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="kicker text-primary/90 mb-6">
            Together &middot; Build &middot; Future
          </motion.p>

          {/* text-balance evens the line lengths so no word is left stranded */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.5rem] md:text-[3.4rem] lg:text-[3.9rem] font-semibold text-secondary leading-[1.05] mb-6 tracking-[-0.035em] text-balance"
          >
            We Build Bespoke Digital Products That{' '}
            <span className="text-gradient">Win Customers</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-secondary/60 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Launched in 2026, TBF — Together Build Future — is a high-performance design &amp;
            development studio. We create custom websites and scalable web applications engineered
            to win you clients and grow your revenue.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a
              href="#contact"
              className="group w-full sm:w-auto px-7 py-3.5 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ease-soft shadow-[0_10px_24px_-8px_rgba(37,99,235,0.55)] hover:shadow-[0_16px_32px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Claim Free Custom UI Mockup
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
              />
            </a>
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-secondary text-sm font-semibold ring-1 ring-slate-200 flex items-center justify-center transition-all duration-300 ease-soft hover:ring-secondary/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              View Portfolio
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          >
            {capabilities.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-secondary/50">
                <Icon size={15} className="text-primary/70" />
                {label}
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-secondary/50"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            Founder-led studio &middot; available for new projects
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
