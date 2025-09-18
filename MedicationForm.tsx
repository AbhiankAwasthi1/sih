import React, { useState } from 'react';
import { X, Pill } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface MedicationFormProps {
  onClose: () => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ onClose }) => {
  const { language, currentUser, addMedication } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    reminderTime: '',
    instructions: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (currentUser && formData.name && formData.dosage && formData.frequency && formData.reminderTime) {
      addMedication(currentUser.id, formData);
      
      // Reset form
      setFormData({
        name: '',
        dosage: '',
        frequency: '',
        reminderTime: '',
        instructions: ''
      });
      
      // Show success message
      alert('Medication added successfully!');
      onClose();
    } else {
      alert('Please fill all required fields');
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Pill className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-bold text-amber-800">
              {t('addNewMedication', language)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-amber-800 mb-2">
              {t('medicationName', language)}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
              placeholder="e.g., Combiflam, Aspirin"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-amber-800 mb-2">
              {t('dosage', language)}
            </label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
              placeholder="e.g., 500 mg, 1 tablet"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-amber-800 mb-2">
              {t('frequency', language)}
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
              required
            >
              <option value="">Select frequency</option>
              <option value="Once Daily">Once Daily</option>
              <option value="Twice Daily">Twice Daily</option>
              <option value="Three Times Daily">Three Times Daily</option>
              <option value="Four Times Daily">Four Times Daily</option>
              <option value="As Needed">As Needed</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-amber-800 mb-2">
              {t('reminderTime', language)}
            </label>
            <input
              type="time"
              value={formData.reminderTime}
              onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-amber-800 mb-2">
              {t('instructions', language)}
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
              placeholder="e.g., Take with food"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-amber-200 text-amber-800 rounded-lg text-lg font-medium hover:bg-amber-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-lg font-medium transition-colors"
            >
              {loading ? 'Adding...' : 'Add Medication'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicationForm;