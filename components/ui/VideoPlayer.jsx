"use client";

import { useRef, useState } from "react";

export default function VideoPlayer({ movie }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const onSeek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const val = Number(e.target.value);
    v.currentTime = (val / 100) * v.duration;
    setProgress(val);
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden">
      <video
        ref={videoRef}
        src={movie.videoUrl}
        poster={movie.banner}
        className="w-full max-h-[60vh] object-contain bg-black"
        onTimeUpdate={onTimeUpdate}
      />
      <div className="p-4 bg-gradient-to-t from-black/95 to-slate-950">
        <div className="flex items-center justify-between gap-4">
          <button onClick={togglePlay} className="btn-primary px-4 py-1.5 text-xs">
            {playing ? "Pause" : "Play"}
          </button>
          <span className="text-xs text-slate-300 line-clamp-1">{movie.title}</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={onSeek}
            className="w-full accent-primary cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

