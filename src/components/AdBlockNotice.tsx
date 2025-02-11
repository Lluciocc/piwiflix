import React from 'react';
import { Shield } from 'lucide-react';

const AdBlockNotice = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-lg p-4 mb-8">
      <div className="flex items-center space-x-3">
        <Shield className="h-5 w-5 text-orange-500" />
        <p className="text-orange-300">
          Pour une meilleure expérience, nous vous recommandons fortement d'installer{' '}
          <a 
            href="https://ublockorigin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 underline decoration-orange-500/30 hover:decoration-orange-400/50 transition-all"
          >
            uBlock Origin
          </a>
          {' '}pour bloquer les publicités intrusives.
        </p>
      </div>
    </div>
  );
}

export default AdBlockNotice;