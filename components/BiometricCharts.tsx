
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '08:00', heartRate: 62, breath: 12, hrv: 85 },
  { time: '09:00', heartRate: 75, breath: 15, hrv: 70 },
  { time: '10:00', heartRate: 68, breath: 14, hrv: 78 },
  { time: '11:00', heartRate: 82, breath: 18, hrv: 62 },
  { time: '12:00', heartRate: 65, breath: 12, hrv: 92 },
  { time: '13:00', heartRate: 60, breath: 11, hrv: 95 },
  { time: '14:00', heartRate: 64, breath: 12, hrv: 88 },
];

const BiometricCharts: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 premium-shadow">
        <h3 className="text-lg font-bold mb-6">Heart Rate & HRV Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="heartRate" stroke="#6366f1" fillOpacity={1} fill="url(#colorHr)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 premium-shadow">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Resting Breath Rate</h3>
          <p className="text-3xl font-bold">12 <span className="text-sm font-normal text-gray-400">bpm</span></p>
          <div className="mt-4 flex items-end space-x-1 h-12">
            {[40, 60, 45, 70, 55, 80, 50, 65, 40, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-100 rounded-t" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 premium-shadow">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Svara Mastery</h3>
          <p className="text-3xl font-bold text-green-600">88%</p>
          <div className="mt-4 flex items-end space-x-1 h-12">
            {[30, 40, 50, 60, 70, 80, 90, 85, 88, 88].map((h, i) => (
              <div key={i} className="flex-1 bg-green-100 rounded-t" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricCharts;
