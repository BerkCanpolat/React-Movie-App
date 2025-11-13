import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getImageUrl,
  getMovieDetails,
  getSimilarMovies,
} from "../Services/api";
import CustomButton from "../Components/Shared/CustomButton";
import { FaCirclePlay, FaBookmark } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";
import { useMovie } from "../Context/MoviesContext";
import { useAuth } from "../Context/AuthContext";
import { useModal } from "../Context/ModalContext";
import { HiOutlineDownload } from "react-icons/hi";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { useHorizontalScroll } from "../Hook/useHorizontalScroll";
import MoviesList from "../Components/Sections/MoviesList";
import SliderBtn from "../Components/Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import HomeSkeleton from "../Components/Shared/HomeSkeleton";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    addToWatchlist,
    removeFromWatchlist,
    watchlist,
    genreMap,
    loadingMovie,
    movieCredits,
    loadMovieCredits,
  } = useMovie();
  const { sessionId } = useAuth();
  const { openModal } = useModal();
  const [similarMovies, setSimilarMovies] = useState([]);
  const { ref, scroll } = useHorizontalScroll();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        const similar = await getSimilarMovies(id);
        setSimilarMovies(similar);
      } catch (error) {
        console.error("Film detayları alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    loadMovieCredits(id);
  }, [id]);

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

  if (loading) {
    return <HomeSkeleton />;
  }

  if (!movie) {
    return <p className="text-center mt-20 text-white">Film bulunamadı.</p>;
  }

  return (
    <div>
      <div className="h-[500px] sm:h-[700px] relative w-full overflow-hidden">
        <div
          className={`text-white bg-cover bg-center flex items-center justify-center absolute inset-0 transition-all duration-1200 ease-in-out transform`}
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b dark:from-black/25 via-transparent to-transparent z-0 from-[#e8e6e3]/20" />

          <div className="absolute inset-0 bg-linear-to-t dark:from-[#0b0b0b] via-[#0b0b0b]/70 to-transparent z-0 from-[#e8e6e3]/25" />

          <div className="absolute inset-0 dark:bg-black/20 backdrop-brightness-90 mask-[radial-gradient(circle,white_60%,transparent_100%)] z-0 bg-[#f5f5f5]/10" />
        </div>

        <div className="absolute inset-0 flex items-end px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 mb-10 sm:mb-20">
          <div className="flex flex-col justify-between w-full md:flex-row md:items-end max-md:gap-25">
            {movie && (
              <div className="flex flex-col gap-4">
                <div className="pb-5.5">
                  <p className="bg-black text-white max-w-17 text-center rounded-full text-xs py-1.5">
                    Movie
                  </p>
                </div>
                <h1 className="text-5xl text-white font-bold max-md:text-2xl">
                  {movie.title}
                </h1>
                <p className="text-gray-400 text-xs">
                  {`${movie.release_date?.slice(0, 4)} `}

                  {movie.genres && movie.genres.length > 0 && (
                    <span>
                      {" | "}
                      {movie.genres.map((g) => g.name).join(", ")}
                    </span>
                  )}
                </p>
                <div className="sm:flex items-center gap-6.5 mt-6 hidden">
                  <CustomButton
                    icon={<FaCirclePlay size={20} />}
                    title="Watch Trailer"
                    className="bg-emerald-600 k:border-emerald-500 text-white w-40 h-12"
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
                      className="text-white w-45.5 h-12"
                      onClick={handleWatchlistClick}
                    />
                  )}
                </div>

                <div className="flex items-center gap-6.5 mt-6 sm:hidden">
                  <CustomButton
                    icon={<FaCirclePlay size={20} />}
                    title="Watch Trailer"
                    className="bg-emerald-600 k:border-emerald-500 text-white w-42 h-10"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="sm:flex items-center gap-5 hidden">
            <CustomButton
              title={"Download"}
              className="dark:bg-transparent bg-black w-40 h-12"
              icon={<HiOutlineDownload className="text-white" size={22} />}
            />
            <CustomButton
              title={"Share"}
              className="dark:bg-transparent bg-black w-40 h-12"
              icon={<IoShareSocialOutline className="text-white" size={22} />}
            />
            <CustomButton
              title={"Like"}
              className="dark:bg-transparent bg-black w-40 h-12"
              icon={<AiOutlineLike className="text-white" size={22} />}
            />
          </div>

          <div className="flex items-center gap-5 sm:hidden">
            <CustomButton
              className="dark:bg-transparent bg-black w-12 h-10"
              icon={<HiOutlineDownload className="text-white" size={22} />}
            />
            {sessionId ? (
              <CustomButton
                icon={<BsBookmarkPlus size={20} />}
                activeIcon={<FaBookmark size={20} color="white" />}
                isActive={isInWatchlist}
                onClick={handleWatchlistClick}
                className="w-12 h-10"
              />
            ) : (
              <CustomButton
                icon={<BsBookmarkPlus size={20} />}
                className="text-white w-12 h-10"
                onClick={handleWatchlistClick}
              />
            )}
            <CustomButton
              className="dark:bg-transparent bg-black w-12 h-10"
              icon={<AiOutlineLike className="text-white" size={22} />}
            />
          </div>
        </div>
      </div>
      <div className="px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">
        <h1 className="dark:text-white text-black my-2 font-medium text-lg sm:my-5 sm:font-semibold sm:text-xl">
          Story Line
        </h1>
        <p className="dark:text-white text-black mb-7.5 sm:mb-10 text-sm">
          {movie.overview}
        </p>

        <div className="mb-10 relative">
          <h1 className="dark:text-white text-black sm:my-5 sm:font-semibold sm:text-xl max-sm:mb-5">
            Top Cast
          </h1>
          <div
            className="flex items-center gap-1 snap-x space-x-4 overflow-x-hidden no-scrollbar z-10"
            ref={ref}
          >
            <SliderBtn
              children={<FaChevronRight color="white" />}
              onClick={() => scroll("right")}
              className="absolute right-5 sm:top-16 sm:-right-8"
            />

            <SliderBtn
              children={<FaChevronLeft color="white" />}
              onClick={() => scroll("left")}
              className="absolute left-11.5 sm:top-16 sm:-left-8"
            />

            {movieCredits.cast.map((item, index) => (
              <div
                key={index}
                className="flex items-center text-center min-w-[200px]"
              >
                <div className="w-15 h-15 cursor-pointer">
                  <img
                    src={getImageUrl(item.profile_path)}
                    alt="cast"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-1 ml-2 items-start">
                  <p className="dark:text-white text-black truncate overflow-hidden w-30 text-left">
                    {item.name}
                  </p>
                  <small className="dark:text-gray-400 text-black text-xs italic">
                    {item.character}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800">
          <MoviesList
            upcoming={similarMovies}
            genreMap={genreMap}
            titleHead="Similar Movies For You"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
