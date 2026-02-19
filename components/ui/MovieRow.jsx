import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

export default function MovieRow({ title, movies, loading }) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : movies?.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
      </div>
    </section>
  );
}

