import { FaStar } from "react-icons/fa6";
import { getImageUrl } from "../../Services/api";
import { useMovie } from "../../Context/MoviesContext";

const SelectMovie = ({ movie, changeMovieIMG, selectImage }) => {
  const smallImg = getImageUrl(movie.poster_path, "w300");
  const bigImg = getImageUrl(movie.backdrop_path, "original");
  const { genreMap } = useMovie();

  const handleChange = () => {
    if (selectImage !== bigImg) {
      changeMovieIMG(bigImg);
    }
  };

  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${
        selectImage === bigImg
          ? "border-2 border-emerald-500"
          : "border-transparent"
      }`}
      onClick={handleChange}
    >
      <img className="w-full h-full rounded-2xl" src={smallImg} alt="" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-1 sm:bottom-10 sm:left-5 z-10">
        <p className="dark:text-white text-gray-300 font-medium text-xs sm:text-lg sm:font-semibold">
          {movie.title}
        </p>
        <div className="flex items-center">
          <FaStar size={17} color="yellow" />
          <p>
            <span className="dark:text-white text-gray-300 ml-1 text-xs sm:text-sm">
              {formatRating(movie.vote_average)}{" "}
            </span>
            {movie.genre_ids && movie.genre_ids.length > 0 && (
              <span className="dark:text-gray-500 text-gray-300 text-xs sm:text-sm">
                {" | "}
                {movie.genre_ids
                  .slice(0, 2)
                  .map((id) => genreMap[id])
                  .filter(Boolean)
                  .join(", ")}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectMovie;
