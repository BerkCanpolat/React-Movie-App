import BrandStrip from '../Components/Sections/BrandStrip';
import HeroSlider from '../Components/Hero/HeroSlider';
import JustRelease from '../Components/Sections/JustRelease';
import PopularOfWeek from '../Components/Sections/PopularOfWeek';
import Featured from '../Components/Sections/Featured';
import MoviesList from '../Components/Sections/MoviesList';
import SeriesList from '../Components/Sections/SeriesList';
import KoreanSeriesList from '../Components/Sections/KoreanSeriesList';
import Award from '../Components/Sections/Award';
import Fast from '../Components/Sections/Fast';
import Live from '../Components/Sections/Live';

const Home = () => {

  return (
    <>
    <HeroSlider/>
    <BrandStrip/>
    <JustRelease/>
    <PopularOfWeek/>
    <Featured/>
    <MoviesList/>
    <SeriesList/>
    <KoreanSeriesList/>
    <div className='flex items-start justify-between flex-col gap-15 sm:flex-row pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 pr-2 sm:pr-4 md:pr-8 lg:pr-12 xl:pr-16 mt-28 border-b border-gray-800'>
      <Award/>
      <Fast/>
      <Live/>
    </div>
    </>
  )
}

export default Home