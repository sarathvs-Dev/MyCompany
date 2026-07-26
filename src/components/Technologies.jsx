import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { fadeUp, revealGroup } from '../lib/motion';

const Technologies = () => {
  const categories = [
    {
      name: 'Frontend',
      techs: ['React', 'Next.js', 'Tailwind CSS', 'Vue.js', 'TypeScript']
    },
    {
      name: 'Backend',
      techs: ['Node.js', 'Express.js', 'Python', 'Django', 'Java']
    },
    {
      name: 'Database',
      techs: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase']
    },
    {
      name: 'Cloud & DevOps',
      techs: ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'CI/CD']
    }
  ];

  return (
    <section className="section bg-white border-y border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading
          kicker="Our Stack"
          title={<>Powered by modern <span className="text-primary">technologies</span></>}
          sub="The latest tools and frameworks, chosen for scale, robustness and speed."
          className="mb-16"
        />

        <motion.div {...revealGroup(0.05)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              className="card card-hover p-7"
              variants={fadeUp}
            >
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80 mb-5">
                {category.name}
              </h3>
              <ul className="space-y-2.5">
                {category.techs.map((tech, i) => (
                  <li key={i} className="text-sm text-secondary/70">{tech}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
