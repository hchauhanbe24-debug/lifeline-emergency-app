import React from 'react';
import { Wifi, WifiOff, Presentation } from 'lucide-react';

interface DemoBannerProps {
  isOnline: boolean;
  simulatedOffline: boolean;
  onToggleOffline: () => void;
  onOpenPitchGuide: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  isOnline,
  simulatedOffline,
  onToggleOffline,
  onOpenPitchGuide
}) => {
  return (
    <aside aria-label="Demo notice" className="bg-slate-900 text-white text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-3">
        {/* Left Side: DEMO MODE Badge & Disclaimer */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-lifeline-primary text-white shrink-0 shadow-xs">
            DEMO MODE
          </span>
          <span className="text-slate-300 font-medium text-[11px] sm:text-xs truncate">
            All emergency calls and dispatch actions are simulated
          </span>
        </div>

        {/* Right Side: Online Status & Pitch Demo Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Online status indicator with offline simulation toggle */}
          <button
            type="button"
            onClick={onToggleOffline}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors text-[11px] font-medium ${
              simulatedOffline
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title="Click to toggle offline simulation mode"
          >
            {simulatedOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-slate-950" />
                <span>Simulated: Offline</span>
              </>
            ) : isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Online (Click to simulate offline)</span>
                <span className="sm:hidden">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>Device Offline</span>
              </>
            )}
          </button>

          {/* Pitch Demo (6 Scenes) button */}
          <button
            type="button"
            onClick={onOpenPitchGuide}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-lifeline-primary/20 hover:bg-lifeline-primary/30 text-lifeline-300 rounded-md transition-colors text-[11px] font-semibold shrink-0"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pitch Demo (6 Scenes)</span>
            <span className="sm:hidden">Pitch Demo</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
