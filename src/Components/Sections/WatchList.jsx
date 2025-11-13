import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import { getImageUrl } from "../../Services/api";
import SliderBtn from "../Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { CiBookmarkMinus } from "react-icons/ci";
import { Link } from "react-router-dom";

const WatchList = ({ watchlist, genreMap, removeFromWatchlist }) => {
  const { ref, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll();
  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };
  return (
    <div className="relative overflow-hidden pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 sm:pr-2.5 mb-15">
      <h1 className="dark:text-white text-black text-3xl mb-9">
        Your Watchlist
      </h1>

      <div className="relative">
        {canScrollLeft && (
          <div
            className="absolute left-0 top-0 h-full 
    w-24 sm:w-32 md:w-36 lg:w-40 
    bg-linear-to-r 
    dark:from-[#0b0b0b] dark:via-[#0b0b0b]/80 to-transparent 
    pointer-events-none z-10 transition-opacity duration-500
    from-[#e8e6e3]/80 via-[#e8e6e3]/60
    max-sm:via-[#e8e6e3]/40 max-sm:dark:via-[#0b0b0b]/40"
          />
        )}

        {canScrollRight && (
          <div
            className="absolute right-0 top-0 h-full 
    w-24 sm:w-32 md:w-36 lg:w-40 
    bg-linear-to-l 
    dark:from-[#0b0b0b] dark:via-[#0b0b0b]/80 to-transparent 
    pointer-events-none z-10 transition-opacity duration-500 
    from-[#e8e6e3]/80 via-[#e8e6e3]/60
    max-sm:via-[#e8e6e3]/40 max-sm:dark:via-[#0b0b0b]/40"
          />
        )}

        <div
          ref={ref}
          className="flex items-center snap-x gap-6 overflow-x-hidden no-scrollbar z-10"
        >
          {canScrollRight && (
            <SliderBtn
              children={<FaChevronRight color="white" />}
              onClick={() => scroll("right")}
              className="absolute right-5 top-22.5 sm:right-5"
            />
          )}

          {canScrollLeft && (
            <SliderBtn
              children={<FaChevronLeft color="white" />}
              onClick={() => scroll("left")}
              className="absolute left-11.5 top-22.5 sm:left-20 max-sm:left-5"
            />
          )}

          {watchlist && watchlist.length > 0 ? (
            watchlist.map((item, index) => (
              <Link
                to={`/movie/${item.id}`}
                key={index}
                className="shrink-0 group snap-center sm:snap-start w-[230px] sm:w-[350px] cursor-pointer overflow-hidden"
              >
                <div className="w-full h-[200px] relative">
                  <img
                    src={getImageUrl(item.poster_path)}
                    alt="mockimg"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute top-3 right-3 bg-red-600/70 rounded-full p-1.5 hover:scale-110 transition-transform cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      removeFromWatchlist(item.id);
                    }}
                  >
                    <CiBookmarkMinus size={30} color="white" />
                  </div>
                </div>
                <h1 className="dark:text-white text-black mt-3 mb-2 truncate">
                  {item.title || "BOŞ"}
                </h1>
                <div className="flex items-center gap-2.5">
                  <FaStar size={17} color="yellow" />
                  <p>
                    <span className="dark:text-white text-black">
                      {formatRating(item.vote_average)}
                    </span>
                    {item.genre_ids && item.genre_ids.length > 0 && (
                      <span className="dark:text-gray-500 text-black truncate">
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
              </Link>
            ))
          ) : (
            <p className="text-white">Henüz bir film eklemedin!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
