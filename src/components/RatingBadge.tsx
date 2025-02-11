import React from 'react';

interface RatingBadgeProps {
  rating: number | null | undefined;
  size?: 'sm' | 'md' | 'lg';
}

const RatingBadge = ({ rating, size = 'md' }: RatingBadgeProps) => {
  // Gérer les cas où rating est null ou undefined
  if (rating === null || rating === undefined) {
    return null;
  }

  // Convertir en nombre si c'est une chaîne
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  
  const getColor = (rating: number) => {
    if (rating >= 8) return 'from-emerald-500 to-emerald-600';
    if (rating >= 6.5) return 'from-lime-500 to-lime-600';
    if (rating >= 5) return 'from-yellow-400 to-yellow-500';
    if (rating >= 4) return 'from-orange-400 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  // Ne rien afficher si la note n'est pas un nombre valide
  if (isNaN(numericRating)) {
    return null;
  }

  return (
    <div className={`${sizeClasses[size]} relative group`}>
      <div
        className={`absolute inset-0 rounded-full
        bg-gradient-to-br ${getColor(numericRating)}
        flex items-center justify-center font-bold text-white
        transform transition-all duration-300 group-hover:scale-110`}
      >
        {numericRating.toFixed(1)}
      </div>
    </div>
  );
};

export default RatingBadge;