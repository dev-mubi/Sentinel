import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import logo from '../../logo.png';
import API_BASE_URL from '../../config';

const OAuthLoginPage = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState('Loading...');

  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  const state = searchParams.get('state');

  useEffect(() => {
    setClientName('Application');
  }, [clientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/hosted-auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          client_id: clientId,
          redirect_uri: redirectUri,
          state
        })
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.redirect_to;
      } else {
        setError(data.error || 'Login failed');
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

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-dark-800 border border-dark-700 mb-4 relative group">
            <div className="absolute inset-0 bg-primary-600/20 blur-xl rounded-full group-hover:blur-2xl transition-all"></div>
            <img src={logo} alt="Sentinel" className="h-12 w-auto relative" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sign in to continue</h1>
          <p className="text-dark-400">
            to <span className="text-primary-400 font-medium">{clientName}</span>
          </p>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
                {error.includes('verify your email') && (
                  <p className="text-xs text-red-300 mt-2">
                    Please check your inbox for the verification link we sent you during registration.
                  </p>
                )}
              </div>
            )}

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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="mt-4 text-center">
              <Link
                to={`/oauth/forgot-password?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri || '')}&state=${state || ''}`}
                className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center border-t border-dark-700 pt-6">
            <p className="text-dark-400 text-sm">
              Don't have an account?{' '}
              <Link 
                to={`/oauth/register?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state || ''}`}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthLoginPage;
