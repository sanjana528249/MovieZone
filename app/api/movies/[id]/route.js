import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Movie from "@/lib/models/Movie";
import { requireAdmin } from "@/lib/auth";

export async function GET(_req, { params }) {
  await connectDB();
  const movie = await Movie.findById(params.id);
  if (!movie) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(movie);
}

export async function PATCH(req, { params }) {
  try {
    await requireAdmin();
    await connectDB();
    const update = await req.json();
    const movie = await Movie.findByIdAndUpdate(params.id, update, { new: true });
    if (!movie) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (err) {
    const status =
      err.message === "Forbidden" ? 403 :
      err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

export async function DELETE(_req, { params }) {
  try {
    await requireAdmin();
    await connectDB();
    const movie = await Movie.findByIdAndDelete(params.id);
    if (!movie) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    const status =
      err.message === "Forbidden" ? 403 :
      err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

