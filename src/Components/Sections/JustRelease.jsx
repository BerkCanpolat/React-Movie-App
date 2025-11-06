import { mockMovieImage } from "../../constants/data";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import { FaStar } from "react-icons/fa6";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import SliderBtn from "../Shared/SliderBtn";

const JustRelease = () => {
  const { ref, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll();

  return (
    <div className="relative overflow-hidden pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 sm:pr-2.5 mb-25">
      <h1 className="dark:text-white text-black text-3xl mb-9">Just Release</h1>

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
          className="flex items-center gap-1 snap-x space-x-4 overflow-x-hidden no-scrollbar z-10"
          ref={ref}
        >
          {canScrollRight && (
            <SliderBtn children={ <FaChevronRight color="white" />} onClick={() => scroll("right")} className="right-5 top-1/2 -translate-y-1/2 sm:right-5"/>
          )}

          {canScrollLeft && (
            <SliderBtn children={ <FaChevronLeft color="white" />} onClick={() => scroll("left")} className="left-11.5 top-1/2 -translate-y-1/2 sm:left-5"/>
          )}

          {mockMovieImage.map((item, index) => (
            <div
              key={index}
              className="relative shrink-0 group snap-center sm:snap-start max-w-[200px] sm:min-w-[310px] cursor-pointer overflow-hidden"
            >
              <img
                src={item.mockImg}
                alt="mockImg"
                className="w-full h-full object-cover"
              />

              {/* Hoverlay */}
              <div className="absolute inset-0 bg-linear-to-t dark:from-neutral-900/90 dark:via-neutral-900/40 from-[#f5f5f5]/90 via-[#f5f5f5]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end pl-2.5">
                <div className="transform translate-y-4 group-hover:-translate-y-5 transition-transform duration-300">
                  <div className="dark:text-white font-medium text-black mb-2.5">
                    <h1>Enola Holmes 2</h1>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaStar color="yellow" size={15} />
                    <p className="dark:text-white text-black text-sm">
                      4.8{" "}
                      <span className="dark:text-gray-500">
                        | Action . Movie
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JustRelease;
