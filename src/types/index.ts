export type EmergencyCategory =
  | 'cpr'
  | 'choking'
  | 'bleeding'
  | 'burns'
  | 'fractures'
  | 'recovery'
  | 'bites'
  | 'heatstroke';

export interface FirstAidStep {
  stepNumber: number;
  title: string;
  instruction: string;
  detail: string;
  tip?: string;
  warning?: string;
  actionText?: string;
}

export interface FirstAidGuide {
  id: string;
  title: string;
  subtitle: string;
  category: EmergencyCategory;
  categoryLabel: string;
  shortDescription: string;
  severity: 'critical' | 'urgent' | 'moderate';
  estimatedTime: string;
  verifiedBy: string;
  warnings: string[];
  whatNotToDo: string[];
  equipmentNeeded: string[];
  steps: FirstAidStep[];
  tags: string[];
  isPopular?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary?: boolean;
  notifyOnSos: boolean;
}

export type FacilityType = 'trauma' | 'hospital' | 'blood_bank' | 'pharmacy';

export interface Hospital {
  id: string;
  name: string;
  facilityType: FacilityType;
  typeLabel: string;
  address: string;
  distanceKm: number;
  travelTimeMin: number;
  emergencyPhone: string;
  open24x7: boolean;
  traumaLevel?: string;
  icuBedsAvailable?: number;
  rating: number;
  badge?: string;
}

export interface AmbulanceRequest {
  id: string;
  patientName: string;
  phone: string;
  emergencyType: string;
  location: string;
  patientCondition: string;
  timestamp: string;
  demoSimulationId: string;
  status: 'simulated_queued' | 'simulated_en_route';
  etaMinutes: number;
}

export interface UserProfile {
  name: string;
  bloodGroup: string;
  dateOfBirth?: string;
  allergies: string;
  medicalConditions: string;
  organDonor: boolean;
  preparednessScore: number;
}
