
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Smartphone, 
  MessageSquare, 
  Bell, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Info,
  Smartphone as PushIcon,
  MessageCircle as SmsIcon,
  // Added missing Check icon
  Check
} from 'lucide-react';
import { Card, Button, Badge } from '../ui';
import { NotificationSettings as SettingsType } from '../../types';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsType>({
    email: { transactional: true, marketing: false, summary: true },
    push: { reminders: true, achievements: true, marketing: false },
    sms: { enabled: false },
    frequency: 'real-time'
  });

  const toggleSetting = (channel: keyof SettingsType, item: string) => {
    setSettings(prev => {
      const channelData = { ...(prev[channel] as any) };
      channelData[item] = !channelData[item];
      return { ...prev, [channel]: channelData };
    });
  };

  return (
    <div className="space-y-10 pb-20 max-w-4xl">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Notification Preferences</h1>
        <p className="text-gray-400 text-sm mt-1 font-light">Control how and when you receive clinical and practice updates.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email Settings */}
        <Card className="p-8 bg-white border-transparent shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Email Alerts</h3>
              <p className="text-xs text-gray-400 font-medium">satyam@yoga.x</p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { id: 'transactional', label: 'Transactional', desc: 'Order status, receipts, and account security.' },
              { id: 'summary', label: 'Weekly Summary', desc: 'Clinical progress reports and practice insights.' },
              { id: 'marketing', label: 'News & Offers', desc: 'Product launches and special community deals.' },
            ].map((item) => (
              <div key={item.id} className="flex items-start justify-between group">
                <div className="max-w-[80%]">
                  <p className="text-sm font-bold mb-1">{item.label}</p>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                </div>
                <button 
                  onClick={() => toggleSetting('email', item.id)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.email[item.id as keyof typeof settings.email] ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <motion.div 
                    animate={{ x: settings.email[item.id as keyof typeof settings.email] ? 26 : 2 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Push Settings */}
        <Card className="p-8 bg-white border-transparent shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <PushIcon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Push Notifications</h3>
              <p className="text-xs text-gray-400 font-medium">In-app & PWA alerts</p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { id: 'reminders', label: 'Session Reminders', desc: 'Custom alerts for your scheduled practices.' },
              { id: 'achievements', label: 'Achievements', desc: 'Streaks, badges, and mastery milestones.' },
              { id: 'marketing', label: 'Promotions', desc: 'Real-time alerts for limited-time offers.' },
            ].map((item) => (
              <div key={item.id} className="flex items-start justify-between group">
                <div className="max-w-[80%]">
                  <p className="text-sm font-bold mb-1">{item.label}</p>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                </div>
                <button 
                  onClick={() => toggleSetting('push', item.id)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.push[item.id as keyof typeof settings.push] ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <motion.div 
                    animate={{ x: settings.push[item.id as keyof typeof settings.push] ? 26 : 2 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* SMS & Frequency */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white border-transparent shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  <SmsIcon size={24} />
                </div>
                <h3 className="font-bold text-lg">SMS Delivery</h3>
              </div>
              <Badge variant="outline">New</Badge>
            </div>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Critical hardware updates and delivery status via secure SMS. Standard carrier rates apply.
            </p>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <span className="text-sm font-bold">Enable SMS Channel</span>
              <button 
                onClick={() => setSettings(prev => ({ ...prev, sms: { enabled: !prev.sms.enabled } }))}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.sms.enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <motion.div 
                  animate={{ x: settings.sms.enabled ? 26 : 2 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
          </Card>

          <Card className="p-8 bg-gray-900 text-white border-transparent shadow-xl relative overflow-hidden">
            <Clock className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 rotate-12" />
            <h3 className="font-bold text-lg mb-6 relative z-10">Alert Frequency</h3>
            <div className="space-y-3 relative z-10">
              {['real-time', 'daily', 'weekly'].map((f) => (
                <button 
                  key={f}
                  onClick={() => setSettings(prev => ({ ...prev, frequency: f as any }))}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border ${settings.frequency === f ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                >
                  <span className="text-sm font-bold capitalize">{f.replace('-', ' ')}</span>
                  {/* Fixed missing Check icon import */}
                  {settings.frequency === f && <Check size={16} className="text-indigo-400" />}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-6">
        <Button size="lg" className="rounded-2xl px-12 h-14 shadow-2xl">Save Changes</Button>
        <button className="text-sm font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Discard</button>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2.5rem] flex items-start gap-4">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
          <ShieldCheck size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-indigo-900">Privacy First Platform</p>
          <p className="text-xs text-indigo-700/70 mt-1 leading-relaxed">
            We never share your contact details with third-party marketers. Your notification preferences are encrypted and stored in your private clinical vault.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
