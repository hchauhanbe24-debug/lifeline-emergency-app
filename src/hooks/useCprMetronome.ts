import { useState, useEffect, useRef, useCallback } from 'react';

export function useCprMetronome(initialBpm: number = 110) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(initialBpm);
  const [beatCount, setBeatCount] = useState<number>(0);
  const [isBeating, setIsBeating] = useState<boolean>(false);
  const [cycleCount, setCycleCount] = useState<number>(1);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const playClick = useCallback((isHigh: boolean = false) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      // 880Hz for 30th compression cycle mark or 1st beat, 660Hz for regular beats
      osc.frequency.setValueAtTime(isHigh ? 880 : 660, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.08);
    } catch (err) {
      console.warn('Web Audio playback error:', err);
    }
  }, []);

  const tick = useCallback(() => {
    setBeatCount(prev => {
      const next = prev >= 30 ? 1 : prev + 1;
      if (prev >= 30) {
        setCycleCount(c => c + 1);
      }
      playClick(next === 1 || next === 30);
      return next;
    });

    setIsBeating(true);
    setTimeout(() => {
      setIsBeating(false);
    }, 120);
  }, [playClick]);

  const start = useCallback(() => {
    setIsPlaying(true);
    setBeatCount(1);
    playClick(true);
  }, [playClick]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setBeatCount(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = (60 / bpm) * 1000;
      timerRef.current = window.setInterval(tick, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, bpm, tick]);

  return {
    isPlaying,
    bpm,
    setBpm,
    beatCount,
    cycleCount,
    isBeating,
    start,
    stop,
    toggle
  };
}
