import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';
import { fetchMovies, total_pages } from '../utils/api';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import Pagination from './Pagination';

const MovieGrid = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchData = async () => {
          try {
            const tt_pages = await total_pages(); // Fetch the total pages
            setTotalPages(tt_pages)
          } catch (error) {
            console.error('Error fetching total pages:', error);
          }
        }

        fetchData();
        const data = await fetchMovies(currentPage); 
        if (data && Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          throw new Error('Format de données invalide');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
        setError('Une erreur est survenue lors du chargement des films.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [currentPage]); // On relance la récupération des films à chaque changement de page

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movies.length) return <ErrorMessage message="Aucun film disponible pour le moment." />;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        type={"movies"}
      />
    </div>
  );
};

export default MovieGrid;
