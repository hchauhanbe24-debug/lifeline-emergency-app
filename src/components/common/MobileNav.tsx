import React from 'react';
import { Home, BookOpen, AlertCircle, Hospital, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTriggerSos: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  onTriggerSos
}) => {
  return (
    <nav 
      aria-label="Mobile Navigation" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border px-3 py-2 shadow-lg"
    >
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Home */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center w-14 py-1 text-xs font-semibold transition-colors ${
            activeTab === 'home' ? 'text-lifeline-primary' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        {/* Learn */}
        <button
          type="button"
          onClick={() => setActiveTab('learn')}
          className={`flex flex-col items-center justify-center w-14 py-1 text-xs font-semibold transition-colors ${
            activeTab === 'learn' || activeTab === 'cpr' ? 'text-lifeline-primary' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span>Learn</span>
        </button>

        {/* Central Raised SOS Button */}
        <div className="relative -top-4 flex flex-col items-center">
          <button
            type="button"
            onClick={onTriggerSos}
            aria-label="Activate Emergency SOS"
            className="w-14 h-14 rounded-full bg-lifeline-primary hover:bg-lifeline-dark active:scale-95 text-white flex flex-col items-center justify-center shadow-lg shadow-lifeline-primary/40 border-4 border-white transition-all animate-emergency-pulse"
          >
            <AlertCircle className="w-6 h-6 stroke-[2.5]" />
            <span className="text-[10px] font-black uppercase tracking-wider -mt-0.5">SOS</span>
          </button>
        </div>

        {/* Hospitals */}
        <button
          type="button"
          onClick={() => setActiveTab('hospitals')}
          className={`flex flex-col items-center justify-center w-14 py-1 text-xs font-semibold transition-colors ${
            activeTab === 'hospitals' || activeTab === 'ambulance' ? 'text-lifeline-primary' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Hospital className="w-5 h-5 mb-0.5" />
          <span>Hospitals</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center w-14 py-1 text-xs font-semibold transition-colors ${
            activeTab === 'profile' || activeTab === 'contacts' ? 'text-lifeline-primary' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};
