"use client";

import { useRef, useState } from "react";
import type { Video } from "@/lib/data";
import { CloseIcon, PlayIcon, VideoSoonIcon } from "./Icons";
import VideoPlayer from "./VideoPlayer";

// "Watch video" on a product card: opens the 9:16 player over the page.
export default function VideoButton({ video, title }: { video: Video; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  if (!video) {
    return (
      <p className="inline-flex h-11 items-center justify-center gap-2 text-sm text-muted">
        <VideoSoonIcon className="size-4" />
        Video coming soon
      </p>
    );
  }

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-navy ring-1 ring-navy/20 transition hover:bg-mist"
      >
        <PlayIcon className="size-4" />
        Watch video
      </button>

      <dialog
        ref={dialog}
        aria-label={`Video: ${title}`}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0"
      >
        {open && (
          <div className="w-[min(86vw,360px,calc((100dvh-7rem)*0.5625))]">
            <VideoPlayer video={video} label={title} autoStart />
            <p className="mt-3 text-center text-sm font-medium text-white">{title}</p>
          </div>
        )}
        <button
          type="button"
          onClick={close}
          aria-label="Close video"
          className="fixed end-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
        >
          <CloseIcon className="size-6" />
        </button>
      </dialog>
    </>
  );
}
