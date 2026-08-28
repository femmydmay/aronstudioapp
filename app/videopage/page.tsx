"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";

export default function VideoPage() {
  const [videoExists, setVideoExists] = useState(true);

  const VIDEO_PATH = "/videos/main-video.mp4";

  const handleDelete = () => {
    // ⚠️ cannot actually delete file from filesystem
    // just hides it from UI
    setVideoExists(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Aron Studio Introduction
          </h1>

          {/* Video */}
          <div className="relative w-full aspect-video rounded-2xl flex justify-center overflow-hidden bg-black shadow-xl">
            {videoExists ? (
              <video
                src={VIDEO_PATH}
                controls
                className="w-70 h-70 rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white gap-4">
                <Play size={40} />
                <p className="text-sm opacity-80">No video available</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-center gap-4">
            {/* <div className="text-sm text-muted-foreground">
              Replace video by updating <b>/public/videos/main-video.mp4</b>
            </div> */}
            {/* 
            <button
              onClick={handleDelete}
              disabled={!videoExists}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition
                ${
                  videoExists
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              <Trash2 size={18} />
              Remove (UI only)
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
