import React, { useState } from 'react';
import { Users, Star, Clock, Award, Plus, User, Phone } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const CaretakerSelector: React.FC = () => {
  const { language, currentUser, availableCaretakers, addCaretaker, addCustomCaretaker } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [customCaretaker, setCustomCaretaker] = useState({
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSelectCaretaker = (caretakerId: string) => {
    if (currentUser) {
      addCaretaker(currentUser.id, caretakerId);
      alert('Caretaker added successfully!');
    }
  };

  const handleAddCustomCaretaker = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (customCaretaker.name && customCaretaker.phone) {
      if (currentUser) {
        addCustomCaretaker(currentUser.id, customCaretaker.name, customCaretaker.phone);
        alert(`Custom caretaker ${customCaretaker.name} added successfully!`);
      }
      setCustomCaretaker({ name: '', phone: '' });
      setShowAddForm(false);
    } else {
      alert('Please fill all required fields');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Available Caretakers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-amber-800">
            {t('availableCaretakers', language)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableCaretakers.map((caretaker) => (
            <div
              key={caretaker.id}
              className={`p-6 border-2 rounded-xl transition-all ${
                caretaker.available
                  ? 'border-amber-200 hover:border-amber-400 hover:shadow-md'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-amber-800 mb-1">
                    {caretaker.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-amber-700 font-medium">
                      {caretaker.rating}/5.0
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  caretaker.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {caretaker.available ? 'Available' : 'Busy'}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">
                    {t('experience', language)}: {caretaker.experience}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">
                    {t('specialization', language)}: {caretaker.specialization}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSelectCaretaker(caretaker.id)}
                disabled={!caretaker.available}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  caretaker.available
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {t('selectCaretaker', language)}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Your Own Caretaker */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Plus className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-amber-800">
            {t('addOwnCaretaker', language)}
          </h2>
        </div>

        <p className="text-amber-700 text-lg mb-6">
          Not satisfied with the listed caretakers? Add your own trusted caretaker.
        </p>

        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xl font-semibold transition-colors flex items-center justify-center gap-3"
          >
            <Plus size={24} />
            {t('addCaretakerBtn', language)}
          </button>
        ) : (
          <form onSubmit={handleAddCustomCaretaker} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-amber-800 mb-2">
                {t('caretakerName', language)}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
                <input
                  type="text"
                  value={customCaretaker.name}
                  onChange={(e) => setCustomCaretaker({ ...customCaretaker, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
                  placeholder="Enter caretaker's full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-amber-800 mb-2">
                {t('caretakerPhone', language)}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
                <input
                  type="tel"
                  value={customCaretaker.phone}
                  onChange={(e) => setCustomCaretaker({ ...customCaretaker, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-3 border-2 border-amber-200 text-amber-800 rounded-lg text-lg font-medium hover:bg-amber-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-lg font-medium transition-colors"
              >
                {loading ? 'Adding...' : t('addCaretakerBtn', language)}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CaretakerSelector;