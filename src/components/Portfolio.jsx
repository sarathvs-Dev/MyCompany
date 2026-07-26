import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Img from './Img';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web App', 'E-Commerce', 'Corporate'];

  // Categories of work we're set up to deliver — not past client projects.
  // The photography illustrates the sector, it is not a screenshot of shipped work.
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Storefronts',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
      desc: 'Product catalogues, checkout and payments, built to convert and to scale with your catalogue.'
    },
    {
      id: 2,
      title: 'SaaS Dashboards',
      category: 'Web App',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      desc: 'Data-heavy interfaces: charts, tables, filters and role-based access that stay fast as data grows.'
    },
    {
      id: 3,
      title: 'Corporate Sites & Portals',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      desc: 'Marketing sites and internal portals with a CMS your team can actually update without us.'
    },
    {
      id: 4,
      title: 'Marketplaces',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1531297172867-4f50efd06584?q=80&w=2070&auto=format&fit=crop',
      desc: 'Multi-vendor platforms with search, faceted filtering, seller accounts and split payments.'
    },
    {
      id: 5,
      title: 'Listing & Booking Platforms',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
      desc: 'Property, travel or service listings with maps, availability and enquiry handling.'
    },
    {
      id: 6,
      title: 'Ordering & Reservation Apps',
      category: 'Web App',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
      desc: 'Online ordering, table or slot reservations, and a kitchen or admin view to manage them.'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="section bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading
          kicker="What We Build"
          title={<>The kind of work we <span className="text-primary">take on</span></>}
          sub="We launched in 2026, so there are no client case studies here yet — this is what we are set up to build. Yours could be the first one on this page."
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
                      aria-label={`Start a ${project.title} project`}
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
