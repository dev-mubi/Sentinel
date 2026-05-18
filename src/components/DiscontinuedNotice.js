import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const DiscontinuedNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isClosed = sessionStorage.getItem('sentinelNoticeClosed');
    if (!isClosed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('sentinelNoticeClosed', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end bg-slate-950/72 p-4 backdrop-blur-sm md:p-0">
        <div className="animate-slideUp w-full border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40 md:border-x-0 md:border-b-0">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-950 [font-family:'Sora',sans-serif]">
                Notice
              </span>
              <p className="text-sm font-semibold text-slate-100 [font-family:'Manrope',sans-serif] md:text-base">
                Service Update
              </p>
            </div>
            <button
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:text-slate-100"
              aria-label="Close notification"
            >
              <FaTimes className="h-3.5 w-3.5" />
            </button>
            </div>

            <div className="space-y-3 px-4 py-4 [font-family:'Manrope',sans-serif] md:px-6 md:py-6">
              <p className="text-base font-semibold leading-6 text-slate-100 md:text-lg">
                Sentinel authentication services have been formally discontinued.
              </p>
              <p className="text-sm leading-6 text-slate-300 md:text-[15px]">
                This website is maintained exclusively as an archived portfolio and documentation reference.
              </p>
              <p className="text-sm font-medium leading-6 text-slate-200 md:text-[15px]">
                New registrations, sign-ins, and OAuth transactions are no longer available.
              </p>
            </div>

            <div className="border-t border-slate-800 px-4 py-3 md:px-6 md:py-4">
              <button
                onClick={handleClose}
                className="w-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-800 [font-family:'Manrope',sans-serif] md:w-auto md:min-w-40"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default DiscontinuedNotice;
