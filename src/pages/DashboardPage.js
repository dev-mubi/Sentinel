import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import DocsPage from './DocsPage';

// Dashboard Components
import Sidebar from '../components/dashboard/Sidebar';
import MobileHeader from '../components/dashboard/MobileHeader';
import ApplicationsTab from '../components/dashboard/ApplicationsTab';
import SettingsTab from '../components/dashboard/SettingsTab';
import CreateAppModal from '../components/dashboard/CreateAppModal';
import EditAppModal from '../components/dashboard/EditAppModal';
import SuccessModal from '../components/dashboard/SuccessModal';
import ChangePasswordModal from '../components/dashboard/ChangePasswordModal';

const DashboardPage = () => {
  const [developer, setDeveloper] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('apps');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newApp, setNewApp] = useState({ app_name: '', app_description: '', app_url: '', redirect_uris: '' });
  const [editedApp, setEditedApp] = useState(null);
  const [createdAppCredentials, setCreatedAppCredentials] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Change Password States
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordStep, setPasswordStep] = useState('otp');
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

  const handleEditApp = (app) => {
    setEditedApp({ ...app });
    setShowEditModal(true);
    setError('');
  };

  const handleUpdateApp = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_BASE_URL}/api/client-apps/${editedApp.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          app_description: editedApp.app_description,
          app_url: editedApp.app_url,
          redirect_uris: editedApp.redirect_uris
        })
      });

      const data = await response.json();

      if (response.ok) {
        setShowEditModal(false);
        fetchApps(token);
        setEditedApp(null);
      } else {
        setError(data.error || 'Failed to update application');
      }
    } catch (error) {
      console.error('Error updating app:', error);
      setError('Network error. Please try again.');
    }
  };

  const handleDeleteApp = async (appId) => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/api/client-apps/${appId}`, {
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
      <Sidebar
        developer={developer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <MobileHeader
          developer={developer}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Applications Tab */}
          {activeTab === 'apps' && (
            <ApplicationsTab
              apps={apps}
              loading={loading}
              setShowCreateModal={setShowCreateModal}
              handleDeleteApp={handleDeleteApp}
              handleEditApp={handleEditApp}
              copyToClipboard={copyToClipboard}
              copySuccess={copySuccess}
            />
          )}

          {/* Documentation Tab */}
          {activeTab === 'docs' && (
            // <DocsPage />
            navigate('/docs')
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <SettingsTab
              developer={developer}
              setShowChangePasswordModal={setShowChangePasswordModal}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateAppModal
        showModal={showCreateModal}
        setShowModal={(show) => {
          setShowCreateModal(show);
          if (!show) setError('');
        }}
        newApp={newApp}
        setNewApp={setNewApp}
        handleSubmit={handleCreateApp}
        error={error}
      />

      <EditAppModal
        showModal={showEditModal}
        setShowModal={(show) => {
          setShowEditModal(show);
          if (!show) setError('');
        }}
        editedApp={editedApp}
        setEditedApp={setEditedApp}
        handleSubmit={handleUpdateApp}
        error={error}
      />

      <SuccessModal
        showModal={showSuccessModal}
        setShowModal={setShowSuccessModal}
        credentials={createdAppCredentials}
        copyToClipboard={copyToClipboard}
        copySuccess={copySuccess}
      />

      <ChangePasswordModal
        showModal={showChangePasswordModal}
        setShowModal={setShowChangePasswordModal}
        developer={developer}
        passwordStep={passwordStep}
        setPasswordStep={setPasswordStep}
        otp={otp}
        setOtp={setOtp}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        passwordSuccess={passwordSuccess}
        setPasswordSuccess={setPasswordSuccess}
        isLoadingPassword={isLoadingPassword}
        handleRequestOTP={handleRequestOTP}
        handleResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default DashboardPage;