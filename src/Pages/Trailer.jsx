import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../Services/api";
import HomeSkeleton from "../Components/Shared/HomeSkeleton";

const TrailerPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);

        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (!movie) {
    return <p className="text-center mt-20 text-white">Film bulunamadı.</p>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      {trailerKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-[350px] h-[200px] sm:w-[1500px] sm:h-[750px]"
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
};

export default TrailerPage;
