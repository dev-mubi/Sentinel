import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const DisclaimerBanner = () => {
  return (
    <div className="w-full bg-red-900/20 border-t border-b border-red-700/40 text-red-200 py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-start gap-3">
      <FaExclamationCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-100 mb-1">Service Discontinued</h3>
          <p className="text-sm text-red-300">
            Sentinel's authentication services have been discontinued. This is an archived project maintained for portfolio purposes only. 
            The backend server is no longer operational, and new registrations or authentications are not possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
