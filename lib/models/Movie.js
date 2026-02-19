import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    genre: { type: String, required: true, index: true },
    rating: { type: Number, default: 0, min: 0, max: 10 },
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
    videoUrl: { type: String, required: true },
    year: { type: Number },
    duration: { type: Number },
    isTrending: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

movieSchema.index({ title: "text", description: "text" });

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);

