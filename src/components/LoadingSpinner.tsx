import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-red-600"></div>
    </div>
  );
};