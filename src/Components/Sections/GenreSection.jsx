import { useEffect, useState } from "react";
import { useMovie } from "../../Context/MoviesContext";
import { fetchMoviesByGenre, getImageUrl } from "../../Services/api";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa6";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import SliderBtn from "../Shared/SliderBtn";
import CustomButton from "../Shared/CustomButton";
import { FaCirclePlay, FaBookmark } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";
import { useAuth } from "../../Context/AuthContext";
import { useModal } from "../../Context/ModalContext";

const GenreSection = () => {
  const { genre, addToWatchlist, watchlist, removeFromWatchlist } = useMovie();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, scroll } = useHorizontalScroll();
  const [genrePosters, setGenrePosters] = useState({});
  const { sessionId } = useAuth();
  const { openModal } = useModal();

  useEffect(() => {
    if (genre.length > 0 && !selectedGenre) {
      setSelectedGenre(genre[0]);
    }
  }, [genre, selectedGenre]);

  useEffect(() => {
    const loadPosters = async () => {
      try {
        const promises = genre.slice(0, 10).map(async (g) => {
          const movies = await fetchMoviesByGenre(g.id);
          return { [g.id]: movies[0]?.poster_path };
        });

        const results = await Promise.all(promises);
        setGenrePosters(Object.assign({}, ...results));
      } catch (e) {
        console.error("Genre posterları alınamadı:", e);
      }
    };

    if (genre.length > 0) loadPosters();
  }, [genre]);

  useEffect(() => {
    const loadMovies = async () => {
      if (!selectedGenre) return;
      setLoading(true);
      try {
        const res = await fetchMoviesByGenre(selectedGenre.id);
        setMovies(res.slice(0, 5));
        setCurrentIndex(0);
      } catch (e) {
        console.error("Genre movies yüklenemedi:", e);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [selectedGenre]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  if (loading || !selectedGenre || movies.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  const movie = movies[currentIndex];

  const isInWatchlist = movie
    ? watchlist.some((m) => m.id === movie.id)
    : false;

  const handleWatchlistClick = () => {
    if (!sessionId) {
      openModal("login");
      return;
    }
    isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id);
  };

  return (
    <section className="relative overflow-hidden mt-24">
      <div
        className="w-full h-[790px] bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${getImageUrl(
            movie.backdrop_path,
            "original"
          )})`,
        }}
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-between w-full h-full overflow-hidden pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 pr-2 sm:pr-2.5 md:pr-8 lg:pr-12 xl:pr-16">
            <div className="flex flex-col justify-end items-start">
              <h4 className="text-sm sm:text-base text-gray-300 mb-2">
                Explore by the genre
              </h4>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h2>
              <div className="flex items-center text-gray-300 text-sm mb-4 space-x-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <span>| {movie.release_date?.substring(0, 4)}</span>
                <span>| {selectedGenre.name}</span>
              </div>

              <div className="sm:flex gap-3 hidden">
                <CustomButton
                  icon={<FaCirclePlay size={20} />}
                  title="Play Now"
                  className="bg-emerald-600 k:border-emerald-500 dark:text-white text-black w-38 h-10 sm:w-40 sm:h-12"
                />

                {sessionId ? (
                  <CustomButton
                    icon={<BsBookmarkPlus size={20} />}
                    title="Add Watchlist"
                    activeIcon={<FaBookmark size={20} color="white" />}
                    activeTitle="Remove Watchlist"
                    isActive={isInWatchlist}
                    onClick={handleWatchlistClick}
                    className="w-45 h-10 sm:w-50 sm:h-12"
                  />
                ) : (
                  <CustomButton
                    icon={<BsBookmarkPlus size={20} />}
                    title="Add Watchlist"
                    className="text-white"
                    onClick={handleWatchlistClick}
                  />
                )}
              </div>

              <div className="flex gap-3 sm:hidden">
                <CustomButton
                  icon={<FaCirclePlay size={20} />}
                  className="bg-emerald-600 k:border-emerald-500 dark:text-white text-black w-15 h-10"
                />

                {sessionId ? (
                  <CustomButton
                    icon={<BsBookmarkPlus size={20} />}
                    activeIcon={<FaBookmark size={20} color="white" />}
                    isActive={isInWatchlist}
                    onClick={handleWatchlistClick}
                    className="w-15 h-10"
                  />
                ) : (
                  <CustomButton
                    icon={<BsBookmarkPlus size={20} />}
                    className="text-white w-15 h-10"
                    onClick={handleWatchlistClick}
                  />
                )}
              </div>

              <div className="flex items-center gap-8 mt-10">
                <SliderBtn
                  children={<FaChevronLeft color="white" />}
                  onClick={handlePrev}
                  className=""
                />
                <SliderBtn
                  children={<FaChevronRight color="white" />}
                  onClick={handleNext}
                  className=""
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              {movies.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? "bg-white scale-125"
                      : "bg-gray-600 hover:bg-gray-400"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div
            ref={ref}
            className="flex items-start snap-x overflow-x-hidden no-scrollbar z-10 scroll-smooth snap-mandatory w-full h-full"
          >
            <div className="flex items-center gap-5 mt-auto mb-20 pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 relative">
              {genre.slice(0, 10).map((g) => (
                <div
                  key={g.id}
                  onClick={() => setSelectedGenre(g)}
                  className={`shrink-0 px-6 py-3 cursor-pointer rounded-lg text-sm font-semibold transition-all bg-cover bg-center w-35 h-20 sm:w-80 sm:h-40 flex flex-col items-center justify-center relative ${
                    selectedGenre.id === g.id
                      ? "ring-2 dark:ring-emerald-500"
                      : " "
                  }`}
                  style={{
                    backgroundImage: genrePosters[g.id]
                      ? `url(${getImageUrl(genrePosters[g.id], "original")})`
                      : "none",
                  }}
                >
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      selectedGenre.id === g.id
                        ? "bg-linear-to-t from-green-400/20 to-green-100/5"
                        : "bg-black/40"
                    }`}
                  ></div>
                  <div
                    className={`${
                      selectedGenre.id === g.id
                        ? " text-white  font-semibold sm:text-xl"
                        : " text-white  font-semibold sm:text-xl"
                    }`}
                  >
                    {g.name}
                  </div>
                </div>
              ))}
            </div>

            <SliderBtn
              children={<FaChevronLeft color="white" />}
              onClick={() => scroll("left")}
              className="absolute left-5 top-164 sm:top-155 sm:left-20 max-sm:left-5 z-50"
            />

            <SliderBtn
              children={<FaChevronRight color="white" />}
              onClick={() => scroll("right")}
              className="absolute right-5 top-164 sm:top-155 sm:right-5 z-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
