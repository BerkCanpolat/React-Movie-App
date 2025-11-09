import SliderBtn from "../Shared/SliderBtn"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaCirclePlay, FaRegBookmark } from "react-icons/fa6";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import { mockMovieImage } from "../../constants/data";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";


const Fast = () => {

    const { ref, scroll } = useHorizontalScroll();

  const visibleCount = 4;
  const [startIndex, setStartIndex] = useState(0);

  const movieBlocks = [];
  for (let i = 0; i < mockMovieImage.length; i += visibleCount) {
    movieBlocks.push(mockMovieImage.slice(i, i + visibleCount));
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


  return (
    <div className="w-full text-white sm:flex-1/6">
        <div className="flex items-center justify-between w-full mb-5">
        <h1 className="dark:text-white text-black text-3xl">
        Fast
      </h1>

      <div className="flex items-center gap-3.5">
            <SliderBtn children={ <FaChevronLeft color="white" />} onClick={() => handleScroll("left")}/>
            <SliderBtn children={ <FaChevronRight color="white" />} onClick={() => handleScroll("right")}/>

      </div>
        </div>

        <div
        ref={ref} className="flex flex-col gap-6 snap-x overflow-x-hidden no-scrollbar z-10 scroll-smooth snap-mandatory" >
            {visibleMovies.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 cursor-pointer bg-transparent w-[255px] sm:w-full"
          >
            <div className="h-full sm:h-40">
              <img
                src={item.mockImg}
                alt="mock"
                className="w-full h-full rounded-2xl"
              />
            </div>

            <div className="flex flex-col items-start gap-3 w-[500px] sm:gap-4 sm:w-[150px] h-full">
              <p className="bg-transparent dark:text-gray-300 dark:border dark:border-gray-400 text-gray-800 border-gray-800 text-xs text-center mb-2.5 p-1 sm:p-1.5 rounded uppercase">
                pg-13
              </p>
              <h4 className="dark:text-white text-black text-xs sm:text-sm mb-1.5 sm:mb-1">
                The Last Of Us"
              </h4>
              <p className="dark:text-gray-600 text-black text-xs sm:text-sm">
                Horror . Thriller
              </p>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                <FaStar size={17} color="yellow" />
                <p>
                  <span className="dark:text-white text-black font-medium">
                    4.3
                  </span>
                  <span className="dark:text-gray-600 text-black">| Movie</span>
                </p>
              </div>
            </div>
          </div>
        ))}

        </div>


    </div>
  )
}

export default Fast