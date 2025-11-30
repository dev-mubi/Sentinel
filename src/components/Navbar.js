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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-900/95 backdrop-blur-md shadow-lg border-b border-dark-700' 
        : 'bg-dark-900/80 backdrop-blur-sm border-b border-dark-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group z-50">
            <img 
              src={logo} 
              alt="Sentinel" 
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Sentinel
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/#features" 
              className="text-dark-300 hover:text-dark-50 transition-colors font-medium"
            >
              Features
            </a>
            <Link 
              to="/docs" 
              className="text-dark-300 hover:text-dark-50 transition-colors font-medium"
            >
              Docs
            </Link>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-dark-300 hover:text-dark-50 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-dark-300 hover:text-white transition-colors z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span 
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed top-16 right-0 bottom-0 w-64 bg-dark-900/98 backdrop-blur-lg border-l border-dark-700 shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-6 bg-dark-900">
          <a 
            href="/#features" 
            className="text-dark-300 hover:text-white transition-colors font-medium text-lg"
          >
            Features
          </a>
          <Link 
            to="/docs" 
            className="text-dark-300 hover:text-white transition-colors font-medium text-lg"
          >
            Docs
          </Link>
          <div className="pt-6 border-t border-dark-700 space-y-4">
            <Link 
              to="/login" 
              className="block text-dark-300 hover:text-white transition-colors font-medium text-lg"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="block w-full px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 text-center"
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
