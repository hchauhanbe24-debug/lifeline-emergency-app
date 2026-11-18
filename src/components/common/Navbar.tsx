import React from 'react';
import { 
  HeartPulse, 
  BookOpen, 
  PhoneCall, 
  Hospital as HospitalIcon, 
  Ambulance, 
  User, 
  AlertCircle,
  Activity,
  ShieldCheck,
  WifiOff
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTriggerSos: () => void;
  isOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onTriggerSos,
  isOnline
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-surface-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-lifeline-primary flex items-center justify-center text-white shadow-md shadow-lifeline-primary/25">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-navy">
                  Life<span className="text-lifeline-primary">Line</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Doctor-Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                From bystanders to first responders
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'home'
                  ? 'bg-lifeline-50 text-lifeline-primary'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cpr')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'cpr'
                  ? 'bg-lifeline-50 text-lifeline-primary'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-50'
              }`}
            >
              <Activity className="w-4 h-4 text-lifeline-primary" />
              CPR Guide
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'learn'
                  ? 'bg-lifeline-50 text-lifeline-primary'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              First-Aid Library
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hospitals')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'hospitals'
                  ? 'bg-lifeline-50 text-lifeline-primary'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-50'
              }`}
            >
              <HospitalIcon className="w-4 h-4" />
              Hospitals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ambulance')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'ambulance'
                  ? 'bg-lifeline-50 text-lifeline-primary'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-50'
              }`}
            >
              <Ambulance className="w-4 h-4" />
              Ambulance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-lifeline-50 text-lifeline-primary'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-50'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              Contacts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-lifeline-50 text-lifeline-primary'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Offline indicator badge */}
            {!isOnline && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold">
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Offline Mode</span>
              </div>
            )}

            {/* Helpline quick dial pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
              <span className="text-slate-400">Emergency:</span>
              <span className="font-bold text-navy">112</span>
            </div>

            {/* Prominent SOS Button */}
            <button
              type="button"
              onClick={onTriggerSos}
              className="relative group flex items-center gap-2 px-4 py-2 bg-lifeline-primary hover:bg-lifeline-dark text-white font-bold text-sm rounded-xl shadow-md shadow-lifeline-primary/30 hover:shadow-lg transition-all transform active:scale-95"
              aria-label="Trigger Emergency SOS"
            >
              <AlertCircle className="w-4 h-4" />
              <span>SOS</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
