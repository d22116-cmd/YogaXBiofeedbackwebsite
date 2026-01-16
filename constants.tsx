
import React from 'react';
import { 
  Wind, 
  Activity, 
  Brain, 
  Leaf, 
  Moon, 
  Calendar, 
  Gamepad2, 
  Stethoscope, 
  Building2, 
  Microscope,
  Zap,
  ShieldCheck,
  Battery,
  Waves
} from 'lucide-react';
import { GuruType } from './types';

export const GURUS = [
  { id: 'pranayama', type: GuruType.Pranayama, icon: <Wind className="w-6 h-6" />, color: 'bg-blue-500', desc: 'Master ancient breath control with biofeedback.' },
  { id: 'asana', type: GuruType.Asana, icon: <Activity className="w-6 h-6" />, color: 'bg-purple-500', desc: 'Real-time pose correction via computer vision.' },
  { id: 'meditation', type: GuruType.Meditation, icon: <Brain className="w-6 h-6" />, color: 'bg-indigo-500', desc: 'Guided mindfulness synced to your nervous system.' },
  { id: 'ayurveda', type: GuruType.Ayurveda, icon: <Leaf className="w-6 h-6" />, color: 'bg-green-500', desc: 'Personalized wellness through Dosha analysis.' },
  { id: 'jyotish', type: GuruType.Jyotish, icon: <Moon className="w-6 h-6" />, color: 'bg-yellow-600', desc: 'Vedic astrology for timing and destiny.' },
  { id: 'panchanga', type: GuruType.Panchanga, icon: <Calendar className="w-6 h-6" />, color: 'bg-orange-500', desc: 'Auspicious Vedic calendar and ritual timing.' },
  { id: 'breathgames', type: GuruType.BreathGames, icon: <Gamepad2 className="w-6 h-6" />, color: 'bg-pink-500', desc: 'Gamified respiratory training for focus.' },
  { id: 'ivt', type: GuruType.IVT, icon: <Stethoscope className="w-6 h-6" />, color: 'bg-teal-500', desc: 'Integrated Vedic Therapy protocols.' },
  { id: 'corporate', type: GuruType.Corporate, icon: <Building2 className="w-6 h-6" />, color: 'bg-gray-600', desc: 'Enterprise-grade employee wellness.' },
  { id: 'research', type: GuruType.Researcher, icon: <Microscope className="w-6 h-6" />, color: 'bg-red-500', desc: 'Academic tools for biometric clinical studies.' },
];

export const PRODUCTS = [
  {
    id: 'pranaflow',
    name: 'PranaFlow',
    price: '$299',
    badge: 'New',
    oneLiner: 'The ultimate tool for Svara Yoga mastery.',
    description: 'Precision nostril flow sensor that tracks the flow of breath through Ida and Pingala nadis in real-time.',
    image: 'https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=1200',
    features: [
      { text: 'Ida/Pingala Tracking', icon: <Waves className="w-4 h-4" /> },
      { text: '24h Active Use', icon: <Battery className="w-4 h-4" /> },
      { text: 'Clinical Biofeedback', icon: <Zap className="w-4 h-4" /> }
    ]
  },
  {
    id: 'bundle',
    name: 'Mastery Bundle',
    price: '$449',
    badge: 'Save $49',
    oneLiner: 'Complete biometric spiritual ecosystem.',
    description: 'Get both PranaFlow and Prana Shirt for total body-mind integration and advanced Vedic diagnostics.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    features: [
      { text: 'Full Ecosystem Sync', icon: <ShieldCheck className="w-4 h-4" /> },
      { text: 'Premium Storage', icon: <Brain className="w-4 h-4" /> },
      { text: 'VIP Guru Access', icon: <Activity className="w-4 h-4" /> }
    ],
    isBundle: true
  },
  {
    id: 'pranashirt',
    name: 'Prana Shirt',
    price: '$199',
    badge: 'Best Seller',
    oneLiner: 'Intelligent fabric for high-stakes focus.',
    description: 'Advanced EMG/ECG smart-fabric apparel that detects stress patterns before you even feel them.',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1200',
    features: [
      { text: 'EMG Stress Sensing', icon: <Zap className="w-4 h-4" /> },
      { text: 'HRV Optimization', icon: <Activity className="w-4 h-4" /> },
      { text: 'Washable Smart Fabric', icon: <Leaf className="w-4 h-4" /> }
    ]
  }
];
