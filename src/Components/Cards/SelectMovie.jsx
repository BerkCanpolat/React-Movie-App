
import { FaStar } from "react-icons/fa6";

const SelectMovie = ({ movieIMG, changeMovieIMG, selectImage, title, rating, info}) => {

    const handleChange = () => {
        if(selectImage !== movieIMG.bigBG) {
            changeMovieIMG(movieIMG.bigBG);
        }
    }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${selectImage === movieIMG.bigBG ? "border-2 border-emerald-500" : "border-transparent"}`} onClick={handleChange}>
        <img className="w-full h-full rounded-2xl" src={movieIMG.bg} alt="" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-10 left-5 z-10">
        <p className="dark:text-white text-black">{title}</p>
        <div className="flex items-center">
            <FaStar size={17} color="yellow"/>
            <p><span className="dark:text-white text-black">{rating}</span><span className="dark:text-gray-500 text-black">{info}</span></p>
        </div>
        </div>
    </div>
  )
}

export default SelectMovie