import React, { useState } from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

const SymptomTracker: React.FC = () => {
  const { language, currentUser, patients, addSymptom } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    severity: 1,
    description: '',
    triggers: ''
  });

  const currentPatient = patients.find(p => p.id === currentUser?.id);
  const recentSymptoms = currentPatient?.symptoms || [];

  const commonSymptoms = [
    'Headache', 'Fatigue', 'Nausea', 'Dizziness', 'Back Pain',
    'Joint Pain', 'Shortness of Breath', 'Chest Pain', 'Stomach Pain', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && formData.name && formData.description) {
      addSymptom(currentUser.id, {
        ...formData,
        triggers: formData.triggers.split(',').map(t => t.trim()).filter(Boolean)
      });
      setFormData({ name: '', severity: 1, description: '', triggers: '' });
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'bg-green-500';
    if (severity <= 6) return 'bg-yellow-500';
    if (severity <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getSeverityEmoji = (severity: number) => {
    if (severity <= 3) return '😀';
    if (severity <= 6) return '😐';
    if (severity <= 8) return '😟';
    return '😞';
  };

  const getSeverityLabel = (severity: number) => {
    if (severity <= 3) return t('mild', language);
    if (severity <= 6) return t('moderate', language);
    if (severity <= 8) return t('high', language);
    return t('severe', language);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Daily Symptom Tracker */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-amber-800">
            {t('dailySymptomTracker', language)}
          </h2>
        </div>
        
        <p className="text-amber-700 text-lg mb-6">
          {t('logSymptoms', language)}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Symptom Selection */}
          <div>
            <label className="block text-lg font-medium text-amber-800 mb-3">
              {t('symptom', language)}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => setFormData({ ...formData, name: symptom })}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${
                    formData.name === symptom
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-amber-200 hover:border-amber-300 text-amber-700'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
            {formData.name === 'Other' && (
              <input
                type="text"
                placeholder="Describe your symptom"
                className="mt-3 w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            )}
          </div>

          {/* Severity Level */}
          <div>
            <label className="block text-lg font-medium text-amber-800 mb-3">
              {t('severityLevel', language)}: {formData.severity}/10 - {getSeverityLabel(formData.severity)} {getSeverityEmoji(formData.severity)}
            </label>
            <div className="flex items-center gap-4">
              <span className="text-amber-600">1</span>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: parseInt(e.target.value) })}
                className="flex-1 h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-amber-600">10</span>
            </div>
            <div className="flex justify-between text-sm text-amber-600 mt-2">
              <span>{t('mild', language)}</span>
              <span>{t('moderate', language)}</span>
              <span>{t('high', language)}</span>
              <span>{t('severe', language)}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-amber-800 mb-2">
              {t('describeSymptom', language)}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
              placeholder="Describe your symptom, when it started, what makes it better/worse"
              rows={4}
              required
            />
          </div>

          {/* Triggers */}
          <div>
            <label className="block text-lg font-medium text-amber-800 mb-2">
              {t('possibleTriggers', language)}
            </label>
            <input
              type="text"
              value={formData.triggers}
              onChange={(e) => setFormData({ ...formData, triggers: e.target.value })}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
              placeholder="e.g., stress, food, weather (separate with commas)"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg text-xl font-semibold transition-colors"
          >
            Log Symptom
          </button>
        </form>
      </div>

      {/* Recent Symptoms */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-amber-800">
            {t('recentSymptoms', language)}
          </h2>
        </div>

        {recentSymptoms.length === 0 ? (
          <p className="text-amber-600 text-lg text-center py-8">
            No symptoms logged yet
          </p>
        ) : (
          <div className="space-y-4">
            {recentSymptoms.slice().reverse().map((symptom) => (
              <div key={symptom.id} className="p-4 border border-amber-200 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-amber-800">
                    {symptom.name}
                  </h3>
                  <span className="text-amber-600">
                    {symptom.date.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-24 h-3 rounded-full ${getSeverityColor(symptom.severity)}`} />
                  <span className="text-2xl">{getSeverityEmoji(symptom.severity)}</span>
                  <span className="text-amber-700 font-medium">
                    {getSeverityLabel(symptom.severity)} ({symptom.severity}/10)
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
  );
};

export default SymptomTracker;