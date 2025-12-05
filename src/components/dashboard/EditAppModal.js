import React, { useEffect } from 'react';

const EditAppModal = ({ 
  showModal, 
  setShowModal, 
  editedApp, 
  setEditedApp, 
  handleSubmit, 
  error 
}) => {
  if (!showModal || !editedApp) return null;

  const descriptionLength = editedApp.app_description?.length || 0;
  const isDescriptionTooLong = descriptionLength > 500;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-dark-800 rounded-2xl border border-dark-700 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-dark-700">
          <h3 className="text-lg md:text-xl font-bold text-white">Edit Application</h3>
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
              disabled
              className="w-full bg-dark-900/50 border border-dark-700 rounded-xl px-3 md:px-4 py-2 text-dark-400 cursor-not-allowed text-sm md:text-base"
              value={editedApp.app_name}
            />
            <p className="text-xs text-dark-500 mt-1">Application name cannot be changed.</p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-dark-300">Description</label>
              <span className={`text-xs ${isDescriptionTooLong ? 'text-red-400' : 'text-dark-500'}`}>
                {descriptionLength}/500
              </span>
            </div>
            <textarea
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all h-20 md:h-24 resize-none text-sm md:text-base"
              placeholder="Brief description of your application..."
              value={editedApp.app_description || ''}
              onChange={(e) => setEditedApp({...editedApp, app_description: e.target.value})}
            />
            {isDescriptionTooLong && (
              <p className="text-xs text-red-400 mt-1">Description exceeds 500 character limit</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Application URL</label>
            <input
              type="url"
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              placeholder="https://myapp.com"
              value={editedApp.app_url || ''}
              onChange={(e) => setEditedApp({...editedApp, app_url: e.target.value})}
            />
            <p className="text-xs text-dark-500 mt-1">Must be a valid HTTP or HTTPS URL.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Redirect URIs</label>
            <input
              type="text"
              className="w-full bg-dark-900 border border-dark-600 rounded-xl px-3 md:px-4 py-2 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
              placeholder="https://myapp.com/callback, https://myapp.com/auth"
              value={editedApp.redirect_uris || ''}
              onChange={(e) => setEditedApp({...editedApp, redirect_uris: e.target.value})}
            />
            <p className="text-xs text-dark-500 mt-1">Separate multiple URIs with commas.</p>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppModal;
