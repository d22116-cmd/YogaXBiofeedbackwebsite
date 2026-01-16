
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Wind, 
  ChevronRight, 
  Play, 
  Pause, 
  Square, 
  Maximize2, 
  Settings, 
  Mic, 
  Send, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Activity,
  Heart,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { askGuru } from '../../services/gemini';
import { GuruType, Message } from '../../types';

interface Technique {
  id: string;
  name: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced' | 'Clinical';
  duration: number; // typical duration in seconds
  difficulty: 'Low' | 'Medium' | 'High';
  desc: string;
  benefits: string[];
  warnings: string[];
  ratios: { inhale: number; hold: number; exhale: number; holdPost?: number };
}

const TECHNIQUES: Technique[] = [
  { 
    id: 'nadi', 
    name: 'Nadi Shodhana', 
    category: 'Beginner', 
    duration: 600, 
    difficulty: 'Low',
    desc: 'Alternate nostril breathing to balance the nervous system.',
    benefits: ['Balances Ida and Pingala', 'Reduces anxiety', 'Improves focus'],
    warnings: ['Avoid if you have a severe cold', 'Do not force the breath'],
    ratios: { inhale: 4, hold: 4, exhale: 4, holdPost: 0 }
  },
  { 
    id: 'box', 
    name: 'Box Breathing', 
    category: 'Beginner', 
    duration: 300, 
    difficulty: 'Low',
    desc: 'Square breathing used by Navy SEALs for instant calm.',
    benefits: ['Stress reduction', 'Improves CO2 tolerance', 'Heightens awareness'],
    warnings: ['If pregnant, avoid the hold phases'],
    ratios: { inhale: 4, hold: 4, exhale: 4, holdPost: 4 }
  },
  { 
    id: 'kapala', 
    name: 'Kapalabhati', 
    category: 'Intermediate', 
    duration: 180, 
    difficulty: 'Medium',
    desc: 'Skull shining breath for high energy and detoxification.',
    benefits: ['Cleanses lungs', 'Energizes the mind', 'Improves digestion'],
    warnings: ['Avoid if having high blood pressure', 'Do not practice during menstruation'],
    ratios: { inhale: 1, hold: 0, exhale: 0.5, holdPost: 0 } // Specialized rapid exhale
  },
  { 
    id: '478', 
    name: '4-7-8 Relax', 
    category: 'Beginner', 
    duration: 120, 
    difficulty: 'Low',
    desc: 'The natural tranquilizer for the nervous system.',
    benefits: ['Insomnia relief', 'Deep relaxation', 'Vagus nerve stimulation'],
    warnings: ['Best practiced sitting down'],
    ratios: { inhale: 4, hold: 7, exhale: 8 }
  },
];

const SESSION_DATA = Array.from({ length: 20 }, (_, i) => ({
  t: i,
  hr: 60 + Math.sin(i * 0.5) * 5 + Math.random() * 2,
  hrv: 80 + Math.cos(i * 0.5) * 10 + Math.random() * 5,
}));

const PranayamaGuru: React.FC = () => {
  const [view, setView] = useState<'idle' | 'practicing' | 'summary'>('idle');
  const [selectedTech, setSelectedTech] = useState<Technique>(TECHNIQUES[0]);
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Namaste. I am your AI Pranayama Guru. Which technique would you like to explore?" }
  ]);
  const [input, setInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Session State
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'HoldOut'>('Inhale');
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const techniqueList = TECHNIQUES.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  // Breathing Loop Logic
  useEffect(() => {
    let interval: number;
    if (view === 'practicing' && !isPaused) {
      interval = window.setInterval(() => {
        setTimer(prev => prev + 1);
        setPhaseTimer(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [view, isPaused]);

  useEffect(() => {
    if (view !== 'practicing') return;

    const { inhale, hold, exhale, holdPost } = selectedTech.ratios;
    const currentLimit = 
      phase === 'Inhale' ? inhale : 
      phase === 'Hold' ? hold : 
      phase === 'Exhale' ? exhale : 
      (holdPost || 0);

    if (phaseTimer >= currentLimit) {
      setPhaseTimer(0);
      if (phase === 'Inhale') setPhase(hold > 0 ? 'Hold' : 'Exhale');
      else if (phase === 'Hold') setPhase('Exhale');
      else if (phase === 'Exhale') setPhase((holdPost || 0) > 0 ? 'HoldOut' : 'Inhale');
      else if (phase === 'HoldOut') setPhase('Inhale');
    }
  }, [phaseTimer, phase, selectedTech, view]);

  const handleStart = () => {
    setTimer(0);
    setPhase('Inhale');
    setPhaseTimer(0);
    setView('practicing');
  };

  const handleEnd = () => {
    setView('summary');
  };

  const handleChat = async () => {
    if (!input.trim() || isChatLoading) return;
    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsChatLoading(true);
    const response = await askGuru(GuruType.Pranayama, input, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsChatLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 overflow-hidden">
      
      {/* LEFT SIDEBAR: Technique Library */}
      <aside className="w-full lg:w-80 flex flex-col gap-4 overflow-hidden">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search techniques..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-indigo-500 text-sm font-medium"
          />
        </div>

        <Card className="flex-1 border-transparent shadow-sm overflow-hidden flex flex-col bg-white">
          <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Library</h3>
            <Badge variant="outline" className="text-[8px]">{techniqueList.length} Techniques</Badge>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {techniqueList.map((t) => (
              <button
                key={t.id}
                onClick={() => { setSelectedTech(t); setView('idle'); }}
                className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${selectedTech.id === t.id ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedTech.id === t.id ? 'bg-white/20' : 'bg-gray-100 text-gray-400 group-hover:text-indigo-600'}`}>
                    <Wind size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">{t.name}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedTech.id === t.id ? 'text-white/60' : 'text-gray-400'}`}>{t.category}</p>
                  </div>
                </div>
                <ChevronRight size={14} className={selectedTech.id === t.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'} />
              </button>
            ))}
          </div>
        </Card>
      </aside>

      {/* MAIN AREA: Active Session */}
      <main className="flex-1 relative flex flex-col bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
        
        <AnimatePresence mode="wait">
          {view === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-12 h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-10">
                <Wind size={48} />
              </div>
              <Badge variant="primary" className="mb-4">{selectedTech.category}</Badge>
              <h2 className="text-5xl font-black tracking-tight mb-6">{selectedTech.name}</h2>
              <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                {selectedTech.desc}
              </p>

              <div className="grid grid-cols-2 gap-8 w-full mb-12 text-left">
                <div className="bg-gray-50 p-6 rounded-3xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={12} /> Benefits
                  </h4>
                  <ul className="space-y-2">
                    {selectedTech.benefits.map((b, i) => (
                      <li key={i} className="text-xs font-medium text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-indigo-300 rounded-full" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-orange-50/50 p-6 rounded-3xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-2">
                    <AlertCircle size={12} /> Cautions
                  </h4>
                  <ul className="space-y-2">
                    {selectedTech.warnings.map((w, i) => (
                      <li key={i} className="text-xs font-medium text-orange-800 flex items-center gap-2">
                        <div className="w-1 h-1 bg-orange-300 rounded-full" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <Button onClick={handleStart} size="lg" className="flex-1 h-16 rounded-2xl text-lg shadow-xl" leftIcon={<Play size={20} />}>Start Session</Button>
                <Button variant="outline" size="lg" className="h-16 w-16 rounded-2xl flex items-center justify-center"><Settings size={20} /></Button>
              </div>
            </motion.div>
          )}

          {view === 'practicing' && (
            <motion.div 
              key="practicing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900 text-white p-12 flex flex-col items-center justify-center"
            >
              <div className="absolute top-12 left-12 flex items-center gap-4">
                <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                </button>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Elapsed</p>
                  <p className="text-xl font-mono">{Math.floor(timer / 600)}:{((timer / 10) % 60).toFixed(0).padStart(2, '0')}</p>
                </div>
              </div>

              <button 
                onClick={handleEnd}
                className="absolute top-12 right-12 w-12 h-12 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center transition-all group"
              >
                <Square size={20} className="group-hover:fill-white" />
              </button>

              {/* Breathing Pacer */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: phase === 'Inhale' ? 1.5 : phase === 'Exhale' ? 1 : 1,
                  }}
                  transition={{ 
                    duration: phase === 'Inhale' ? selectedTech.ratios.inhale : phase === 'Exhale' ? selectedTech.ratios.exhale : 0,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 rounded-full border-4 ${phase === 'Inhale' ? 'border-indigo-400' : 'border-indigo-600/20'}`}
                />
                <motion.div 
                  animate={{ 
                    scale: phase === 'Inhale' ? 1.4 : phase === 'Exhale' ? 0.8 : (phase === 'Hold' ? 1.4 : 0.8),
                    opacity: [0.1, 0.4, 0.1]
                  }}
                  className="absolute inset-0 rounded-full bg-indigo-500 blur-3xl pointer-events-none"
                />
                <div className="text-center z-10">
                  <motion.h3 
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl font-black tracking-tight mb-2 uppercase"
                  >
                    {phase === 'HoldOut' ? 'Hold' : phase}
                  </motion.h3>
                  <div className="h-1 w-24 bg-white/20 rounded-full mx-auto overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      key={`${phase}-${phaseTimer}`}
                      transition={{ 
                        duration: phase === 'Inhale' ? selectedTech.ratios.inhale : 
                                 phase === 'Exhale' ? selectedTech.ratios.exhale : 
                                 phase === 'Hold' ? selectedTech.ratios.hold : (selectedTech.ratios.holdPost || 1),
                        ease: "linear"
                      }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Live Metrics */}
              <div className="absolute bottom-12 left-12 right-12 grid grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { label: 'Heart Rate', val: '64', unit: 'BPM', icon: <Heart className="text-red-400" /> },
                  { label: 'HRV', val: '88', unit: 'ms', icon: <Activity className="text-green-400" /> },
                  { label: 'Flow Score', val: '94', unit: '%', icon: <Zap className="text-yellow-400" /> },
                  { label: 'Technique', val: 'Expert', unit: '', icon: <Wind className="text-blue-400" /> },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 rounded-lg bg-white/5">{stat.icon}</div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-black">{stat.val} <span className="text-sm font-light text-white/40">{stat.unit}</span></p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'summary' && (
            <motion.div 
              key="summary"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 h-full overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <Badge variant="success" className="mb-4">Session Complete</Badge>
                  <h2 className="text-4xl font-black tracking-tight">{selectedTech.name} Summary</h2>
                  <p className="text-gray-400 font-medium">May 15, 2024 • 09:15 AM</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-xl" leftIcon={<Share2 size={16} />}>Share</Button>
                  <Button variant="outline" className="rounded-xl" onClick={() => setView('idle')} leftIcon={<RefreshCw size={16} />}>Retry</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="p-8 border-transparent bg-indigo-600 text-white shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Technique Score</p>
                  <p className="text-6xl font-black tracking-tighter">96<span className="text-2xl opacity-40">/100</span></p>
                  <p className="text-sm mt-6 font-medium text-indigo-100">Optimal coherence achieved for 82% of the session.</p>
                </Card>
                <Card className="p-8 border-transparent bg-gray-50 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Session Quality</p>
                    <p className="text-3xl font-black">Elite Performance</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[92%]" />
                    </div>
                    <span className="text-xs font-bold">92%</span>
                  </div>
                </Card>
                <Card className="p-8 border-transparent bg-gray-50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">HRV Improvement</p>
                  <p className="text-3xl font-black text-indigo-600">+14ms</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-green-600 font-bold">
                    <Activity size={14} /> Positive neuro-sync detected
                  </div>
                </Card>
              </div>

              <Card className="p-8 border-transparent bg-gray-50 mb-12">
                <h3 className="text-xl font-bold mb-8">Biometric Flow</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SESSION_DATA}>
                      <defs>
                        <linearGradient id="summaryHrv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="t" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="hrv" stroke="#6366f1" fillOpacity={1} fill="url(#summaryHrv)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-8 border-transparent bg-indigo-50">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <Zap size={18} className="text-indigo-600" /> Guru Insights
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-medium italic">
                  "Your mastery of the 'Exhale' phase shows clinical-grade vagal tone improvement. Tomorrow, we will introduce a brief 'Kumbhaka' (retention) phase to further challenge your CO2 tolerance."
                </p>
              </Card>

              <Button onClick={() => setView('idle')} className="w-full mt-12 h-14 rounded-2xl">Return to Library</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* RIGHT SIDEBAR: AI Chat */}
      <aside className="hidden xl:flex w-80 flex-col bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
            <Wind size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">AI Pranayama Guru</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Bio-Analysis</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md' 
                  : 'bg-gray-100 text-gray-700 rounded-bl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50/50 border-t border-gray-50">
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <button className="p-2 text-gray-300 hover:text-indigo-600 transition-colors">
              <Mic size={16} />
            </button>
            <input 
              type="text" 
              placeholder="Ask your Guru..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChat()}
              className="flex-1 bg-transparent border-none outline-none text-xs font-medium py-2 placeholder-gray-300"
            />
            <button 
              onClick={handleChat}
              disabled={!input.trim() || isChatLoading}
              className="p-2 bg-indigo-600 text-white rounded-xl disabled:bg-gray-200 transition-all shadow-md active:scale-95"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PranayamaGuru;
