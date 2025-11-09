import { mockMovieImage } from "../../constants/data";
import { useHorizontalScroll } from "../../Hook/useHorizontalScroll";
import CustomButton from "../Shared/CustomButton";
import SliderBtn from "../Shared/SliderBtn";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaCirclePlay, FaRegBookmark } from "react-icons/fa6";

const Award = () => {
    const { ref, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll();
  return (
    <div className="relative overflow-hidden w-full sm:flex-11">

        <div className="flex items-center justify-between w-full mb-5">
        <h1 className="dark:text-white text-black text-3xl">
        Movies On Awards
      </h1>

      <div className="flex items-center gap-3.5">
            <SliderBtn children={ <FaChevronLeft color="white" />} onClick={() => scroll("left")}/>
            <SliderBtn children={ <FaChevronRight color="white" />} onClick={() => scroll("right")}/>

      </div>
        </div>

        <div ref={ref} className="flex items-center snap-x overflow-x-hidden no-scrollbar z-10 scroll-smooth snap-mandatory">
            {
                mockMovieImage.map((item,index) => (
                    <div key={index} className="shrink-0 snap-center sm:snap-start w-full sm:w-full cursor-pointer overflow-hidden">
                        <div className="h-120 sm:h-80">
                        <img src={item.mockImg} alt="mockimg" className="w-full h-full object-cover rounded"/>
                        </div>
                        <div className="flex items-start justify-center flex-col gap-5">
                            <p className="bg-transparent dark:text-gray-300 dark:border dark:border-gray-400 text-gray-800 border-gray-800 text-xs text-center mb-1.5 mt-6 p-1.5 rounded-full uppercase">Best Pictures</p>
                            <h1 className="dark:text-white text-black text-2xl sm:text-5xl font-semibold">Gundala</h1>
                            <div className="flex items-center gap-2.5">
                                <FaStar size={17} color="yellow"/>
                                <p><span className="dark:text-white text-black text-xs sm:text-sm">4.6</span><span className="dark:text-gray-500 text-black text-xs sm:text-sm"> | Action . Movie</span></p>
                            </div>
                            <p className="dark:text-white text-black leading-5 text-xs sm:text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ea ipsum officia fugiat repellat voluptatibus, doloribus adipisci ut temporibus perspiciatis veritatis! Neque, distinctio. Doloribus, ea doloremque accusamus eveniet rerum labore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo modi suscipit consectetur corrupti accusamus dolorem quam, quae repellendus labore, minus laudantium eos voluptatibus dolores enim, dignissimos nemo incidunt error velit!</p>
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

                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default Award