import BrandStrip from "../Components/Sections/BrandStrip";
import HeroSlider from "../Components/Hero/HeroSlider";
import JustRelease from "../Components/Sections/JustRelease";
import PopularOfWeek from "../Components/Sections/PopularOfWeek";
import Featured from "../Components/Sections/Featured";
import MoviesList from "../Components/Sections/MoviesList";
import Award from "../Components/Sections/Award";
import Fast from "../Components/Sections/Fast";
import Live from "../Components/Sections/Live";
import { useMovie } from "../Context/MoviesContext";
import GenreSection from "../Components/Sections/GenreSection";
import { useAuth } from "../Context/AuthContext";
import WatchList from "../Components/Sections/WatchList";
import HomeSkeleton from "../Components/Shared/HomeSkeleton";

const Discover = () => {
  const {
    justRelease,
    genreMap,
    trend,
    popular,
    upcoming,
    tvPopular,
    korenSeries,
    topRated,
    fastMovie,
    watchlist,
    removeFromWatchlist,
    loadingMovie,
    error
  } = useMovie();
  const { sessionId } = useAuth();

  if (loadingMovie) {
    return <HomeSkeleton />;
  }

  if (error) {
    return (
        <div className="w-full text-center text-red-500 mt-20">
            {error}
        </div>
    );
}

  return (
    <>
      <HeroSlider popular={upcoming} genreMap={genreMap} />
      <BrandStrip />


        <JustRelease
          justRelease={justRelease}
          loadingMovie={loadingMovie}
          genreMap={genreMap}
        />
        <Featured popular={popular} watchlist={watchlist} />

        <PopularOfWeek trend={topRated} genreMap={genreMap} />

      <MoviesList
        upcoming={upcoming}
        genreMap={genreMap}
        titleHead="Upcoming Movies"
        className="mb-15 pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 sm:pr-2.5"
      />
      <MoviesList
        upcoming={tvPopular}
        genreMap={genreMap}
        titleHead="Tv Series"
        className="mb-15 pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 sm:pr-2.5"
      />
      <MoviesList
        upcoming={korenSeries}
        genreMap={genreMap}
        titleHead="Korean Series"
        className="mb-15 pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 sm:pr-2.5"
      />
        <GenreSection />

        <div className="flex items-start justify-between flex-col gap-15 sm:flex-row pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 pr-2 sm:pr-4 md:pr-8 lg:pr-12 xl:pr-16 mt-28 border-b border-gray-800">
          <Award topRated={topRated} genreMap={genreMap} />
          <Fast fastMovie={fastMovie} genreMap={genreMap} />
          <Live justRelease={justRelease} genreMap={genreMap} />
        </div>
    </>
  );
};

export default Discover;
