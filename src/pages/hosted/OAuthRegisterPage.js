import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import logo from '../../logo.png';
import API_BASE_URL from '../../config';

const OAuthRegisterPage = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  const state = searchParams.get('state');

  // Password strength validation
  const getPasswordStrength = () => {
    if (!password) return { strength: 'none', color: '', text: '' };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: 'weak', color: 'text-red-400', bg: 'bg-red-400', text: 'Weak' };
    if (score <= 4) return { strength: 'medium', color: 'text-yellow-400', bg: 'bg-yellow-400', text: 'Medium' };
    return { strength: 'strong', color: 'text-green-400', bg: 'bg-green-400', text: 'Strong' };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Check strength
    if (passwordStrength.strength === 'weak') {
      setError('Password is too weak. Please include uppercase, lowercase, and numbers.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/hosted-auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          client_id: clientId,
          redirect_uri: redirectUri,
          state
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message instead of redirecting
        setSuccess(true);
        setRegisteredEmail(data.email);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!clientId || !redirectUri) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <div className="bg-dark-800 p-8 rounded-2xl border border-dark-700 text-center max-w-md w-full">
          <div className="text-red-400 text-xl font-bold mb-2">Invalid Request</div>
          <p className="text-dark-400">Missing client_id or redirect_uri parameters.</p>
        </div>
      </div>
    );
  }

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Check Your Email!</h2>
            <p className="text-dark-300 mb-4">
              We've sent a verification link to:
            </p>
            <p className="text-primary-400 font-medium mb-6">{registeredEmail}</p>
            <p className="text-dark-400 text-sm">
              Click the link in the email to verify your account and complete registration.
            </p>
            <div className="mt-6 pt-6 border-t border-dark-700">
              <p className="text-dark-500 text-xs">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-dark-800 border border-dark-700 mb-4 relative group">
            <div className="absolute inset-0 bg-primary-600/20 blur-xl rounded-full group-hover:blur-2xl transition-all"></div>
            <img src={logo} alt="Sentinel" className="h-12 w-auto relative" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-dark-400">
            to continue to the application
          </p>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-dark-500"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-dark-500"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-dark-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-dark-400">Password Strength:</span>
                    <span className={`text-xs font-medium ${passwordStrength.color}`}>{passwordStrength.text}</span>
                  </div>
                  <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.bg} transition-all`}
                      style={{ 
                        width: passwordStrength.strength === 'weak' ? '33%' : 
                               passwordStrength.strength === 'medium' ? '66%' : '100%' 
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="mt-2 text-xs text-dark-500 space-y-1">
                <p className={password.length >= 6 ? 'text-green-400' : ''}>• At least 6 characters</p>
                <p className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>• One uppercase letter</p>
                <p className={/[a-z]/.test(password) ? 'text-green-400' : ''}>• One lowercase letter</p>
                <p className={/[0-9]/.test(password) ? 'text-green-400' : ''}>• One number</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-dark-400 text-sm">
              Already have an account?{' '}
              <Link 
                to={`/oauth/login?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state || ''}`}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthRegisterPage;
