import React, { useState } from 'react';
import { Users, AlertTriangle, Clock, Phone, CheckCircle, XCircle, Activity, Pill } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import LanguageSwitcher from './LanguageSwitcher';

const CaretakerDashboard: React.FC = () => {
  const { language, patients, helpRequests, currentUser } = useApp();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  // Filter patients assigned to current caretaker
  const assignedPatients = patients.filter(patient => 
    patient.caretakers.includes(currentUser?.id || '')
  );

  const selectedPatientData = assignedPatients.find(p => p.id === selectedPatient);

  const getUrgentRequests = () => {
    return helpRequests.filter(req => req.status === 'pending');
  };

  const getMedicationAdherence = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient || patient.medications.length === 0) return 0;
    
    const takenCount = patient.medications.filter(med => med.taken).length;
    return Math.round((takenCount / patient.medications.length) * 100);
  };

  const getMissedMedications = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return [];
    
    return patient.medications.filter(med => !med.taken);
  };

  const getRecentSymptoms = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return [];
    
    return patient.symptoms.slice(-5).reverse();
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'text-green-600 bg-green-100';
    if (severity <= 6) return 'text-yellow-600 bg-yellow-100';
    if (severity <= 8) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getSeverityEmoji = (severity: number) => {
    if (severity <= 3) return '😀';
    if (severity <= 6) return '😐';
    if (severity <= 8) return '😟';
    return '😞';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-amber-200 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-800">Caretaker Dashboard</h1>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="p-6">
        {!selectedPatient ? (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Urgent Help Requests */}
            {getUrgentRequests().length > 0 && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-red-800">Urgent Help Requests</h2>
                </div>
                
                <div className="space-y-4">
                  {getUrgentRequests().map((request) => (
                    <div key={request.id} className="bg-white p-4 rounded-lg border border-red-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-red-800">{request.patientName}</h3>
                          <p className="text-red-600">Requested help at {request.timestamp.toLocaleTimeString()}</p>
                          <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                            {request.urgency.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <Phone size={16} />
                            Call Patient
                          </button>
                          <button 
                            onClick={() => setSelectedPatient(request.patientId)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Patients Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-amber-800">Your Patients</h2>
              </div>

              {assignedPatients.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-amber-600 text-lg">No patients assigned yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assignedPatients.map((patient) => {
                    const adherence = getMedicationAdherence(patient.id);
                    const missedMeds = getMissedMedications(patient.id);
                    const recentSymptoms = getRecentSymptoms(patient.id);
                    
                    return (
                      <div
                        key={patient.id}
                        className="border-2 border-amber-200 rounded-xl p-6 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedPatient(patient.id)}
                      >
                        <h3 className="text-xl font-semibold text-amber-800 mb-4">{patient.name}</h3>
                        
                        {/* Medication Adherence */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-amber-700">Medication Adherence</span>
                            <span className={`font-bold ${adherence >= 80 ? 'text-green-600' : adherence >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {adherence}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${adherence >= 80 ? 'bg-green-500' : adherence >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${adherence}%` }}
                            />
                          </div>
                        </div>

                        {/* Missed Medications Alert */}
                        {missedMeds.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              <span className="text-red-800 font-medium">Missed Medications</span>
                            </div>
                            <p className="text-red-700 text-sm">{missedMeds.length} medication(s) not taken</p>
                          </div>
                        )}

                        {/* Recent Symptoms */}
                        {recentSymptoms.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-amber-700 font-medium mb-2">Recent Symptoms</h4>
                            <div className="space-y-1">
                              {recentSymptoms.slice(0, 2).map((symptom) => (
                                <div key={symptom.id} className="flex items-center gap-2">
                                  <span className="text-lg">{getSeverityEmoji(symptom.severity)}</span>
                                  <span className="text-amber-700 text-sm">{symptom.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Conditions */}
                        <div className="mb-4">
                          <h4 className="text-amber-700 font-medium mb-2">Conditions</h4>
                          <div className="flex flex-wrap gap-1">
                            {patient.conditions.map((condition, index) => (
                              <span key={index} className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Patient Detail View */
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setSelectedPatient(null)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
              >
                ← Back to Patients
              </button>
              <h2 className="text-3xl font-bold text-amber-800">{selectedPatientData?.name}</h2>
            </div>

            {selectedPatientData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Patient Overview */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">Patient Overview</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-amber-700 font-medium">Phone:</span>
                      <span className="ml-2 text-amber-800">{selectedPatientData.phone}</span>
                    </div>
                    
                    <div>
                      <span className="text-amber-700 font-medium">Conditions:</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedPatientData.conditions.map((condition, index) => (
                          <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-amber-700 font-medium">Medication Adherence:</span>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span>{getMedicationAdherence(selectedPatientData.id)}% this week</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-green-500 h-3 rounded-full"
                            style={{ width: `${getMedicationAdherence(selectedPatientData.id)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medications Status */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">Medications Status</h3>
                  
                  <div className="space-y-3">
                    {selectedPatientData.medications.map((medication) => (
                      <div key={medication.id} className="flex items-center justify-between p-3 border border-amber-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-amber-800">{medication.name}</h4>
                          <p className="text-amber-600">{medication.dosage} • {medication.frequency}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {medication.taken ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                          <span className={`font-medium ${medication.taken ? 'text-green-600' : 'text-red-600'}`}>
                            {medication.taken ? 'Taken' : 'Missed'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Symptoms */}
                <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">Recent Symptoms</h3>
                  
                  {selectedPatientData.symptoms.length === 0 ? (
                    <p className="text-amber-600">No symptoms logged yet</p>
                  ) : (
                    <div className="space-y-4">
                      {getRecentSymptoms(selectedPatientData.id).map((symptom) => (
                        <div key={symptom.id} className="p-4 border border-amber-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-semibold text-amber-800">{symptom.name}</h4>
                            <span className="text-amber-600">{symptom.date.toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{getSeverityEmoji(symptom.severity)}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(symptom.severity)}`}>
                              Severity: {symptom.severity}/10
                            </span>
                          </div>
                          
                          <p className="text-amber-700 mb-2">{symptom.description}</p>
                          
                          {symptom.triggers.length > 0 && (
                            <p className="text-amber-600">
                              <strong>Triggers:</strong> {symptom.triggers.join(', ')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaretakerDashboard;