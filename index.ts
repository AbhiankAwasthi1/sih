export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'patient' | 'caretaker';
  language: 'en' | 'hi';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  reminderTime: string;
  instructions?: string;
  taken: boolean;
  nextDose?: Date;
}

export interface Symptom {
  id: string;
  name: string;
  severity: number;
  description: string;
  triggers: string[];
  date: Date;
}

export interface Patient extends User {
  medications: Medication[];
  symptoms: Symptom[];
  caretakers: string[];
  conditions: string[];
}

export interface Caretaker extends User {
  patients: string[];
}

export interface CaretakerOption {
  id: string;
  name: string;
  experience: string;
  rating: number;
  specialization: string;
  available: boolean;
}