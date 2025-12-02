import React from 'react';

const ChangePasswordModal = ({
  showModal,
  setShowModal,
  developer,
  passwordStep,
  setPasswordStep,
  otp,
  setOtp,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  passwordError,
  setPasswordError,
  passwordSuccess,
  setPasswordSuccess,
  isLoadingPassword,
  handleRequestOTP,
  handleResetPassword
}) => {
  if (!showModal) return null;

  const handleClose = () => {
    setShowModal(false);
    setPasswordStep('otp');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordSuccess('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-dark-800 rounded-2xl border border-dark-700 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-dark-700">
          <h3 className="text-lg md:text-xl font-bold text-white">Change Password</h3>
          <p className="text-xs md:text-sm text-dark-400 mt-1">
            {passwordStep === 'otp' 
              ? 'We\'ll send an OTP to your email' 
              : 'Enter the OTP and your new password'}
          </p>
        </div>

        <div className="p-4 md:p-6">
          {passwordError && (
            <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm mb-4">
              {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div className="bg-green-900/20 border border-green-900/50 text-green-400 px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm mb-4">
              {passwordSuccess}
            </div>
          )}

          {passwordStep === 'otp' ? (
            <div className="space-y-4">
              <div className="bg-dark-900 border border-dark-600 rounded-xl p-3 md:p-4">
                <p className="text-xs md:text-sm text-dark-300">
                  An OTP will be sent to:
                </p>
                <p className="text-white font-medium mt-1 text-sm md:text-base">{developer.email}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors font-medium text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestOTP}
                  disabled={isLoadingPassword}
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
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
                  className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm md:text-base"
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
                  className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm md:text-base"
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
                  className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm md:text-base"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors font-medium text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoadingPassword}
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isLoadingPassword ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
