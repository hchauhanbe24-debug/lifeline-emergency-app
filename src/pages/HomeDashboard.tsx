import React from 'react';
import { 
  AlertCircle, 
  BookOpen, 
  PhoneCall, 
  Hospital, 
  Ambulance, 
  Activity, 
  ShieldCheck, 
  Flame, 
  Droplet, 
  Wind, 
  Bone, 
  ChevronRight, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { EmergencyContact, UserProfile } from '../types';

interface HomeDashboardProps {
  onNavigate: (tab: string, extra?: string) => void;
  onTriggerSos: () => void;
  contacts: EmergencyContact[];
  profile: UserProfile;
  isOnline: boolean;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onTriggerSos,
  contacts,
  profile,
  isOnline
}) => {
  // Calculate preparedness score
  const hasContacts = contacts.length >= 2;
  const hasProfileInfo = Boolean(profile.name && profile.bloodGroup);
  const preparednessPercent = (hasContacts ? 40 : 15) + (hasProfileInfo ? 40 : 15) + 20;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-surface-border p-6 sm:p-10 shadow-xs">
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lifeline-50 text-lifeline-primary text-xs font-bold border border-lifeline-200">
            <span className="w-2 h-2 rounded-full bg-lifeline-primary animate-ping"></span>
            LifeLine Emergency Response
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy tracking-tight leading-tight">
            Help is closer <br className="hidden sm:inline" />
            <span className="text-lifeline-primary">than you think.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Essential first-aid guidance, verified emergency workflows, and instant coordination for the critical minutes before help arrives.
          </p>

          {/* Prominent Central SOS Button */}
          <div className="pt-6 pb-2">
            <button
              type="button"
              onClick={onTriggerSos}
              className="group relative inline-flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-lifeline-primary hover:bg-lifeline-dark active:scale-95 text-white shadow-xl shadow-lifeline-primary/40 border-8 border-white transition-all animate-emergency-pulse"
              aria-label="Activate Emergency SOS"
            >
              <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 stroke-[2.5] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xl sm:text-2xl font-black uppercase tracking-wider">SOS</span>
              <span className="text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-widest mt-0.5">
                Press for Help
              </span>
            </button>
            <p className="text-xs text-slate-400 mt-3 font-medium">
              Tap in any medical crisis · Notifies contacts & connects to 112
            </p>
          </div>
        </div>
      </section>

      {/* Immediate Crisis Situation Shortcuts (Triage Chips) */}
      <section aria-labelledby="quick-triage-title">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 id="quick-triage-title" className="text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <Activity className="w-4 h-4 text-lifeline-primary" />
            Immediate Crisis Triage
          </h2>
          <span className="text-xs text-slate-400">1-Tap Guidance</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <button
            type="button"
            onClick={() => onNavigate('cpr')}
            className="p-3.5 rounded-2xl bg-white border border-surface-border hover:border-lifeline-primary hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-xl bg-lifeline-50 text-lifeline-primary flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-navy block group-hover:text-lifeline-primary">Adult CPR</span>
              <span className="text-[11px] text-slate-500">Unresponsive, no breathing</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('learn', 'choking-adult')}
            className="p-3.5 rounded-2xl bg-white border border-surface-border hover:border-lifeline-primary hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-navy block group-hover:text-lifeline-primary">Choking</span>
              <span className="text-[11px] text-slate-500">Heimlich maneuver</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('learn', 'bleeding-control')}
            className="p-3.5 rounded-2xl bg-white border border-surface-border hover:border-lifeline-primary hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-navy block group-hover:text-lifeline-primary">Bleeding</span>
              <span className="text-[11px] text-slate-500">Direct pressure & wrap</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('learn', 'burns-treatment')}
            className="p-3.5 rounded-2xl bg-white border border-surface-border hover:border-lifeline-primary hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-navy block group-hover:text-lifeline-primary">Burns</span>
              <span className="text-[11px] text-slate-500">20 min cool water</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('learn', 'fractures-splinting')}
            className="p-3.5 rounded-2xl bg-white border border-surface-border hover:border-lifeline-primary hover:shadow-md transition-all text-left flex flex-col justify-between group col-span-2 sm:col-span-1"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Bone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-navy block group-hover:text-lifeline-primary">Fracture</span>
              <span className="text-[11px] text-slate-500">Immobilize & support</span>
            </div>
          </button>
        </div>
      </section>

      {/* 4 Main Application Shortcuts (Matching Pitch Deck Spec) */}
      <section aria-labelledby="main-shortcuts-title">
        <h2 id="main-shortcuts-title" className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-3 px-1">
          Core Services & Discovery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shortcut 1: First-Aid Guide */}
          <div 
            onClick={() => onNavigate('learn')}
            className="bg-white p-5 rounded-3xl border border-surface-border hover:border-lifeline-primary/50 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-lifeline-primary flex items-center justify-center group-hover:bg-lifeline-primary group-hover:text-white transition-colors">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-lifeline-primary uppercase tracking-wider block">
                  Interactive Library
                </span>
                <h3 className="text-base font-extrabold text-navy group-hover:text-lifeline-primary transition-colors">
                  First-Aid Guides
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  CPR, Choking, Bleeding, Fractures & Burns
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-lifeline-50 group-hover:text-lifeline-primary transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-lifeline-primary" />
            </div>
          </div>

          {/* Shortcut 2: Emergency Contacts */}
          <div 
            onClick={() => onNavigate('contacts')}
            className="bg-white p-5 rounded-3xl border border-surface-border hover:border-lifeline-primary/50 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <PhoneCall className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                  Pre-Set Guardians
                </span>
                <h3 className="text-base font-extrabold text-navy group-hover:text-blue-600 transition-colors">
                  Emergency Contacts
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {contacts.length} saved contacts · 1-tap SOS location broadcast
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
            </div>
          </div>

          {/* Shortcut 3: Nearby Hospitals */}
          <div 
            onClick={() => onNavigate('hospitals')}
            className="bg-white p-5 rounded-3xl border border-surface-border hover:border-lifeline-primary/50 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Hospital className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                  Care Finder
                </span>
                <h3 className="text-base font-extrabold text-navy group-hover:text-emerald-600 transition-colors">
                  Nearby Hospitals & ERs
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trauma units, blood banks, 24/7 pharmacies
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
            </div>
          </div>

          {/* Shortcut 4: Ambulance Assistance */}
          <div 
            onClick={() => onNavigate('ambulance')}
            className="bg-white p-5 rounded-3xl border border-surface-border hover:border-lifeline-primary/50 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Ambulance className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  Quick Coordination
                </span>
                <h3 className="text-base font-extrabold text-navy group-hover:text-amber-600 transition-colors">
                  Ambulance Assistance
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Demo dispatch simulation & patient condition intake
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Preparedness Section */}
      <section aria-labelledby="preparedness-title" className="bg-white rounded-3xl p-6 border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 id="preparedness-title" className="text-base font-extrabold text-navy">
                Emergency Preparedness Score
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Steps taken to protect yourself and family before an emergency strikes
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-navy">{preparednessPercent}%</span>
            <div className="w-28 bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${preparednessPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className={`p-3.5 rounded-2xl border text-xs ${
            hasContacts ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className="flex items-center gap-2 font-bold mb-1">
              <CheckCircle2 className={`w-4 h-4 ${hasContacts ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Emergency Contacts</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {hasContacts ? `${contacts.length} guardians saved` : 'Add at least 2 family or campus contacts'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border bg-emerald-50/60 border-emerald-200 text-emerald-900 text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Offline LifeLine Cache</span>
            </div>
            <p className="text-[11px] text-slate-500">
              All 8 core emergency guides stored locally in browser
            </p>
          </div>

          <div 
            onClick={() => onNavigate('cpr')}
            className="p-3.5 rounded-2xl border bg-slate-50 border-slate-200 hover:border-lifeline-primary text-slate-700 text-xs cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-lifeline-primary" />
                <span>CPR Practice</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-500">
              Refresh your memory with the 110 BPM rhythm trainer
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
