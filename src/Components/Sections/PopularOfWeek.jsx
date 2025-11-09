import { mockMovieImage } from "../../constants/data";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import SliderBtn from "../Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

const PopularOfWeek = () => {

    const { ref, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll();

  return (
    <div className="relative overflow-hidden pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 sm:pr-2.5 mb-15">
      <h1 className="dark:text-white text-black text-3xl mb-9">Popular of the week</h1>

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

        <div ref={ref} className="flex items-center snap-x gap-6 overflow-x-hidden no-scrollbar z-10">
            {canScrollRight && (
            <SliderBtn children={ <FaChevronRight color="white" />} onClick={() => scroll("right")} className="absolute right-5 top-1/2 -translate-y-1/2 sm:right-5"/>
          )}

          {canScrollLeft && (
            <SliderBtn children={ <FaChevronLeft color="white" />} onClick={() => scroll("left")} className="absolute left-11.5 top-1/2 -translate-y-1/2 sm:left-20 max-sm:left-5"/>
          )}

          {
            mockMovieImage.map((item, index) => (
                <div key={index} className="flex items-center gap-5 max-sm:min-w-[255px] sm:min-w-[325px] snap-center sm:snap-start cursor-pointer bg-transparent">
                    <div>
                        <h1 className="dark:text-white text-black font-semibold sm:text-4xl max-sm:text-2xl">{index + 1}</h1>
                    </div>
                    <div className="rounded-2xl">
                    <img src={item.mockImg} alt="mockimage" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                    <div className="max-sm:min-w-[120px] max-sm:min-h-[100px] sm:min-w-[155px] sm:min-h-[155px] flex flex-col items-start justify-between max-sm:gap-0.5">
                        <p className="bg-transparent dark:text-gray-300 dark:border dark:border-gray-400 text-gray-800 border-gray-800 text-xs text-center mb-5 max-sm:p-0.5 sm:p-1.5 rounded uppercase">pg-13</p>
                        <h4 className="dark:text-white text-black max-sm:text-sm">The Last Of Us</h4>
                        <p className="dark:text-gray-600 text-black">Horror . Thriller</p>
                        <div className="flex items-center gap-2.5 max-sm:text-sm">
                            <FaStar size={17} color="yellow"/>
                            <p><span className="dark:text-white text-black font-medium">4.3</span> <span className="dark:text-gray-600 text-black">| Movie</span></p>
                        </div>
                    </div>
                </div>
            ))
          }


        </div>

      </div>
    </div>
  );
};

export default PopularOfWeek;
