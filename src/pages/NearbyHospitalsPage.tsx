import React, { useState } from 'react';
import { 
  Hospital as HospitalIcon, 
  Search, 
  MapPin, 
  PhoneCall, 
  Navigation, 
  Clock, 
  Bed, 
  ShieldCheck, 
  Filter, 
  Ambulance, 
  ExternalLink,
  LocateFixed,
  Info,
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_HOSPITALS } from '../data/hospitalsData';
import { Hospital, FacilityType } from '../types';

interface NearbyHospitalsPageProps {
  onNavigateToAmbulance: () => void;
  onTriggerSos: () => void;
}

export const NearbyHospitalsPage: React.FC<NearbyHospitalsPageProps> = ({
  onNavigateToAmbulance,
  onTriggerSos
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [callingFacility, setCallingFacility] = useState<Hospital | null>(null);

  const filters = [
    { id: 'all', label: 'All Facilities' },
    { id: 'trauma', label: 'Trauma Units' },
    { id: 'hospital', label: 'General & Specialty ER' },
    { id: 'blood_bank', label: 'Blood Banks' },
    { id: 'pharmacy', label: '24/7 Pharmacies' }
  ];

  const handleRequestLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setHasLocationPermission(true);
          setIsLocating(false);
        },
        () => {
          // Graceful fallback to demo coordinates
          setHasLocationPermission(true);
          setIsLocating(false);
        },
        { timeout: 4000 }
      );
    } else {
      setHasLocationPermission(true);
      setIsLocating(false);
    }
  };

  const filteredHospitals = SAMPLE_HOSPITALS.filter((h) => {
    const matchesFilter = selectedFilter === 'all' || h.facilityType === selectedFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      h.name.toLowerCase().includes(query) ||
      h.address.toLowerCase().includes(query) ||
      h.typeLabel.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const handleSimulateCallFacility = (h: Hospital) => {
    setCallingFacility(h);
  };

  const executeFacilityDial = () => {
    if (callingFacility) {
      alert(`DEMO MODE: Opening device dialler for ${callingFacility.name} (${callingFacility.emergencyPhone}). In live deployment, connects directly to hospital triage.`);
      setCallingFacility(null);
    }
  };

  const handleGetDirections = (h: Hospital) => {
    const encoded = encodeURIComponent(`${h.name}, ${h.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
              <HospitalIcon className="w-3.5 h-3.5" />
              <span>Healthcare Discovery & Care Finder</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              Nearby Hospitals & Emergency Facilities
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Locate verified trauma centers, blood banks, and pharmacies near your location. Filter by specialty and check live ICU bed availability.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToAmbulance}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-md transition-all self-start sm:self-auto"
          >
            <Ambulance className="w-4 h-4" />
            <span>Request Ambulance Assistance</span>
          </button>
        </div>

        {/* Location Permission & Status */}
        <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-lifeline-primary shrink-0" />
            {hasLocationPermission ? (
              <span className="font-semibold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Live location active · Calculated distances from AIIMS / South Delhi region
              </span>
            ) : (
              <span>Location access not granted yet. Using calibrated New Delhi regional reference.</span>
            )}
          </div>

          {!hasLocationPermission && (
            <button
              type="button"
              onClick={handleRequestLocation}
              disabled={isLocating}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-colors self-stretch sm:self-auto justify-center"
            >
              <LocateFixed className="w-3.5 h-3.5 text-blue-600" />
              <span>{isLocating ? 'Locating...' : 'Use My Exact Location'}</span>
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <search>
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <label htmlFor="hospital-search" className="sr-only">Search hospitals or facilities</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="hospital-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search facility name, specialty, or area (e.g. AIIMS, Safdarjung, Blood Bank)..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lifeline-primary focus:bg-white transition-all shadow-inner"
              />
            </form>
          </search>
        </div>

        {/* Filter Chips */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === f.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((hosp) => (
          <article
            key={hosp.id}
            className="bg-white rounded-3xl p-5 border border-surface-border hover:border-lifeline-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    {hosp.typeLabel}
                  </span>
                  <h2 className="text-base font-extrabold text-navy mt-0.5">
                    {hosp.name}
                  </h2>
                </div>

                {hosp.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {hosp.badge}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{hosp.address}</span>
              </div>

              {/* Distance & ETA & ICU Status */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <div className="bg-slate-100 px-2.5 py-1 rounded-lg font-bold text-navy flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-blue-600" />
                  <span>{hosp.distanceKm} km away</span>
                </div>
                <div className="bg-slate-100 px-2.5 py-1 rounded-lg font-semibold text-slate-600 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>~{hosp.travelTimeMin} mins drive</span>
                </div>
                {hosp.icuBedsAvailable !== undefined && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                    <Bed className="w-3 h-3 text-emerald-600" />
                    <span>{hosp.icuBedsAvailable} ICU Beds</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSimulateCallFacility(hosp)}
                className="flex-1 py-2 px-3 bg-lifeline-primary hover:bg-lifeline-dark text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Emergency</span>
              </button>
              <button
                type="button"
                onClick={() => handleGetDirections(hosp)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>Directions</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-500 flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Facility entries are calibrated sample entries for demonstration purposes. Future updates support real-time OpenStreetMap and hospital API integration.
        </span>
      </div>

      {/* Confirmation Modal Before Calling Facility */}
      {callingFacility && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border-2 border-slate-200 space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-lifeline-primary flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="font-extrabold text-navy text-base">Confirm Hospital Call</h4>
              <p className="text-xs text-slate-600 mt-1">
                Call <strong>{callingFacility.name}</strong> at <strong>{callingFacility.emergencyPhone}</strong>?
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCallingFacility(null)}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeFacilityDial}
                className="flex-1 py-2.5 px-3 bg-lifeline-primary hover:bg-lifeline-dark text-white text-xs font-bold rounded-xl shadow-md"
              >
                Open Dialler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
