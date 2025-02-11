import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Users, Sparkles } from 'lucide-react';

interface DiscordPopupProps {
  onClose: () => void;
}

const DiscordPopup = ({ onClose }: DiscordPopupProps) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/95 backdrop-blur-sm" />
      <div 
        className="relative w-full max-w-md bg-[#2C2F33] rounded-xl overflow-hidden shadow-2xl scale-in z-[201]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-[#5865F2] to-[#4752C4] p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">Rejoignez notre Discord !</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#5865F2]/10 rounded-lg">
                <Users className="w-6 h-6 text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Communauté active</h3>
                <p className="text-gray-400">Rejoignez des milliers de passionnés</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#5865F2]/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Support & Discussions</h3>
                <p className="text-gray-400">Entraide et partage entre membres</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#5865F2]/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Giveaways</h3>
                <p className="text-gray-400">Participez aux giveaways et gagnez des récompenses</p>
              </div>
            </div>
          </div>

          <a
            href="https://discord.gg/buReC9QTck"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium rounded-lg text-center transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Rejoindre le Discord
          </a>
        </div>
      </div>
    </div>
  );
};

export default DiscordPopup;