import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Movie, Series } from '../types';
//import { searchMovies, searchSeries } from '../utils/api';
import { searchMoviesAndSeries } from '../utils/api';
import MovieCard from './MovieCard';
import SeriesCard from './SeriesCard';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{ movies: Movie[], series: Series[] }>({ movies: [], series: [] });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async () => {
    if (searchTerm.trim()) {
      setLoading(true);
      setHasSearched(true);
      try {
        const results = await searchMoviesAndSeries(searchTerm);

        setResults({
          movies: results.movies,
          series: results.series
        });
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
        <div className="p-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-red-600/5 to-red-500/5 rounded-xl blur" />
            <div className="relative">
              <div className="flex items-center gap-4 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-red-500/20 p-2">
                <Search className="w-6 h-6 text-red-400 ml-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Rechercher un film ou une série..."
                  className="flex-1 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none py-3"
                  autoFocus
                />
                <button
                  onClick={performSearch}
                  className="p-2 hover:bg-red-600/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                  aria-label="Rechercher"
                >
                  <Search className="w-6 h-6" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors mr-2"
                >
                  <X className="w-6 h-6 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
            </div>
          ) : hasSearched ? (
            <div className="h-full overflow-y-auto custom-scrollbar px-6">
              {results.movies.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    Films
                    <span className="ml-3 px-3 py-1 bg-red-500/10 rounded-full text-red-400 text-sm">
                      {results.movies.length}
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}

              {results.series.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    Séries
                    <span className="ml-3 px-3 py-1 bg-red-500/10 rounded-full text-red-400 text-sm">
                      {results.series.length}
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.series.map((serie) => (
                      <SeriesCard key={serie.id} series={serie} />
                    ))}
                  </div>
                </div>
              )}

              {results.movies.length === 0 && results.series.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Search className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg">
                    Aucun résultat trouvé pour "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <Search className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-500 text-xl">
                Tapez votre recherche et appuyez sur Entrée...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;