import { mockMovieImage } from "../../constants/data";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import SliderBtn from "../Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

const SeriesList = () => {
    const { ref, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll
    ();
  return (
    <div className="relative overflow-hidden pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 sm:pr-2.5 mb-15">
      <h1 className="dark:text-white text-black text-3xl mb-9">
        Series
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

        <div ref={ref} className="flex items-center snap-x gap-6 overflow-x-hidden no-scrollbar z-10">

            {canScrollRight && (
            <SliderBtn children={ <FaChevronRight color="white" />} onClick={() => scroll("right")} className="absolute right-5 top-22.5 sm:right-5"/>
          )}

          {canScrollLeft && (
            <SliderBtn children={ <FaChevronLeft color="white" />} onClick={() => scroll("left")} className="absolute left-11.5 top-22.5 sm:left-20 max-sm:left-5"/>
          )}

          {
            mockMovieImage.map((item,index) => (
                <div key={index} className="shrink-0 group snap-center sm:snap-start w-[230px] sm:w-[350px] cursor-pointer overflow-hidden">
                    <div className="w-full h-[200px]">
                    <img src={item.mockImg} alt="mockimg" className="w-full h-full object-cover rounded-2xl" />

                    </div>
                        <h1 className="dark:text-white text-black mt-3 mb-2">Air;Courting A Legend</h1>
                    <div className="flex items-center gap-2.5">
                        <FaStar size={17} color="yellow"/>
                        <p><span className="dark:text-white text-black">4.6</span><span className="dark:text-gray-500 text-black"> | Action . Movie</span></p>
                    </div>
                </div>
            ))
          }

        </div>
      </div>
    </div>
  );
};

export default SeriesList;
