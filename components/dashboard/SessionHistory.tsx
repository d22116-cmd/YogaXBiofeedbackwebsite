
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Download, 
  Filter, 
  ChevronRight, 
  Share2, 
  Trash2, 
  LayoutGrid, 
  List,
  Activity,
  Wind,
  Heart,
  Search,
  CheckCircle2,
  MoreVertical,
  ChevronLeft,
  ArrowUpRight,
  TrendingUp,
  X
} from 'lucide-react';
import { Card, Badge, Button, Modal, Tabs } from '../ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Session {
  id: string;
  date: string;
  timestamp: string;
  technique: string;
  duration: number; // in seconds
  device: string;
  avgHr: number;
  avgHrv: number;
  score: number;
  notes: string;
  icon: string;
}

const MOCK_SESSIONS: Session[] = [
  { id: 's1', date: 'May 12, 2024', timestamp: '08:00 AM', technique: 'Nadi Shodhana', duration: 600, device: 'PranaFlow', avgHr: 62, avgHrv: 85, score: 94, notes: 'Felt very calm after this session. Clear focus.', icon: '🌬️' },
  { id: 's2', date: 'May 11, 2024', timestamp: '10:30 PM', technique: 'Sleep Protocol', duration: 900, device: 'Prana Shirt', avgHr: 58, avgHrv: 92, score: 98, notes: 'Best sleep in weeks. HRV was remarkably high.', icon: '🌙' },
  { id: 's3', date: 'May 10, 2024', timestamp: '02:15 PM', technique: 'Focus Breath', duration: 300, device: 'PranaFlow', avgHr: 74, avgHrv: 65, score: 78, notes: 'Mid-day boost. Heart rate was slightly higher than usual.', icon: '⚡' },
  { id: 's4', date: 'May 09, 2024', timestamp: '07:45 AM', technique: 'Surya Bhedana', duration: 480, device: 'PranaFlow', avgHr: 68, avgHrv: 72, score: 85, notes: 'Waking up the system. Right nostril dominance was clear.', icon: '☀️' },
  { id: 's5', date: 'May 08, 2024', timestamp: '06:00 PM', technique: 'Stress Relief', duration: 1200, device: 'Prana Shirt', avgHr: 64, avgHrv: 80, score: 91, notes: 'Recovered well from a long flight.', icon: '🧘' },
];

const SESSION_CHART_DATA = [
  { t: 0, hr: 72, hrv: 60 },
  { t: 1, hr: 68, hrv: 65 },
  { t: 2, hr: 65, hrv: 72 },
  { t: 3, hr: 62, hrv: 78 },
  { t: 4, hr: 60, hrv: 85 },
  { t: 5, hr: 61, hrv: 82 },
  { t: 6, hr: 59, hrv: 88 },
  { t: 7, hr: 62, hrv: 84 },
  { t: 8, hr: 60, hrv: 90 },
  { t: 9, hr: 58, hrv: 94 },
  { t: 10, hr: 60, hrv: 92 },
];

const SessionHistory: React.FC = () => {
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-indigo-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const filteredSessions = MOCK_SESSIONS.filter(s => 
    s.technique.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.device.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Session History</h1>
          <p className="text-gray-400 text-sm mt-1 font-light">Your neurological clinical archives.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="rounded-xl" leftIcon={<Download size={16} />}>
            Export Data
          </Button>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewType('list')}
              className={`p-1.5 rounded-lg transition-all ${viewType === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >
              <List size={16} />
            </button>
            <button 
              onClick={() => setViewType('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewType === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Summary Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Sessions', val: '42', icon: <Activity className="text-indigo-500" /> },
          { label: 'Total Duration', val: '12h 45m', icon: <Clock className="text-blue-500" /> },
          { label: 'Fav Technique', val: 'Nadi Shodhana', icon: <Wind className="text-green-500" /> },
          { label: 'Avg Quality', val: '88%', icon: <CheckCircle2 className="text-yellow-500" /> },
        ].map((stat, i) => (
          <Card key={i} className="p-6 bg-white border-transparent shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black">{stat.val}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative group w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search sessions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        <Button variant="ghost" size="sm" className="rounded-xl text-gray-500 font-bold" leftIcon={<Filter size={16} />}>
          More Filters
        </Button>
      </div>

      {/* Sessions Content */}
      {viewType === 'list' ? (
        <Card className="bg-white border-transparent shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Technique</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Device</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avg HRV</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quality</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredSessions.map((s) => (
                  <tr 
                    key={s.id} 
                    onClick={() => setSelectedSession(s)}
                    className="group hover:bg-gray-50/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.icon}</span>
                        <span className="font-bold text-sm text-gray-900">{s.technique}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-gray-700">{s.date}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.timestamp}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-500">{formatDuration(s.duration)}</span>
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant="outline" className="text-[9px]">{s.device}</Badge>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-indigo-600">{s.avgHrv}ms</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${s.score >= 90 ? 'bg-green-500' : 'bg-indigo-500'}`} 
                            style={{ width: `${s.score}%` }} 
                          />
                        </div>
                        <span className={`text-xs font-bold ${getScoreColor(s.score)}`}>{s.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-gray-300 hover:text-black transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((s) => (
            <Card 
              key={s.id} 
              hoverable
              onClick={() => setSelectedSession(s)}
              className="p-6 bg-white border-transparent"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">
                  {s.icon}
                </div>
                <div className="text-right">
                   <p className={`text-2xl font-black ${getScoreColor(s.score)}`}>{s.score}</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quality Score</p>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-1">{s.technique}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">{s.date} • {s.timestamp}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Avg HRV</p>
                  <p className="text-sm font-bold text-indigo-600">{s.avgHrv}ms</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Duration</p>
                  <p className="text-sm font-bold">{formatDuration(s.duration)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <Badge variant="outline" className="text-[9px]">{s.device}</Badge>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Placeholder */}
      <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl" disabled><ChevronLeft size={16} /></Button>
          <Button variant="primary" size="icon" className="w-10 h-10 rounded-xl">1</Button>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl">2</Button>
          <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl"><ChevronRight size={16} /></Button>
        </div>
      </div>

      {/* Session Detail Modal */}
      <Modal 
        isOpen={!!selectedSession} 
        onClose={() => setSelectedSession(null)}
        maxWidth="max-w-4xl"
      >
        {selectedSession && (
          <div className="space-y-8">
            <header className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">
                    {selectedSession.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{selectedSession.technique}</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{selectedSession.date} at {selectedSession.timestamp}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="rounded-xl"><Share2 size={16} /></Button>
                <Button variant="outline" size="sm" className="rounded-xl text-red-500"><Trash2 size={16} /></Button>
              </div>
            </header>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Quality Score', val: selectedSession.score, sub: 'Top 5%', color: getScoreColor(selectedSession.score) },
                { label: 'Avg HRV', val: `${selectedSession.avgHrv}ms`, sub: '+12% trend', color: 'text-indigo-600' },
                { label: 'Avg Heart Rate', val: `${selectedSession.avgHr}bpm`, sub: 'Optimal zone', color: 'text-blue-600' },
                { label: 'Coherence', val: '92%', sub: 'High focus', color: 'text-green-600' },
              ].map((m, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-[2rem]">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className={`text-3xl font-black ${m.color}`}>{m.val}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-bold tracking-tight">Biometric Session Flow</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">HRV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Heart Rate</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SESSION_CHART_DATA}>
                    <defs>
                      <linearGradient id="colorHrvDetail" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHrDetail" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="t" hide />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="hrv" stroke="#6366f1" fillOpacity={1} fill="url(#colorHrvDetail)" strokeWidth={3} />
                    <Area type="monotone" dataKey="hr" stroke="#60a5fa" fillOpacity={1} fill="url(#colorHrDetail)" strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <h3 className="font-bold tracking-tight mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-indigo-600" /> Practitioner Notes
              </h3>
              <div className="bg-gray-50 p-6 rounded-[2rem] relative group">
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{selectedSession.notes}"
                </p>
                <button className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <Button className="flex-1 h-14 rounded-2xl">Download Detailed Report</Button>
              <Button variant="outline" className="flex-1 h-14 rounded-2xl" onClick={() => setSelectedSession(null)}>Close View</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SessionHistory;
