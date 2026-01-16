
export enum GuruType {
  Pranayama = 'AI Pranayama Guru',
  Asana = 'AI Asana Guru',
  Meditation = 'AI Meditation Guru',
  Ayurveda = 'AI Ayurveda Guru',
  Jyotish = 'AI Jyotish Guru',
  Panchanga = 'AI Panchanga',
  BreathGames = 'AI Breath Games',
  IVT = 'IVT Platform',
  Corporate = 'YogaX Corporate',
  Researcher = 'Research Portal'
}

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin';
  settings: any;
}

export interface Device {
  id: string;
  name: string;
  type: 'pranaflow' | 'pranashirt';
  status: 'connected' | 'disconnected';
  battery: number;
  lastSync: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'device' | 'session' | 'billing' | 'system' | 'achievement';
  title: string;
  description: string;
  action_url?: string;
  read_at: string | null;
  created_at: string;
}

export interface NotificationSettings {
  email: {
    transactional: boolean;
    marketing: boolean;
    summary: boolean;
  };
  push: {
    reminders: boolean;
    achievements: boolean;
    marketing: boolean;
  };
  sms: {
    enabled: boolean;
  };
  frequency: 'real-time' | 'daily' | 'weekly';
}

export interface Referral {
  id: string;
  referee_email: string;
  status: 'pending' | 'signed_up' | 'converted' | 'expired';
  reward_amount: number;
  created_at: string;
  converted_at?: string;
}
