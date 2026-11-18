import React from 'react';
import { Heart, Play, Pause, RotateCcw, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { useCprMetronome } from '../../hooks/useCprMetronome';

export const CprMetronomeBar: React.FC = () => {
  const {
    isPlaying,
    bpm,
    setBpm,
    beatCount,
    cycleCount,
    isBeating,
    toggle,
    stop
  } = useCprMetronome(110);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Metronome Title & BPM Selector */}
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            isBeating 
              ? 'bg-lifeline-primary scale-110 shadow-lg shadow-lifeline-primary/50' 
              : 'bg-slate-800 text-slate-300'
          }`}>
            <Heart className={`w-6 h-6 ${isBeating ? 'text-white fill-white' : 'text-slate-400'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-white">CPR Pace Metronome</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lifeline-primary/20 text-lifeline-300 border border-lifeline-primary/30">
                100–120 BPM Guideline
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <span>Rhythm of "Stayin' Alive" (Bee Gees)</span>
            </p>
          </div>
        </div>

        {/* Center: Live Compression Counter */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Push Count</span>
            <span className={`text-2xl font-black font-mono transition-transform ${isBeating ? 'text-lifeline-400 scale-110' : 'text-white'}`}>
              {beatCount > 0 ? `${beatCount}/30` : '--/30'}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Cycle</span>
            <span className="text-lg font-bold text-slate-300 font-mono">
              #{cycleCount}
            </span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* BPM selector buttons */}
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setBpm(100)}
              className={`px-2 py-1 rounded ${bpm === 100 ? 'bg-lifeline-primary text-white font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              100
            </button>
            <button
              type="button"
              onClick={() => setBpm(110)}
              className={`px-2 py-1 rounded ${bpm === 110 ? 'bg-lifeline-primary text-white font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              110
            </button>
            <button
              type="button"
              onClick={() => setBpm(120)}
              className={`px-2 py-1 rounded ${bpm === 120 ? 'bg-lifeline-primary text-white font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              120
            </button>
          </div>

          {/* Start/Stop Button */}
          <button
            type="button"
            onClick={toggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-lifeline-primary hover:bg-lifeline-dark text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Start Audio Pace</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar for 30 compressions */}
      <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-lifeline-primary h-full transition-all duration-100 ease-out"
          style={{ width: `${(beatCount / 30) * 100}%` }}
        />
      </div>

      {beatCount === 30 && (
        <div className="mt-2 text-xs text-amber-300 font-bold flex items-center gap-1.5 animate-bounce">
          <AlertCircle className="w-4 h-4" />
          <span>30 Compressions Reached! Deliver 2 rescue breaths (or continue compressions if hands-only).</span>
        </div>
      )}
    </div>
  );
};
