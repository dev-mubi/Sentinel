import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import API_BASE_URL from '../config';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company_name: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation helper functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Too short', color: 'text-red-400' };
    if (password.length < 8) return { strength: 2, label: 'Weak', color: 'text-orange-400' };
    if (password.length < 12) return { strength: 3, label: 'Good', color: 'text-yellow-400' };
    return { strength: 4, label: 'Strong', color: 'text-green-400' };
  };

  const validateField = (name, value) => {
    const errors = {};
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          errors.name = 'Name must be less than 100 characters';
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      
      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        }
        break;
      
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const errors = validateField(name, value);
      setValidationErrors(prev => ({ ...prev, ...errors, [name]: errors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    
    // Validate on blur
    const errors = validateField(name, value);
    setValidationErrors(prev => ({ ...prev, ...errors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Validate all fields before submission
    const allErrors = {
      ...validateField('name', formData.name),
      ...validateField('email', formData.email),
      ...validateField('password', formData.password),
      ...validateField('confirmPassword', formData.confirmPassword)
    };

    if (Object.keys(allErrors).length > 0) {
      setValidationErrors(allErrors);
      setTouched({ name: true, email: true, password: true, confirmPassword: true });
      setLoading(false);
      return;
    }

    // Remove confirmPassword before sending to server
    const { confirmPassword, ...dataToSend } = formData;

    try {
      const response = await fetch(`${API_BASE_URL}/api/developers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', password: '', confirmPassword: '', company_name: '' });
        setValidationErrors({});
        setTouched({});
      } else {
        setStatus({ type: 'error', message: data.error || 'Registration failed' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="relative min-h-screen bg-dark-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-dark-900 to-dark-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link to="/" className="flex justify-center items-center gap-3 mb-8 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-600/20 blur-xl rounded-full group-hover:blur-lg transition-all"></div>
            <img src={logo} alt="Sentinel" className="relative h-14 w-auto transform group-hover:scale-105 transition-transform" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
            Sentinel
          </span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-3">
            Get Started
          </h2>
          <p className="text-dark-300">
            Create your developer account
          </p>
        </div>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Card */}
        <div className="relative bg-dark-800/50 backdrop-blur-sm py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-12 border border-dark-700/50">
          {/* Gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent rounded-2xl"></div>
          
          <div className="relative">
            {status.message && (
              <div className={`mb-6 p-4 rounded-xl backdrop-blur-sm text-sm border ${
                status.type === 'success' 
                  ? 'bg-green-900/30 text-green-200 border-green-800/50' 
                  : 'bg-red-900/30 text-red-200 border-red-800/50'
              }`}>
                {status.message}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-dark-200 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`appearance-none block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-dark-500 bg-dark-900/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 transition-all ${
                    validationErrors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-dark-600/50 focus:ring-primary-500 focus:border-transparent'
                  }`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-dark-200 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-dark-500 bg-dark-900/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 transition-all ${
                    validationErrors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-dark-600/50 focus:ring-primary-500 focus:border-transparent'
                  }`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                )}
              </div>

              {/* Company Name Input */}
              <div>
                <label htmlFor="company_name" className="block text-sm font-semibold text-dark-200 mb-2">
                  Company Name <span className="text-dark-500 font-normal">(Optional)</span>
                </label>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  className="appearance-none block w-full px-4 py-3 border border-dark-600/50 rounded-xl shadow-sm placeholder-dark-500 bg-dark-900/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Your Company"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-dark-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`appearance-none block w-full px-4 py-3 pr-12 border rounded-xl shadow-sm placeholder-dark-500 bg-dark-900/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.password ? 'border-red-500/50 focus:ring-red-500' : 'border-dark-600/50 focus:ring-primary-500 focus:border-transparent'
                    }`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                )}
                {/* Password Strength Indicator */}
                {formData.password && passwordStrength.strength > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-dark-400">Password Strength:</span>
                      <span className={`text-xs font-semibold ${passwordStrength.color}`}>{passwordStrength.label}</span>
                    </div>
                    <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.strength === 1 ? 'bg-red-500 w-1/4' :
                          passwordStrength.strength === 2 ? 'bg-orange-500 w-2/4' :
                          passwordStrength.strength === 3 ? 'bg-yellow-500 w-3/4' :
                          'bg-green-500 w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-dark-200 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`appearance-none block w-full px-4 py-3 pr-12 border rounded-xl shadow-sm placeholder-dark-500 bg-dark-900/50 backdrop-blur-sm text-white focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.confirmPassword ? 'border-red-500/50 focus:ring-red-500' : 'border-dark-600/50 focus:ring-primary-500 focus:border-transparent'
                    }`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`group w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:scale-[1.02] shadow-primary-600/30 hover:shadow-primary-600/50 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-dark-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
