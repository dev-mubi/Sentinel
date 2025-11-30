import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'User Registration & Login',
      description: 'Secure user signup and authentication with proper credential validation and session management.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Password Recovery',
      description: 'Email-based password reset flows with secure token generation and expiration.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'JWT Tokens',
      description: 'Stateless authentication using JSON Web Tokens for secure API communication.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Role-Based Access',
      description: 'Assign roles to users and control permissions based on their access level.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Easy Integration',
      description: 'Simple REST API that plugs into your app without rebuilding auth from scratch.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      title: 'Secure by Default',
      description: 'Bcrypt password hashing and industry-standard security practices built in.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: 'from-primary-500 to-primary-600'
    }
  ];

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-600/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-primary-600/10 border border-primary-600/20 rounded-full mb-6">
            <span className="text-primary-400 text-sm font-semibold">Core Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Everything You Need
            <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mt-2">
              Out of the Box
            </span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto leading-relaxed">
            A complete authentication solution with all the essentials
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-dark-800/30 backdrop-blur-sm border border-dark-700/50 rounded-2xl p-8 hover:border-primary-600/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Gradient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-600/0 group-hover:from-primary-600/5 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
              
              <div className="relative">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-dark-50 group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-dark-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-primary-500/5 to-primary-600/10 blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-dark-800/80 to-dark-800/40 backdrop-blur-sm border border-dark-700/50 rounded-3xl p-12 text-center overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-600/10 rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-600/10 rounded-tl-full"></div>
            
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-dark-300 mb-8 text-lg max-w-2xl mx-auto">
                Free hosting · No OAuth · No MFA · Built for learning
              </p>
              <a 
                href="/register" 
                className="group inline-block px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:scale-105 text-lg"
              >
                Try Sentinel Now
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
