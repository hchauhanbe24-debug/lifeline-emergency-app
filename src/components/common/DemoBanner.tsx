import React from 'react';
import { AlertTriangle, Wifi, WifiOff, Presentation } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-lifeline-primary text-white">
            Demo Mode
          </span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            University Entrepreneurship Project (Nov 2026) · All dispatch actions & calls are simulated
          </span>
          <span className="text-slate-300 font-medium sm:hidden">
            Demo Prototype · Simulated
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Offline Toggle Simulator */}
          <button
            type="button"
            onClick={onToggleOffline}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors text-[11px] font-medium ${
              simulatedOffline
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title="Simulate losing internet connection for Scene 6 of pitch presentation"
          >
            {simulatedOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-slate-950" />
                <span>Simulated: Offline</span>
              </>
            ) : isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Online (Click to simulate offline)</span>
                <span className="md:hidden">Simulate Offline</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>Device Offline</span>
              </>
            )}
          </button>

          {/* Pitch Deck Scene Guide */}
          <button
            type="button"
            onClick={onOpenPitchGuide}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-lifeline-primary/20 hover:bg-lifeline-primary/30 text-lifeline-300 rounded transition-colors text-[11px] font-semibold"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pitch Demo (6 Scenes)</span>
            <span className="sm:hidden">Pitch</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
