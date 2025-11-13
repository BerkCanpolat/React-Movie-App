import { Link } from "react-router-dom";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import { getImageUrl } from "../../Services/api";
import CustomButton from "../Shared/CustomButton";
import SliderBtn from "../Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaCirclePlay, FaRegBookmark } from "react-icons/fa6";

const Award = ({ topRated, genreMap }) => {
  const { ref, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll();
  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };
  return (
    <div className="relative overflow-hidden w-full sm:flex-11">
      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="dark:text-white text-black text-3xl">
          Movies On Awards
        </h1>

        <div className="flex items-center gap-3.5">
          <SliderBtn
            children={<FaChevronLeft color="white" />}
            onClick={() => scroll("left")}
          />
          <SliderBtn
            children={<FaChevronRight color="white" />}
            onClick={() => scroll("right")}
          />
        </div>
      </div>

      <div
        ref={ref}
        className="flex items-center snap-x overflow-x-hidden no-scrollbar z-10 scroll-smooth snap-mandatory"
      >
        {topRated.map((item, index) => (
          <Link
            to={`/movie/${item.id}`}
            key={index}
            className="shrink-0 snap-center sm:snap-start w-full sm:w-full cursor-pointer overflow-hidden"
          >
            <div className="h-120 sm:h-90">
              <img
                src={getImageUrl(item.backdrop_path, "original")}
                alt="mockimg"
                className="w-full h-full object-cover object-center rounded"
              />
            </div>
            <div className="flex items-start justify-center flex-col gap-5">
              <p className="bg-transparent dark:text-gray-300 border dark:border-gray-400 text-gray-800 border-gray-800 text-xs text-center mb-1.5 mt-6 p-1.5 rounded-full uppercase">
                Best Pictures
              </p>
              <h1 className="dark:text-white text-black text-2xl sm:text-5xl font-semibold">
                {item.title}
              </h1>
              <div className="flex items-center gap-2.5">
                <FaStar size={17} color="yellow" />
                <p>
                  <span className="dark:text-white text-black text-xs sm:text-sm">
                    {formatRating(item.vote_average)}
                  </span>
                  {item.genre_ids && item.genre_ids.length > 0 && (
                    <span className="dark:text-gray-500 text-black text-xs sm:text-sm truncate">
                      {" | "}
                      {item.genre_ids
                        .slice(0, 2)
                        .map((id) => genreMap[id])
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  )}
                </p>
              </div>
              <p className="dark:text-white text-black leading-5 text-xs sm:text-sm">
                {item.overview}
              </p>
              <div className="flex items-center gap-5">
                <CustomButton
                  icon={<FaCirclePlay size={20} />}
                  title="Play Now"
                  className="bg-emerald-600 k:border-emerald-500 dark:text-white text-black w-38 h-10 sm:w-40 sm:h-12"
                />

                <CustomButton
                  icon={<FaRegBookmark size={20} />}
                  title="Add Watchlist"
                  className="dark:text-white text-black w-42.5 h-10 sm:w-45.5 sm:h-12"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Award;
