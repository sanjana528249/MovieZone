import { connectDB } from "@/lib/db";
import Movie from "@/lib/models/Movie";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default async function MoviePage({ params }) {
  await connectDB();
  const movie = await Movie.findById(params.id).lean();

  if (!movie) {
    return (
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-10">
        <p className="text-sm text-slate-300">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 space-y-6">
      <VideoPlayer movie={movie} />
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
          {movie.year && <span>{movie.year}</span>}
          {movie.duration && <span>• {movie.duration} min</span>}
          <span>• {movie.genre}</span>
          <span className="text-primary-soft font-semibold">
            ★ {movie.rating?.toFixed?.(1) || "N/A"}
          </span>
        </div>
        <p className="text-sm text-slate-200 max-w-2xl">{movie.description}</p>
      </div>
    </div>
  );
}

