import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ContactForm from './ContactForm';

const details = [
  { icon: Phone, label: 'Phone Number', value: '+1 (555) 123-4567' },
  { icon: Mail, label: 'Email Address', value: 'hello@tbf.com' },
  {
    icon: MapPin,
    label: 'Office Location',
    value: (
      <>
        123 Innovation Drive,
        <br />
        Tech District, SF 94105
      </>
    ),
  },
  { icon: Clock, label: 'Business Hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM' },
];

const Contact = () => {
  return (
    <section id="contact" className="section bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 lg:max-w-md">
            <SectionHeading
              align="left"
              kicker="Get In Touch"
              title={<>Let&apos;s discuss your next <span className="text-primary">big project</span></>}
              sub="Fill out the form and our team will get back to you within 24 hours to schedule a consultation."
            />

            <div className="mt-10 space-y-5">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/[0.07] text-primary flex items-center justify-center shrink-0">
                    <Icon size={17} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-0.5">{label}</h4>
                    <p className="text-sm text-secondary/55 leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
