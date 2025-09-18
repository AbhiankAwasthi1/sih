import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Patient, Caretaker, Medication, Symptom, CaretakerOption } from '../types';

interface AppContextType {
  currentUser: User | null;
  language: 'en' | 'hi';
  patients: Patient[];
  caretakers: Caretaker[];
  availableCaretakers: CaretakerOption[];
  helpRequests: HelpRequest[];
  setCurrentUser: (user: User | null) => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  addMedication: (patientId: string, medication: Omit<Medication, 'id' | 'taken'>) => void;
  addSymptom: (patientId: string, symptom: Omit<Symptom, 'id' | 'date'>) => void;
  markMedicationTaken: (patientId: string, medicationId: string) => void;
  addCaretaker: (patientId: string, caretakerId: string) => void;
  addCustomCaretaker: (patientId: string, name: string, phone: string) => void;
  requestCaretakerHelp: (patientId: string) => void;
  authenticateUser: (method: 'email' | 'mobile' | 'username', credential: string, password?: string) => Promise<boolean>;
  registerUser: (mobile: string, otp: string) => Promise<boolean>;
}

interface HelpRequest {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: Date;
  status: 'pending' | 'resolved';
  urgency: 'low' | 'medium' | 'high';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'patient1',
      name: 'Rajesh Kumar',
      phone: '+91-9876543210',
      role: 'patient',
      language: 'en',
      medications: [
        {
          id: 'med1',
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice Daily',
          reminderTime: '08:00',
          instructions: 'Take with food',
          taken: false
        }
      ],
      symptoms: [],
      caretakers: ['caretaker1'],
      conditions: ['Type 2 Diabetes']
    }
  ]);
  const [caretakers, setCaretakers] = useState<Caretaker[]>([]);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);

  const availableCaretakers: CaretakerOption[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      experience: '5 years',
      rating: 4.8,
      specialization: 'Elderly Care',
      available: true
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      experience: '8 years',
      rating: 4.9,
      specialization: 'Medical Assistant',
      available: true
    },
    {
      id: '3',
      name: 'Sunita Devi',
      experience: '3 years',
      rating: 4.7,
      specialization: 'Home Care',
      available: false
    }
  ];

  const authenticateUser = async (method: 'email' | 'mobile' | 'username', credential: string, password?: string): Promise<boolean> => {
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any valid input
    if (method === 'email' && credential.includes('@')) {
      setCurrentUser({
        id: 'user1',
        name: 'Demo User',
        phone: '+91-9876543210',
        role: 'patient',
        language: language
      });
      return true;
    }
    
    if (method === 'mobile' && credential.length >= 10) {
      setCurrentUser({
        id: 'user1',
        name: 'Demo User',
        phone: credential,
        role: 'patient',
        language: language
      });
      return true;
    }
    
    if (method === 'username' && credential.length > 0 && password && password.length > 0) {
      setCurrentUser({
        id: 'user1',
        name: credential,
        phone: '+91-9876543210',
        role: 'patient',
        language: language
      });
      return true;
    }
    
    return false;
  };

  const registerUser = async (mobile: string, otp: string): Promise<boolean> => {
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mobile.length >= 10 && otp.length === 6) {
      setCurrentUser({
        id: 'user1',
        name: 'New User',
        phone: mobile,
        role: 'patient',
        language: language
      });
      return true;
    }
    
    return false;
  };
  const addMedication = (patientId: string, medication: Omit<Medication, 'id' | 'taken'>) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? {
            ...patient,
            medications: [...patient.medications, {
              ...medication,
              id: Date.now().toString(),
              taken: false
            }]
          }
        : patient
    ));
  };

  const addSymptom = (patientId: string, symptom: Omit<Symptom, 'id' | 'date'>) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? {
            ...patient,
            symptoms: [...patient.symptoms, {
              ...symptom,
              id: Date.now().toString(),
              date: new Date()
            }]
          }
        : patient
    ));
  };

  const markMedicationTaken = (patientId: string, medicationId: string) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? {
            ...patient,
            medications: patient.medications.map(med => 
              med.id === medicationId ? { ...med, taken: true } : med
            )
          }
        : patient
    ));
  };

  const addCaretaker = (patientId: string, caretakerId: string) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? {
            ...patient,
            caretakers: [...patient.caretakers, caretakerId]
          }
        : patient
    ));
  };

  const addCustomCaretaker = (patientId: string, name: string, phone: string) => {
    const newCaretakerId = Date.now().toString();
    
    // Add to caretakers list
    setCaretakers(prev => [...prev, {
      id: newCaretakerId,
      name,
      phone,
      role: 'caretaker',
      language: language,
      patients: [patientId]
    }]);
    
    // Link to patient
    addCaretaker(patientId, newCaretakerId);
  };
  const requestCaretakerHelp = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      const newRequest: HelpRequest = {
        id: Date.now().toString(),
        patientId,
        patientName: patient.name,
        timestamp: new Date(),
        status: 'pending',
        urgency: 'high'
      };
      
      setHelpRequests(prev => [...prev, newRequest]);
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      language,
      patients,
      caretakers,
      availableCaretakers,
      helpRequests,
      setCurrentUser,
      setLanguage,
      addMedication,
      addSymptom,
      markMedicationTaken,
      addCaretaker,
      addCustomCaretaker,
      requestCaretakerHelp,
      authenticateUser,
      registerUser
    }}>
      {children}
    </AppContext.Provider>
  );
};