import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createAccount, login, getUser } from '../utils/api';
import type { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onAuth: (user: User) => void;
}

const AuthModal = ({ onClose, onAuth }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [pseudo, setPseudo] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await login(id);
        if (response.success) {
          const user = await getUser(id);
          onAuth(user);
        } else {
          setError(response.message || 'Erreur de connexion');
        }
      } else {
        if (pseudo.length < 3) {
          setError('Le pseudo doit contenir au moins 3 caractères');
          return;
        }
        const user = await createAccount(pseudo);
        onAuth(user);
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/95 backdrop-blur-sm" />
      <div 
        className="relative w-full max-w-md bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {isLogin ? 'Connexion' : 'Création de compte'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isLogin ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Identifiant
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                placeholder="Entrez votre identifiant"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pseudo
              </label>
              <input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                placeholder="Choisissez un pseudo"
                required
                minLength={3}
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer un compte')}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-sm text-gray-400 hover:text-white transition"
          >
            {isLogin ? "Je n'ai pas de compte" : 'J\'ai déjà un compte'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;