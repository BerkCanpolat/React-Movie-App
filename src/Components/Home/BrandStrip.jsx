import { useEffect, useRef, useState } from "react";
import { logoImage } from "../../constants/data";
import { FaChevronRight,FaChevronLeft } from 'react-icons/fa6';


const BrandStrip = () => {

  const sliderRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrolledLeft, setIsScrolledLeft] = useState(false);
  const [isScrolledRight, setIsScrolledRight] = useState(true);

  const scroll = (direction) => {
    if (isScrolling) return;
    setIsScrolling(true);
    const { current } = sliderRef;
    const scrollAmount =
      direction === "left"
        ? -current.clientWidth * 0.75
        : current.clientWidth * 0.75;

    current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  useEffect(() => {
    const { current } = sliderRef;

    const handleScroll = () => {
      const maxScroll = current.scrollWidth - current.clientWidth;
      const left = current.scrollLeft;

      setIsScrolledLeft(left > 10);
      setIsScrolledRight(left < maxScroll - 10); 
    };

    current.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => current.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative py-10 w-full overflow-hidden px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">

      {isScrolledLeft && (
        <div className="absolute left-0 top-0 h-full w-40 bg-linear-to-r from-black/95 via-black/80 to-transparent pointer-events-none z-10 transition-opacity duration-500" />
      )}


      {isScrolledRight && (
        <div className="absolute right-0 top-0 h-full w-40 bg-linear-to-l from-black/95 via-black/80 to-transparent pointer-events-none z-10 transition-opacity duration-500" />
      )}

      
      <div className="flex items-center gap-10 snap-x space-x-4 overflow-x-hidden no-scrollbar scroll-smooth" ref={sliderRef}>


        {isScrolledLeft && (
          <button
            className="dark:bg-gray-700 md:absolute md:left-5 md:top-13 rounded-full p-1.5 cursor-pointer z-20 transition-opacity duration-500"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft color="white" />
          </button>
        )}

        {isScrolledRight && (
          <button
            className="dark:bg-gray-700 md:absolute md:right-5 md:top-13 rounded-full p-1.5 cursor-pointer z-20 transition-opacity duration-500"
            onClick={() => scroll("right")}
          >
            <FaChevronRight color="white" />
          </button>
        )}

      {
        logoImage.map((item,index) => (
          <div key={index} className="min-w-[200px] shrink-0 w-36 h-12 flex items-center justify-center snap-start">
            <img src={item.logo} alt="aaa" className="w-full h-full object-contain opacity-90 hover:opacity-100 transition"/>

          </div>
        ))
      }
      </div>
    </div>

  )
}

export default BrandStrip