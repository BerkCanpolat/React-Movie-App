import { createContext, useContext, useEffect, useState } from "react";
import { fetchFastMovie, fetchGenres, fetchJustRelease, fetchKoreanSeries, fetchMovieCredits, fetchPopular, fetchTopRated, fetchTrendingMoviesOfWeek, fetchTvPopular, fetchUpcoming, fetchWatchlist, toggleWatchlist } from "../Services/api";
import { useAuth } from "./AuthContext";

const MoviesContext = createContext();

export const useMovie = () => {
    const movieCtx = useContext(MoviesContext);

    if(!movieCtx) {
        throw new Error("MoviesContext'i MovieProvider dışında kullanmaya çalışıyorsun!");
    }

    return movieCtx;
};

export const MovieProvider = ({ children }) => {


    const { sessionId } = useAuth();
    const [watchlist, setWatchlist] = useState([]);

    const [justRelease, setJustRelease] = useState([]);
    const [genre, setGenre] = useState([]);
    const [trend, setTrend] = useState([]);
    const [popular, setPopular] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [tvPopular, setTvPopular] = useState([]);
    const [korenSeries, setKoreanSeries] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [fastMovie, setFastMovie] = useState([]);
    const [loadingMovie, setLoadingMovie] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [error, setError] = useState(null);


    const [movieCredits, setMovieCredits] = useState({ cast: [], crew: [] });

    useEffect(() => {
        const fetchAllMovies = async() => {
            setLoadingMovie(true);
            setError(null);
            try {
                const [justReleaseData, genreData, trendData, popularData, upcomingData, tvPopularData, koreanSeriesData, topRatedData, fastMovieData] = await Promise.all([
                    fetchJustRelease(),
                    fetchGenres(),
                    fetchTrendingMoviesOfWeek(),
                    fetchPopular(),
                    fetchUpcoming(),
                    fetchTvPopular(),
                    fetchKoreanSeries(),
                    fetchTopRated(),
                    fetchFastMovie()
                ]);

                setJustRelease(justReleaseData);
                setGenre(genreData);
                setTrend(trendData);
                setPopular(popularData);
                setUpcoming(upcomingData);
                setTvPopular(tvPopularData);
                setKoreanSeries(koreanSeriesData);
                setTopRated(topRatedData);
                setFastMovie(fastMovieData);
            } catch (error) {
                console.log("Film verileri alınamadı:", error);
                setError("Film verileri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
            } finally {
                setLoadingMovie(false);
            }
        };

        fetchAllMovies();
    }, []);

    const genreMap = {};
    genre.forEach(g => {
        genreMap[g.id] = g.name;
    });


    useEffect(() => {
        const loadWatchlist = async () => {
            if (!sessionId) return;
            const data = await fetchWatchlist(sessionId);
            setWatchlist(data);
        };
        loadWatchlist();
    }, [sessionId]);

    const addToWatchlist = async (movieId) => {
        if (!sessionId) {
            alert("Please log in to use Watchlist.");
            return;
        }
        const res = await toggleWatchlist(sessionId, movieId, true);
        if (res.success) {
            const updated = await fetchWatchlist(sessionId);
            setWatchlist(updated);
        } else {
            console.error("Watchlist ekleme başarısız:", res);
        }
    };

    const removeFromWatchlist = async (movieId) => {
        if (!sessionId) return;
        const res = await toggleWatchlist(sessionId, movieId, false);
        if (res.success) {
            const updated = await fetchWatchlist(sessionId);
            setWatchlist(updated);
        } else {
            console.error("Watchlist'ten çıkarma başarısız:", res);
        }
    };

    const openMoviesDetails = (moviesId) => {
    setSelectedMovieId(moviesId);
    document.body.style.overFlow = "hidden";
  };

  const loadMovieCredits = async (movieId) => {
    try {
      const creditsData = await fetchMovieCredits(movieId);
      setMovieCredits(creditsData);
    } catch (error) {
      console.error("Oyuncular yüklenemedi:", error);
    }
  };


    return (
        <MoviesContext.Provider value={{justRelease, genreMap, trend, popular, upcoming, tvPopular, korenSeries, topRated, fastMovie, genre, watchlist, addToWatchlist, removeFromWatchlist, openMoviesDetails, loadMovieCredits, movieCredits, error, loadingMovie}}>
            { children }
        </MoviesContext.Provider>
    )
}