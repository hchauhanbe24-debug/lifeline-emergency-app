import React, { useState } from 'react';
import { 
  PhoneCall, 
  UserPlus, 
  Trash2, 
  Edit3, 
  MapPin, 
  Share2, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  AlertCircle,
  Users,
  Compass,
  Phone,
  MessageSquare
} from 'lucide-react';
import { EmergencyContact } from '../types';

interface EmergencyContactsPageProps {
  contacts: EmergencyContact[];
  setContacts: (contacts: EmergencyContact[] | ((prev: EmergencyContact[]) => EmergencyContact[])) => void;
  onTriggerSos: () => void;
}

export const EmergencyContactsPage: React.FC<EmergencyContactsPageProps> = ({
  contacts,
  setContacts,
  onTriggerSos
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    isPrimary: false,
    notifyOnSos: true
  });

  // Call confirmation modal state
  const [callingContact, setCallingContact] = useState<EmergencyContact | null>(null);
  const [callHelplineConfirm, setCallHelplineConfirm] = useState<boolean>(false);
  const [sharedNotice, setSharedNotice] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      name: '',
      relationship: '',
      phone: '',
      isPrimary: false,
      notifyOnSos: true
    });
    setEditingContact(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      isPrimary: contact.isPrimary || false,
      notifyOnSos: contact.notifyOnSos
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this emergency contact?')) {
      setContacts(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide at least a Name and Phone Number.');
      return;
    }

    if (editingContact) {
      setContacts(prev => prev.map(c => {
        if (c.id === editingContact.id) {
          return {
            ...c,
            name: formData.name,
            relationship: formData.relationship || 'Emergency Contact',
            phone: formData.phone,
            isPrimary: formData.isPrimary,
            notifyOnSos: formData.notifyOnSos
          };
        }
        return formData.isPrimary ? { ...c, isPrimary: false } : c;
      }));
    } else {
      const newContact: EmergencyContact = {
        id: `contact-${Date.now()}`,
        name: formData.name,
        relationship: formData.relationship || 'Emergency Contact',
        phone: formData.phone,
        isPrimary: formData.isPrimary,
        notifyOnSos: formData.notifyOnSos
      };

      setContacts(prev => {
        const list = formData.isPrimary ? prev.map(c => ({ ...c, isPrimary: false })) : [...prev];
        return [newContact, ...list];
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSimulateCall = (contact: EmergencyContact) => {
    setCallingContact(contact);
  };

  const executeSimulatedCall = () => {
    if (callingContact) {
      alert(`DEMO MODE: Opening device dialler for ${callingContact.name} (${callingContact.phone}). In this prototype, no actual call is dialed automatically.`);
      setCallingContact(null);
    }
  };

  const executeHelplineCall = () => {
    alert('DEMO MODE: Opening device dialler for 112 (National Emergency Helpline).');
    setCallHelplineConfirm(false);
  };

  const handleSimulateShareLocation = () => {
    const coords = '28.5672° N, 77.2100° E';
    const message = `EMERGENCY ALERT [Demo Simulation]: I need urgent medical assistance. My estimated location is near AIIMS / Safdarjung, New Delhi (${coords}). Please contact help!`;
    navigator.clipboard?.writeText(message);
    setSharedNotice(`Simulated SOS message copied to clipboard & broadcast to ${contacts.filter(c => c.notifyOnSos).length} guardians.`);
    setTimeout(() => setSharedNotice(null), 5000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Action */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Pre-Incident Guardian Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              Emergency SOS & Contacts
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Set your trusted family, colleagues, and physicians in advance. When SOS is pressed, your real-time GPS coordinates are dispatched immediately.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
            <button
              type="button"
              onClick={onTriggerSos}
              className="flex items-center gap-2 px-4 py-2.5 bg-lifeline-primary hover:bg-lifeline-dark text-white rounded-xl text-xs font-black shadow-md shadow-lifeline-primary/30 transition-all"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Trigger SOS</span>
            </button>
          </div>
        </div>

        {/* Quick Location Broadcast Demonstration Card */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-navy block">Demo Location-Sharing Demonstration</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Simulated coordinates: 28.5672° N, 77.2100° E (Safdarjung / AIIMS Campus, Delhi)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimulateShareLocation}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-stretch sm:self-auto justify-center"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Simulate Location Broadcast</span>
          </button>
        </div>

        {sharedNotice && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{sharedNotice}</span>
          </div>
        )}
      </div>

      {/* Emergency Helpline Direct Access */}
      <div className="bg-lifeline-50 border-2 border-lifeline-primary/20 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-lifeline-primary text-white flex items-center justify-center font-black text-lg shadow-md shadow-lifeline-primary/30">
            112
          </div>
          <div>
            <h3 className="font-extrabold text-navy text-base">National Emergency Helpline (India)</h3>
            <p className="text-xs text-slate-600 mt-0.5">Single emergency number for Ambulance, Police, and Fire services</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCallHelplineConfirm(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-lifeline-primary hover:bg-lifeline-dark text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 112 (Requires Confirmation)</span>
        </button>
      </div>

      {/* Contacts List Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-500" />
            Saved Guardians & Emergency Contacts ({contacts.length})
          </h2>
          <span className="text-xs text-slate-400">Stored in LocalStorage</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-5 rounded-3xl border bg-white shadow-xs transition-all flex flex-col justify-between ${
                contact.isPrimary ? 'border-blue-400 ring-1 ring-blue-300' : 'border-surface-border'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-navy">{contact.name}</h3>
                      {contact.isPrimary && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-700">
                          Primary
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-500 block mt-0.5">
                      {contact.relationship}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(contact)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                      title="Edit contact"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(contact.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-lifeline-primary hover:bg-rose-50 transition-colors"
                      title="Delete contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-navy font-mono">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{contact.phone}</span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${contact.notifyOnSos ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  <span className="text-xs text-slate-500">
                    {contact.notifyOnSos ? 'Will receive emergency SMS on SOS' : 'Calls only'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateCall(contact)}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Simulate Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const msg = `EMERGENCY ALERT [Demo]: Medical assistance required. Contacting ${contact.name}.`;
                    navigator.clipboard?.writeText(msg);
                    alert(`Demo alert drafted for ${contact.name}: copied to clipboard!`);
                  }}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  title="Draft WhatsApp / SMS"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-navy text-lg">
                {editingContact ? 'Edit Emergency Contact' : 'Add Emergency Guardian'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-navy block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Anita Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-navy block mb-1">Relationship</label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                  placeholder="e.g. Mother, Colleague, Campus Warden"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-navy block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="e.g. +91 98110 23456"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lifeline-primary"
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isPrimary}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPrimary: e.target.checked }))}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Designate as Primary Guardian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.notifyOnSos}
                    onChange={(e) => setFormData(prev => ({ ...prev, notifyOnSos: e.target.checked }))}
                    className="w-4 h-4 rounded text-lifeline-primary focus:ring-lifeline-primary"
                  />
                  <span>Dispatch automatic location alert when SOS is triggered</span>
                </label>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-lifeline-primary hover:bg-lifeline-dark text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  {editingContact ? 'Save Changes' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal Before Calling Contact */}
      {callingContact && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border-2 border-slate-200 space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6 text-lifeline-primary" />
            </div>
            <div className="text-center">
              <h4 className="font-extrabold text-navy text-base">Confirm Dialling Contact</h4>
              <p className="text-xs text-slate-600 mt-1">
                You are about to simulate dialling <strong>{callingContact.name}</strong> ({callingContact.phone}).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCallingContact(null)}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeSimulatedCall}
                className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
              >
                Open Dialler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for 112 */}
      {callHelplineConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border-2 border-lifeline-primary space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-lifeline-primary flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="font-extrabold text-navy text-base">Confirm Call to 112?</h4>
              <p className="text-xs text-slate-600 mt-1">
                National Emergency Helpline for India. This is a university demonstration model.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCallHelplineConfirm(false)}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeHelplineCall}
                className="flex-1 py-2.5 px-3 bg-lifeline-primary hover:bg-lifeline-dark text-white text-xs font-bold rounded-xl shadow-md"
              >
                Confirm Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
