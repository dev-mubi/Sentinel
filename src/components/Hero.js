import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-900 to-dark-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">

            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              OAuth 2.0 Authentication
              <span className="block bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent mt-2">
                Built for Developers
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-dark-300 leading-relaxed max-w-2xl">
              Sentinel provides secure OAuth 2.0 authentication with a developer portal to manage your applications and a hosted UI for seamless user experiences.
            </p>
            
            <p className="text-base text-dark-400 leading-relaxed max-w-2xl">
              Get started in minutes with industry-standard authorization, email verification, and password management—all handled for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link 
                to="/register" 
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:scale-105 text-lg"
              >
                Start Building
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <a 
                href="#features" 
                className="px-8 py-4 bg-dark-800/50 backdrop-blur-sm hover:bg-dark-700/50 text-dark-50 font-semibold rounded-xl transition-all border border-dark-700 hover:border-primary-600/50 text-lg"
              >
                Explore Features
              </a>
            </div>
          </div>
          
          {/* Logo Visual with enhanced effects */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-primary-500/30 blur-3xl rounded-full group-hover:blur-2xl transition-all duration-500"></div>
              <div className="absolute inset-0 bg-primary-600/20 blur-2xl rounded-full animate-pulse"></div>
              <img 
                src={logo} 
                alt="Sentinel" 
                className="relative w-80 h-auto drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
