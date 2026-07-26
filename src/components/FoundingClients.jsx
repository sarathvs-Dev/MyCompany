import React from 'react';
import { motion } from 'framer-motion';
import { UserRound, Timer, Tag, FileCheck2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { fadeUp, revealGroup } from '../lib/motion';

/**
 * Replaces the testimonials block. A brand-new studio has no clients to quote,
 * and invented quotes are both a legal risk and trivially checkable — so this
 * says the quiet part out loud and turns "we're new" into the actual offer.
 */

const reasons = [
  {
    icon: UserRound,
    title: 'You work with the founder',
    body: 'No account managers, no handoffs to a junior team. The person you brief is the person who builds it.',
  },
  {
    icon: Timer,
    title: 'A small number of projects',
    body: 'We take on few clients at a time, so yours gets proper attention instead of a slot in a queue.',
  },
  {
    icon: Tag,
    title: 'Founding-client pricing',
    body: 'Early projects are priced while we build our portfolio. That rate is fixed for the life of the engagement.',
  },
  {
    icon: FileCheck2,
    title: 'See the work before you pay',
    body: 'We design a custom homepage mockup for free. If you like it we build it; if not, it is yours to keep.',
  },
];

const FoundingClients = () => {
  return (
    <section className="section bg-slate-50/70">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading
          kicker="Founding Clients"
          title={
            <>
              We&apos;re new. Here&apos;s why that&apos;s{' '}
              <span className="text-primary">good for you</span>
            </>
          }
          sub="TBF launched in 2026, so we don't have a wall of logos yet. What we do have is the thing agencies lose once they scale: time, attention, and a real incentive to make your project excellent."
          className="mb-16"
        />

        <motion.div
          {...revealGroup(0.06)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {reasons.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={fadeUp} className="card card-hover group p-7">
              <div className="w-11 h-11 rounded-xl bg-primary/[0.07] text-primary flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-secondary mb-2 tracking-tight">{title}</h3>
              <p className="text-sm text-secondary/55 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          {...{ variants: fadeUp, initial: 'hidden', whileInView: 'show', viewport: { once: true } }}
          className="text-center text-sm text-secondary/50 mt-12"
        >
          Want to be the first case study on this page?{' '}
          <a href="#contact" className="text-primary font-medium hover:underline">
            Tell us what you&apos;re building
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
};

export default FoundingClients;
