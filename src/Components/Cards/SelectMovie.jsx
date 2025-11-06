

const SelectMovie = ({ movieIMG, changeMovieIMG, selectImage}) => {

    const handleChange = () => {
        if(selectImage !== movieIMG.bigBG) {
            changeMovieIMG(movieIMG.bigBG);
        }
    }

  return (
    <div className={`${selectImage === movieIMG.bigBG ? "border border-green-600" : "border-transparent"}`} onClick={handleChange}>
        <img className="w-full h-full" src={movieIMG.bg} alt="" />
    </div>
  )
}

export default SelectMovie