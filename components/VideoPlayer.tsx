"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Video } from "@/lib/data";
import { PlayIcon, SoundOffIcon, SoundOnIcon, VideoSoonIcon } from "./Icons";

const PLAY_EVENT = "gs-video-play";

const frame =
  "relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[2.25rem] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-25px_rgba(38,41,72,0.55)] lg:max-w-[320px]";

type Props = { video: Video; label: string; autoStart?: boolean };

// Vertical 9:16 player. Nothing loads until the visitor taps play, it never
// starts on its own, and it pauses when scrolled away or when another video starts.
export default function VideoPlayer({ video, label, autoStart = false }: Props) {
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(autoStart);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) ref.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, [id]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => !entry.isIntersecting && ref.current?.pause(), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Runs right after a tap (or opening the video dialog). If the browser
  // blocks sound, play muted and leave the sound button for the visitor.
  useEffect(() => {
    const v = ref.current;
    if (!started || !v) return;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  }, [started]);

  if (!video) {
    return (
      <div className={frame}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-navy-light to-navy-deep px-6 text-center">
          <VideoSoonIcon className="size-10 text-gold/80" />
          <p className="text-base font-semibold text-white">Video coming soon</p>
          <p className="text-sm text-white/60">{label}</p>
        </div>
      </div>
    );
  }

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div ref={wrap} className={frame}>
      {started ? (
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          playsInline
          preload="auto"
          onClick={toggle}
          onPlay={() => {
            setPlaying(true);
            window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: id }));
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        />
      ) : (
        video.poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={video.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )
      )}

      {!playing && (
        <button
          type="button"
          onClick={() => (started ? toggle() : setStarted(true))}
          aria-label={`Play video: ${label}`}
          className="absolute inset-0 grid place-items-center bg-black/20 transition hover:bg-black/10"
        >
          <span className="grid size-16 place-items-center rounded-full bg-white/90 text-navy shadow-lg backdrop-blur">
            <PlayIcon className="ms-1 size-7" />
          </span>
        </button>
      )}

      {started && (
        <>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="absolute bottom-4 end-3 grid size-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur"
          >
            {muted ? <SoundOffIcon /> : <SoundOnIcon />}
          </button>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
            <div className="h-full origin-left bg-gold" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </>
      )}
    </div>
  );
}
