import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Movie } from '../types';
import RatingBadge from './RatingBadge';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [showEmbed, setShowEmbed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative group">
      <div className="movie-card cursor-pointer" onClick={() => setShowEmbed(true)}>
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-black/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/10">
            {movie.year}
          </span>
        </div>
        
        <div className="absolute top-2 left-2 z-10 transform group-hover:scale-110 transition-transform duration-300">
          <RatingBadge rating={movie.rating} />
        </div>
        
        <div className={`w-full h-full bg-gray-900 ${!imageLoaded ? 'animate-pulse' : ''}`}>
          <img
            src={movie.image}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
            }`}
            style={{ transformOrigin: 'center center' }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          <div className="absolute bottom-0 p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2 drop-shadow-lg">
              {movie.title}
            </h3>
            <div className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3 rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25">
              <Play className="w-5 h-5" />
              <span>Regarder</span>
            </div>
          </div>
        </div>
      </div>

      {showEmbed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowEmbed(false)}>
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md" />
          <div className="relative w-full max-w-5xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl scale-in z-[101]" onClick={e => e.stopPropagation()}>
            <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-8 rounded overflow-hidden">
                  <img src={movie.image} alt={movie.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
                    <span className="text-gray-400 text-sm">{movie.year}</span>
                  </div>
                  <RatingBadge rating={movie.rating} size="lg" />
                </div>
              </div>
              <button
                onClick={() => setShowEmbed(false)}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={movie.embedLink}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen"
                title={movie.title}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;