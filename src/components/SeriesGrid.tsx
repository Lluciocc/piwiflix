import React, { useState, useEffect } from 'react';
import { Series } from '../types';
import { fetchSeries, total_pages } from '../utils/api';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import SeriesCard from './SeriesCard';
import Pagination from './Pagination';

const SeriesGrid = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchSeries(currentPage);
        console.log(data); // Vérification des données

        const tt_pages = await total_pages(); // Fetch the total pages
        setTotalPages(tt_pages)

        // Vérification de la structure de données avant de les utiliser
        if (data && Array.isArray(data.series)) {
          setSeries(data.series);
        } else {
          throw new Error('Format de données invalide');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des séries:', error);
        setError('Une erreur est survenue lors du chargement des séries.');
      } finally {
        setLoading(false);
      }
    };

    loadSeries();
  }, [currentPage]);

  // Vérifications supplémentaires avant de procéder au rendu
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!Array.isArray(series) || series.length === 0) {
    return <ErrorMessage message="Aucune série disponible pour le moment." />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {series.map((serie) => (
          <SeriesCard key={serie.id} series={serie} />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        type={"series"}
      />
    </div>
  );
};

export default SeriesGrid;
