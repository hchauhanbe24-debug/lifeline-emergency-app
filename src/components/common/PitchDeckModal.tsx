import React from 'react';
import { 
  X, 
  Presentation, 
  Users, 
  PlayCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  HeartHandshake,
  Layers
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScene: (sceneKey: string) => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose,
  onSelectScene
}) => {
  if (!isOpen) return null;

  const scenes = [
    {
      num: 1,
      key: 'home',
      title: 'Scene 1: Home & Central SOS',
      desc: 'Show the prominent SOS button, greeting, and high-impact emergency shortcuts.',
      action: 'Jump to Home'
    },
    {
      num: 2,
      key: 'cpr',
      title: 'Scene 2: CPR Step by Step',
      desc: 'Interactive 8-step cards, 110 BPM metronome rhythm, and adult/child CPR.',
      action: 'Open CPR Guide'
    },
    {
      num: 3,
      key: 'learn',
      title: 'Scene 3: First-Aid Library',
      desc: 'Search topics (Choking, Bleeding, Burns, Fractures) with "What NOT to do" safeguards.',
      action: 'Open Library'
    },
    {
      num: 4,
      key: 'contacts',
      title: 'Scene 4: SOS & Contacts',
      desc: 'Simulate 112 emergency calls with safety confirmations and GPS location sharing.',
      action: 'Open Contacts'
    },
    {
      num: 5,
      key: 'hospitals',
      title: 'Scene 5: Nearby Hospitals & Ambulance',
      desc: 'Find trauma centres, blood banks, pharmacies, and demo ambulance dispatch.',
      action: 'Open Hospitals'
    },
    {
      num: 6,
      key: 'offline',
      title: 'Scene 6: Offline Emergency Mode',
      desc: 'Simulate losing connection: all core life-saving guides remain 100% accessible.',
      action: 'Test Offline'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        role="dialog" 
        aria-labelledby="pitch-modal-title" 
        aria-modal="true"
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 rounded-t-2xl flex items-center justify-between sticky top-0 z-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lifeline-primary flex items-center justify-center text-white font-bold">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h2 id="pitch-modal-title" className="text-lg font-bold">LifeLine Pitch & Presentation Mode</h2>
              <p className="text-xs text-slate-300">Entrepreneurship Project · Final Pitch · November 2026</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mission & Team Banner */}
          <div className="bg-lifeline-50 border border-lifeline-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <HeartHandshake className="w-6 h-6 text-lifeline-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-navy">
                  "From bystanders to first responders."
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  An emergency response and preparedness platform for the critical minutes before professional help arrives.
                  Free for everyday users, supported by institutional healthcare partners.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-700">
                  <span className="bg-white px-2.5 py-1 rounded-md border border-lifeline-200 shadow-xs">
                    Niyam: Problem
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-lifeline-200 shadow-xs">
                    Shubham: Solution & Demo
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-lifeline-200 shadow-xs">
                    Harshit: Market
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-lifeline-200 shadow-xs">
                    Ram: Model
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-md border border-lifeline-200 shadow-xs">
                    Jai: Vision
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Six Scenes Stepper */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-lifeline-primary" />
                Live App Demo: Six Scenes (Slide 6)
              </h3>
              <span className="text-xs text-slate-400">Click to jump directly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scenes.map((scene) => (
                <div 
                  key={scene.num}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-lifeline-primary hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded mb-1">
                      Scene {scene.num}
                    </span>
                    <h4 className="text-xs font-bold text-navy">{scene.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">{scene.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectScene(scene.key);
                      onClose();
                    }}
                    className="mt-3 w-full py-1.5 px-3 bg-slate-900 hover:bg-lifeline-primary text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{scene.action}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Key Safeguards & Trust Factors */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Built-in Safeguards & Academic Demo Notes
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No accidental dispatches:</strong> All 112 calls and ambulance requests require confirmation and carry clear simulation disclaimers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Doctor review standard:</strong> Proposed partnership with AIIMS curriculum for validated triage steps.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Works fully offline:</strong> Once loaded, core steps remain in memory and localStorage for remote access.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
