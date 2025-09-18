import React from 'react';
import { Heart, Users, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import LanguageSwitcher from './LanguageSwitcher';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-amber-600" />
          <h1 className="text-2xl font-bold text-amber-800">CareConnect</h1>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-900 mb-8 leading-tight">
            {t('heroHeadline', language)}
          </h2>
          
          {/* Hero Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Caretaker helping elderly person"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-amber-700 font-medium">Compassionate Care</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/7551544/pexels-photo-7551544.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Senior using medication tracker"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-amber-700 font-medium">Easy Medication Management</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/7551470/pexels-photo-7551470.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Family caring for elderly"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-amber-700 font-medium">Family Connection</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Simple & Safe</h3>
              <p className="text-amber-700">Large fonts, clear buttons, and intuitive design for seniors</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Connected Care</h3>
              <p className="text-amber-700">Link with family and professional caretakers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Health Tracking</h3>
              <p className="text-amber-700">Monitor medications and symptoms easily</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-xl text-2xl font-semibold shadow-lg transition-colors"
          >
            {t('getStarted', language)}
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;