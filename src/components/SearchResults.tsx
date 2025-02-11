import React from 'react';
import { Movie, Series } from '../types';
import MovieCard from './MovieCard';
import SeriesCard from './SeriesCard';

interface SearchResultsProps {
  movies: Movie[];
  series: Series[];
}

const SearchResults = ({ movies, series }: SearchResultsProps) => {
  const hasResults = movies.length > 0 || series.length > 0;

  if (!hasResults) {
    return (
      <div className="text-center text-gray-400 py-8">
        Aucun résultat trouvé
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {movies.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Films ({movies.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.title}-${index}`} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {series.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Séries ({series.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {series.map((serie) => (
              <SeriesCard key={serie.id} series={serie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;