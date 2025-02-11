import React from 'react';
import { Film } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Film className="h-6 w-6 text-red-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
            PiwiFlix
          </span>
        </div>
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} PiwiFlix. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;