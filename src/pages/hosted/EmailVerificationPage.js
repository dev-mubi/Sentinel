import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import API_BASE_URL from '../../config';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const token = searchParams.get('token');
  const clientId = searchParams.get('client_id');

  useEffect(() => {
    if (!token || !clientId) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    verifyEmail();
    // eslint-disable-next-line
  }, []);

  const verifyEmail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hosted-auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          client_id: clientId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail(data.email);
        
        // Don't auto-redirect - let user manually go back to the client app
        // Since we don't have the redirect_uri stored in the verification token
      } else {
        setStatus('error');
        setMessage(data.error || 'Verification failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-dark-800 border border-dark-700 mb-4 relative group">
            <div className="absolute inset-0 bg-primary-600/20 blur-xl rounded-full group-hover:blur-2xl transition-all"></div>
            <img src={logo} alt="Sentinel" className="h-12 w-auto relative" />
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm text-center">
          {status === 'verifying' && (
            <>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary-600/10">
                <div className="w-10 h-10 border-4 border-primary-600/30 border-t-primary-600 rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verifying Email</h2>
              <p className="text-dark-400">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
              <p className="text-dark-300 mb-4">{message}</p>
              {email && (
                <p className="text-primary-400 font-medium mb-6">{email}</p>
              )}
              <div className="bg-dark-900 border border-dark-600 rounded-xl p-4">
                <p className="text-dark-300 text-sm">
                  {message.includes('already') 
                    ? 'Your email is already verified. You can close this window and return to the application to sign in.'
                    : 'Your email has been verified successfully! You can now close this window and return to the application to sign in.'}
                </p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-dark-400 mb-6">{message}</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors"
              >
                Go to Home
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
