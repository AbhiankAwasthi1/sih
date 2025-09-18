import React, { useState } from 'react';
import { Home, Activity, Bot, UserPlus, Plus, Clock, AlertTriangle, Check } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import { Medication, Symptom } from '../types';
import MedicationForm from './MedicationForm';
import SymptomTracker from './SymptomTracker';
import CaretakerSelector from './CaretakerSelector';
import AIAssistant from './AIAssistant';
import HelpRequestPopup from './HelpRequestPopup';
import LanguageSwitcher from './LanguageSwitcher';

const PatientDashboard: React.FC = () => {
  const { language, currentUser, patients, markMedicationTaken, requestCaretakerHelp } = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'symptoms' | 'ai' | 'caretaker'>('home');
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  const currentPatient = patients.find(p => p.id === currentUser?.id);
  const todaysMedications = currentPatient?.medications || [];

  const handleRequestHelp = () => {
    if (currentUser) {
      requestCaretakerHelp(currentUser.id);
      setShowHelpPopup(true);
    }
  };

  const getTimeUntilNext = (reminderTime: string) => {
    const now = new Date();
    const [hours, minutes] = reminderTime.split(':').map(Number);
    const reminderDate = new Date();
    reminderDate.setHours(hours, minutes, 0, 0);
    
    if (reminderDate < now) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }
    
    const diff = reminderDate.getTime() - now.getTime();
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours: hoursLeft, minutes: minutesLeft };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-amber-200 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-800">CareConnect</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRequestHelp}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Request Help
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-amber-200 px-4">
        <div className="flex space-x-1">
          {[
            { id: 'home', icon: Home, label: t('homeMedications', language) },
            { id: 'symptoms', icon: Activity, label: t('symptoms', language) },
            { id: 'ai', icon: Bot, label: t('aiAssistant', language) },
            { id: 'caretaker', icon: UserPlus, label: t('addCaretaker', language) }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-6 py-4 text-lg font-medium transition-colors ${
                activeTab === id
                  ? 'text-amber-800 border-b-2 border-amber-600'
                  : 'text-amber-600 hover:text-amber-800'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        {activeTab === 'home' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Add New Medication Button - Moved to top */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={() => setShowMedicationForm(true)}
                className="w-full flex items-center justify-center gap-3 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xl font-semibold transition-colors"
              >
                <Plus size={24} />
                {t('addNewMedication', language)}
              </button>
            </div>

            {/* Today's Medications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">
                {t('todaysMedications', language)}
              </h2>
              
              {todaysMedications.length === 0 ? (
                <p className="text-amber-600 text-lg text-center py-8">
                  No medications scheduled for today
                </p>
              ) : (
                <div className="space-y-4">
                  {todaysMedications.map((medication) => {
                    const timeLeft = getTimeUntilNext(medication.reminderTime);
                    return (
                      <div
                        key={medication.id}
                        className={`p-4 rounded-lg border-2 ${
                          medication.taken
                            ? 'border-green-200 bg-green-50'
                            : 'border-amber-200 bg-amber-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-amber-800">
                              {medication.name}
                            </h3>
                            <p className="text-lg text-amber-700 mt-1">
                              {medication.dosage} • {medication.frequency}
                            </p>
                            {medication.instructions && (
                              <div className="flex items-center gap-2 mt-2">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                <p className="text-orange-700">{medication.instructions}</p>
                              </div>
                            )}
                            {!medication.taken && (
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <p className="text-blue-700">
                                  {t('takeIn', language)} {timeLeft.hours} {t('hours', language)} {timeLeft.minutes} {t('minutes', language)}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            {medication.taken ? (
                              <div className="flex items-center gap-2 text-green-600">
                                <Check size={20} />
                                <span className="font-medium">{t('taken', language)}</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => markMedicationTaken(currentUser!.id, medication.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                {t('markTaken', language)}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Prescription Help */}
            <div className="bg-amber-100 rounded-xl p-6 border border-amber-200">
              <p className="text-amber-800 text-lg mb-4">
                Having trouble inputting details? Let your caretaker add them for you.
              </p>
              <button
                onClick={handleRequestHelp}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Request Caretaker Help
              </button>
            </div>
          </div>
        )}

        {activeTab === 'symptoms' && <SymptomTracker />}
        {activeTab === 'ai' && <AIAssistant />}
        {activeTab === 'caretaker' && <CaretakerSelector />}
      </main>

      {/* Modals */}
      {showMedicationForm && (
        <MedicationForm onClose={() => setShowMedicationForm(false)} />
      )}
      
      {showHelpPopup && (
        <HelpRequestPopup onClose={() => setShowHelpPopup(false)} />
      )}
    </div>
  );
};

export default PatientDashboard;