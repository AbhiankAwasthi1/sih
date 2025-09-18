import React, { useEffect } from 'react';
import { X, Phone, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface HelpRequestPopupProps {
  onClose: () => void;
}

const HelpRequestPopup: React.FC<HelpRequestPopupProps> = ({ onClose }) => {
  const { language } = useApp();

  useEffect(() => {
    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-amber-800 mb-2">
              {t('requestingHelp', language)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-amber-600" />
          <p className="text-lg text-amber-700">
            {t('caretakerCalled', language)}
          </p>
        </div>

        {/* Loading animation */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg text-lg font-medium transition-colors"
        >
          {t('close', language)}
        </button>
      </div>
    </div>
  );
};

export default HelpRequestPopup;