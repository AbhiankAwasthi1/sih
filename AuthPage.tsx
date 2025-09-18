import React, { useState } from 'react';
import { Phone, Mail, User, Lock, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import LanguageSwitcher from './LanguageSwitcher';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const { language } = useApp();
  const { authenticateUser, registerUser } = useApp();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (mobileNumber.length >= 10) {
      setShowOtp(true);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let success = false;
      
      if (activeTab === 'signup') {
        if (showOtp) {
          success = await registerUser(mobileNumber, otp);
        } else {
          setError('Please send OTP first');
          setLoading(false);
          return;
        }
      } else {
        if (username && password) {
          success = await authenticateUser('username', username, password);
        } else if (email && password) {
          success = await authenticateUser('email', email, password);
        } else {
          setError('Please fill all required fields');
          setLoading(false);
          return;
        }
      }
      
      if (success) {
        onAuthSuccess();
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-amber-800">CareConnect</h2>
          <LanguageSwitcher />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
            {error}
          </div>
        )}
        {/* Tab Navigation */}
        <div className="flex mb-8 bg-amber-50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 px-4 rounded-md text-lg font-medium transition-colors ${
              activeTab === 'signup'
                ? 'bg-white text-amber-800 shadow-sm'
                : 'text-amber-600 hover:text-amber-800'
            }`}
          >
            {t('signUp', language)}
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 px-4 rounded-md text-lg font-medium transition-colors ${
              activeTab === 'login'
                ? 'bg-white text-amber-800 shadow-sm'
                : 'text-amber-600 hover:text-amber-800'
            }`}
          >
            {t('login', language)}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'signup' ? (
            <>
              {/* Mobile Number */}
              <div>
                <label className="block text-lg font-medium text-amber-800 mb-2">
                  {t('mobileNumber', language)}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
                    placeholder="9876543210"
                    required
                  />
                </div>
                {!showOtp && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg text-lg font-medium transition-colors"
                  >
                    {t('sendOTP', language)}
                  </button>
                )}
              </div>

              {/* OTP */}
              {showOtp && (
                <div>
                  <label className="block text-lg font-medium text-amber-800 mb-2">
                    {t('enterOTP', language)}
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none text-center"
                    placeholder="123456"
                    maxLength={6}
                    required
                  />
                </div>
              )}

              {/* CAPTCHA */}
              <div className="flex items-center gap-3">
                <input type="checkbox" id="captcha" className="w-5 h-5 text-amber-600" />
                <label htmlFor="captcha" className="text-lg text-amber-800">
                  {t('notRobot', language)}
                </label>
              </div>

              {/* Alternative Methods */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 border-2 border-amber-200 rounded-lg text-lg font-medium text-amber-800 hover:bg-amber-50 transition-colors"
                >
                  <Mail size={20} />
                  {t('signUpGoogle', language)}
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 border-2 border-amber-200 rounded-lg text-lg font-medium text-amber-800 hover:bg-amber-50 transition-colors"
                >
                  <Shield size={20} />
                  {t('signUpEmail', language)}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Email */}
              <div>
                <label className="block text-lg font-medium text-amber-800 mb-2">
                  Email or Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
                  <input
                    type="text"
                    value={username || email}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.includes('@')) {
                        setEmail(value);
                        setUsername('');
                      } else {
                        setUsername(value);
                        setEmail('');
                      }
                    }}
                    className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
                    placeholder="Enter email or username"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-lg font-medium text-amber-800 mb-2">
                  {t('username', language)}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-lg font-medium text-amber-800 mb-2">
                  {t('password', language)}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg text-xl font-semibold transition-colors"
          >
            {loading ? 'Please wait...' : (activeTab === 'signup' ? t('signUp', language) : t('login', language))}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;