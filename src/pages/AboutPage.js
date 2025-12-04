import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaUserGraduate, FaLinkedin } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const teamMembers = [
    { 
      name: 'Mubashir Shahzaib', 
      icon: FaUserTie, 
      gradient: 'from-blue-500 to-cyan-500',
      linkedin: 'https://www.linkedin.com/in/mubashirshahzaib/'
    },
    { 
      name: 'Wafa Amjad', 
      icon: FaUserGraduate, 
      gradient: 'from-purple-500 to-pink-500',
      linkedin: 'https://www.linkedin.com/in/wafa-a-639a78329/'
    },
    { 
      name: 'Roonaq Imtiaz', 
      icon: FaUserGraduate, 
      gradient: 'from-green-500 to-emerald-500',
      linkedin: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Page Header */}
      <section className="relative pt-24 pb-16 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark-50">
              About Sentinel
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              An OAuth 2.0 authentication and authorization service designed to simplify secure user management for modern applications.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-16 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dark-50">Overview</h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  Sentinel is a comprehensive OAuth 2.0 authentication provider that enables developers to integrate secure, standards-compliant authentication into their applications without building the infrastructure from scratch.
                </p>
                <p>
                  The system implements industry-standard security protocols including bcrypt password hashing, JWT token-based authentication, email verification workflows, and password recovery mechanisms.
                </p>
                <p>
                  Developed as part of a Software Requirement Engineering course at COMSATS University Islamabad, Abbottabad Campus, Sentinel demonstrates the practical application of rigorous requirements analysis and system design principles.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dark-50">Technical Architecture</h2>
              <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-dark-50 mb-1">OAuth 2.0 Protocol</h4>
                      <p className="text-sm text-dark-400">Standard authorization code flow implementation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-dark-50 mb-1">RESTful API</h4>
                      <p className="text-sm text-dark-400">JSON-based endpoints for authorization, token exchange, and user management</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-dark-50 mb-1">Developer Portal</h4>
                      <p className="text-sm text-dark-400">Dashboard for application registration and credential management</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-dark-50 mb-1">Hosted UI</h4>
                      <p className="text-sm text-dark-400">Pre-built authentication pages for seamless user experience</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process - Replacing Key Features */}
      <section className="relative py-16 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dark-50">Development Process</h2>
          <p className="text-dark-300 mb-12 max-w-3xl">
            Sentinel evolved through a structured software engineering process, transforming comprehensive requirements documentation into a production-ready authentication service.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-600/10 rounded-lg mb-4">
                <span className="text-2xl font-bold text-primary-400">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dark-50">Requirements Analysis</h3>
              <p className="text-sm text-dark-400">
                Developed comprehensive SRS document defining functional and non-functional requirements for the authentication system.
              </p>
            </div>

            <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-600/10 rounded-lg mb-4">
                <span className="text-2xl font-bold text-primary-400">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dark-50">System Design</h3>
              <p className="text-sm text-dark-400">
                Created architecture diagrams, database schemas, and API specifications following industry standards.
              </p>
            </div>

            <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-600/10 rounded-lg mb-4">
                <span className="text-2xl font-bold text-primary-400">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dark-50">Implementation</h3>
              <p className="text-sm text-dark-400">
                Built full-stack OAuth 2.0 provider with Node.js backend, React frontend, and PostgreSQL database.
              </p>
            </div>

            <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-600/10 rounded-lg mb-4">
                <span className="text-2xl font-bold text-primary-400">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-dark-50">Documentation</h3>
              <p className="text-sm text-dark-400">
                Created developer guides and integration documentation to enable seamless client adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative py-16 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dark-50">Use Cases</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-dark-50">For Application Developers</h3>
              <ul className="space-y-3 text-dark-300 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Integrate production-ready authentication without building custom solutions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Reduce development time by utilizing pre-built authentication infrastructure</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Implement security best practices through standardized protocols</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Focus resources on core application features rather than authentication</span>
                </li>
              </ul>
            </div>

            <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-dark-50">For End Users</h3>
              <ul className="space-y-3 text-dark-300 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Secure account creation with encrypted password storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Verified email addresses for enhanced account protection</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Self-service password recovery for account access</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Consistent authentication experience across integrated applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Development Team */}
      <section className="relative py-16 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dark-50">Development Team</h2>
          
          <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-8 mb-8">
            <p className="text-dark-300 leading-relaxed">
              Sentinel was developed through collaborative effort, covering all aspects of software engineering from requirements specification to production deployment. The development process followed industry-standard practices including requirements analysis, system architecture design, database modeling, API development, and comprehensive documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => {
              const IconComponent = member.icon;
              return (
                <div 
                  key={index}
                  className="group bg-dark-800/30 border border-dark-700 rounded-xl p-8 text-center hover:border-primary-600/50 transition-all duration-300"
                >
                  <div className="relative inline-block mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-50 mb-3">
                    {member.name}
                  </h3>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-primary-600/10 hover:bg-primary-600/20 border border-primary-600/30 hover:border-primary-600/50 rounded-lg text-primary-400 text-sm font-medium transition-all ${member.linkedin === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => member.linkedin === '#' && e.preventDefault()}
                  >
                    <FaLinkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-800/30 border border-dark-700 rounded-xl p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-dark-50">Get Started with Sentinel</h2>
            <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
              Register for a developer account to access the dashboard, create applications, and integrate OAuth 2.0 authentication into your projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
              >
                Create Account
              </Link>
              <Link 
                to="/docs" 
                className="inline-block px-8 py-3 bg-dark-700 hover:bg-dark-600 text-dark-50 font-semibold rounded-lg transition-all border border-dark-600"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
