import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import logo from '../logo.png';
import API_BASE_URL from '../config';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');

  const handleVerification = async () => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link. Please check your email or request a new verification link.');
      return;
    }

    setStatus('verifying');

    try {
      const response = await fetch(`${API_BASE_URL}/api/developers/verify/${token}`);
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Your email has been successfully verified.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Verification failed. This link may have already been used.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Unable to connect. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="Sentinel" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-white">Sentinel</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-8">
          
          {/* Pending */}
          {status === 'pending' && (
            <>
              <h1 className="text-xl font-semibold text-white mb-2">
                Verify your email
              </h1>
              <p className="text-dark-300 text-sm mb-6">
                Click the button below to activate your developer account and start using Sentinel's API platform.
              </p>

              <div className="bg-dark-900 border border-dark-700 rounded p-4 mb-6">
                <p className="text-xs text-dark-400 leading-relaxed">
                  This will grant you access to API keys, documentation, and developer tools. 
                  The verification link can only be used once.
                </p>
              </div>

              <button
                onClick={handleVerification}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded transition-colors mb-4"
              >
                Activate account
              </button>

              <Link 
                to="/" 
                className="block text-center text-sm text-dark-400 hover:text-dark-300 transition-colors"
              >
                Back to home
              </Link>
            </>
          )}

          {/* Verifying */}
          {status === 'verifying' && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                <svg className="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-dark-300 text-sm">Verifying your email...</p>
            </div>
          )}

          {/* Success */}
          {status === 'success' && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Email verified</h2>
                  <p className="text-sm text-dark-300">{message}</p>
                </div>
              </div>

              <div className="bg-dark-900 border border-dark-700 rounded p-4 mb-6">
                <p className="text-xs text-dark-400">
                  Your account is now active. Sign in to access your dashboard and start integrating with our API.
                </p>
              </div>

              <Link
                to="/login"
                className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-2.5 px-4 rounded transition-colors"
              >
                Continue to sign in
              </Link>
            </>
          )}

          {/* Error */}
          {status === 'error' && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Verification failed</h2>
                  <p className="text-sm text-dark-300">{message}</p>
                </div>
              </div>

              <div className="bg-dark-900 border border-dark-700 rounded p-4 mb-6">
                <p className="text-xs text-dark-400">
                  If you've already verified your email, try signing in. Otherwise, you may need to register again.
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-2.5 px-4 rounded transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block w-full bg-dark-700 hover:bg-dark-600 border border-dark-600 text-dark-300 text-center font-medium py-2.5 px-4 rounded transition-colors"
                >
                  Register again
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {status === 'pending' && (
          <p className="text-center text-xs text-dark-500 mt-6">
            Having trouble?{' '}
            <a href="mailto:mobishahzaib@gmail.com" className="text-dark-400 hover:text-dark-300 underline">
              Contact support
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;