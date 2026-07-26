import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'TechFlow',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
      text: 'TBF transformed our digital presence completely. The new web app they built increased our user engagement by 150% in just two months.'
    },
    {
      name: 'Michael Chen',
      position: 'Marketing Director',
      company: 'Global Retail',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
      text: 'The e-commerce platform they developed is incredibly fast and intuitive. Our conversion rate has never been higher. Highly recommended team!'
    },
    {
      name: 'Emily Davis',
      position: 'Founder',
      company: 'StartupX',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
      text: 'Working with TBF was a breeze. They understood our vision from day one and delivered a product that exceeded our expectations.'
    }
  ];

  return (
    <section className="section bg-slate-50/70 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading
          kicker="Client Stories"
          title={<>Loved by <span className="text-primary">industry leaders</span></>}
          className="mb-16"
        />

        <div className="flex flex-col md:flex-row gap-5 justify-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card flex-1 p-8 flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <div className="flex gap-0.5 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-secondary/70 leading-relaxed mb-8 flex-1">{testimonial.text}</p>

              <div className="flex items-center gap-3.5 pt-6 border-t border-slate-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name} loading="lazy" decoding="async" width="80" height="80"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold text-secondary">{testimonial.name}</h4>
                  <p className="text-xs text-secondary/50">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
