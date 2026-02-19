import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Movie from "@/lib/models/Movie";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const user = await requireUser();
  await connectDB();
  const populated = await User.findById(user._id).populate(
    "favorites",
    "title thumbnail genre rating year duration"
  );
  return NextResponse.json(populated.favorites || []);
}

// toggle favorite
export async function POST(req) {
  try {
    const user = await requireUser();
    await connectDB();
    const { movieId } = await req.json();

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    const dbUser = await User.findById(user._id);
    const idx = dbUser.favorites.findIndex((id) => id.toString() === movieId);

    if (idx === -1) dbUser.favorites.push(movieId);
    else dbUser.favorites.splice(idx, 1);

    await dbUser.save();
    const populated = await dbUser.populate(
      "favorites",
      "title thumbnail genre rating year duration"
    );

    return NextResponse.json({
      favorites: populated.favorites,
      isFavorite: idx === -1
    });
  } catch (err) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

