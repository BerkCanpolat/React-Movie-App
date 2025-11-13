const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";

const fetchFromTMDB = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
};


export const fetchGenres = async () => {
  try {
    const res = await fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    return data.genres || [];
  } catch (err) {
    console.error("Genre API Error:", err);
    return [];
  }
};

export const fetchTrendingMoviesOfWeek = async () => {
  try {
    const res = await fetch(`${BASE_URL}trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Trending API Error:", err);
    return [];
  }
};

export const fetchKoreanSeries = async () => {
  const res = await fetch(
    `${BASE_URL}discover/tv?api_key=${API_KEY}&with_origin_country=KR&sort_by=popularity.desc&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results;
};

export const fetchFastMovie = async () => {
  try {
    const res = await fetch(`${BASE_URL}discover/movie?with_genres=28&sort_by=popularity.desc&api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Trending API Error:", err);
    return [];
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=1`
    );

    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error("Trent filmleri çekerken hata", error);
    return [];
  }
};


export const getAccountId = async (sessionId) => {
  try {
    const res = await fetch(`${BASE_URL}account?api_key=${API_KEY}&session_id=${sessionId}`);
    const data = await res.json();
    return data.id;
  } catch (err) {
    console.error("Account ID alınamadı:", err);
    return null;
  }
};

export const fetchWatchlist = async (sessionId) => {
  try {
    const accountId = await getAccountId(sessionId);
    if (!accountId) return [];

    const res = await fetch(
      `${BASE_URL}account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc`
    );
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Watchlist fetch error:", err);
    return [];
  }
};

export const toggleWatchlist = async (sessionId, mediaId, status) => {
  try {
    const accountId = await getAccountId(sessionId);
    if (!accountId) return { success: false };

    const res = await fetch(
      `${BASE_URL}account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_type: "movie",
          media_id: mediaId,
          watchlist: status,
        }),
      }
    );

    const data = await res.json();

    if (data.success || [1, 12, 13].includes(data.status_code)) {
      return { success: true };
    } else {
      console.error("toggleWatchlist response:", data);
      return { success: false };
    }
  } catch (err) {
    console.error("toggleWatchlist error:", err);
    return { success: false };
  }
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Detay alınamadı");
  return await res.json();
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error("Oyuncu bilgisi alınamadı");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Credits API Error:", err);
    return { cast: [], crew: [] };
  }
};

export const getSimilarMovies = async (movieId) => {
  const res = await fetch(
    `${BASE_URL}movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );
  if (!res.ok) throw new Error("Benzer filmler alınamadı");
  const data = await res.json();
  return data.results;
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Trent filmleri çekerken hata", error);
    return [];
  }
};

export const getImageUrl = (path, size = "original") => {
  if (!path)
   return "https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg";
   return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const fetchJustRelease = () => fetchFromTMDB("movie/now_playing");
export const fetchPopular = () => fetchFromTMDB("movie/popular");
export const fetchUpcoming = () => fetchFromTMDB("movie/upcoming");
export const fetchTvPopular = () => fetchFromTMDB("tv/popular");
export const fetchTopRated = () => fetchFromTMDB("movie/top_rated");