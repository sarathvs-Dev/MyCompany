import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Img from './Img';

const About = () => {
  const highlights = [
    'Expert Developers',
    'Modern Technologies',
    'User-Centered Design',
    'Reliable Support',
  ];

  return (
    <section id="about" className="section bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Our team collaborating"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            
            {/* Experience Badge */}
            {/* was "5+ Years of Excellence", which contradicted "launched in 2026"
                two sections above it */}
            <div className="absolute -bottom-6 -right-6 card p-5 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.35)] hidden md:block">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-primary/[0.07] flex items-center justify-center text-primary font-bold text-sm">
                  2026
                </div>
                <div>
                  <div className="text-secondary text-sm font-semibold">Founded</div>
                  <div className="text-secondary/50 text-sm">Taking first clients</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading
              align="left"
              kicker="About Us"
              title={<>We build websites that <span className="text-primary">businesses love</span></>}
              sub="TBF (Together Build Future) is a founder-led studio building web applications, e-commerce platforms and custom software. We're new — which means your project gets built by the person you actually talk to, with the care that comes from needing to earn a reputation."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mt-10 mb-10">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <CheckCircle2 className="text-primary/70 shrink-0" size={18} />
                  <span className="text-sm text-secondary/80">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-secondary text-white text-sm font-medium hover:bg-primary transition-colors"
            >
              Discover Our Services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
