import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const Process = () => {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Understanding your business, goals, and target audience.' },
    { num: '02', title: 'Planning', desc: 'Creating sitemaps, wireframes, and project roadmaps.' },
    { num: '03', title: 'UI/UX Design', desc: 'Crafting visually stunning and intuitive interfaces.' },
    { num: '04', title: 'Development', desc: 'Writing clean, scalable, and secure code.' },
    { num: '05', title: 'Testing', desc: 'Rigorous QA testing across all devices and browsers.' },
    { num: '06', title: 'Deployment', desc: 'Launching your project to the live environment.' },
    { num: '07', title: 'Maintenance', desc: 'Ongoing support and performance optimization.' }
  ];

  return (
    <section id="process" className="section bg-slate-50/70">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading
          kicker="How We Work"
          title={<>Our development <span className="text-primary">process</span></>}
          sub="A proven, transparent methodology that delivers on time and within budget."
          className="mb-16"
        />

        {/* Single rail on the left rather than a zig-zag — reads faster and keeps
            the step numbers on one consistent axis. */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-5 md:left-6 top-2 bottom-2 w-px bg-slate-200" />

          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex gap-6 md:gap-8"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.05 }}
              >
                <div className="relative z-10 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 text-primary text-xs md:text-sm font-semibold flex items-center justify-center">
                  {step.num}
                </div>
                <div className="card card-hover flex-1 p-6 mb-3">
                  <h3 className="text-base font-semibold text-secondary mb-1.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-secondary/55 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
