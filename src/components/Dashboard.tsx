import React from 'react';
import { User, Crown, Home, Trash } from 'lucide-react';
import type { User as UserType } from '../types';
import { deleteAccount } from '../utils/api';
interface DashboardProps {
  user: UserType;
  onLogout: () => void;
  onHome: () => void;
}

const handleDeleteAccount = (id: string) => {
  deleteAccount(id)
    .then(() => {
      window.location.reload();
      localStorage.clear()
      alert('Compte supprimé avec succès !');
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression du compte :', error);
      alert('Échec de la suppression du compte.');
    });
};

const Dashboard = ({ user, onLogout, onHome }: DashboardProps) => {

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{user.pseudo}</h2>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Crown className={`w-5 h-5 ${user.isPremium ? 'text-yellow-500' : 'text-gray-600'}`} />
                <span>{user.isPremium ? 'Premium' : 'Gratuit'}</span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={onHome}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </button>

              <button
                onClick={() => handleDeleteAccount(user.id)}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <Trash className="w-5 h-5" />
                Supprimer le compte
              </button>

              <button
                onClick={onLogout}
                className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;