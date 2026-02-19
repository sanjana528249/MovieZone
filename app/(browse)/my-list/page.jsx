import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { getCurrentUser } from "@/lib/auth";
import MovieCard from "@/components/ui/MovieCard";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default async function MyListPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-10">
        <p className="text-sm text-slate-300">Please log in to view your list.</p>
      </div>
    );
  }

  await connectDB();
  const populated = await User.findById(user._id).populate(
    "favorites",
    "title thumbnail genre rating year duration"
  );

  const favorites = populated.favorites || [];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">My List</h1>
        {!favorites ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : favorites.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-300">You haven&apos;t added any movies yet.</p>
        )}
      </section>
    </div>
  );
}

