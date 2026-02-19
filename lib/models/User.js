import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    progress: { type: Number, default: 0 },
    lastWatchedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    watchHistory: [watchHistorySchema]
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

