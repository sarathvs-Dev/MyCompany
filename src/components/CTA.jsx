import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="section bg-primary relative overflow-hidden">
      {/* one soft light source instead of two competing blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(255,255,255,0.16),transparent_70%)]" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-6 leading-[1.15] tracking-tight">
            Let us prove our value <br className="hidden md:block" /> before you pay a single cent
          </h2>
          <p className="text-base md:text-lg text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            We will design a custom interactive homepage mockup for your business completely free.
            If you love it, we build it. If not, it&apos;s yours to keep. Zero risk, zero friction.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-primary text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 group"
            >
              Claim Your Free Mockup
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Schedule Strategy Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
