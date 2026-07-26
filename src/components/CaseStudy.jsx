import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Zap, Smile } from 'lucide-react';
import Img from './Img';

const CaseStudy = () => {
  return (
    <section className="section bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-secondary rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_15%_0%,rgba(37,99,235,0.25),transparent_65%)] pointer-events-none" />

          <div className="flex flex-col lg:flex-row relative z-10">
            <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-5">
                Featured Case Study
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-[1.15]">
                Fashion E-Commerce Redesign
              </h2>
              <p className="text-base text-slate-400 mb-10 leading-relaxed max-w-lg">
                How we transformed an outdated online store into a high-converting, lightning-fast
                shopping experience.
              </p>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10">
                {[
                  { icon: TrendingUp, value: '220%', label: 'Sales Increase' },
                  { icon: Zap, value: '65%', label: 'Faster Load' },
                  { icon: Smile, value: '4.9/5', label: 'User Rating' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label}>
                    <Icon size={16} className="text-accent mb-3" />
                    <div className="text-2xl font-bold text-white mb-1 tracking-tight">{value}</div>
                    <div className="text-xs text-slate-400">{label}</div>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-accent transition-colors w-fit group"
              >
                Read Full Case Study
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            
            <div className="flex-1 min-h-[400px] lg:min-h-0 relative bg-gray-900">
              <Img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                alt="Analytics dashboard showing growth"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
