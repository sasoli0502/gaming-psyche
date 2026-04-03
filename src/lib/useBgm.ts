"use client";

import { useEffect, useRef, useCallback } from "react";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/gaming-psyche" : "";

const TRACKS = {
  landing: `${BASE_PATH}/audio/landing.mp3`,
  quiz: `${BASE_PATH}/audio/quiz.mp3`,
  result: `${BASE_PATH}/audio/result.mp3`,
} as const;

type TrackKey = keyof typeof TRACKS;

const FADE_MS = 800;
const FADE_STEP = 50;

function fadeOut(audio: HTMLAudioElement, onDone: () => void) {
  const step = audio.volume / (FADE_MS / FADE_STEP);
  const timer = setInterval(() => {
    const next = audio.volume - step;
    if (next <= 0.01) {
      clearInterval(timer);
      audio.volume = 0;
      audio.pause();
      onDone();
    } else {
      audio.volume = next;
    }
  }, FADE_STEP);
}

function fadeIn(audio: HTMLAudioElement, targetVolume: number) {
  audio.volume = 0;
  audio.play().catch(() => {});
  const step = targetVolume / (FADE_MS / FADE_STEP);
  const timer = setInterval(() => {
    const next = audio.volume + step;
    if (next >= targetVolume) {
      clearInterval(timer);
      audio.volume = targetVolume;
    } else {
      audio.volume = next;
    }
  }, FADE_STEP);
}

export function useBgm(screen: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<TrackKey | null>(null);
  const mutedRef = useRef(false);

  const trackKey: TrackKey =
    screen === "quiz" ? "quiz" : screen === "result" || screen === "types" ? "result" : "landing";

  useEffect(() => {
    if (trackKey === currentTrackRef.current) return;

    const prev = audioRef.current;
    const startNext = () => {
      const audio = new Audio(TRACKS[trackKey]);
      audio.loop = true;
      audio.volume = 0;
      if (mutedRef.current) {
        audio.muted = true;
      }
      audioRef.current = audio;
      currentTrackRef.current = trackKey;
      fadeIn(audio, 0.4);
    };

    if (prev && !prev.paused) {
      fadeOut(prev, startNext);
    } else {
      startNext();
    }

    return () => {};
  }, [trackKey]);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    if (audioRef.current) {
      audioRef.current.muted = mutedRef.current;
    }
    return mutedRef.current;
  }, []);

  return { toggleMute };
}
