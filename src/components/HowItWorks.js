import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Sign Up',
      description: 'Create your developer account and access the Sentinel dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      number: '2',
      title: 'Register Apps',
      description: 'Add your applications and receive Client ID & Secret credentials',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      number: '3',
      title: 'Integrate',
      description: 'Use our OAuth endpoints to add authentication to your application',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      number: '4',
      title: 'Launch',
      description: 'Your users authenticate securely via Sentinel\'s hosted UI',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-600/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* <div className="inline-block px-4 py-2 bg-primary-600/10 border border-primary-600/20 rounded-full mb-6">
            <span className="text-primary-400 text-sm font-semibold">Simple Process</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How It Works
            <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mt-2">
              Get Started in Minutes
            </span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto leading-relaxed">
            Four simple steps to add OAuth 2.0 authentication to your application
          </p>
        </div>
        
        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection line - hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600/20 via-primary-600/50 to-primary-600/20 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group">
                <div className="relative bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 rounded-2xl p-8 hover:border-primary-600/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                  {/* Gradient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-600/0 group-hover:from-primary-600/5 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300 mb-6 mx-auto`}>
                      {step.icon}
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-dark-900">
                      {step.number}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-dark-50 text-center group-hover:text-primary-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-dark-400 leading-relaxed text-center text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
