import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const Footer = () => {
  return (
    <footer className="bg-dark-800 border-t border-dark-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Sentinel" className="h-10 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Sentinel
              </span>
            </div>
            <p className="text-dark-300 mb-6 max-w-md">
              Enterprise-grade authentication and authorization service for modern applications.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-700 hover:bg-primary-600 rounded-lg flex items-center justify-center text-dark-300 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-700 hover:bg-primary-600 rounded-lg flex items-center justify-center text-dark-300 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-700 hover:bg-primary-600 rounded-lg flex items-center justify-center text-dark-300 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-dark-50 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-dark-50 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-dark-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-dark-400 text-sm">
            &copy; {new Date().getFullYear()} Sentinel. All rights reserved.
          </p>
          <p className="text-dark-400 text-sm">
            Built by the Sentinel Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
