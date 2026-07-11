import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  message = "Submitting your data..." 
}) => {
  // If not visible, return null so it doesn't render in the DOM at all
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity"
      role="alert"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="text-center">
        {/* The Animated Spinner */}
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        
        {/* Loading Text */}
        <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;