import React, { useState, useEffect } from 'react';
import { Play, X, Tv, ChevronDown, History } from 'lucide-react';
import { Series } from '../types';
import { formatSeries } from '../utils/api';
import RatingBadge from './RatingBadge';
import { useWatchProgress } from '../hooks/useWatchProgress';

interface SeriesCardProps {
  series: Series;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  const { getProgress, saveProgress } = useWatchProgress();
  const [showEmbed, setShowEmbed] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSeasonSelector, setShowSeasonSelector] = useState(false);

  // Assurez-vous que formatSeries retourne une structure valide
  const { saisons = [] } = formatSeries(series) || {}; // Définit 'saisons' comme un tableau vide si undefined
  const totalEpisodes = saisons.reduce((total, season) => total + (season.episodes?.length || 0), 0); // Protection contre 'episodes' non défini

  useEffect(() => {
    // Charger la progression sauvegardée
    const progress = getProgress(series.id);
    if (progress) {
      setSelectedSeason(progress.season);
      setSelectedEpisode(progress.episode);
    }
  }, [series.id]);

  const currentEpisodeLink = saisons
    .find(s => s.number === selectedSeason)
    ?.episodes?.find(e => e.number === selectedEpisode)?.link;

  const currentSeason = saisons.find(s => s.number === selectedSeason);

  const handleClose = () => {
    // Sauvegarder la progression avant de fermer
    saveProgress(series.id, selectedSeason, selectedEpisode);
    setShowEmbed(false);
  };

  return (
    <div className="relative">
      <div className="movie-card cursor-pointer" onClick={() => setShowEmbed(true)}>
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          {saisons.length === 0 && totalEpisodes === 0 ? (
            <span className="bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-medium">
              Arrive prochainement
            </span>
          ) : (
            <>
              <span className="bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-medium">
                {saisons.length} Saison{saisons.length > 1 ? 's' : ''}
              </span>
              <span className="bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-medium">
                {totalEpisodes} Épisode{totalEpisodes > 1 ? 's' : ''}
              </span>
            </>
          )}
        </div>
        
        <div className="absolute top-2 left-2 z-10">
          <RatingBadge rating={series.vote_average} />
        </div>
        
        {/* Afficher la progression si elle existe */}
        {getProgress(series.id) && (
          <div className="absolute bottom-2 left-2 right-2 z-10">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 text-sm text-white flex items-center gap-2">
              <History className="w-4 h-4 text-red-400" />
              <span>S{getProgress(series.id)?.season} E{getProgress(series.id)?.episode}</span>
            </div>
          </div>
        )}
        
        <div className={`w-full h-full bg-gray-900 ${!imageLoaded ? 'animate-pulse' : ''}`}>
          <img
            src={series.poster}
            alt={series.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
          <div className="absolute bottom-0 p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2">
              {series.title}
            </h3>
            <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-all duration-300 w-full justify-center transform group-hover:scale-105">
              <Tv className="w-4 h-4" />
              <span>Regarder</span>
            </div>
          </div>
        </div>
      </div>

      {showEmbed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md" />
          <div className="relative w-full max-w-7xl h-[85vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl scale-in z-[101] flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-8 rounded overflow-hidden">
                  <img src={series.poster} alt={series.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{series.title}</h3>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <span>Saison {selectedSeason}</span>
                      <span>•</span>
                      <span>Épisode {selectedEpisode}</span>
                    </div>
                  </div>
                  <RatingBadge rating={series.vote_average} size="lg" />
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Video Player */}
              <div className="flex-1 bg-black">
                {currentEpisodeLink && (
                  <iframe
                    src={currentEpisodeLink}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay; fullscreen"
                    title={`${series.title} S${selectedSeason}E${selectedEpisode}`}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                )}
              </div>

              {/* Episode Selector */}
              <div className="w-80 border-l border-gray-800 flex flex-col bg-gray-900/80 backdrop-blur-sm">
                {/* Season Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowSeasonSelector(!showSeasonSelector)}
                    className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-colors"
                  >
                    <span className="text-white font-medium">Saison {selectedSeason}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showSeasonSelector ? 'rotate-180' : ''}`} />
                  </button>
                  

                  {showSeasonSelector && (
                    <div className="absolute top-full left-0 right-0 bg-gray-800 shadow-lg z-10 max-h-64 overflow-y-auto custom-scrollbar">
                      {saisons.map((saison) => (
                        <button
                          key={saison.number}
                          onClick={() => {
                            setSelectedSeason(saison.number);
                            setSelectedEpisode(1);
                            setShowSeasonSelector(false);
                          }}
                          className="w-full p-3 text-left hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
                        >
                          Saison {saison.number}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Episodes List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                  <div className="grid grid-cols-1 gap-2">
                    {currentSeason?.episodes?.map((episode) => (
                      <button
                        key={episode.number}
                        onClick={() => {
                          setSelectedEpisode(episode.number);
                          saveProgress(series.id, selectedSeason, episode.number);
                        }}
                        className={`p-3 rounded-lg transition-all ${selectedEpisode === episode.number
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>Épisode {episode.number}</span>
                          {selectedEpisode === episode.number && (
                            <Play className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeriesCard;
