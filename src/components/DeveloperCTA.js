import React from 'react';
import { Link } from 'react-router-dom';

const DeveloperCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"></div>
      
      {/* Animated orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-primary-500/5 to-primary-600/10 blur-3xl"></div>
          
          {/* Main CTA Box */}
          <div className="relative bg-gradient-to-br from-dark-800/80 to-dark-800/40 backdrop-blur-sm border border-dark-700/50 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-600/10 rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-600/10 rounded-tl-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-600/20 to-transparent"></div>
            
            <div className="relative">
              {/* Badge */}
              {/* <div className="inline-block px-4 py-2 bg-primary-600/10 border border-primary-600/20 rounded-full mb-6">
                <span className="text-primary-400 text-sm font-semibold">Free to Use</span>
              </div> */}
              
              {/* Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ready to Build?
                <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mt-2">
                  Start Today
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join developers using Sentinel for secure OAuth 2.0 authentication
              </p>
              
              {/* Stats/Features */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
                <div className="flex items-center gap-2 text-dark-300">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm md:text-base">OAuth 2.0 Standard</span>
                </div>
                <div className="flex items-center gap-2 text-dark-300">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm md:text-base">Hosted UI Included</span>
                </div>
                <div className="flex items-center gap-2 text-dark-300">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm md:text-base">Up to 2 Apps</span>
                </div>
                <div className="flex items-center gap-2 text-dark-300">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm md:text-base">Email Verification</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/register" 
                  className="group px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:scale-105 text-lg"
                >
                  Create Account
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link 
                  to="/docs" 
                  className="px-10 py-4 bg-dark-800/50 backdrop-blur-sm hover:bg-dark-700/50 text-dark-50 font-semibold rounded-xl transition-all border border-dark-700 hover:border-primary-600/50 text-lg"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperCTA;
