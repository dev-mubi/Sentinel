import React from 'react';

const ApplicationsTab = ({ 
  apps, 
  loading, 
  setShowCreateModal,
  handleDeleteApp,
  copyToClipboard,
  copySuccess
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Applications</h1>
          <p className="text-dark-400 mt-1 text-sm md:text-base">Manage your client applications and API keys</p>
        </div>
        {apps.length < 2 ? (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Application
          </button>
        ) : (
          <div className="px-4 py-2.5 bg-dark-700 text-dark-400 font-semibold rounded-xl flex items-center gap-2 cursor-not-allowed border border-dark-600 w-full sm:w-auto justify-center" title="Application limit reached">
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
        <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-dark-700/50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">No Applications Yet</h3>
          <p className="text-dark-400 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">Get started by creating your first client application to obtain API credentials.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white font-semibold rounded-xl transition-colors w-full sm:w-auto"
          >
            Create Application
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {apps.map(app => (
            <div key={app.id} className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-4 md:p-6 hover:border-primary-500/30 transition-all group">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-600 flex items-center justify-center text-xl md:text-2xl">
                  {app.app_name.charAt(0)}
                </div>
                <div className="relative">
                  <button 
                    onClick={() => handleDeleteApp(app.id)}
                    className="text-dark-500 hover:text-red-400 transition-colors p-1"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="text-base md:text-lg font-bold text-white mb-1 truncate">{app.app_name}</h3>
              <p className="text-xs md:text-sm text-dark-400 mb-3 md:mb-4 line-clamp-2 h-8 md:h-10">{app.app_description || 'No description provided'}</p>
              
              <div className="bg-dark-900/50 rounded-lg p-2 md:p-3 mb-3 md:mb-4 border border-dark-700/50">
                <div className="text-xs text-dark-500 mb-1 uppercase tracking-wider font-semibold">Client ID</div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs md:text-sm text-primary-300 font-mono truncate">{app.client_id}</code>
                  <button 
                    onClick={() => copyToClipboard(app.client_id, `id-${app.id}`)}
                    className="text-dark-400 hover:text-white transition-colors flex-shrink-0"
                  >
                    {copySuccess === `id-${app.id}` ? (
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs md:text-sm">
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
  );
};

export default ApplicationsTab;
