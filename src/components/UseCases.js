import React from 'react';

const UseCases = () => {
  const useCases = [
    {
      title: 'Full-Stack Developers',
      description: 'Build modern web applications with authentication out of the box',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      benefits: [
        'Skip weeks of authentication development',
        'Focus on your unique features',
        'Production-ready security from day one'
      ]
    },
    {
      title: 'SaaS Projects',
      description: 'Multi-tenant applications that need robust user management',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
      benefits: [
        'Manage multiple client applications',
        'Isolated user data per application',
        'Email verification built-in'
      ]
    },
    {
      title: 'Academic Projects',
      description: 'Learn OAuth 2.0 implementation in a real-world system',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500',
      benefits: [
        'Understand OAuth 2.0 authorization flow',
        'Study production-grade architecture',
        'Free to use for learning purposes'
      ]
    }
  ];

  return (
    <section id="use-cases" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-600/50 to-transparent"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* <div className="inline-block px-4 py-2 bg-primary-600/10 border border-primary-600/20 rounded-full mb-6">
            <span className="text-primary-400 text-sm font-semibold">Use Cases</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Perfect For
            <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mt-2">
              Every Developer
            </span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto leading-relaxed">
            Whether you're building a SaaS product, learning OAuth, or shipping fast
          </p>
        </div>
        
        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="group relative bg-dark-800/30 backdrop-blur-sm border border-dark-700/50 rounded-2xl p-8 hover:border-primary-600/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Gradient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-600/0 group-hover:from-primary-600/5 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${useCase.gradient} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {useCase.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-dark-50 group-hover:text-primary-400 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-dark-400 leading-relaxed mb-6">
                  {useCase.description}
                </p>
                
                {/* Benefits List */}
                <ul className="space-y-3">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-dark-300">
                      <svg className="w-5 h-5 text-primary-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
