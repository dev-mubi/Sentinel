import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';

const MobileHeader = ({ developer, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <div className="md:hidden bg-dark-800 border-b border-dark-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-dark-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Sentinel" className="h-6 w-auto" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Sentinel
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold">
            {developer.name.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
