import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import UseCases from '../components/UseCases';
import DeveloperCTA from '../components/DeveloperCTA';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <DeveloperCTA />
      <Footer />
    </div>
  );
};

export default HomePage;
