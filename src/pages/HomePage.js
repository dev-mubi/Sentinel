import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;
