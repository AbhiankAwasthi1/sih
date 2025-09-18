import React, { useState } from 'react';
import { Bot, Send, AlertTriangle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { language } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you with health-related questions. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputText('');
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Headache responses
    if (lowerQuestion.includes('headache') || lowerQuestion.includes('head pain')) {
      return 'Headaches can have various causes:\n\n• **Common causes**: Stress, dehydration, lack of sleep, eye strain, hunger\n• **Immediate relief**: Rest in a dark, quiet room, apply cold compress to forehead, stay hydrated\n• **When to see a doctor**: If headaches are severe, frequent (more than 2-3 times per week), or accompanied by fever, vision changes, or neck stiffness\n• **Prevention**: Regular sleep schedule, stay hydrated, manage stress, avoid trigger foods\n\n⚠️ Seek immediate medical attention if you have sudden, severe headache unlike any before.';
    }
    
    // Back pain responses
    if (lowerQuestion.includes('back pain') || lowerQuestion.includes('backache')) {
      return 'Back pain is very common, especially in seniors:\n\n• **Common causes**: Poor posture, muscle strain, arthritis, herniated disc\n• **Immediate relief**: Rest, apply heat or ice (whichever feels better), gentle stretching\n• **Exercises**: Gentle walking, swimming, yoga can help strengthen back muscles\n• **When to see a doctor**: If pain persists more than a few days, radiates down legs, or causes numbness\n• **Prevention**: Maintain good posture, regular exercise, proper lifting techniques\n\n⚠️ Seek immediate care if back pain follows an injury or is accompanied by fever.';
    }
    
    // Blood pressure responses
    if (lowerQuestion.includes('blood pressure') || lowerQuestion.includes('bp') || lowerQuestion.includes('hypertension')) {
      return 'Blood pressure management is crucial for heart health:\n\n• **Normal range**: Less than 120/80 mmHg\n• **High BP**: 140/90 mmHg or higher\n• **Management**: Low-sodium diet, regular exercise, medication compliance, weight management\n• **Monitoring**: Check regularly, keep a log, same time each day\n• **Lifestyle**: Reduce salt, limit alcohol, quit smoking, manage stress\n• **Diet**: DASH diet - fruits, vegetables, whole grains, lean proteins\n\n⚠️ Always follow your doctor\'s recommendations for monitoring and treatment.';
    }
    
    // Diabetes responses
    if (lowerQuestion.includes('diabetes') || lowerQuestion.includes('blood sugar') || lowerQuestion.includes('glucose')) {
      return 'Diabetes management involves several key components:\n\n• **Blood sugar monitoring**: Check levels as prescribed by your doctor\n• **Diet**: Balanced meals, control carbohydrates, regular meal times\n• **Exercise**: 30 minutes daily walking or approved activities\n• **Medication**: Take as prescribed, never skip doses\n• **Target levels**: Fasting 80-130 mg/dL, after meals less than 180 mg/dL\n• **Warning signs**: Excessive thirst, frequent urination, blurred vision, fatigue\n\n⚠️ Seek immediate care for very high (over 400) or very low (under 70) blood sugar levels.';
    }
    
    // Joint pain responses
    if (lowerQuestion.includes('joint pain') || lowerQuestion.includes('arthritis') || lowerQuestion.includes('knee pain')) {
      return 'Joint pain is common in seniors and can be managed:\n\n• **Common causes**: Arthritis, wear and tear, inflammation\n• **Relief methods**: Gentle exercise, heat/cold therapy, over-the-counter pain relievers\n• **Exercises**: Swimming, walking, gentle stretching, tai chi\n• **Diet**: Anti-inflammatory foods like fish, leafy greens, berries\n• **When to see doctor**: Severe pain, swelling, redness, limited movement\n• **Daily tips**: Maintain healthy weight, use supportive shoes, avoid prolonged sitting\n\n⚠️ Consult your doctor before starting new exercises or medications.';
    }
    
    // Sleep issues
    if (lowerQuestion.includes('sleep') || lowerQuestion.includes('insomnia') || lowerQuestion.includes('tired')) {
      return 'Good sleep is essential for health, especially for seniors:\n\n• **Sleep needs**: 7-8 hours per night for most adults\n• **Sleep hygiene**: Regular bedtime, cool dark room, comfortable mattress\n• **Avoid**: Caffeine after 2 PM, large meals before bed, screens 1 hour before sleep\n• **Helpful**: Warm bath, reading, gentle stretching, herbal tea\n• **Common issues**: Frequent urination, medication side effects, sleep apnea\n• **When to see doctor**: Persistent insomnia, loud snoring, daytime fatigue\n\n⚠️ Don\'t use sleep medications without consulting your doctor.';
    }
    
    // Chest pain - serious symptom
    if (lowerQuestion.includes('chest pain') || lowerQuestion.includes('heart pain')) {
      return '⚠️ **CHEST PAIN REQUIRES IMMEDIATE MEDICAL ATTENTION**\n\nCall emergency services (911) immediately if you experience:\n• Chest pain or pressure\n• Pain radiating to arm, jaw, or back\n• Shortness of breath\n• Nausea or sweating\n• Dizziness\n\nDo not drive yourself to the hospital. Call for emergency help immediately.\n\nThis could be a heart attack or other serious condition requiring immediate medical care.';
    }
    
    // Medication questions
    if (lowerQuestion.includes('medication') || lowerQuestion.includes('medicine') || lowerQuestion.includes('pill')) {
      return 'Medication management is crucial for seniors:\n\n• **Organization**: Use pill organizers, set reminders\n• **Timing**: Take medications at the same time daily\n• **Food interactions**: Some need food, others empty stomach\n• **Side effects**: Report any unusual symptoms to your doctor\n• **Never**: Stop medications without consulting your doctor\n• **Storage**: Keep in cool, dry place, check expiration dates\n• **Questions**: Always ask your pharmacist or doctor about new medications\n\n⚠️ Never share medications or change doses without medical supervision.';
    }
    
    // General health questions
    if (lowerQuestion.includes('health') || lowerQuestion.includes('wellness')) {
      return 'Maintaining good health as a senior involves:\n\n• **Regular check-ups**: Annual physical exams, screenings\n• **Nutrition**: Balanced diet with fruits, vegetables, lean proteins\n• **Exercise**: Regular physical activity appropriate for your fitness level\n• **Social connections**: Stay connected with family and friends\n• **Mental health**: Engage in activities you enjoy, manage stress\n• **Safety**: Fall prevention, medication management\n• **Preventive care**: Vaccinations, screenings as recommended\n\n⚠️ Always consult your healthcare provider for personalized advice.';
    }
    
    return 'Thank you for your question. I can provide general health information, but it\'s always best to consult with your healthcare provider for personalized medical advice.\n\nFor specific symptoms or concerns, please:\n• Contact your doctor\n• Call your healthcare provider\'s nurse line\n• Visit an urgent care center if needed\n• Call emergency services for serious symptoms\n\nYour healthcare team can properly evaluate your specific situation and provide appropriate guidance.';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-amber-200">
          <Bot className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-amber-800">
            {t('aiAssistant', language)}
          </h2>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-red-50 border-b border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-800 text-sm leading-relaxed">
              {t('aiDisclaimer', language)}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.isUser
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                <div className="text-lg leading-relaxed whitespace-pre-line">{message.text}</div>
                <p className={`text-sm mt-2 ${
                  message.isUser ? 'text-amber-100' : 'text-amber-600'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-6 border-t border-amber-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-amber-200 rounded-lg text-lg focus:border-amber-500 focus:outline-none"
              placeholder={t('askQuestion', language)}
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Send size={20} />
              {t('send', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;