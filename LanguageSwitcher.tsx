import React from 'react';
import { Globe } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg border border-amber-300 transition-colors text-lg font-medium"
    >
      <Globe size={20} />
      {t('changeLanguage', language)}
    </button>
  );
};

export default LanguageSwitcher;