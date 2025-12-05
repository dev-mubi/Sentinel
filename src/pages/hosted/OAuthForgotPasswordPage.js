import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import logo from '../../logo.png';
import API_BASE_URL from '../../config';

const OAuthForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  const state = searchParams.get('state');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate client_id is present
    if (!clientId) {
      setError('Missing client_id. Please access this page through your application login flow.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/hosted-auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, client_id: clientId })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to send reset code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full bg-dark-800 border border-dark-700 mb-4 relative group">
              <div className="absolute inset-0 bg-green-600/20 blur-xl rounded-full group-hover:blur-2xl transition-all"></div>
              <svg className="w-12 h-12 text-green-400 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-dark-400">
              We've sent a 6-digit code to <span className="text-primary-400">{email}</span>
            </p>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <div className="space-y-4 text-center">
              <p className="text-dark-300 text-sm">
                Enter the code on the next page to reset your password. The code will expire in 10 minutes.
              </p>
              <Link
                to={`/oauth/reset-password?email=${encodeURIComponent(email)}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri || '')}&state=${state || ''}`}
                className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40"
              >
                Continue to Reset Password
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="text-dark-400 hover:text-white text-sm transition-colors"
              >
                Didn't receive the code? Try again
              </button>
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
          <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-dark-400">
            Enter your email and we'll send you a code to reset your password
          </p>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
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
                  Sending Code...
                </>
              ) : (
                'Send Reset Code'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to={`/oauth/login?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri || '')}&state=${state || ''}`}
              className="text-dark-400 hover:text-white text-sm transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthForgotPasswordPage;
