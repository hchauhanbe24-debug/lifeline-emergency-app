import { EmergencyContact } from '../types';

export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'contact-1',
    name: 'Anita Sharma (Mom)',
    relationship: 'Mother',
    phone: '+91 98110 23456',
    isPrimary: true,
    notifyOnSos: true
  },
  {
    id: 'contact-2',
    name: 'Rajesh Sharma (Dad)',
    relationship: 'Father',
    phone: '+91 98110 98765',
    isPrimary: false,
    notifyOnSos: true
  },
  {
    id: 'contact-3',
    name: 'Dr. Vivek Mehra',
    relationship: 'Family Physician',
    phone: '+91 98712 34567',
    isPrimary: false,
    notifyOnSos: true
  },
  {
    id: 'contact-4',
    name: 'University Campus Security Desk',
    relationship: 'Campus Safety',
    phone: '+91 11 2659 1000',
    isPrimary: false,
    notifyOnSos: true
  }
];
