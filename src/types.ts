export interface Movie {
  id: number;
  image: string;
  embedLink: string;
  title: string;
  year: string;
  rating: number;
}

export interface Series {
  id: number;
  title: string;
  poster: string;
  vote_average: number;
  popularity: number;
  episodes: Episode[];
}

export interface Episode {
  id: number;
  season: number;
  episode: number;
  link: string;
}

export interface FormattedSeason {
  number: number;
  episodes: { number: number; link: string }[];
}

export interface ApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface PageCount {
  movies: number;
  series: number;
}

export interface User {
  id: string;
  pseudo: string;
  created_at: string;
  isPremium: boolean;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}