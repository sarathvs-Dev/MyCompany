import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Img from './Img';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web App', 'E-Commerce', 'Corporate'];

  const projects = [
    {
      id: 1,
      title: 'Fashion E-Commerce Platform',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
      desc: 'A high-converting scalable e-commerce store with modern UI.'
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      category: 'Web App',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      desc: 'Analytics dashboard with real-time data visualization.'
    },
    {
      id: 3,
      title: 'Corporate Business Portal',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      desc: 'Enterprise portal for internal communication and management.'
    },
    {
      id: 4,
      title: 'Electronics Marketplace',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1531297172867-4f50efd06584?q=80&w=2070&auto=format&fit=crop',
      desc: 'Multi-vendor electronics marketplace with complex filtering.'
    },
    {
      id: 5,
      title: 'Real Estate Website',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
      desc: 'Property listing platform with interactive maps.'
    },
    {
      id: 6,
      title: 'Restaurant Order System',
      category: 'Web App',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
      desc: 'Online ordering and table reservation application.'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="section bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading
          kicker="Our Work"
          title={<>Explore our <span className="text-primary">portfolio</span></>}
          sub="A showcase of our best work across various industries."
          className="mb-12"
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeFilter === filter
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white text-secondary/60 border-slate-200 hover:border-secondary/30 hover:text-secondary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="card card-hover group relative overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Img
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-soft group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {/* TODO: point at real case-study pages once they exist —
                        until then this goes somewhere useful rather than to "#" */}
                    <a
                      href="#contact"
                      aria-label={`Ask us about ${project.title}`}
                      className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 self-end mb-4 hover:bg-blue-700"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-primary/80 text-[11px] font-semibold uppercase tracking-[0.18em] mb-2.5">
                    {project.category}
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-secondary/55 leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
