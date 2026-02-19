import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <div className="relative group card-hover rounded-[1.4rem] overflow-hidden bg-slate-950/70 border border-slate-800/70 min-w-[150px] max-w-[180px]">
      <Link href={`/movie/${movie._id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover rounded-[1.4rem] transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-semibold line-clamp-1">{movie.title}</h3>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{movie.year}</span>
          <span>{movie.duration} min</span>
          <span className="text-primary-soft font-semibold">
            ★ {movie.rating?.toFixed?.(1) || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

