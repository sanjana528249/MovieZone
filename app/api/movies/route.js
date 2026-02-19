import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Movie from "@/lib/models/Movie";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const movies = await Movie.find({}).sort({ createdAt: -1 });
  return NextResponse.json(movies);
}

// Admin create movie
export async function POST(req) {
  try {
    await requireAdmin();
    await connectDB();
    const body = await req.json();
    const movie = await Movie.create(body);
    return NextResponse.json(movie, { status: 201 });
  } catch (err) {
    const status =
      err.message === "Forbidden" ? 403 :
      err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

