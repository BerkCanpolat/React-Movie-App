import { useEffect, useRef, useState } from "react";
import SelectMovie from "../Cards/SelectMovie";
import { FaStar } from "react-icons/fa6";
import CustomButton from "../Shared/CustomButton";
import SliderBtn from "../Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { getImageUrl } from "../../Services/api";
import { useAuth } from "../../Context/AuthContext";
import { useModal } from "../../Context/ModalContext";
import { FaCirclePlay, FaBookmark } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";

const Featured = ({ popular, watchlist }) => {
  const [selectImage, setSelectImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { sessionId } = useAuth();
  const { openModal } = useModal();

  const sliderRef = useRef(null);

  useEffect(() => {
    if (popular && popular.length > 0) {
      const firstBackdrop = getImageUrl(popular[0].backdrop_path, "original");
      setSelectImage(firstBackdrop);
      setCurrentIndex(0);
    }
  }, [popular]);

  const handleNext = () => {
    if (!popular || popular.length === 0) return;
    const nextIndex = (currentIndex + 1) % popular.length;
    setCurrentIndex(nextIndex);
    setSelectImage(getImageUrl(popular[nextIndex].backdrop_path, "original"));

    if (sliderRef.current) {
      const childWidth = sliderRef.current.children[nextIndex].offsetWidth + 24;
      sliderRef.current.scrollTo({
        left: childWidth * nextIndex,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (!popular || popular.length === 0) return;
    const prevIndex = (currentIndex - 1 + popular.length) % popular.length;
    setCurrentIndex(prevIndex);
    setSelectImage(getImageUrl(popular[prevIndex].backdrop_path, "original"));

    if (sliderRef.current) {
      const childWidth = sliderRef.current.children[prevIndex].offsetWidth + 24;
      sliderRef.current.scrollTo({
        left: childWidth * prevIndex,
        behavior: "smooth",
      });
    }
  };

  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };

  const isInWatchlist = popular
    ? watchlist.some((m) => m.id === popular.id)
    : false;

  const handleWatchlistClick = () => {
    if (!sessionId) {
      openModal("login");
      return;
    }
    isInWatchlist
      ? removeFromWatchlist(popular.id)
      : addToWatchlist(popular.id);
  };

  return (
    <div
      className="relative sm:w-full sm:min-h-[750px] bg-cover bg-center bg-no-repeat flex flex-col sm:items-center sm:justify-center sm:flex-row min-h-[750px] gap-10 mb-15"
      style={{ backgroundImage: ` url(${selectImage})` }}
    >
      <div className="absolute top-0 left-0 w-full h-[35%] bg-linear-to-b dark:from-black/85 dark:via-black/50 from-white/60 via-white/5 to-transparent pointer-events-none z-1" />

      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-linear-to-t dark:from-black/90 dark:via-black/50 from-white/75 via-white/5 to-transparent pointer-events-none z-1" />

      <div className="absolute inset-0 bg-linear-to-r dark:from-black/30 dark:to-black/40 from-white/40 to-white/10 via-transparent pointer-events-none z-1" />

      <div className="flex flex-col items-start w-full h-80 sm:w-2/4 pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 z-5">
        <h2 className="dark:text-white text-gray-300 font-semibold text-2xl mb-2.5 sm:text-3xl sm:mb-5">
          Featured in SaintStream
        </h2>
        <h4 className="dark:text-gray-300 text-gray-300 mb-8 text-sm sm:text-[16px] sm:leading-0 sm:mb-12">
          Best featured for you today
        </h4>

        <div className="dark:bg-black bg-white pt-1.5 pb-1.5 pl-3.5 pr-3.5 rounded-2xl mb-4 sm:mb-5">
          <p className="dark:text-white text-black text-xs sm:text-sm">
            #1 in Australia
          </p>
        </div>

        {popular[currentIndex] && (
          <div>
            <h1 className="dark:text-white text-gray-300 font-semibold text-3xl mb-2 sm:text-5xl sm:mb-3 sm:w-full max-sm:truncate max-sm:overflow-hidden w-90">
              {popular[currentIndex].title}
            </h1>

            <div className="flex items-center gap-2 mb-2 sm:gap-2.5 sm:mb-3">
              <FaStar size={17} color="yellow" />
              <p>
                <span className="dark:text-white text-gray-300 text-sm sm:text-md">
                  {formatRating(popular[currentIndex].vote_average)}
                </span>{" "}
                <span className="dark:text-gray-300 text-gray-300 text-sm sm:text-md">
                  | {popular[currentIndex].release_date?.slice(0, 4)}
                </span>
              </p>
            </div>
            <p className="dark:text-white text-gray-300 leading-4.5 text-xs mb-5 sm:text-sm sm:max-w-5xl sm:mb-6.5 max-sm:line-clamp-3">
              {popular[currentIndex].overview}
            </p>
          </div>
        )}

        <div className="flex items-center gap-5">
          <CustomButton
            icon={<FaCirclePlay size={20} />}
            title="Play Now"
            className="bg-emerald-600 k:border-emerald-500 text-white w-38 h-10 sm:w-40 sm:h-12"
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
              className="text-white w-42.5 h-10 sm:w-45.5 sm:h-12"
              onClick={handleWatchlistClick}
            />
          )}
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex items-center justify-center w-full snap-x gap-6 overflow-x-hidden scroll-smooth no-scrollbar z-10 mt-25"
      >
        {currentIndex < popular.length - 1 && (
          <SliderBtn
            children={<FaChevronRight color="white" />}
            onClick={handleNext}
            className=" absolute right-5 top-142 sm:top-100 sm:right-5"
          />
        )}

        {currentIndex > 0 && (
          <SliderBtn
            children={<FaChevronLeft color="white" />}
            onClick={handlePrev}
            className=" absolute left-11.5 top-142 sm:top-100 sm:left-150 max-sm:left-5"
          />
        )}

        {popular.map((movie, index) => (
          <div
            key={index}
            className={`min-w-[150px] min-h-[250] sm:min-w-[300px] sm:min-h-[400px] snap-center sm:snap-start cursor-pointer bg-transparent ${
              index === 0 ? "ml-775 sm:ml-1365" : ""
            }`}
          >
            <SelectMovie
              movie={movie}
              changeMovieIMG={setSelectImage}
              selectImage={selectImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
