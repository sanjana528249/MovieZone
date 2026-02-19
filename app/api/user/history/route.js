import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const user = await requireUser();
  await connectDB();
  const populated = await User.findById(user._id).populate(
    "watchHistory.movie",
    "title thumbnail duration"
  );
  return NextResponse.json(populated.watchHistory || []);
}

export async function POST(req) {
  try {
    const user = await requireUser();
    await connectDB();
    const { movieId, progress } = await req.json();

    const dbUser = await User.findById(user._id);
    const idx = dbUser.watchHistory.findIndex(
      (e) => e.movie.toString() === movieId
    );

    if (idx === -1) {
      dbUser.watchHistory.push({ movie: movieId, progress: progress || 0 });
    } else {
      dbUser.watchHistory[idx].progress = progress || dbUser.watchHistory[idx].progress;
      dbUser.watchHistory[idx].lastWatchedAt = new Date();
    }

    await dbUser.save();
    const populated = await dbUser.populate(
      "watchHistory.movie",
      "title thumbnail duration"
    );
    return NextResponse.json(populated.watchHistory);
  } catch (err) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

