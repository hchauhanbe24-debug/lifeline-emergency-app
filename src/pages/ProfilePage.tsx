import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Droplet, 
  Heart, 
  HardDrive, 
  Wifi, 
  WifiOff, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  PhoneCall, 
  ExternalLink,
  Presentation,
  Award
} from 'lucide-react';
import { UserProfile, EmergencyContact } from '../types';

interface ProfilePageProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  contacts: EmergencyContact[];
  onNavigateToContacts: () => void;
  isOnline: boolean;
  simulatedOffline: boolean;
  onToggleOffline: () => void;
  onOpenPitchModal: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  setProfile,
  contacts,
  onNavigateToContacts,
  isOnline,
  simulatedOffline,
  onToggleOffline,
  onOpenPitchModal
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-lifeline-50 text-lifeline-primary flex items-center justify-center font-black text-2xl shadow-inner border border-lifeline-200">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
                  {profile.name || 'Emergency Profile'}
                </h1>
                {profile.bloodGroup && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-lifeline-primary border border-rose-200">
                    {profile.bloodGroup}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Saved medical details accessible to first responders via localStorage
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPitchModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
          >
            <Presentation className="w-4 h-4 text-lifeline-primary" />
            <span>Project Pitch Slides</span>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-base font-extrabold text-navy flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Personal Medical & Emergency Preferences
          </h2>
          <span className="text-xs text-slate-400">Stored in LocalStorage</span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-navy block mb-1">Your Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Shubham Verma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy block mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary bg-white"
              >
                <option value="">Select Blood Group...</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-navy block mb-1">Known Allergies</label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                placeholder="e.g. Penicillin, Peanuts, Latex (or None)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy block mb-1">Pre-existing Medical Conditions</label>
              <input
                type="text"
                value={formData.medicalConditions}
                onChange={(e) => setFormData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                placeholder="e.g. Asthma, Type-1 Diabetes, Hypertension"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={formData.organDonor}
                onChange={(e) => setFormData(prev => ({ ...prev, organDonor: e.target.checked }))}
                className="w-4 h-4 rounded text-lifeline-primary focus:ring-lifeline-primary"
              />
              <span>Registered Organ Donor</span>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {savedSuccess ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile preferences updated in localStorage!</span>
              </span>
            ) : <span />}

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-lifeline-primary hover:bg-lifeline-dark text-white rounded-xl text-xs font-extrabold shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* Offline Emergency Guide Cache & Status (Scene 6) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-navy flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-blue-600" />
              Offline Emergency Guide Cache
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Essential life-saving instructions remain accessible without an active internet connection.
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                Online & Synchronized
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold">
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                Offline Mode Active
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-400 block font-medium">Cached Guides</span>
            <span className="text-lg font-black text-navy mt-1 block">8 Emergency Modules</span>
            <span className="text-[11px] text-emerald-600 font-semibold">100% Offline-Ready</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-400 block font-medium">Local Cache Size</span>
            <span className="text-lg font-black text-navy mt-1 block">~42 KB</span>
            <span className="text-[11px] text-slate-500 font-medium">Zero data cost</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-400 block font-medium">CPR Audio Metronome</span>
            <span className="text-lg font-black text-navy mt-1 block">Web Audio API</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Synthesized offline</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <h4 className="text-xs font-bold text-navy">Demonstrate Scene 6 (Pitch Presentation)</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Simulate taking the device into a zero-connectivity zone (rural / trek / subway).
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleOffline}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              simulatedOffline
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {simulatedOffline ? 'Restore Online Status' : 'Simulate Offline Mode'}
          </button>
        </div>
      </div>

      {/* University Entrepreneurship Project Credits */}
      <div className="bg-gradient-to-r from-slate-900 to-navy text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-2.5 mb-3">
          <Award className="w-5 h-5 text-lifeline-primary" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-lifeline-300">
            University Entrepreneurship Project
          </span>
        </div>
        <h3 className="text-xl font-black">Team LifeLine · Final Pitch (November 2026)</h3>
        <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
          "From bystanders to first responders. An emergency response and preparedness platform for the critical minutes before professional help arrives."
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-5 text-xs">
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
            <span className="font-extrabold block text-white">Niyam</span>
            <span className="text-slate-400 text-[11px]">Problem & Gap</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
            <span className="font-extrabold block text-white">Shubham</span>
            <span className="text-slate-400 text-[11px]">Solution & Demo</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
            <span className="font-extrabold block text-white">Harshit</span>
            <span className="text-slate-400 text-[11px]">Market & Forces</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
            <span className="font-extrabold block text-white">Ram</span>
            <span className="text-slate-400 text-[11px]">Business Model</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
            <span className="font-extrabold block text-white">Jai</span>
            <span className="text-slate-400 text-[11px]">Adoption & Vision</span>
          </div>
        </div>
      </div>
    </div>
  );
};
