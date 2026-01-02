import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DocsPage from './pages/DocsPage';
import AboutPage from './pages/AboutPage';
import OAuthLoginPage from './pages/hosted/OAuthLoginPage';
import OAuthRegisterPage from './pages/hosted/OAuthRegisterPage';
import EmailVerificationPage from './pages/hosted/EmailVerificationPage';
import OAuthForgotPasswordPage from './pages/hosted/OAuthForgotPasswordPage';
import OAuthResetPasswordPage from './pages/hosted/OAuthResetPasswordPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify" element={<VerifyEmailPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Hosted UI Routes */}
          <Route path="/oauth/login" element={<OAuthLoginPage />} />
          <Route path="/oauth/register" element={<OAuthRegisterPage />} />
          <Route path="/oauth/verify-email" element={<EmailVerificationPage />} />
          <Route path="/oauth/forgot-password" element={<OAuthForgotPasswordPage />} />
          <Route path="/oauth/reset-password" element={<OAuthResetPasswordPage />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;