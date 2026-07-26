import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Globe, Briefcase, AppWindow, Palette, Search, Wrench, Code2, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { fadeUp, revealGroup } from '../lib/motion';

const Services = () => {
  const services = [
    {
      icon: <ShoppingCart />,
      title: 'E-Commerce Development',
      description: 'High-converting online stores built for scale and maximum revenue generation.'
    },
    {
      icon: <Briefcase />,
      title: 'Business Websites',
      description: 'Professional websites that establish trust and drive qualified leads to your business.'
    },
    {
      icon: <Globe />,
      title: 'Corporate Websites',
      description: 'Enterprise-grade digital platforms reflecting your brand identity and authority.'
    },
    {
      icon: <AppWindow />,
      title: 'Web Applications',
      description: 'Complex, custom web applications built with modern JavaScript frameworks.'
    },
    {
      icon: <Palette />,
      title: 'UI/UX Design',
      description: 'User-centered design that delivers intuitive, engaging, and beautiful experiences.'
    },
    {
      icon: <Search />,
      title: 'SEO Optimization',
      description: 'Technical and on-page SEO to improve visibility and rank higher on search engines.'
    },
    {
      icon: <Wrench />,
      title: 'Website Maintenance',
      description: 'Ongoing support, updates, and security monitoring to keep your site running smoothly.'
    },
    {
      icon: <Code2 />,
      title: 'Custom Software',
      description: 'Tailored software solutions designed to solve your unique business challenges.'
    }
  ];

  return (
    <section id="services" className="section bg-slate-50/70">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading
          kicker="Our Expertise"
          title={<>Comprehensive digital <span className="text-primary">solutions</span></>}
          sub="End-to-end web development services to help your business thrive in the digital world."
          className="mb-16"
        />

        <motion.div {...revealGroup(0.05)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="card card-hover group p-7"
              variants={fadeUp}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/[0.07] text-primary flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                {React.cloneElement(service.icon, { size: 20 })}
              </div>
              <h3 className="text-base font-semibold text-secondary mb-2 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-secondary/55 leading-relaxed mb-5">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary/40 transition-colors group-hover:text-primary"
              >
                Learn more
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
