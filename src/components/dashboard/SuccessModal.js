import React from 'react';

const SuccessModal = ({ 
  showModal, 
  setShowModal, 
  credentials, 
  copyToClipboard, 
  copySuccess 
}) => {
  if (!showModal || !credentials) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-dark-800 rounded-2xl border border-dark-700 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-dark-700 bg-green-900/10">
          <div className="flex items-center gap-2 md:gap-3 text-green-400 mb-2">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg md:text-xl font-bold">Application Created!</h3>
          </div>
          <p className="text-dark-300 text-xs md:text-sm">
            Save these credentials securely. The Client Secret will not be shown again.
          </p>
        </div>
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div>
            <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Client ID</label>
            <div className="flex gap-2">
              <code className="flex-1 bg-dark-900 border border-dark-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-primary-300 font-mono text-xs md:text-sm break-all">
                {credentials.client_id}
              </code>
              <button
                onClick={() => copyToClipboard(credentials.client_id, 'new-id')}
                className="px-2 md:px-3 bg-dark-700 hover:bg-dark-600 rounded-lg text-white transition-colors flex-shrink-0"
              >
                {copySuccess === 'new-id' ? (
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Client Secret</label>
            <div className="flex gap-2">
              <code className="flex-1 bg-dark-900 border border-dark-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-red-300 font-mono text-xs md:text-sm break-all">
                {credentials.client_secret}
              </code>
              <button
                onClick={() => copyToClipboard(credentials.client_secret, 'new-secret')}
                className="px-2 md:px-3 bg-dark-700 hover:bg-dark-600 rounded-lg text-white transition-colors flex-shrink-0"
              >
                {copySuccess === 'new-secret' ? (
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            onClick={() => setShowModal(false)}
            className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-600/20 text-sm md:text-base"
          >
            I've Saved My Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
