import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'quick-start', label: 'Quick Start' },
    { id: 'integration', label: 'Integration' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'security', label: 'Security' }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-dark-700">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-600/10 border border-primary-600/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-primary-400 text-sm font-medium">Developer Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Integrate Sentinel OAuth in Minutes
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              Add secure authentication to your applications with our OAuth 2.0 provider. No complex setup, just straightforward integration.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-primary-600/10 text-primary-400 border-l-2 border-primary-500'
                        : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 p-4 bg-dark-800/30 border border-dark-700 rounded-xl">
                <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <Link to="/register" className="block text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    Create Account →
                  </Link>
                  <Link to="/dashboard" className="block text-sm text-dark-400 hover:text-dark-200 transition-colors">
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            
            {/* Overview Section */}
            <section id="overview" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">What is Sentinel?</h2>
              <div className="prose prose-invert max-w-none">
                <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6 mb-6">
                  <p className="text-dark-300 leading-relaxed mb-4">
                    Sentinel is a secure OAuth 2.0 authentication provider designed for developers who want to add user authentication without the complexity of building and maintaining their own auth infrastructure.
                  </p>
                  <p className="text-dark-300 leading-relaxed">
                    Focus on building your application while Sentinel handles passwords, sessions, and security compliance for you.
                  </p>
                </div>

                {/* Key Features */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-5">
                    <div className="w-10 h-10 bg-primary-600/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Secure by Default</h3>
                    <p className="text-dark-400 text-sm">OAuth 2.0 standard with industry best practices built-in.</p>
                  </div>
                  <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-5">
                    <div className="w-10 h-10 bg-primary-600/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Quick Setup</h3>
                    <p className="text-dark-400 text-sm">Get started in minutes with straightforward integration steps.</p>
                  </div>
                  <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-5">
                    <div className="w-10 h-10 bg-primary-600/10 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Always Reliable</h3>
                    <p className="text-dark-400 text-sm">Battle-tested infrastructure for your authentication needs.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">How It Works</h2>
              <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6 mb-6">
                <p className="text-dark-300 mb-6">
                  Sentinel implements the OAuth 2.0 Authorization Code flow - the most secure method for web authentication:
                </p>
                
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-dark-700"></div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "User Initiates Login",
                        description: "Your application redirects the user to Sentinel's authorization page with your client credentials."
                      },
                      {
                        step: 2,
                        title: "User Authenticates",
                        description: "User enters credentials on Sentinel's secure page. Your app never sees or handles passwords."
                      },
                      {
                        step: 3,
                        title: "Authorization Code Returned",
                        description: "Sentinel redirects back to your app with a one-time authorization code in the URL."
                      },
                      {
                        step: 4,
                        title: "Exchange for Access Token",
                        description: "Your backend securely exchanges the code for an access token using your client secret."
                      },
                      {
                        step: 5,
                        title: "Access User Data",
                        description: "Use the access token to fetch user information and maintain authenticated sessions."
                      }
                    ].map((item) => (
                      <div key={item.step} className="relative flex items-start gap-4 pl-2">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">{item.step}</span>
                        </div>
                        <div className="flex-1 pt-1">
                          <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                          <p className="text-dark-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Start Section */}
            <section id="quick-start" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
              
              <div className="space-y-4">
                <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6 hover:border-primary-600/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-400 font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Register Your Application</h3>
                      <p className="text-dark-400 text-sm mb-3">Create a developer account and register your application in the dashboard.</p>
                      <ul className="space-y-1.5 text-sm text-dark-400 ml-4">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                          Sign up for a Sentinel developer account
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                          Navigate to Dashboard and click "New Application"
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                          Save your Client ID and Client Secret securely
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6 hover:border-primary-600/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-400 font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Configure Redirect URI</h3>
                      <p className="text-dark-400 text-sm mb-3">Set up the callback URL where users will be redirected after authentication.</p>
                      <div className="bg-dark-900 rounded-lg p-3 border border-dark-700">
                        <code className="text-primary-300 text-sm">https://yourdomain.com/auth/callback</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6 hover:border-primary-600/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-400 font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Start Integrating</h3>
                      <p className="text-dark-400 text-sm">You're all set! Follow the integration steps below to implement OAuth in your application.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Integration Section */}
            <section id="integration" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Integration Guide</h2>
              
              {/* Step 1: Redirect */}
              <div className="mb-8">
                <div className="bg-dark-800/30 border border-dark-700 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-dark-700 bg-dark-800/50">
                    <h3 className="text-xl font-semibold text-white">Step 1: Redirect to Sentinel</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-dark-300 mb-4">
                      When a user clicks "Login", redirect them to Sentinel's authorization endpoint with the required parameters.
                    </p>
                    <div className="bg-dark-900 rounded-lg p-4 border border-dark-700 overflow-x-auto">
                      <pre className="text-sm text-primary-300 font-mono leading-relaxed">
{`// Example using Express.js
app.get('/login', (req, res) => {
  const authUrl = \`https://your-sentinel-url.com/api/oauth/authorize?
    client_id=YOUR_CLIENT_ID&
    redirect_uri=YOUR_REDIRECT_URI&
    response_type=code&
    state=\${generateRandomState()}\`;
  
  res.redirect(authUrl);
});`}
                      </pre>
                    </div>
                    <div className="mt-4 flex items-start gap-3 p-4 bg-blue-900/10 border border-blue-900/30 rounded-lg">
                      <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-blue-300 text-sm">
                        The <code className="text-blue-200 bg-blue-900/30 px-1.5 py-0.5 rounded">state</code> parameter is optional but highly recommended for CSRF protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Handle Callback */}
              <div className="mb-8">
                <div className="bg-dark-800/30 border border-dark-700 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-dark-700 bg-dark-800/50">
                    <h3 className="text-xl font-semibold text-white">Step 2: Handle the Callback</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-dark-300 mb-4">
                      After authentication, Sentinel redirects back with an authorization code. Exchange it for an access token on your backend.
                    </p>
                    <div className="bg-dark-900 rounded-lg p-4 border border-dark-700 overflow-x-auto">
                      <pre className="text-sm text-primary-300 font-mono leading-relaxed">
{`app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  // Exchange authorization code for access token
  const response = await fetch('https://your-sentinel-url.com/api/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: YOUR_CLIENT_ID,
      client_secret: YOUR_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: YOUR_REDIRECT_URI
    })
  });
  
  const { access_token, user } = await response.json();
  
  // Store token in secure HttpOnly cookie
  res.cookie('auth_token', access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
  
  res.redirect('/dashboard');
});`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Fetch User Info */}
              <div className="mb-8">
                <div className="bg-dark-800/30 border border-dark-700 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-dark-700 bg-dark-800/50">
                    <h3 className="text-xl font-semibold text-white">Step 3: Fetch User Information</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-dark-300 mb-4">
                      Use the access token to retrieve authenticated user information from Sentinel.
                    </p>
                    <div className="bg-dark-900 rounded-lg p-4 border border-dark-700 overflow-x-auto">
                      <pre className="text-sm text-primary-300 font-mono leading-relaxed">
{`app.get('/api/user', async (req, res) => {
  const token = req.cookies.auth_token;
  
  const response = await fetch('https://your-sentinel-url.com/api/oauth/userinfo', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
  
  const user = await response.json();
  res.json(user);
});`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* API Reference Section */}
            <section id="api-reference" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">API Reference</h2>
              
              <div className="space-y-4">
                {/* Authorize Endpoint */}
                <div className="bg-dark-800/30 border border-dark-700 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-dark-800/50">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-bold rounded uppercase">GET</span>
                      <code className="text-white font-mono text-sm">/api/oauth/authorize</code>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-dark-300 text-sm mb-4">Initiates the OAuth 2.0 authorization flow.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Query Parameters</h4>
                        <div className="space-y-2">
                          {[
                            { name: 'client_id', desc: 'Your application client ID', required: true },
                            { name: 'redirect_uri', desc: 'Registered callback URL', required: true },
                            { name: 'response_type', desc: 'Must be "code"', required: true },
                            { name: 'state', desc: 'CSRF protection token', required: false }
                          ].map((param) => (
                            <div key={param.name} className="flex items-start gap-3 text-sm">
                              <code className="text-primary-400 bg-primary-900/20 px-2 py-0.5 rounded text-xs font-mono">
                                {param.name}
                              </code>
                              <span className="text-dark-400 flex-1">{param.desc}</span>
                              {param.required && (
                                <span className="text-red-400 text-xs font-medium">required</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Token Endpoint */}
                <div className="bg-dark-800/30 border border-dark-700 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-dark-800/50">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded uppercase">POST</span>
                      <code className="text-white font-mono text-sm">/api/oauth/token</code>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-dark-300 text-sm mb-4">Exchanges authorization code for an access token.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Request Body (JSON)</h4>
                        <div className="space-y-2">
                          {[
                            { name: 'client_id', desc: 'Your client ID' },
                            { name: 'client_secret', desc: 'Your client secret' },
                            { name: 'code', desc: 'Authorization code from callback' },
                            { name: 'grant_type', desc: 'Must be "authorization_code"' },
                            { name: 'redirect_uri', desc: 'Same URI as authorize request' }
                          ].map((param) => (
                            <div key={param.name} className="flex items-start gap-3 text-sm">
                              <code className="text-primary-400 bg-primary-900/20 px-2 py-0.5 rounded text-xs font-mono">
                                {param.name}
                              </code>
                              <span className="text-dark-400 flex-1">{param.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* UserInfo Endpoint */}
                <div className="bg-dark-800/30 border border-dark-700 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-dark-800/50">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-bold rounded uppercase">GET</span>
                      <code className="text-white font-mono text-sm">/api/oauth/userinfo</code>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-dark-300 text-sm mb-4">Returns authenticated user information.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Headers</h4>
                        <div className="bg-dark-900 rounded-lg p-3 border border-dark-700">
                          <code className="text-primary-300 text-xs font-mono">
                            Authorization: Bearer {'{access_token}'}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Best Practices Section */}
            <section id="security" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">Security Best Practices</h2>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Never Expose Client Secret",
                    description: "Store your client secret in environment variables on your backend. Never include it in frontend code, version control, or client-side requests."
                  },
                  {
                    title: "Always Use HTTPS in Production",
                    description: "All OAuth endpoints must use secure HTTPS connections to prevent man-in-the-middle attacks and protect sensitive data in transit."
                  },
                  {
                    title: "Store Tokens in HttpOnly Cookies",
                    description: "This prevents XSS attacks from stealing tokens. Never store access tokens in localStorage or sessionStorage where JavaScript can access them."
                  },
                  {
                    title: "Validate Redirect URIs",
                    description: "Only register exact, trusted redirect URIs in your application settings. Always validate the redirect URI matches your registered URLs."
                  },
                  {
                    title: "Implement State Parameter",
                    description: "Use a random, unguessable state value to prevent CSRF attacks during the OAuth flow. Verify it matches on callback."
                  },
                  {
                    title: "Set Token Expiration",
                    description: "Configure appropriate expiration times for access tokens. Implement token refresh mechanisms for long-lived sessions."
                  }
                ].map((practice, index) => (
                  <div key={index} className="bg-dark-800/30 border border-dark-700 rounded-xl p-6 hover:border-primary-600/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-2">{practice.title}</h3>
                        <p className="text-dark-400 text-sm leading-relaxed">{practice.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-primary-600/10 to-primary-800/10 border border-primary-600/30 rounded-xl p-8 md:p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-dark-300 mb-8 leading-relaxed">
                  Create your developer account and start integrating Sentinel OAuth into your applications today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    to="/register" 
                    className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40"
                  >
                    Create Developer Account
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="inline-flex items-center px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-semibold rounded-lg transition-all border border-dark-600"
                  >
                    View Dashboard
                  </Link>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DocsPage;