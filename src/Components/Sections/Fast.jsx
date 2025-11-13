import SliderBtn from "../Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import { useState } from "react";
import { getImageUrl } from "../../Services/api";
import { Link } from "react-router-dom";

const Fast = ({ fastMovie, genreMap }) => {
  const { ref, scroll } = useHorizontalScroll();

  const visibleCount = 4;
  const [startIndex, setStartIndex] = useState(0);

  const movieBlocks = [];
  for (let i = 0; i < fastMovie.length; i += visibleCount) {
    movieBlocks.push(fastMovie.slice(i, i + visibleCount));
  }

  const handleScroll = (direction) => {
    if (direction === "left") {
      setStartIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setStartIndex((prev) => Math.min(prev + 1, movieBlocks.length - 1));
    }
    scroll(direction);
  };

  const visibleMovies = movieBlocks[startIndex] || [];

  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };

  return (
    <div className="w-full text-white sm:flex-1/6">
      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="dark:text-white text-black text-3xl">Fast</h1>

        <div className="flex items-center gap-3.5">
          <SliderBtn
            children={<FaChevronLeft color="white" />}
            onClick={() => handleScroll("left")}
          />
          <SliderBtn
            children={<FaChevronRight color="white" />}
            onClick={() => handleScroll("right")}
          />
        </div>
      </div>

      <div
        ref={ref}
        className="flex flex-col gap-6 snap-x overflow-x-hidden no-scrollbar z-10 scroll-smooth snap-mandatory"
      >
        {visibleMovies.map((item, index) => (
          <Link
            to={`/movie/${item.id}`}
            key={index}
            className="flex gap-4 cursor-pointer bg-transparent w-[310px] sm:w-full"
          >
            <div className="h-full sm:h-40">
              <img
                src={getImageUrl(item.poster_path)}
                alt="mock"
                className="w-full h-full rounded-2xl"
              />
            </div>

            <div className="flex flex-col items-start gap-3 w-[500px] sm:gap-4 sm:w-[150px] h-full">
              <p className="bg-transparent dark:text-gray-300 border dark:border-gray-400 text-gray-800 border-gray-800 text-xs text-center mb-2.5 p-1 sm:p-1.5 rounded uppercase">
                pg-13
              </p>
              <h4 className="dark:text-white text-black text-xs sm:text-sm mb-1.5 sm:mb-1 truncate overflow-hidden w-50">
                {item.title}
              </h4>
              {item.genre_ids && item.genre_ids.length > 0 && (
                <span className="dark:text-gray-600 text-black text-xs sm:text-sm truncate overflow-hidden w-50">
                  {" | "}
                  {item.genre_ids
                    .slice(0, 2)
                    .map((id) => genreMap[id])
                    .filter(Boolean)
                    .join(", ")}
                </span>
              )}
              <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                <FaStar size={17} color="yellow" />
                <p>
                  <span className="dark:text-white text-black font-medium">
                    {formatRating(item.vote_average)}
                  </span>
                  <span className="dark:text-gray-600 text-black">
                    {" "}
                    | Movie
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Fast;
