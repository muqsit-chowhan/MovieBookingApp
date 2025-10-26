export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    genre_ids?: number[];
  }
  
  export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    status: string;
    budget?: number;
    revenue?: number;
  }
  
  // ADD THIS INTERFACE
  export interface Video {
    id: string;
    key: string;
    name: string;
    type: string;
    site: string;
    size: number;
    official: boolean;
    published_at: string;
    iso_639_1: string;
    iso_3166_1: string;
  }
  
  // ADD THIS INTERFACE FOR VIDEOS API RESPONSE
  export interface VideosResponse {
    id: number;
    results: Video[];
  }


  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface GenreResponse {
    genres: Genre[];
  }
  
  export interface SearchResponse {
    results: Movie[];
  }