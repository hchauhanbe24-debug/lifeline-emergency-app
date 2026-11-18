import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  PhoneCall, 
  Share2, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  Send, 
  Users,
  Compass,
  Info
} from 'lucide-react';
import { EmergencyContact } from '../../types';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
}

export const SosModal: React.FC<SosModalProps> = ({
  isOpen,
  onClose,
  contacts
}) => {
  const [countdown, setCountdown] = useState<number>(3);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(true);
  const [sosActivated, setSosActivated] = useState<boolean>(false);
  const [callConfirmOpen, setCallConfirmOpen] = useState<boolean>(false);
  const [notificationSent, setNotificationSent] = useState<boolean>(false);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationAddress, setLocationAddress] = useState<string>('Near AIIMS Medical Campus, Ring Road, New Delhi');

  // Request browser geolocation if available
  useEffect(() => {
    if (isOpen) {
      setIsCountingDown(true);
      setCountdown(3);
      setSosActivated(false);
      setCallConfirmOpen(false);
      setNotificationSent(false);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCurrentCoords({
              lat: Number(pos.coords.latitude.toFixed(4)),
              lng: Number(pos.coords.longitude.toFixed(4))
            });
            setLocationAddress(`GPS: ${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E (Current Device Location)`);
          },
          () => {
            // Fallback sample coordinates (New Delhi AIIMS area)
            setCurrentCoords({ lat: 28.5672, lng: 77.2100 });
            setLocationAddress('Safdarjung Enclave / AIIMS Area, New Delhi (Simulated Demo Coordinates)');
          },
          { timeout: 5000 }
        );
      } else {
        setCurrentCoords({ lat: 28.5672, lng: 77.2100 });
      }
    }
  }, [isOpen]);

  // Countdown timer effect
  useEffect(() => {
    let timer: number;
    if (isOpen && isCountingDown && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (isOpen && isCountingDown && countdown === 0) {
      setIsCountingDown(false);
      setSosActivated(true);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isCountingDown, countdown]);

  if (!isOpen) return null;

  const handleSimulateCall112 = () => {
    setCallConfirmOpen(true);
  };

  const handleExecuteMockDial = () => {
    // Open tel: URI or show demo alert
    alert('DEMO MODE: Opening device dialler for 112 (National Emergency Helpline). In a live deployment, this dials emergency services.');
    setCallConfirmOpen(false);
  };

  const handleSimulateBroadcast = () => {
    setNotificationSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        role="dialog" 
        aria-labelledby="sos-modal-title" 
        aria-modal="true"
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-4 border-lifeline-primary animate-scaleUp"
      >
        {/* Top Emergency Header */}
        <div className="bg-lifeline-primary text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-lifeline-primary flex items-center justify-center shadow-inner font-black text-lg animate-pulse">
              SOS
            </div>
            <div>
              <h2 id="sos-modal-title" className="text-xl font-black tracking-tight">EMERGENCY SOS</h2>
              <p className="text-xs text-white/90 font-medium">LifeLine Rapid Incident Coordination</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Cancel and close emergency SOS"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Phase 1: 3-Second Abort Countdown */}
          {isCountingDown && (
            <div className="text-center py-6 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full border-4 border-lifeline-primary flex items-center justify-center text-4xl font-black text-lifeline-primary animate-ping">
                {countdown}
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy">Initiating Emergency SOS in {countdown}s...</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  To prevent false alarms, tap Cancel below if this was triggered accidentally.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm rounded-xl transition-all"
              >
                Cancel SOS
              </button>
            </div>
          )}

          {/* Phase 2: SOS Activated Dashboard */}
          {!isCountingDown && (
            <div className="space-y-5">
              {/* Demo Mode Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  <strong>DEMO MODE:</strong> No emergency services or contacts have been notified automatically. You retain full manual control before any call is placed.
                </p>
              </div>

              {/* Action 1: Call Emergency 112 with Confirmation */}
              <div className="bg-lifeline-50 border-2 border-lifeline-primary/30 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-lifeline-primary text-white flex items-center justify-center shadow-md">
                      <PhoneCall className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-navy text-base">Call 112 (National Emergency)</h4>
                      <p className="text-xs text-slate-600">Police · Fire · Ambulance Dispatch</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateCall112}
                  className="mt-3 w-full py-3 px-4 bg-lifeline-primary hover:bg-lifeline-dark text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Emergency 112</span>
                </button>
              </div>

              {/* Action 2: Share Emergency Location with Pre-set Contacts */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-lifeline-primary" />
                      Emergency Location Broadcast
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{locationAddress}</p>
                    {currentCoords && (
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Lat: {currentCoords.lat}, Lng: {currentCoords.lng}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contacts Preview */}
                <div className="border-t border-slate-200 pt-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      Pre-set Emergency Contacts ({contacts.filter(c => c.notifyOnSos).length})
                    </span>
                    <span className="text-[11px] text-emerald-600 font-bold">Ready</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {contacts.slice(0, 3).map((c) => (
                      <span key={c.id} className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700">
                        {c.name} ({c.relationship})
                      </span>
                    ))}
                    {contacts.length > 3 && (
                      <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-500">
                        +{contacts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Send Notification Button */}
                {notificationSent ? (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Simulated SOS SMS & WhatsApp alerts dispatched!</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSimulateBroadcast}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Simulated Location Alert to Contacts</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            LifeLine Safety Shield · Practice Mode
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Close SOS
          </button>
        </div>
      </div>

      {/* Confirmation Dialog Before Calling 112 */}
      {callConfirmOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border-2 border-slate-300 space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-lifeline-100 text-lifeline-primary flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="font-extrabold text-navy text-base">Confirm Call to 112?</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                You are about to simulate dialing the 112 National Emergency Helpline. In demo mode, no real call is connected without your device permission.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCallConfirmOpen(false)}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteMockDial}
                className="flex-1 py-2 px-3 bg-lifeline-primary hover:bg-lifeline-dark text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
