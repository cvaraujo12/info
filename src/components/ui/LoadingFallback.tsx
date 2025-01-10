import React from 'react';

export const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}; 