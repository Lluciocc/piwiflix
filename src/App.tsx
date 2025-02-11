import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MovieGrid from './components/MovieGrid';
import SeriesGrid from './components/SeriesGrid';
import DmcaNotice from './components/DmcaNotice';
import Footer from './components/Footer';
import AdBlockNotice from './components/AdBlockNotice';
import DiscordPopup from './components/DiscordPopup';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import { Clapperboard } from 'lucide-react';
import type { User } from './types';

const App = () => {
  const [currentSection, setCurrentSection] = useState<'films' | 'series'>('films');
  const [showDiscordPopup, setShowDiscordPopup] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const shouldShowPopup = Math.random() < 0.33;
    if (shouldShowPopup) {
      const timer = setTimeout(() => {
        setShowDiscordPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAuth = (user: User) => {
    setUser(user);
    setShowAuthModal(false);
    setShowDashboard(true);
  };

  const handleLogout = () => {
    setUser(null);
    setShowDashboard(false);
  };

  if (showDashboard && user) {
    return (
      <Dashboard
        user={user}
        onLogout={handleLogout}
        onHome={() => setShowDashboard(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-b from-red-950/30 to-transparent pointer-events-none" />
      <div className="relative">
        <Navbar
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          user={user}
          onAuthClick={() => user ? setShowDashboard(true) : setShowAuthModal(true)}
        />
        <main className="container mx-auto px-4 pt-20 md:pt-32">
          <AdBlockNotice />
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16 slide-up px-4">
            <div className="inline-flex items-center justify-center mb-6 md:mb-8">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-red-500/30 to-red-600/30" />
                <Clapperboard className="relative w-12 h-12 md:w-16 md:h-16 text-red-500 animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 relative">
              <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-red-500/20 to-red-600/20" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 animate-gradient">
                Bienvenue sur PiwiFlix
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed backdrop-blur-sm bg-black/20 p-4 md:p-6 rounded-2xl">
              {currentSection === 'films' ? (
                <>
                  Votre destination privilégiée pour regarder les derniers films en excellente qualité.
                  <br className="hidden md:block" />
                  Découvrez, visionnez et profitez de vos films préférés à tout moment.
                </>
              ) : (
                <>
                  Découvrez nos séries en streaming de haute qualité.
                  <br className="hidden md:block" />
                  Regardez vos séries préférées, épisode par épisode, quand vous voulez.
                </>
              )}
            </p>
          </div>
          <div className="max-w-[2000px] mx-auto">
            {currentSection === 'films' ? <MovieGrid /> : <SeriesGrid />}
          </div>
          <DmcaNotice />
        </main>
        <Footer />
        {showDiscordPopup && <DiscordPopup onClose={() => setShowDiscordPopup(false)} />}
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onAuth={handleAuth} />}
      </div>
    </div>
  );
};

export default App;