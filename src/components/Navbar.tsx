import React, { useState } from 'react';
import { Film, Search, Menu, X, Tv, MessageCircle, User } from 'lucide-react';
import DmcaPopup from './DmcaPopup';
import SearchBar from './SearchBar';
import type { User as UserType } from '../types';

interface NavbarProps {
  currentSection: 'films' | 'series';
  onSectionChange: (section: 'films' | 'series') => void;
  user: UserType | null;
  onAuthClick: () => void;
}

const Navbar = ({ currentSection, onSectionChange, user, onAuthClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDmca, setShowDmca] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : ''
      }`}>
        <div className="container mx-auto px-4 py-2">
          <div className="nav-gradient grid-bg rounded-2xl">
            <div className="flex items-center justify-between h-16 px-4 md:px-8">
              <div className="flex items-center space-x-3">
                <Film className="h-6 w-6 md:h-8 md:w-8 text-red-500" />
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                  PiwiFlix
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => onSectionChange('films')}
                  className={`flex items-center space-x-2 transition-colors ${
                    currentSection === 'films' ? 'text-red-500' : 'text-white hover:text-red-500'
                  }`}
                >
                  <Film className="h-5 w-5" />
                  <span>Films</span>
                </button>
                <button
                  onClick={() => onSectionChange('series')}
                  className={`flex items-center space-x-2 transition-colors ${
                    currentSection === 'series' ? 'text-red-500' : 'text-white hover:text-red-500'
                  }`}
                >
                  <Tv className="h-5 w-5" />
                  <span>Séries</span>
                </button>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="text-white hover:text-red-500 transition"
                  aria-label="Rechercher"
                >
                  <Search className="h-5 w-5" />
                </button>
                <a
                  href="https://discord.gg/buReC9QTck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#5865F2]/25 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  <span>Discord</span>
                </a>
                <button
                  onClick={onAuthClick}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  <span>{user ? user.pseudo : 'Connexion'}</span>
                </button>
              </div>

              <button
                className="md:hidden text-white hover:text-red-500 transition"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden absolute w-full bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button
                onClick={() => {
                  onSectionChange('films');
                  setShowMobileMenu(false);
                }}
                className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
                  currentSection === 'films' ? 'bg-red-600 text-white' : 'text-white hover:bg-gray-800'
                }`}
              >
                <Film className="h-5 w-5" />
                <span>Films</span>
              </button>
              <button
                onClick={() => {
                  onSectionChange('series');
                  setShowMobileMenu(false);
                }}
                className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
                  currentSection === 'series' ? 'bg-red-600 text-white' : 'text-white hover:bg-gray-800'
                }`}
              >
                <Tv className="h-5 w-5" />
                <span>Séries</span>
              </button>
              <button
                onClick={() => {
                  setShowSearch(true);
                  setShowMobileMenu(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-white hover:bg-gray-800 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span>Rechercher</span>
              </button>
              <a
                href="https://discord.gg/buReC9QTck"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg text-white transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Discord</span>
              </a>
              <button
                onClick={() => {
                  onAuthClick();
                  setShowMobileMenu(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span>{user ? user.pseudo : 'Connexion'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}
      {showDmca && <DmcaPopup onClose={() => setShowDmca(false)} />}
    </>
  );
}

export default Navbar;