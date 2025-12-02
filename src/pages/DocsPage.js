import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [copiedCode, setCopiedCode] = useState('');
  const [showMobileNav, setShowMobileNav] = useState(false);

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'introduction';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setShowMobileNav(false);
    }
  };

  const CodeBlock = ({ code, language, id }) => (
    <div className="my-6 relative group">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => copyCode(code, id)}
          className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md transition-colors font-medium"
        >
          {copiedCode === id ? '✓ Copied' : 'Copy Code'}
        </button>
      </div>
      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-5 overflow-x-auto">
        <code className="text-sm text-gray-800 font-mono whitespace-pre leading-relaxed">{code}</code>
      </pre>
    </div>
  );

  const navItems = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'quick-start', label: 'Quick Start' },
    { id: 'authentication-flow', label: 'Authentication Flow' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'api-endpoints', label: 'API Reference' },
    { id: 'best-practices', label: 'Best Practices' },
    { id: 'troubleshooting', label: 'Troubleshooting' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Mobile Navigation Header */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <div className="w-2 h-5 bg-blue-600 rounded mr-2"></div>
          <span className="font-semibold text-gray-900">Documentation</span>
        </div>
        <button 
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {showMobileNav ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {showMobileNav && (
        <div className="lg:hidden fixed inset-0 z-20 bg-gray-900 bg-opacity-50" onClick={() => setShowMobileNav(false)}>
          <div className="absolute top-[68px] left-0 right-0 bg-white border-b border-gray-200 shadow-xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <nav className="p-5 space-y-0.5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-4 py-3.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 pl-3'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Resources Section */}
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h5 className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider px-4">Resources</h5>
                <div className="space-y-3 px-4">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setShowMobileNav(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Dashboard
                  </Link>
                  <a 
                    href="mailto:mobishahzaib@gmail.com" 
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setShowMobileNav(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Support
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Sentinel Auth</h1>
                <p className="text-sm text-gray-500">OAuth 2.0 Provider Documentation</p>
              </div>
              
              <div className="mb-6">
                <h5 className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Documentation</h5>
                <nav className="space-y-0.5">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`block w-full text-left px-4 py-3 text-sm rounded-lg transition-all ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600 pl-3'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h5 className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Resources</h5>
                <div className="space-y-3">
                  <Link to="/dashboard" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Dashboard
                  </Link>
                  <a href="mailto:mobishahzaib@gmail.com" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Support
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10">
              
              {/* Introduction */}
              <section id="introduction" className="mb-12 lg:mb-16 scroll-mt-20">
                <div className="mb-6 lg:mb-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">Sentinel OAuth 2.0 Documentation</h1>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    Comprehensive guide to implementing secure OAuth 2.0 authentication with Sentinel. 
                    Follow this documentation to integrate enterprise-grade authentication into your applications.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg lg:rounded-xl p-4 sm:p-5 lg:p-6 mb-6 lg:mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-2 mr-3 lg:mr-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-blue-900 font-semibold mb-1 lg:mb-2">Integration Overview</h4>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        Sentinel implements the standard OAuth 2.0 authorization code flow. Users authenticate securely on our platform, 
                        and your application receives tokens without handling sensitive credentials.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mt-8 lg:mt-10 mb-4 lg:mb-6 pb-2 border-b border-gray-100">Prerequisites</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sentinel Account</h4>
                    <p className="text-sm text-gray-600">Register for a developer account to access the dashboard and obtain credentials.</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Application Registration</h4>
                    <p className="text-sm text-gray-600">Register your application in the dashboard to obtain Client ID and Secret.</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Backend Server</h4>
                    <p className="text-sm text-gray-600">A secure backend server is required for token exchange operations.</p>
                  </div>
                </div>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="mb-12 lg:mb-16 scroll-mt-20 pt-6 lg:pt-8 border-t border-gray-100">
                <div className="flex items-center mb-6 lg:mb-8">
                  <div className="w-2 lg:w-3 h-6 lg:h-8 bg-blue-600 rounded mr-2 lg:mr-3"></div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Quick Start Guide</h2>
                </div>
                
                <div className="space-y-8 lg:space-y-10">
                  <div className="relative pl-6 lg:pl-8">
                    <div className="absolute left-0 top-0 w-5 h-5 lg:w-6 lg:h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold">1</div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Register Your Application</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Navigate to the <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">Sentinel Dashboard</Link> and create a new application. 
                        During registration, specify the <strong className="text-gray-800">Redirect URI</strong> where users will be redirected after authentication.
                      </p>
                      <div className="bg-gray-50 p-3 lg:p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1"><strong>Redirect URI Example:</strong></p>
                        <code className="text-xs lg:text-sm text-gray-800 font-mono">https://yourdomain.com/auth/callback</code>
                      </div>
                    </div>
                  </div>

                  <div className="relative pl-6 lg:pl-8">
                    <div className="absolute left-0 top-0 w-5 h-5 lg:w-6 lg:h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold">2</div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Configure Environment Variables</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Store your credentials securely using environment variables. Create a <code className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700">.env</code> file in your project root:
                      </p>
                      <CodeBlock id="env" code={`# Sentinel OAuth Configuration
SENTINEL_CLIENT_ID=your_client_id_here
SENTINEL_CLIENT_SECRET=your_client_secret_here
SENTINEL_REDIRECT_URI=https://yourdomain.com/auth/callback
SENTINEL_API_URL=${API_BASE_URL || 'https://api.sentinel-auth.com'}`} />
                      <div className="flex items-start mt-4 p-3 lg:p-4 bg-red-50 border border-red-100 rounded-lg">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 text-red-500 mr-2 lg:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-xs lg:text-sm text-red-700">
                          <strong>Security Note:</strong> Never commit client secrets to version control. Use environment variables or secure secret management services.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Authentication Flow - Improved Responsiveness */}
              <section id="authentication-flow" className="mb-12 lg:mb-16 scroll-mt-20 pt-6 lg:pt-8 border-t border-gray-100">
                <div className="flex items-center mb-6 lg:mb-8">
                  <div className="w-2 lg:w-3 h-6 lg:h-8 bg-blue-600 rounded mr-2 lg:mr-3"></div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Authentication Flow</h2>
                </div>
                
                <div className="bg-gray-50 rounded-lg lg:rounded-xl p-4 lg:p-6 mb-6 lg:mb-8">
                  <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed">
                    Sentinel implements the standard OAuth 2.0 Authorization Code flow, designed for maximum security and compliance.
                  </p>
                  
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3 lg:mb-4">1</div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Initiate Login</h4>
                      <p className="text-xs lg:text-sm text-gray-600">User clicks login button, redirecting to Sentinel's authorization endpoint.</p>
                    </div>
                    
                    <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3 lg:mb-4">2</div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">User Authentication</h4>
                      <p className="text-xs lg:text-sm text-gray-600">User securely authenticates on Sentinel's platform. Credentials are never shared with your application.</p>
                    </div>
                    
                    <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3 lg:mb-4">3</div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Code Exchange</h4>
                      <p className="text-xs lg:text-sm text-gray-600">Sentinel returns an authorization code to your specified callback URL.</p>
                    </div>
                    
                    <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3 lg:mb-4">4</div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Access Granted</h4>
                      <p className="text-xs lg:text-sm text-gray-600">Your backend exchanges the code for an access token, enabling secure API requests.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Implementation */}
              <section id="implementation" className="mb-12 lg:mb-16 scroll-mt-20 pt-6 lg:pt-8 border-t border-gray-100">
                <div className="flex items-center mb-6 lg:mb-8">
                  <div className="w-2 lg:w-3 h-6 lg:h-8 bg-blue-600 rounded mr-2 lg:mr-3"></div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Implementation Guide</h2>
                </div>

                <div className="space-y-8 lg:space-y-12">
                  <div>
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-600 rounded-full mr-2 lg:mr-3"></div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Frontend: Authorization Redirect</h3>
                    </div>
                    <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed">
                      Initialize the authentication flow by redirecting users to Sentinel's authorization endpoint. This is typically triggered by a login button in your application.
                    </p>
                    <CodeBlock id="redirect" code={`/**
 * Redirect user to Sentinel's authorization endpoint
 * This function should be called when user clicks "Login with Sentinel"
 */
function initiateSentinelLogin() {
  const state = generateSecureState(); // Generate a cryptographically secure state parameter
  const params = new URLSearchParams({
    client_id: process.env.SENTINEL_CLIENT_ID,
    redirect_uri: process.env.SENTINEL_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid profile email', // Requested permissions
    state: state // CSRF protection
  });

  // Store state in session storage for validation
  sessionStorage.setItem('oauth_state', state);
  
  // Redirect to Sentinel
  window.location.href = \`\${process.env.SENTINEL_API_URL}/oauth/authorize?\${params}\`;
}`} />
                  </div>

                  <div>
                    <div className="flex items-center mb-3 lg:mb-4">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-600 rounded-full mr-2 lg:mr-3"></div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Backend: Handle Authorization Callback</h3>
                    </div>
                    <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed">
                      After user authentication, Sentinel redirects back to your callback URL with an authorization code. Your backend must exchange this code for an access token.
                    </p>
                    <CodeBlock id="callback" code={`/**
 * Handle OAuth callback and exchange authorization code for access token
 * This endpoint processes the callback from Sentinel
 */
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Validate state parameter to prevent CSRF attacks
  const storedState = req.session.oauthState;
  if (!state || state !== storedState) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }

  try {
    const tokenResponse = await fetch(\`\${process.env.SENTINEL_API_URL}/oauth/token\`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.SENTINEL_CLIENT_ID,
        client_secret: process.env.SENTINEL_CLIENT_SECRET,
        redirect_uri: process.env.SENTINEL_REDIRECT_URI
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      throw new Error(tokenData.error || 'Token exchange failed');
    }

    // Set secure HTTP-only cookie with access token
    res.cookie('sentinel_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokenData.expires_in * 1000
    });

    // Redirect to application dashboard or home page
    res.redirect('/dashboard');
    
  } catch (error) {
    console.error('Authentication error:', error);
    res.redirect('/login?error=authentication_failed');
  }
});`} />
                  </div>
                </div>
              </section>

              {/* API Endpoints */}
              <section id="api-endpoints" className="mb-12 lg:mb-16 scroll-mt-20 pt-6 lg:pt-8 border-t border-gray-100">
                <div className="flex items-center mb-6 lg:mb-8">
                  <div className="w-2 lg:w-3 h-6 lg:h-8 bg-blue-600 rounded mr-2 lg:mr-3"></div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">API Reference</h2>
                </div>

                <p className="text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                  Sentinel provides a RESTful API following OAuth 2.0 specifications. All API endpoints require proper authentication and return JSON responses.
                </p>

                <div className="space-y-6 lg:space-y-8">
                  {/* Authorize Endpoint */}
                  <div className="border border-gray-200 rounded-lg lg:rounded-xl overflow-hidden bg-white">
                    <div className="bg-gray-50 px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200">
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                        <span className="px-2 lg:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md uppercase tracking-wide">GET</span>
                        <code className="text-xs lg:text-sm font-mono text-gray-800 font-medium">/oauth/authorize</code>
                        <span className="text-xs text-gray-500 font-medium">Authorization Endpoint</span>
                      </div>
                    </div>
                    <div className="p-4 lg:p-6">
                      <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed">
                        Initiates the OAuth 2.0 authorization flow. This endpoint should be accessed via browser redirect, not directly via API calls.
                      </p>
                      
                      <div className="mb-4 lg:mb-6">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide text-xs">Required Parameters</h5>
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-xs lg:text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-3 lg:px-4 py-2 lg:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Parameter</th>
                                <th className="px-3 lg:px-4 py-2 lg:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                <th className="px-3 lg:px-4 py-2 lg:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr>
                                <td className="px-3 lg:px-4 py-2 lg:py-3 font-mono text-sm text-blue-600">client_id</td>
                                <td className="px-3 lg:px-4 py-2 lg:py-3"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">string</span></td>
                                <td className="px-3 lg:px-4 py-2 lg:py-3 text-gray-600">Your application's Client ID</td>
                              </tr>
                              <tr>
                                <td className="px-3 lg:px-4 py-2 lg:py-3 font-mono text-sm text-blue-600">redirect_uri</td>
                                <td className="px-3 lg:px-4 py-2 lg:py-3"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">string</span></td>
                                <td className="px-3 lg:px-4 py-2 lg:py-3 text-gray-600">Must exactly match registered URI</td>
                              </tr>
                              <tr>
                                <td className="px-3 lg:px-4 py-2 lg:py-3 font-mono text-sm text-blue-600">response_type</td>
                                <td className="px-3 lg:px-4 py-2 lg:py-3"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">string</span></td>
                                <td className="px-3 lg:px-4 py-2 lg:py-3 text-gray-600">Must be <code>code</code></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Token Endpoint */}
                  <div className="border border-gray-200 rounded-lg lg:rounded-xl overflow-hidden bg-white">
                    <div className="bg-gray-50 px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200">
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                        <span className="px-2 lg:px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md uppercase tracking-wide">POST</span>
                        <code className="text-xs lg:text-sm font-mono text-gray-800 font-medium">/oauth/token</code>
                        <span className="text-xs text-gray-500 font-medium">Token Endpoint</span>
                      </div>
                    </div>
                    <div className="p-4 lg:p-6">
                      <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed">
                        Exchanges an authorization code for an access token. This endpoint must be called from your backend server.
                      </p>
                      
                      <div className="mb-4 lg:mb-6">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide text-xs">Request Example</h5>
                        <CodeBlock id="token-req" code={`{
  "grant_type": "authorization_code",
  "code": "authorization_code_from_callback",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "redirect_uri": "https://yourdomain.com/auth/callback"
}`} />
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide text-xs">Response Example</h5>
                        <CodeBlock id="token-res" code={`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200ae2f...", // If refresh tokens are enabled
  "scope": "openid profile email",
  "user": {
    "id": "usr_123456789",
    "name": "John Doe",
    "email": "user@example.com",
    "email_verified": true
  }
}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Best Practices */}
              <section id="best-practices" className="mb-12 lg:mb-16 scroll-mt-20 pt-6 lg:pt-8 border-t border-gray-100">
                <div className="flex items-center mb-6 lg:mb-8">
                  <div className="w-2 lg:w-3 h-6 lg:h-8 bg-blue-600 rounded mr-2 lg:mr-3"></div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Security Best Practices</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-4 lg:p-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 lg:mb-3">Credential Security</h4>
                    <ul className="space-y-1 lg:space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start">
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500 mr-1.5 lg:mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Store client secrets in environment variables or secure vaults</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500 mr-1.5 lg:mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Use HTTPS for all production endpoints</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500 mr-1.5 lg:mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Implement proper state parameter validation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl p-4 lg:p-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 lg:mb-3">Token Management</h4>
                    <ul className="space-y-1 lg:space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start">
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500 mr-1.5 lg:mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Store access tokens in secure HTTP-only cookies</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500 mr-1.5 lg:mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Implement automatic token refresh mechanisms</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500 mr-1.5 lg:mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Never expose tokens in client-side JavaScript</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Troubleshooting */}
              <section id="troubleshooting" className="scroll-mt-20 pt-6 lg:pt-8 border-t border-gray-100">
                <div className="flex items-center mb-6 lg:mb-8">
                  <div className="w-2 lg:w-3 h-6 lg:h-8 bg-blue-600 rounded mr-2 lg:mr-3"></div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Troubleshooting</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl overflow-hidden">
                    <button
                      onClick={() => document.getElementById('faq-1')?.classList.toggle('hidden')}
                      className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
                          <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900 text-sm lg:text-base">"Invalid redirect_uri" Error</span>
                      </div>
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div id="faq-1" className="hidden px-4 lg:px-6 pb-4 lg:pb-6">
                      <div className="pl-0 lg:pl-12 border-l-0 lg:border-l-2 border-gray-200">
                        <p className="text-gray-600 mb-3 leading-relaxed text-sm lg:text-base">
                          This error occurs when the redirect URI in your authorization request does not exactly match the URI registered in your Sentinel dashboard.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-3 lg:p-4 mt-3 lg:mt-4">
                          <h5 className="font-medium text-gray-900 mb-2 text-xs lg:text-sm">Solution:</h5>
                          <ul className="text-xs lg:text-sm text-gray-600 space-y-1">
                            <li>• Verify the URI in your dashboard matches exactly (including protocol, domain, path)</li>
                            <li>• Check for trailing slashes or missing parameters</li>
                            <li>• Ensure you're using HTTPS in production</li>
                            <li>• Update your environment variables if the URI has changed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg lg:rounded-xl overflow-hidden">
                    <button
                      onClick={() => document.getElementById('faq-2')?.classList.toggle('hidden')}
                      className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
                          <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900 text-sm lg:text-base">"Authorization code expired" Error</span>
                      </div>
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div id="faq-2" className="hidden px-4 lg:px-6 pb-4 lg:pb-6">
                      <div className="pl-0 lg:pl-12 border-l-0 lg:border-l-2 border-gray-200">
                        <p className="text-gray-600 mb-3 leading-relaxed text-sm lg:text-base">
                          Authorization codes are single-use and have a short lifespan (typically 10 minutes) for security reasons.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-3 lg:p-4 mt-3 lg:mt-4">
                          <h5 className="font-medium text-gray-900 mb-2 text-xs lg:text-sm">Solution:</h5>
                          <ul className="text-xs lg:text-sm text-gray-600 space-y-1">
                            <li>• Ensure your backend exchanges the code immediately upon receipt</li>
                            <li>• Avoid page reloads on the callback URL</li>
                            <li>• Check network connectivity between your server and Sentinel API</li>
                            <li>• Implement proper error handling to redirect users to re-authenticate</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Documentation Footer - Improved Responsiveness */}
              <div className="mt-10 lg:mt-16 pt-6 lg:pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                      Need additional assistance? Contact our support team.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link 
                      to="/dashboard" 
                      className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Go to Dashboard
                    </Link>
                    <Link 
                      to="/support" 
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Contact Support
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Copyright */}
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} Sentinel Auth. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;