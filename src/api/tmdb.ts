// import axios, { AxiosInstance } from 'axios';
// import { Movie, MovieDetails } from '../types/movie';
// import { TMDB_BEARER_TOKEN } from '../utils/constants.ts';

// const api: AxiosInstance = axios.create({
//   baseURL: 'https://api.themoviedb.org/3',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
//   },
// });

// export const getUpcomingMovies = async (): Promise<Movie[]> => {
//   try {
//     const res = await api.get<{ results: Movie[] }>('/movie/upcoming');
//     return res.data.results;
//   } catch (error) {
//     console.error('Error fetching upcoming movies:', error);
//     return [];
//   }
// };

// export const getMovieDetails = async (movieId: number): Promise<Movie | null> => {
//   try {
//     const res = await api.get<Movie>(`/movie/${movieId}`);
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching movie details:', error);
//     return null;
//   }
// };

// export const getMovieVideos = async (movieId: number): Promise<MovieDetails | null> => {
//   try {
//     const res = await api.get<MovieDetails>(`/movie/${movieId}/videos`);
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching movie videos:', error);
//     return null;
//   }
// };


import axios, { AxiosInstance } from 'axios';
import { Genre, GenreResponse, Movie, MovieDetails, SearchResponse, Video, VideosResponse } from '../types/movie';
import { TMDB_BEARER_TOKEN } from '../utils/constants';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
  },
});

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const res = await api.get<{ results: Movie[] }>('/movie/upcoming');
    return res.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  try {
    const res = await api.get<MovieDetails>(`/movie/${movieId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// CORRECTED: This should return Video[] and handle the proper response structure
export const getMovieVideos = async (movieId: number): Promise<Video[]> => {
  try {
    const res = await api.get<VideosResponse>(`/movie/${movieId}/videos`);
    // The videos are in res.data.results, not res.data directly
    return res.data.results || [];
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return [];
  }
};


export const getGenres = async (): Promise<Genre[]> => {
  try {
    const res = await api.get<GenreResponse>('/genre/movie/list');
    return res.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};


export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    if (!query.trim()) return [];
    const res = await api.get<SearchResponse>('/search/movie', {
      params: { query },
    });
    console.log("res", JSON.stringify(res, null, 2));

    return res.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const res = await api.get<{ results: Movie[] }>(
      `/discover/movie?with_genres=${genreId}`
    );
    return res.data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};



export const getGenrePreviewImage = async (genreId: number): Promise<string | null> => {
  try {
    const res = await api.get(`/discover/movie?with_genres=${genreId}`);
    const firstMovie = res.data.results?.[0];
    return firstMovie?.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${firstMovie.backdrop_path}`
      : null;
  } catch (err) {
    console.error('Error fetching genre preview:', err);
    return null;
  }
};


export const getMoviesByGenreForImages = async (genreId: number): Promise<Movie[]> => {
  try {
    const response = await axios.get<{ results: Movie[] }>(
      `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        },
      }
    );
    return response.data.results || [];
  } catch (error) {
    console.error(`Error fetching movies for genre ${genreId}:`, error);
    return [];
  }
};