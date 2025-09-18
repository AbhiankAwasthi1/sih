import React from 'react';
import { User, Heart, Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import LanguageSwitcher from './LanguageSwitcher';

interface RoleSelectionProps {
  onRoleSelect: (role: 'patient' | 'caretaker') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-amber-800">CareConnect</h2>
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            {t('selectRole', language)}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => onRoleSelect('patient')}
            className="group p-8 border-2 border-amber-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 text-center"
          >
            <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
              <Heart className="w-10 h-10 text-amber-600" />
            </div>
            <h4 className="text-xl font-semibold text-amber-800 mb-2">
              {t('patient', language)}
            </h4>
            <p className="text-amber-600">
              Manage your medications and track your health
            </p>
          </button>

          <button
            onClick={() => onRoleSelect('caretaker')}
            className="group p-8 border-2 border-amber-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 text-center"
          >
            <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
              <Users className="w-10 h-10 text-amber-600" />
            </div>
            <h4 className="text-xl font-semibold text-amber-800 mb-2">
              {t('caretaker', language)}
            </h4>
            <p className="text-amber-600">
              Monitor and assist your patients
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;