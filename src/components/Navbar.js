import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-900/98 backdrop-blur-lg shadow-2xl border-b border-dark-700/80' 
        : 'bg-dark-900/95 backdrop-blur-md border-b border-dark-800/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={logo} 
                alt="Sentinel" 
                className="relative h-11 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-dark-50 group-hover:text-primary-400 transition-colors duration-300">
                Sentinel
              </span>
              <span className="text-xs text-dark-400 font-medium">OAuth 2.0 Provider</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <a 
              href="/#features" 
              className="px-4 py-2 text-dark-300 hover:text-dark-50 hover:bg-dark-800/50 rounded-lg transition-all duration-200 font-medium text-sm"
            >
              Features
            </a>
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                isActive('/about')
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20'
                  : 'text-dark-300 hover:text-dark-50 hover:bg-dark-800/50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/docs" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                isActive('/docs')
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20'
                  : 'text-dark-300 hover:text-dark-50 hover:bg-dark-800/50'
              }`}
            >
              Documentation
            </Link>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/login" 
              className="px-5 py-2.5 text-dark-300 hover:text-dark-50 font-medium text-sm transition-all duration-200 hover:bg-dark-800/50 rounded-lg"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-dark-300 hover:text-white hover:bg-dark-800/50 rounded-lg transition-all duration-200 z-50"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span 
                className={`w-full h-0.5 bg-current transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-current transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-current transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu - Full Width with Solid Background */}
      <div 
        className={`md:hidden fixed top-20 left-0 right-0 bg-dark-900 border-b border-dark-700 shadow-2xl transition-all duration-300 ease-out z-40 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex flex-col p-6">
          {/* Navigation Links */}
          <nav className="space-y-2 mb-6">
            <a 
              href="/#features" 
              className="block px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800/50 rounded-lg transition-all font-medium"
            >
              Features
            </a>
            <Link 
              to="/about" 
              className={`block px-4 py-3 rounded-lg transition-all font-medium ${
                isActive('/about')
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800/50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/docs" 
              className={`block px-4 py-3 rounded-lg transition-all font-medium ${
                isActive('/docs')
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800/50'
              }`}
            >
              Documentation
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="pt-6 border-t border-dark-700 space-y-3">
            <Link 
              to="/login" 
              className="block w-full px-4 py-3 text-center text-dark-300 hover:text-white hover:bg-dark-800/50 font-medium rounded-lg transition-all"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="block w-full px-4 py-3 text-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
