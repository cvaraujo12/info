import React from 'react';
import { Navigation } from '../Navigation';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <Navigation />
      </div>
    </header>
  );
}; 