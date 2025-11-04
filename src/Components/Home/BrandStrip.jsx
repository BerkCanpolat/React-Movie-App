import { useEffect, useRef, useState } from "react";
import { logoImage } from "../../constants/data";
import { FaChevronRight,FaChevronLeft } from 'react-icons/fa6';
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";


const BrandStrip = () => {

  const { ref, canScrollLeft, canScrollRight, scroll} = useHorizontalScroll();

  return (
    <div className="relative pt-10 pb-20 w-full overflow-hidden pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 sm:pr-2.5">

      {canScrollLeft && (
  <div className="absolute left-0 top-0 h-full w-40 bg-linear-to-r dark:from-[#0b0b0b] dark:via-[#0b0b0b]/85 to-transparent pointer-events-none z-10 transition-opacity duration-500 from-[#e8e6e3] via-[#e8e6e3]/90" />
)}

{canScrollRight && (
  <div className="absolute right-0 top-0 h-full w-40 bg-linear-to-l dark:from-[#0b0b0b] dark:via-[#0b0b0b]/85 to-transparent pointer-events-none z-10 transition-opacity duration-500  from-[#e8e6e3] via-[#e8e6e3]/90" />
)}

      
      <div className="flex items-center gap-10 snap-x space-x-4 overflow-x-hidden no-scrollbar scroll-smooth" ref={ref}>


        {canScrollLeft && (
          <button
            className="dark:bg-gray-800 bg-red-500 absolute left-5 top-18 rounded-full p-1.5 cursor-pointer z-20 transition-opacity duration-500"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft color="white" />
          </button>
        )}

        {canScrollRight && (
          <button
            className="dark:bg-gray-800 bg-red-500 absolute right-5 top-18 rounded-full p-1.5 cursor-pointer z-20 transition-opacity duration-500"
            onClick={() => scroll("right")}
          >
            <FaChevronRight color="white" />
          </button>
        )}

      {
        logoImage.map((item,index) => (
          <div key={index} className="min-w-[175px] shrink-0 w-36 h-23 flex items-center justify-center snap-start bg-black rounded-2xl cursor-pointer">
            <img src={item.logo} alt="aaa" className="max-w-[150px] max-h-[50px] object-contain"/>

          </div>
        ))
      }
      </div>
    </div>

  )
}

export default BrandStrip