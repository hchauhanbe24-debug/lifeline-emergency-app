import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { INITIAL_EMERGENCY_CONTACTS } from './data/sampleContacts';
import { EmergencyContact, UserProfile } from './types';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { PitchDeckModal } from './components/common/PitchDeckModal';
import { SosModal } from './components/emergency/SosModal';

// Pages
import { HomeDashboard } from './pages/HomeDashboard';
import { CprDemoPage } from './pages/CprDemoPage';
import { FirstAidLibrary } from './pages/FirstAidLibrary';
import { EmergencyContactsPage } from './pages/EmergencyContactsPage';
import { NearbyHospitalsPage } from './pages/NearbyHospitalsPage';
import { AmbulanceAssistancePage } from './pages/AmbulanceAssistancePage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedFirstAidId, setSelectedFirstAidId] = useState<string | undefined>(undefined);
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);
  const [isPitchGuideOpen, setIsPitchGuideOpen] = useState<boolean>(false);

  // Persistent contacts and user profile
  const [contacts, setContacts] = useLocalStorage<EmergencyContact[]>(
    'lifeline_emergency_contacts',
    INITIAL_EMERGENCY_CONTACTS
  );

  const [profile, setProfile] = useLocalStorage<UserProfile>('lifeline_user_profile', {
    name: 'Shubham Verma',
    bloodGroup: 'B+',
    allergies: 'No known allergies',
    medicalConditions: 'None',
    organDonor: true,
    preparednessScore: 85
  });

  // Network online/offline status with presentation demo toggle (Scene 6)
  const { isOnline, simulatedOffline, toggleOfflineSimulation } = useNetworkStatus();

  const handleNavigate = (tab: string, extraGuideId?: string) => {
    setActiveTab(tab);
    if (extraGuideId) {
      setSelectedFirstAidId(extraGuideId);
    } else {
      setSelectedFirstAidId(undefined);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePitchSceneSelect = (sceneKey: string) => {
    if (sceneKey === 'offline') {
      // If scene 6 selected, toggle offline simulation on and go to profile or learn
      if (!simulatedOffline) {
        toggleOfflineSimulation();
      }
      setActiveTab('learn');
    } else {
      setActiveTab(sceneKey);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Demo Disclaimer & Pitch Shortcut Banner */}
      <DemoBanner
        isOnline={isOnline}
        simulatedOffline={simulatedOffline}
        onToggleOffline={toggleOfflineSimulation}
        onOpenPitchGuide={() => setIsPitchGuideOpen(true)}
      />

      {/* Main Top Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab)}
        onTriggerSos={() => setIsSosOpen(true)}
        isOnline={isOnline}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-12">
        {activeTab === 'home' && (
          <HomeDashboard
            onNavigate={handleNavigate}
            onTriggerSos={() => setIsSosOpen(true)}
            contacts={contacts}
            profile={profile}
            isOnline={isOnline}
          />
        )}

        {activeTab === 'cpr' && (
          <CprDemoPage
            onBackToLibrary={() => handleNavigate('learn')}
            onTriggerSos={() => setIsSosOpen(true)}
          />
        )}

        {activeTab === 'learn' && (
          <FirstAidLibrary
            key={selectedFirstAidId || 'all'}
            initialGuideId={selectedFirstAidId}
            onTriggerSos={() => setIsSosOpen(true)}
          />
        )}

        {activeTab === 'contacts' && (
          <EmergencyContactsPage
            contacts={contacts}
            setContacts={setContacts}
            onTriggerSos={() => setIsSosOpen(true)}
          />
        )}

        {activeTab === 'hospitals' && (
          <NearbyHospitalsPage
            onNavigateToAmbulance={() => handleNavigate('ambulance')}
            onTriggerSos={() => setIsSosOpen(true)}
          />
        )}

        {activeTab === 'ambulance' && (
          <AmbulanceAssistancePage
            onBackToHospitals={() => handleNavigate('hospitals')}
            onTriggerSos={() => setIsSosOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            profile={profile}
            setProfile={setProfile}
            contacts={contacts}
            onNavigateToContacts={() => handleNavigate('contacts')}
            isOnline={isOnline}
            simulatedOffline={simulatedOffline}
            onToggleOffline={toggleOfflineSimulation}
            onOpenPitchModal={() => setIsPitchGuideOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab)}
        onTriggerSos={() => setIsSosOpen(true)}
      />

      {/* Emergency SOS Modal (With 3s Abort Countdown & 112 Confirmation) */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        contacts={contacts}
      />

      {/* Presentation Pitch Companion Modal (Slide 6 & Team Info) */}
      <PitchDeckModal
        isOpen={isPitchGuideOpen}
        onClose={() => setIsPitchGuideOpen(false)}
        onSelectScene={handlePitchSceneSelect}
      />
    </div>
  );
}

export default App;
