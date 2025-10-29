
import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      <span className="ml-4 text-gray-600">Loading recipes...</span>
    </div>
  );
}

export default LoadingSpinner;