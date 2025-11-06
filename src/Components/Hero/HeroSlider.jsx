import { FaCirclePlay, FaRegBookmark } from "react-icons/fa6";
import CustomButton from "../Shared/CustomButton";
import { useEffect, useState } from "react";
import { heroMock } from "../../constants/data";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const mockMovie = heroMock.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % mockMovie.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [mockMovie.length]);

  const currentMockMovie = mockMovie[currentSlide];

  return (
    <div className="h-screen relative w-full overflow-hidden">
      <div
        className={`text-white bg-cover bg-center flex items-center justify-center absolute inset-0 transition-all duration-1200 ease-in-out transform ${
          isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
        style={{ backgroundImage: `url(${currentMockMovie.bg})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b dark:from-black/25 via-transparent to-transparent z-0 from-[#e8e6e3]/20" />

        <div className="absolute inset-0 bg-linear-to-t dark:from-[#0b0b0b] via-[#0b0b0b]/70 to-transparent z-0 from-[#e8e6e3]/25" />

        <div className="absolute inset-0 dark:bg-black/20 backdrop-brightness-90 mask-[radial-gradient(circle,white_60%,transparent_100%)] z-0 bg-[#f5f5f5]/10" />
      </div>

      <div className="absolute inset-0 flex items-center px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col justify-between w-full md:flex-row md:items-end max-md:gap-25">
          <div className="flex flex-col gap-4">
            <div className="pb-5.5">
              <p className="bg-black text-white max-w-17 text-center rounded-full text-xs py-1.5">
                Movie
              </p>
            </div>
            <h1 className="text-5xl text-white font-bold max-md:text-2xl">
              Star Wars: The force Awaken
            </h1>
            <p className="text-gray-400 text-xs">
              2h40m . 2022 . Fantasy . Actions
            </p>
            <p className="text-white text-sm max-w-170 max-md:text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              possimus impedit magni aperiam placeat ducimus ipsam consequuntur.
              Accusamus tempore quis quas, voluptatem qui officiis nobis nisi
              reprehenderit minus, nihil aspernatur! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eum quis, optio eius ab quaerat
              placeat exercitationem voluptas. Dolores, deserunt deleniti,
              nostrum aut adipisci accusantium molestiae facilis, ad nam error
              maxime.
            </p>
            <div className="flex items-center gap-6.5 mt-6">
              <CustomButton
                icon={<FaCirclePlay size={20} />}
                title="Watch Trailer"
                className="bg-emerald-600 k:border-emerald-500"
              />
              <CustomButton
                icon={<FaRegBookmark size={20} />}
                title="Add Watchlist"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {mockMovie.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index
                    ? "bg-white scale-125"
                    : "bg-gray-600 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-52 
  bg-linear-to-t 
  from-[#e8e6e3] via-[#e8e6e3]/70 to-transparent 
  dark:from-[#0b0b0b] dark:via-[#0b0b0b]/80 dark:to-transparent
  z-10"
      />
    </div>
  );
};

export default HeroSlider;
