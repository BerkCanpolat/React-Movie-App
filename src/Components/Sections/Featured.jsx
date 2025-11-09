import { useState } from "react";
import { selectedIMG } from "../../constants/data";
import { bg1, bg2, bg3, bg4, bg5, m1 } from "../../assets/image";
import SelectMovie from "../Cards/SelectMovie";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import { FaStar } from "react-icons/fa6";
import CustomButton from "../Shared/CustomButton";
import { FaCirclePlay, FaRegBookmark } from "react-icons/fa6";
import SliderBtn from "../Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Featured = () => {

    const [selectImage, setSelectImage] = useState(bg2)
    const { ref, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll();

      const currentIndex = selectedIMG.findIndex((item) => item.bigBG === selectImage);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % selectedIMG.length;
    setSelectImage(selectedIMG[nextIndex].bigBG);

    if (ref.current) {
      const scrollAmount = ref.current.clientWidth / 3;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + selectedIMG.length) % selectedIMG.length;
    setSelectImage(selectedIMG[prevIndex].bigBG);

    if (ref.current) {
      const scrollAmount = ref.current.clientWidth / 3;
      ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };


    

  return (
    <div className="relative sm:w-full sm:min-h-[750px] bg-cover bg-center bg-no-repeat flex flex-col sm:items-center sm:justify-center sm:flex-row min-h-[750px] gap-10 mb-15" style={{ backgroundImage: ` url(${selectImage})`}}>


      <div className="absolute top-0 left-0 w-full h-[35%] bg-linear-to-b from-black/90 via-black/60 to-transparent pointer-events-none z-1" />

      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-linear-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-1" />

      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-1" />

            <div className="flex flex-col items-start w-full sm:w-2/4 pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 z-5">
                <h2 className="dark:text-white text-black font-semibold text-2xl mb-2.5 sm:text-3xl sm:mb-5">Featured in SaintStream</h2>
                <h4 className="dark:text-gray-300 mb-8 text-sm sm:text-[16px] sm:leading-0 sm:mb-12">Best featured for you today</h4>

                <div className="dark:bg-black bg-white pt-1.5 pb-1.5 pl-3.5 pr-3.5 rounded-2xl mb-4 sm:mb-5">
                    <p className="dark:text-white text-black text-xs sm:text-sm">#1 in Australia</p>
                </div>

                <h1 className="dark:text-white text-black font-semibold text-3xl mb-2 sm:text-5xl sm:mb-3 w-full">Air;Courting A Legend</h1>
                
                <div className="flex items-center gap-2 mb-2 sm:gap-2.5 sm:mb-3">
                    <FaStar size={17} color="yellow"/>
                    <p><span className="dark:text-white text-black text-sm sm:text-md">4.6</span> <span className="dark:text-gray-300 text-sm sm:text-md">| 2h40m . 2022 . Superhero . Actions</span></p>
                </div>
                    <p className="dark:text-white text-black leading-4.5 text-xs mb-5 sm:text-sm sm:max-w-5xl sm:mb-6.5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ducimus at culpa, aperiam laboriosam, sed nisi similique molestiae vel alias amet. Quod ducimus vero pariatur quae ex maiores animi molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum minima dignissimos laborum quam exercitationem! Praesentium numquam blanditiis eos voluptatem deleniti nesciunt sed aliquid, ducimus dicta modi obcaecati placeat sunt at?</p>

                    <div className="flex items-center gap-5">
                    <CustomButton
                icon={<FaCirclePlay size={20} />}
                title="Play Now"
                className="bg-emerald-600 k:border-emerald-500"
              />

              <CustomButton
                icon={<FaRegBookmark size={20} />}
                title="Add Watchlist"
              />
                    </div>

            </div>


        <div ref={ref} className="flex items-center justify-center w-full sm:w- snap-x gap-6 overflow-x-hidden no-scrollbar z-10">

            {currentIndex < selectedIMG.length - 1 && (
            <SliderBtn children={ <FaChevronRight color="white" />} onClick={handleNext} className=" absolute right-5 top-142 sm:top-1/2 -translate-y-1/2 sm:right-5"/>
          )}

          {currentIndex > 0 && (
            <SliderBtn children={ <FaChevronLeft color="white" />} onClick={handlePrev} className=" absolute left-11.5 top-142 sm:top-1/2 -translate-y-1/2 sm:left-150 max-sm:left-5"/>
          )}


        {
            selectedIMG.map((item,index) => (
                <div key={index} className={`min-w-[150px] min-h-[250] sm:min-w-[300px] sm:min-h-[400px] snap-center sm:snap-start cursor-pointer bg-transparent ${
        index === 0 ? "ml-118 sm:ml-140" : ""
      }`}>
                    <SelectMovie movieIMG={item} changeMovieIMG={setSelectImage} selectImage={selectImage} title="The Last Of Us" rating="4.6" info=" | Mystery . Movie"/>
                </div>
            ))
        }
        </div>

    </div>
  )
};

export default Featured;
