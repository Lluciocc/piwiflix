import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="text-red-600 text-center py-8">
      {message}
    </div>
  );
};