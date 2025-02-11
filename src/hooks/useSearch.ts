import { useMemo } from 'react';
import { Movie, Series } from '../types';

// Fonction de normalisation déplacée hors du hook pour éviter sa recréation
const normalizeText = (text: string) => 
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

// Créer un index de recherche pour les titres normalisés
const createSearchIndex = (items: Array<Movie | Series>) => {
  return items.reduce((acc, item) => {
    acc.set(item, normalizeText(item.title));
    return acc;
  }, new Map<Movie | Series, string>());
};

export const useSearch = (movies: Movie[], series: Series[], searchTerm: string) => {
  // Mémoriser les index de recherche
  const movieIndex = useMemo(() => createSearchIndex(movies), [movies]);
  const seriesIndex = useMemo(() => createSearchIndex(series), [series]);

  // Mémoriser la recherche normalisée
  const normalizedSearch = useMemo(() => 
    normalizeText(searchTerm),
    [searchTerm]
  );

  // Mémoriser les résultats de recherche
  return useMemo(() => {
    if (!normalizedSearch) {
      return { movieResults: [], seriesResults: [] };
    }

    const searchTerms = normalizedSearch.split(' ');
    
    const filteredMovies = movies.filter(movie => {
      const normalizedTitle = movieIndex.get(movie) || '';
      return searchTerms.every(term => normalizedTitle.includes(term));
    });
    
    const filteredSeries = series.filter(serie => {
      const normalizedTitle = seriesIndex.get(serie) || '';
      return searchTerms.every(term => normalizedTitle.includes(term));
    });
    
    return {
      movieResults: filteredMovies,
      seriesResults: filteredSeries.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    };
  }, [movies, series, normalizedSearch, movieIndex, seriesIndex]);
};