import React from 'react';
import { Button } from './ui';

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-xl font-bold">Info Route</a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/news" className="px-3 py-2 text-sm font-medium">Notícias</a>
              <a href="/statistics" className="px-3 py-2 text-sm font-medium">Estatísticas</a>
              <a href="/maps" className="px-3 py-2 text-sm font-medium">Mapas</a>
              <a href="/analysis" className="px-3 py-2 text-sm font-medium">Análises</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}; 