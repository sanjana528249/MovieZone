import { connectDB } from "@/lib/db";
import Movie from "@/lib/models/Movie";
import HeroBanner from "@/components/layout/HeroBanner";
import MovieRow from "@/components/ui/MovieRow";

export const dynamic = "force-dynamic";

export default async function BrowsePage() {
  await connectDB();
  const movies = await Movie.find({}).lean();

  const trending = movies.filter((m) => m.isTrending);
  const popular = movies.filter((m) => m.isPopular);
  const topRated = movies.filter((m) => (m.rating || 0) >= 8);
  const featured = trending[0] || popular[0] || movies[0];

  const loading = false;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 space-y-8">
      <HeroBanner movie={featured} />
      <section id="trending">
        <MovieRow title="Trending now" movies={trending} loading={loading} />
      </section>
      <MovieRow title="Popular on MovieZone" movies={popular} loading={loading} />
      <section id="top-rated">
        <MovieRow title="Top rated" movies={topRated} loading={loading} />
      </section>
    </div>
  );
}

