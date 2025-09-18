import React from 'react';
import { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import RoleSelection from './components/RoleSelection';
import PatientDashboard from './components/PatientDashboard';
import CaretakerDashboard from './components/CaretakerDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'role' | 'dashboard'>('landing');
  const [userRole, setUserRole] = useState<'patient' | 'caretaker' | null>(null);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentPage('role');
  };

  const handleRoleSelect = (role: 'patient' | 'caretaker') => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  return (
    <AppProvider>
      {currentPage === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
      {currentPage === 'auth' && <AuthPage onAuthSuccess={handleAuthSuccess} />}
      {currentPage === 'role' && <RoleSelection onRoleSelect={handleRoleSelect} />}
      {currentPage === 'dashboard' && userRole === 'patient' && <PatientDashboard />}
      {currentPage === 'dashboard' && userRole === 'caretaker' && <CaretakerDashboard />}
    </AppProvider>
  );
}

export default App;
