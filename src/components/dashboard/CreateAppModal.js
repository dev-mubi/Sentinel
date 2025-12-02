import React from 'react';

const CreateAppModal = ({ 
  showModal, 
  setShowModal, 
  newApp, 
  setNewApp, 
  handleSubmit, 
  error 
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-dark-800 rounded-2xl border border-dark-700 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-dark-700">
          <h3 className="text-lg md:text-xl font-bold text-white">Register New Application</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Application Name</label>
            <input
              type="text"
              required
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              placeholder="e.g. My Awesome SaaS"
              value={newApp.app_name}
              onChange={(e) => setNewApp({...newApp, app_name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Description</label>
            <textarea
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all h-20 md:h-24 resize-none text-sm md:text-base"
              placeholder="Brief description of your application..."
              value={newApp.app_description}
              onChange={(e) => setNewApp({...newApp, app_description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Application URL</label>
            <input
              type="url"
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              placeholder="https://myapp.com"
              value={newApp.app_url}
              onChange={(e) => setNewApp({...newApp, app_url: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Redirect URIs</label>
            <input
              type="text"
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              placeholder="http://localhost:3000/callback"
              value={newApp.redirect_uris}
              onChange={(e) => setNewApp({...newApp, redirect_uris: e.target.value})}
            />
            <p className="text-xs text-dark-500 mt-1">OAuth callback URLs. Separate multiple URIs with commas.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors font-medium text-sm md:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium shadow-lg shadow-primary-600/20 text-sm md:text-base"
            >
              Create App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppModal;
