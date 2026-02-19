import Link from "next/link";

export default function HeroBanner({ movie }) {
  if (!movie) return null;

  return (
    <section className="relative mb-10">
      <div className="relative overflow-hidden rounded-[2rem] glass-panel card-hover">
        <div className="absolute inset-0">
          <img
            src={movie.banner}
            alt={movie.title}
            className="h-full w-full object-cover opacity-60"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 px-8 md:px-12 py-10 md:py-16">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {movie.title}
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-200/90 max-w-lg line-clamp-3">
              {movie.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
                {movie.genre}
              </span>
              {movie.year && (
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
                  {movie.year}
                </span>
              )}
              {movie.duration && (
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
                  {movie.duration} min
                </span>
              )}
              <span className="rounded-full border border-primary-soft/60 bg-primary-soft/20 px-3 py-1">
                ★ {movie.rating?.toFixed?.(1) || "N/A"}
              </span>
            </div>
            <div className="mt-6 flex gap-3">
              <Link href={`/movie/${movie._id}`} className="btn-primary">
                Play now
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-black/60 px-5 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-900"
              >
                More info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

