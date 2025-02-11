import { Movie, Series, ApiResponse, User, LoginResponse, FormattedSeason } from '../types';

// Configuration de l'URL de base
const API_BASE_URL = 'https://piwi-api.vercel.app'; 



// Fonction de fetch avec timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);

    if (error instanceof Error) {
      console.error('Fetch Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    throw error;
  }
};

// Fonction générique pour gérer les requêtes
const fetchData = async <T>(
  endpoint: string,
  defaultValue: T,
  page?: number,
  query?: string
): Promise<T> => {
  try {
    let url = `${API_BASE_URL}${endpoint}`;

    // si page = 0 alors c'est une recherche donc q= est def dans la requete
    if (query) {
      url += `?q=${encodeURIComponent(query)}`;

      if (page && page !== 0) {
        url += `&page=${page}`;
      }
    } else if (page && page !== 0) {
      url += `?page=${page}`;
    }

    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return defaultValue;
  }
};

// Fonctions d'API
export const fetchMovies = (page = 1): Promise<ApiResponse<Movie>> =>
  fetchData<ApiResponse<Movie>>('/movies', {
    items: [],
    total: 0,
    page: page,
    per_page: 15,
    total_pages: 0,
  }, page);

export const fetchSeries = (page = 1): Promise<ApiResponse<Series>> =>
  fetchData<ApiResponse<Series>>('/series', {
    items: [],
    page: page,
    per_page: 15,
    total_pages: 0,
    total: 0
  }, page);


/* old function
export const searchMovies = (query: string): Promise<Movie[]> =>
  fetchData<Movie[]>('/search', [], undefined, query);

export const searchSeries = (query: string): Promise<Series[]> =>
  fetchData<Series[]>('/search', [], undefined, query);
*/
export const searchMoviesAndSeries = (query: string): Promise<{ movies: Movie[]; series: Series[] }> =>
  fetchData<{ movies: Movie[]; series: Series[] }>('/search', { movies: [], series: [] }, 0, query);

export const formatSeries = (series: Series) => {
  if (!series || typeof series.episodes !== "string") {
    console.error("Les données des épisodes sont manquantes ou mal formatées.");
    return { saisons: [] };
  }

  let parsedEpisodes: Record<string, Record<string, string>>;

  try {
    parsedEpisodes = JSON.parse(series.episodes);
  } catch (error) {
    console.error("Erreur lors du parsing des épisodes:", error);
    return { saisons: [] };
  }

  const saisons: FormattedSeason[] = [];

  Object.entries(parsedEpisodes).forEach(([season, episodes]) => {
    const saison: FormattedSeason = { number: parseInt(season, 10), episodes: [] };

    Object.entries(episodes).forEach(([episode, link]) => {
      saison.episodes.push({ number: parseInt(episode, 10), link });
    });

    saison.episodes.sort((a, b) => a.number - b.number);
    saisons.push(saison);
  });

  saisons.sort((a, b) => a.number - b.number);

  return { saisons };
};


// Création d'un compte
export const createAccount = async (pseudo: string): Promise<User> => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/create-account?pseudo=${pseudo}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to create account');
  }

  return response.json();
};

export const total_pages = async () => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/total-pages`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch total pages');
  }

  const data = await response.json(); // Parse JSON response
  return data;
};

// Connexion d'un utilisateur
export const login = async (id: string): Promise<LoginResponse> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Échec de la connexion' };
  }
};

// Suppression d'un compte
export const deleteAccount = async (id: string): Promise<void> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/delete-account?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete account');
    }
    console.log('Account deleted successfully');
  } catch (error) {
    console.error('Error deleting account:', error);
  }
};

// Récupération des informations utilisateur
export const getUser = async (id: string): Promise<User> => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/user/${id}`);

  if (!response.ok) {
    throw new Error('Failed to get user');
  }

  return response.json();
};
