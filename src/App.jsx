import React from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Technologies from './components/Technologies';
import Testimonials from './components/Testimonials';
import CaseStudy from './components/CaseStudy';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    // reducedMotion="user" makes Framer skip transform/opacity animation for
    // anyone with the OS setting on — the CSS override in index.css only reaches
    // CSS transitions, and these reveals animate through inline styles in JS.
    // Without it, "reduce motion" users still get the full sliding entrance.
    <MotionConfig reducedMotion="user">
    {/* overflow-x-clip: sections animate in from x:±50, which would otherwise
        stick out past the right edge and give the page a horizontal scrollbar */}
    <div className="min-h-screen overflow-x-clip bg-background font-inter selection:bg-primary selection:text-white">
      {/* first tab stop: lets keyboard users jump the nav */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-secondary focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Trust />
        <About />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <CaseStudy />
        <Process />
        <Technologies />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
    </MotionConfig>
  );
}

export default App;
