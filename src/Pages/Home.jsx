import BrandStrip from '../Components/Sections/BrandStrip';
import HeroSlider from '../Components/Hero/HeroSlider';
import JustRelease from '../Components/Sections/JustRelease';
import PopularOfWeek from '../Components/Sections/PopularOfWeek';
import Featured from '../Components/Sections/Featured';

const Home = () => {

  return (
    <>
    <HeroSlider/>
    <BrandStrip/>
    <JustRelease/>
    <PopularOfWeek/>
    <Featured/>
    </>
  )
}

export default Home