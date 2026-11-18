import React, { useState } from 'react';
import { 
  Ambulance, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  LocateFixed, 
  User, 
  Activity, 
  ChevronLeft,
  X,
  Info
} from 'lucide-react';
import { AmbulanceRequest } from '../types';

interface AmbulanceAssistancePageProps {
  onBackToHospitals: () => void;
  onTriggerSos: () => void;
}

export const AmbulanceAssistancePage: React.FC<AmbulanceAssistancePageProps> = ({
  onBackToHospitals,
  onTriggerSos
}) => {
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [location, setLocation] = useState<string>('Near AIIMS Gate 2, Ring Road, New Delhi');
  const [emergencyType, setEmergencyType] = useState<string>('Cardiac / Chest Pain');
  const [conditionDetails, setConditionDetails] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Submission & simulation confirmation state
  const [submittedRequest, setSubmittedRequest] = useState<AmbulanceRequest | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const emergencyTypes = [
    'Cardiac / Chest Pain / Unresponsive',
    'Severe Trauma / Road Accident',
    'Choking / Acute Breathing Difficulty',
    'Severe Burn or Scald',
    'Snakebite / Chemical Poisoning',
    'Maternity / Pediatric Emergency',
    'Other Medical Crisis'
  ];

  const handleAutoDetectLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`GPS: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E (Auto-detected)`);
          setIsLocating(false);
        },
        () => {
          setLocation('Near AIIMS Apex Trauma Center, Safdarjung Enclave, New Delhi (Simulated)');
          setIsLocating(false);
        },
        { timeout: 4000 }
      );
    } else {
      setLocation('Near AIIMS Apex Trauma Center, Safdarjung Enclave, New Delhi (Simulated)');
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !location.trim()) {
      alert('Please fill out your contact phone number and current pickup location.');
      return;
    }

    const mockRequest: AmbulanceRequest = {
      id: `amb-${Date.now()}`,
      patientName: patientName || 'Emergency Patient',
      phone,
      emergencyType,
      location,
      patientCondition: conditionDetails || 'Urgent medical assistance requested.',
      timestamp: new Date().toLocaleTimeString(),
      demoSimulationId: `SIM-AMB-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'simulated_queued',
      etaMinutes: 8
    };

    setSubmittedRequest(mockRequest);
    setShowConfirmationModal(true);
  };

  const handleResetRequest = () => {
    setSubmittedRequest(null);
    setShowConfirmationModal(false);
    setPatientName('');
    setConditionDetails('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-border">
        <button
          type="button"
          onClick={onBackToHospitals}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-lifeline-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Nearby Care Finder</span>
        </button>

        <button
          type="button"
          onClick={onTriggerSos}
          className="px-3 py-1.5 bg-lifeline-primary hover:bg-lifeline-dark text-white rounded-xl text-xs font-black shadow-xs transition-colors"
        >
          SOS (112)
        </button>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
          <Ambulance className="w-3.5 h-3.5" />
          <span>Ambulance Assistance Triage</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
          Request Ambulance Assistance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
          Complete rapid triage information to dispatch emergency transport. In immediate life-threatening arrest, perform CPR while ambulance is dispatched.
        </p>

        {/* Demo Mode Notice */}
        <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            <strong>DEMO SIMULATION:</strong> This is an entrepreneurship demonstration. Submitting this form simulates the intake process. For actual emergency transport in India, immediately dial <strong>112</strong> or <strong>108</strong>.
          </p>
        </div>
      </div>

      {/* Ambulance Request Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Emergency Type Selector */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-navy block mb-2">
              Emergency Category *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {emergencyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEmergencyType(type)}
                  className={`p-3 rounded-2xl text-left text-xs font-bold border transition-all ${
                    emergencyType === type
                      ? 'border-lifeline-primary bg-lifeline-50 text-lifeline-primary shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Patient Name */}
            <div>
              <label className="text-xs font-bold text-navy block mb-1">
                Patient Name (or "Unknown Bystander")
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. John Doe / Elderly Pedestrian"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
                />
              </div>
            </div>

            {/* Contact Phone */}
            <div>
              <label className="text-xs font-bold text-navy block mb-1">
                Callback Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98110 23456"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
                />
              </div>
            </div>
          </div>

          {/* Current Location */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-navy">
                Current Location / Pickup Landmark *
              </label>
              <button
                type="button"
                onClick={handleAutoDetectLocation}
                disabled={isLocating}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <LocateFixed className="w-3 h-3" />
                <span>{isLocating ? 'Detecting...' : 'Auto-detect GPS'}</span>
              </button>
            </div>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Street address, nearest hospital, intersection or landmark..."
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
              />
            </div>
          </div>

          {/* Condition Details */}
          <div>
            <label className="text-xs font-bold text-navy block mb-1">
              Patient Symptoms & Clinical Observations
            </label>
            <textarea
              rows={2}
              value={conditionDetails}
              onChange={(e) => setConditionDetails(e.target.value)}
              placeholder="e.g. Victim is breathing rapidly, conscious but dizzy, heavy bleeding from left arm..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-lifeline-primary hover:bg-lifeline-dark active:scale-98 text-white font-black text-base rounded-2xl shadow-lg shadow-lifeline-primary/30 transition-all flex items-center justify-center gap-2"
            >
              <Ambulance className="w-5 h-5" />
              <span>Submit Ambulance Request (Demo Simulation)</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Requires confirmation screen. No actual sirens or dispatch deployed.
            </p>
          </div>
        </form>
      </div>

      {/* Confirmation Screen / Modal (Pitch Requirement: "Demo request submitted. No ambulance has been dispatched.") */}
      {showConfirmationModal && submittedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div 
            role="dialog"
            aria-labelledby="confirm-modal-title"
            aria-modal="true"
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-500 animate-scaleUp text-center"
          >
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              University Demo Simulation
            </div>

            {/* EXACT Prompt Text Required */}
            <h2 id="confirm-modal-title" className="text-xl sm:text-2xl font-black text-navy leading-tight">
              Demo request submitted. No ambulance has been dispatched.
            </h2>

            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              This interactive test demonstrates the emergency intake triage workflow for our Innovation & Entrepreneurship presentation.
            </p>

            {/* Simulation Metadata */}
            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Simulation ID:</span>
                <span className="font-mono font-bold text-navy">{submittedRequest.demoSimulationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Type:</span>
                <span className="font-semibold text-navy">{submittedRequest.emergencyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pickup Location:</span>
                <span className="font-semibold text-navy truncate max-w-[200px]">{submittedRequest.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Simulated ETA:</span>
                <span className="font-bold text-emerald-600">~{submittedRequest.etaMinutes} mins (Demo ETA)</span>
              </div>
            </div>

            {/* Call 112 Safety Card */}
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 font-medium mb-5">
              In a real medical emergency right now, dial <strong>112</strong> immediately from your phone dialler.
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetRequest}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition-colors"
              >
                Return to Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
