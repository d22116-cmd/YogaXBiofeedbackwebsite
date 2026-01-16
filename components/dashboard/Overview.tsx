
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Activity, 
  Battery, 
  Bluetooth, 
  Clock, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Card, Badge, Button } from '../ui';
import BiometricCharts from '../BiometricCharts';

const QUICK_STATS = [
  { label: 'Total Sessions', val: '12', sub: 'this week', icon: <Clock className="text-blue-500" />, trend: 'up' },
  { label: 'Active Devices', val: '2', sub: 'connected', icon: <Bluetooth className="text-indigo-500" />, trend: 'neutral' },
  { label: 'Average HRV', val: '74 ms', sub: '+8% vs last week', icon: <Activity className="text-green-500" />, trend: 'up' },
  { label: 'Platform Tier', val: 'Pro', sub: 'trial ends in 14d', icon: <Zap className="text-yellow-500" />, trend: 'neutral' },
];

const RECENT_ACTIVITY = [
  { id: 1, type: 'Session', title: 'Deep Pranayama Mastery', time: '2 hours ago', score: '94/100', icon: '🌬️' },
  { id: 2, type: 'Sync', title: 'Prana Shirt Data Upload', time: 'Yesterday, 10:45 PM', score: 'Verified', icon: '👕' },
  { id: 3, type: 'Achievement', title: '7-Day Streak Unlocked', time: 'Yesterday, 8:00 AM', score: 'Level 4', icon: '🏆' },
  { id: 4, type: 'Session', title: 'Vedic Meditation (Beta)', time: '2 days ago', score: '82/100', icon: '🧘' },
];

const DEVICES = [
  { name: 'PranaFlow', type: 'Flow Sensor', battery: 84, status: 'connected', icon: '🌬️' },
  { name: 'Prana Shirt', type: 'ECG Wearable', battery: 42, status: 'connected', icon: '👕' },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <header className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Morning, Satyam</span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100">
              <Flame size={12} fill="currentColor" /> 7 Day Streak
            </div>
          </header>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Your practice is steady.</h1>
        </div>
        <Card className="p-4 bg-indigo-600 text-white border-transparent flex items-center gap-4 max-w-sm shadow-xl">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Daily Recommendation</p>
            <p className="text-sm font-bold leading-tight">10min Nadi Shodhana for cognitive clarity</p>
          </div>
          <button className="ml-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <ChevronRight size={16} />
          </button>
        </Card>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {QUICK_STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-8 h-full flex flex-col justify-between hover:shadow-xl transition-all border-transparent bg-white group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                {stat.trend === 'up' && <ArrowUpRight className="text-green-500 w-5 h-5" />}
                {stat.trend === 'down' && <ArrowDownRight className="text-red-500 w-5 h-5" />}
              </div>
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">{stat.label}</span>
                <p className="text-3xl font-black tracking-tighter mb-1">{stat.val}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.sub}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts & Progress */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-transparent bg-white shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Biometric Evolution</h3>
                <p className="text-xs text-gray-400 font-medium">Tracking neuro-respiratory synchronization</p>
              </div>
              <div className="flex bg-gray-50 p-1 rounded-xl">
                {['HRV', 'HR', 'Stress'].map((t) => (
                  <button key={t} className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${t === 'HRV' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <BiometricCharts />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-transparent bg-white shadow-sm">
              <h3 className="font-bold mb-6">Device Status</h3>
              <div className="space-y-6">
                {DEVICES.map((device) => (
                  <div key={device.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl">
                        {device.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{device.name}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${device.status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{device.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery size={16} className={device.battery < 20 ? 'text-red-500' : 'text-gray-300'} />
                      <span className="text-xs font-bold text-gray-500">{device.battery}%</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-2xl py-3 border-dashed border-gray-200 text-xs font-bold uppercase tracking-widest">
                  Connect New Hardware
                </Button>
              </div>
            </Card>

            <Card className="p-8 border-transparent bg-indigo-600 text-white shadow-xl relative overflow-hidden">
              <TrendingUp className="absolute bottom-[-20px] right-[-20px] w-48 h-48 opacity-10" />
              <div className="relative z-10">
                <Badge variant="primary" className="bg-white/20 text-white border-transparent mb-6">Recommended for you</Badge>
                <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">Try 'Focus Breath' Game</h3>
                <p className="text-sm text-indigo-100 font-light leading-relaxed mb-8">
                  Based on your current HRV trends, a 5-minute gamified respiratory session would optimize your evening recovery.
                </p>
                <Button className="bg-white text-black hover:bg-gray-50 w-full rounded-2xl">Start Session</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-8">
          <Card className="p-8 border-transparent bg-white shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold tracking-tight">Recent Activity</h3>
              <button className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">View All</button>
            </div>
            <div className="space-y-10">
              {RECENT_ACTIVITY.map((activity, idx) => (
                <div key={activity.id} className="relative flex gap-4">
                  {idx !== RECENT_ACTIVITY.length - 1 && (
                    <div className="absolute left-6 top-10 bottom-[-40px] w-px bg-gray-100" />
                  )}
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl shrink-0 z-10 shadow-sm border border-white">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm tracking-tight">{activity.title}</h4>
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{activity.score}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{activity.type}</p>
                    <p className="text-xs text-gray-500 font-light">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
