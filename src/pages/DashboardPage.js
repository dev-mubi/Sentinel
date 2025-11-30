import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../logo.png';
import API_BASE_URL from '../config';

const DashboardPage = () => {
  const [developer, setDeveloper] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('apps'); // 'apps', 'docs', 'settings'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newApp, setNewApp] = useState({ app_name: '', app_description: '', app_url: '', redirect_uris: '' });
  const [createdAppCredentials, setCreatedAppCredentials] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [error, setError] = useState('');
  
  // Change Password States
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordStep, setPasswordStep] = useState('otp'); // 'otp' or 'reset'
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedDev = localStorage.getItem('developer');
    const token = localStorage.getItem('token');

    if (!storedDev || !token) {
      navigate('/login');
      return;
    }

    setDeveloper(JSON.parse(storedDev));
    fetchApps(token);
  }, [navigate]);

  const fetchApps = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/client-apps`, {
        headers: {
          'x-auth-token': token
        }
      });
      const data = await response.json();
      if (response.ok) {
        setApps(data.apps);
      }
    } catch (error) {
      console.error('Error fetching apps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApp = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/client-apps/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(newApp)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCreatedAppCredentials(data.app);
        setShowCreateModal(false);
        setShowSuccessModal(true);
        fetchApps(token);
        setNewApp({ app_name: '', app_description: '', app_url: '', redirect_uris: '' });
      } else {
        setError(data.error || 'Failed to create application');
      }
    } catch (error) {
      console.error('Error creating app:', error);
      setError('Network error. Please try again.');
    }
  };

  const handleDeleteApp = async (appId) => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/client-apps/${appId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        fetchApps(token);
      }
    } catch (error) {
      console.error('Error deleting app:', error);
    }
  };

  const handleRequestOTP = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    setIsLoadingPassword(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/developers/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: developer.email })
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordSuccess('OTP sent to your email');
        setPasswordStep('reset');
      } else {
        setPasswordError(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      setPasswordError('Network error. Please try again.');
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setIsLoadingPassword(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/developers/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: developer.email,
          otp: otp,
          newPassword: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordSuccess('Password changed successfully!');
        setTimeout(() => {
          setShowChangePasswordModal(false);
          setPasswordStep('otp');
          setOtp('');
          setNewPassword('');
          setConfirmPassword('');
          setPasswordSuccess('');
          setPasswordError('');
        }, 2000);
      } else {
        setPasswordError(data.error || 'Failed to reset password');
      }
    } catch (error) {
      setPasswordError('Network error. Please try again.');
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('developer');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  if (!developer) return null;

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-dark-800 border-r border-dark-700 hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-600/20 blur-lg rounded-full group-hover:blur-xl transition-all"></div>
              <img src={logo} alt="Sentinel" className="relative h-8 w-auto" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Sentinel
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('apps')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'apps' ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20' : 'text-dark-400 hover:text-white hover:bg-dark-700/50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Applications
          </button>
          <button 
            onClick={() => setActiveTab('docs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'docs' ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20' : 'text-dark-400 hover:text-white hover:bg-dark-700/50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Documentation
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20' : 'text-dark-400 hover:text-white hover:bg-dark-700/50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-dark-700">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
              {developer.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{developer.name}</p>
              <p className="text-xs text-dark-400 truncate">{developer.email}</p>
            </div>
            <button onClick={handleLogout} className="text-dark-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          
          {/* Applications Tab */}
          {activeTab === 'apps' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white">Applications</h1>
                  <p className="text-dark-400 mt-1">Manage your client applications and API keys</p>
                </div>
                {apps.length < 2 ? (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Application
                  </button>
                ) : (
                  <div className="px-5 py-2.5 bg-dark-700 text-dark-400 font-semibold rounded-xl flex items-center gap-2 cursor-not-allowed border border-dark-600" title="Application limit reached">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Limit Reached (2/2)
                  </div>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                </div>
              ) : apps.length === 0 ? (
                <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 bg-dark-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Applications Yet</h3>
                  <p className="text-dark-400 mb-8 max-w-md mx-auto">Get started by creating your first client application to obtain API credentials.</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Create Application
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apps.map(app => (
                    <div key={app.id} className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 hover:border-primary-500/30 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-600 flex items-center justify-center text-2xl">
                          {app.app_name.charAt(0)}
                        </div>
                        <div className="relative">
                          <button 
                            onClick={() => handleDeleteApp(app.id)}
                            className="text-dark-500 hover:text-red-400 transition-colors p-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{app.app_name}</h3>
                      <p className="text-sm text-dark-400 mb-4 line-clamp-2 h-10">{app.app_description || 'No description provided'}</p>
                      
                      <div className="bg-dark-900/50 rounded-lg p-3 mb-4 border border-dark-700/50">
                        <div className="text-xs text-dark-500 mb-1 uppercase tracking-wider font-semibold">Client ID</div>
                        <div className="flex items-center justify-between gap-2">
                          <code className="text-sm text-primary-300 font-mono truncate">{app.client_id}</code>
                          <button 
                            onClick={() => copyToClipboard(app.client_id, `id-${app.id}`)}
                            className="text-dark-400 hover:text-white transition-colors"
                          >
                            {copySuccess === `id-${app.id}` ? (
                              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.is_active ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 'bg-red-900/30 text-red-400'}`}>
                          {app.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-dark-500">
                          {new Date(app.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Documentation Tab */}
          {activeTab === 'docs' && (
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-white mb-6">Documentation</h1>
              <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8">
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
                  <p className="text-dark-300 mb-6">
                    Sentinel provides a secure and easy-to-use authentication service for your applications. 
                    Follow this guide to integrate Sentinel into your project.
                  </p>

                  <h3 className="text-xl font-bold text-white mb-3">1. Authentication Headers</h3>
                  <p className="text-dark-300 mb-4">
                    All API requests to Sentinel must include your Client ID and Client Secret in the headers:
                  </p>
                  <div className="bg-dark-900 rounded-xl p-4 mb-6 border border-dark-700 font-mono text-sm text-primary-300">
                    X-Client-ID: your_client_id<br/>
                    X-Client-Secret: your_client_secret
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">2. API Endpoints</h3>
                  <div className="space-y-4">
                    <div className="bg-dark-900 rounded-xl p-4 border border-dark-700">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded">POST</span>
                        <code className="text-white">/api/auth/register</code>
                      </div>
                      <p className="text-dark-400 text-sm">Register a new user for your application.</p>
                    </div>
                    <div className="bg-dark-900 rounded-xl p-4 border border-dark-700">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded">POST</span>
                        <code className="text-white">/api/auth/login</code>
                      </div>
                      <p className="text-dark-400 text-sm">Authenticate an existing user.</p>
                    </div>
                    <div className="bg-dark-900 rounded-xl p-4 border border-dark-700">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded">POST</span>
                        <code className="text-white">/api/auth/verify-email</code>
                      </div>
                      <p className="text-dark-400 text-sm">Verify a user's email address using the token sent to them.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
              <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-400 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={developer.name} 
                      disabled 
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white opacity-70 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-400 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={developer.email} 
                      disabled 
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white opacity-70 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-400 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      value={developer.company_name || ''} 
                      disabled 
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white opacity-70 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-dark-700">
                  <h3 className="text-lg font-bold text-white mb-4">Security</h3>
                  <button 
                    onClick={() => setShowChangePasswordModal(true)}
                    className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors text-sm font-medium"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Create App Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-dark-700">
              <h3 className="text-xl font-bold text-white">Register New Application</h3>
            </div>
            <form onSubmit={handleCreateApp} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Application Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. My Awesome SaaS"
                  value={newApp.app_name}
                  onChange={(e) => setNewApp({...newApp, app_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
                <textarea
                  className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                  placeholder="Brief description of your application..."
                  value={newApp.app_description}
                  onChange={(e) => setNewApp({...newApp, app_description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Application URL</label>
                <input
                  type="url"
                  className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="https://myapp.com"
                  value={newApp.app_url}
                  onChange={(e) => setNewApp({...newApp, app_url: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Redirect URIs</label>
                <input
                  type="text"
                  className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="http://localhost:3000/callback"
                  value={newApp.redirect_uris}
                  onChange={(e) => setNewApp({...newApp, redirect_uris: e.target.value})}
                />
                <p className="text-xs text-dark-500 mt-1">OAuth callback URLs. Separate multiple URIs with commas.</p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium shadow-lg shadow-primary-600/20"
                >
                  Create App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal with Credentials */}
      {showSuccessModal && createdAppCredentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-dark-700 bg-green-900/10">
              <div className="flex items-center gap-3 text-green-400 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold">Application Created!</h3>
              </div>
              <p className="text-dark-300 text-sm">
                Save these credentials securely. The Client Secret will not be shown again.
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Client ID</label>
                <div className="flex gap-2">
                  <code className="flex-1 bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-primary-300 font-mono text-sm break-all">
                    {createdAppCredentials.client_id}
                  </code>
                  <button
                    onClick={() => copyToClipboard(createdAppCredentials.client_id, 'new-id')}
                    className="px-3 bg-dark-700 hover:bg-dark-600 rounded-lg text-white transition-colors"
                  >
                    {copySuccess === 'new-id' ? (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Client Secret</label>
                <div className="flex gap-2">
                  <code className="flex-1 bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-red-300 font-mono text-sm break-all">
                    {createdAppCredentials.client_secret}
                  </code>
                  <button
                    onClick={() => copyToClipboard(createdAppCredentials.client_secret, 'new-secret')}
                    className="px-3 bg-dark-700 hover:bg-dark-600 rounded-lg text-white transition-colors"
                  >
                    {copySuccess === 'new-secret' ? (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-red-400/80 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Make sure to copy this now. You won't be able to see it again!
                </p>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-600/20"
              >
                I've Saved My Credentials
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-dark-700">
              <h3 className="text-xl font-bold text-white">Change Password</h3>
              <p className="text-sm text-dark-400 mt-1">
                {passwordStep === 'otp' 
                  ? 'We\'ll send an OTP to your email' 
                  : 'Enter the OTP and your new password'}
              </p>
            </div>

            <div className="p-6">
              {passwordError && (
                <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="bg-green-900/20 border border-green-900/50 text-green-400 px-4 py-3 rounded-xl text-sm mb-4">
                  {passwordSuccess}
                </div>
              )}

              {passwordStep === 'otp' ? (
                <div className="space-y-4">
                  <div className="bg-dark-900 border border-dark-600 rounded-xl p-4">
                    <p className="text-sm text-dark-300">
                      An OTP will be sent to:
                    </p>
                    <p className="text-white font-medium mt-1">{developer.email}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowChangePasswordModal(false);
                        setPasswordError('');
                        setPasswordSuccess('');
                      }}
                      className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRequestOTP}
                      disabled={isLoadingPassword}
                      className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingPassword ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowChangePasswordModal(false);
                        setPasswordStep('otp');
                        setOtp('');
                        setNewPassword('');
                        setConfirmPassword('');
                        setPasswordError('');
                        setPasswordSuccess('');
                      }}
                      className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoadingPassword}
                      className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingPassword ? 'Updating...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;