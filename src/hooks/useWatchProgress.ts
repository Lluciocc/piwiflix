interface WatchProgress {
  season: number;
  episode: number;
}

interface SeriesProgress {
  [seriesId: string]: WatchProgress;
}

export const useWatchProgress = () => {
  const STORAGE_KEY = 'piwiflix_watch_progress';

  const getProgress = (seriesId: string): WatchProgress | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const progress: SeriesProgress = JSON.parse(stored);
      return progress[seriesId] || null;
    } catch {
      return null;
    }
  };

  const saveProgress = (seriesId: string, season: number, episode: number) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const progress: SeriesProgress = stored ? JSON.parse(stored) : {};
      
      progress[seriesId] = { season, episode };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la progression:', error);
    }
  };

  return {
    getProgress,
    saveProgress
  };
};