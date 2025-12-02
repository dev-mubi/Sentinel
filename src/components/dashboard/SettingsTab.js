import React from 'react';

const SettingsTab = ({ developer, setShowChangePasswordModal }) => {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Settings</h1>
      <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-4 md:p-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Profile Information</h2>
        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-400 mb-2">Full Name</label>
            <input 
              type="text" 
              value={developer.name} 
              disabled 
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white opacity-70 cursor-not-allowed text-sm md:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-400 mb-2">Email Address</label>
            <input 
              type="email" 
              value={developer.email} 
              disabled 
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white opacity-70 cursor-not-allowed text-sm md:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-400 mb-2">Company Name</label>
            <input 
              type="text" 
              value={developer.company_name || ''} 
              disabled 
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white opacity-70 cursor-not-allowed text-sm md:text-base"
            />
          </div>
        </div>
        <div className="mt-6 md:mt-8 pt-4 md:pt-8 border-t border-dark-700">
          <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Security</h3>
          <button 
            onClick={() => setShowChangePasswordModal(true)}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors text-sm font-medium w-full sm:w-auto"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
