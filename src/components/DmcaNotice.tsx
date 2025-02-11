import React from 'react';
import { AlertTriangle, Shield, Scale } from 'lucide-react';

const DmcaNotice = () => {
  return (
    <div className="mt-16 mb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-600/10 to-red-500/10 blur-xl" />
        <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-red-500/20 p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-red-500">Avis Important</h3>
              <p className="text-gray-300 text-sm">
                PiwiFlix n'héberge aucun fichier sur ses serveurs. Tous les contenus sont fournis 
                par des sites tiers non affiliés.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-red-500">Protection des Droits</h3>
              <p className="text-gray-300 text-sm">
                Pour toute plainte concernant le contenu, veuillez contacter directement 
                les hébergeurs des vidéos.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Scale className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-red-500">Responsabilité</h3>
              <p className="text-gray-300 text-sm">
                Nous ne sommes qu'une interface permettant de faciliter l'accès à ces contenus 
                déjà disponibles publiquement sur internet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DmcaNotice;