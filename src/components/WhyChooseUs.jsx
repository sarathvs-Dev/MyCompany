import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MonitorSmartphone, Search, Gauge, ShieldCheck, Database, HeadphonesIcon, PiggyBank } from 'lucide-react';
import SectionHeading from './SectionHeading';

const WhyChooseUs = () => {
  const features = [
    { icon: <Database />, title: 'Modern Tech Stack', desc: 'React, Node.js, Next.js & more' },
    { icon: <MonitorSmartphone />, title: 'Mobile Responsive', desc: 'Flawless across all devices' },
    { icon: <Search />, title: 'SEO Optimized', desc: 'Built for search engine visibility' },
    { icon: <Gauge />, title: 'Fast Performance', desc: 'Lightning-fast load times' },
    { icon: <ShieldCheck />, title: 'Secure Development', desc: 'Industry-standard security practices' },
    { icon: <Zap />, title: 'Scalable Architecture', desc: 'Grows alongside your business' },
    { icon: <HeadphonesIcon />, title: 'Dedicated Support', desc: '24/7 technical assistance' },
    { icon: <PiggyBank />, title: 'Affordable Solutions', desc: 'Premium quality, reasonable pricing' },
  ];

  return (
    <section className="section bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          <div className="flex-1">
            <SectionHeading
              tone="dark"
              align="left"
              kicker="Why Choose Us"
              title={<>We deliver <span className="text-accent">excellence</span> in every pixel</>}
              sub="Partner with a team that treats your business like their own. We combine technical expertise with strategic thinking to deliver solutions that drive real results."
              className="mx-auto lg:mx-0 text-center lg:text-left"
            />
            <a
              href="#contact"
              className="mt-9 inline-flex items-center justify-center px-7 py-3 rounded-full bg-accent text-secondary text-sm font-semibold hover:bg-white transition-colors"
            >
              Start Building Today
            </a>
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card-dark card-dark-hover p-5 flex items-start gap-4"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.05 }}
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    {React.cloneElement(feature.icon, { size: 17 })}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-1">{feature.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
