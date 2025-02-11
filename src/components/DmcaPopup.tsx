import React from 'react';
import { X } from 'lucide-react';

interface DmcaPopupProps {
  onClose: () => void;
}

const DmcaPopup = ({ onClose }: DmcaPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Avis Important</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-300 leading-relaxed">
            PiwiFlix n'héberge aucun fichier sur ses serveurs. Tous les contenus sont fournis par des sites tiers non affiliés.
            Pour toute plainte concernant le contenu, veuillez contacter directement les hébergeurs des vidéos.
            Nous ne sommes qu'une interface permettant de faciliter l'accès à ces contenus déjà disponibles publiquement sur internet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DmcaPopup;