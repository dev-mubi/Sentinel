import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import API_BASE_URL from '../../config';

const OAuthResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = searchParams.get('email');
  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  const state = searchParams.get('state');

  // Password strength validation
  const getPasswordStrength = () => {
    if (!newPassword) return { strength: 'none', color: '', text: '' };
    
    let score = 0;
    if (newPassword.length >= 6) score++;
    if (newPassword.length >= 10) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 2) return { strength: 'weak', color: 'text-red-400', bg: 'bg-red-400', text: 'Weak' };
    if (score <= 4) return { strength: 'medium', color: 'text-yellow-400', bg: 'bg-yellow-400', text: 'Medium' };
    return { strength: 'strong', color: 'text-green-400', bg: 'bg-green-400', text: 'Strong' };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check strength
    if (passwordStrength.strength === 'weak') {
      setError('Password is too weak. Please include uppercase, lowercase, and numbers.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/hosted-auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
          client_id: clientId
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Show success modal
        setSuccess(true);
        
        // Redirect after 3 seconds
        setTimeout(() => {
          const loginUrl = `/oauth/login?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri || '')}&state=${state || ''}`;
          navigate(loginUrl);
        }, 3000);
      } else {
        setError(data.error || 'Failed to reset password');
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
        <div className="w-full max-w-md text-center">
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm animate-fade-in">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h2>
            <p className="text-dark-300 mb-6">
              Your password has been updated. Redirecting you to login...
            </p>
            <div className="w-full bg-dark-700 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-green-500 animate-progress origin-left" style={{ animationDuration: '3s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <div className="bg-dark-800 p-8 rounded-2xl border border-dark-700 text-center max-w-md w-full">
          <div className="text-red-400 text-xl font-bold mb-2">Invalid Request</div>
          <p className="text-dark-400">Email parameter is missing. Please start from the forgot password page.</p>
        </div>
      </div>
    );
  }

  // Show error screen if client_id is missing
  if (!clientId) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-dark-800 border border-red-900/50 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-red-900/20 border border-red-900/50 mb-4">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Invalid Access</h1>
              <p className="text-dark-300 mb-6">
                This page must be accessed through your application's password reset flow.
              </p>
              <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-400">
                  <strong>Error:</strong> Missing client_id parameter
                </p>
              </div>
              <p className="text-dark-400 text-sm">
                Please return to your application and use the "Forgot Password" link from the login page.
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
          <h1 className="text-2xl font-bold text-white mb-2">Reset Your Password</h1>
          <p className="text-dark-400">
            Enter the code sent to <span className="text-primary-400">{email}</span>
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
              <label className="block text-sm font-medium text-dark-300 mb-1.5">6-Digit Code</label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-widest font-mono placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="000000"
              />
              <p className="text-xs text-dark-500 mt-1.5">Enter the 6-digit code from your email</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={6}
                className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="At least 6 characters"
              />
              
              {newPassword && (
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
                <p className={newPassword.length >= 6 ? 'text-green-400' : ''}>• At least 6 characters</p>
                <p className={/[A-Z]/.test(newPassword) ? 'text-green-400' : ''}>• One uppercase letter</p>
                <p className={/[a-z]/.test(newPassword) ? 'text-green-400' : ''}>• One lowercase letter</p>
                <p className={/[0-9]/.test(newPassword) ? 'text-green-400' : ''}>• One number</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Re-enter your password"
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
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/oauth/forgot-password?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri || '')}&state=${state || ''}`)}
              className="text-dark-400 hover:text-white text-sm transition-colors"
            >
              ← Request a new code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthResetPasswordPage;
