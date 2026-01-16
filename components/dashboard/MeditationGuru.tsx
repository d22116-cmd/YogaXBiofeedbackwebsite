
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added missing Droplets and Activity icons to the imports from lucide-react
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Music, 
  Volume2, 
  Bell, 
  Calendar, 
  Heart, 
  Wind, 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  Smile, 
  Edit3, 
  Moon, 
  Sun, 
  Sparkles,
  Maximize2,
  X,
  VolumeX,
  Plus,
  Compass,
  Droplets,
  Activity
} from 'lucide-react';
import { Card, Badge, Button, Tabs } from '../ui';

interface MeditationTrack {
  id: string;
  title: string;
  category: string;
  durations: number[]; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  guide: string;
  image: string;
  desc: string;
}

const MEDITATIONS: MeditationTrack[] = [
  { id: '1', title: 'Vipassana Insight', category: 'Insight', durations: [10, 20, 30], difficulty: 'Intermediate', guide: 'Guru Ananda', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400', desc: 'Focus on the physical sensations of the body to cultivate awareness.' },
  { id: '2', title: 'Metta Loving-Kindness', category: 'Compassion', durations: [5, 15, 20], difficulty: 'Beginner', guide: 'Shanti Devi', image: 'https://images.unsplash.com/photo-1528319725582-ddc0b6101130?auto=format&fit=crop&q=80&w=400', desc: 'Direct well-wishes toward yourself and others to open the heart.' },
  { id: '3', title: 'Zen Zazen', category: 'Zen', durations: [20, 40, 60], difficulty: 'Advanced', guide: 'Silent Transmission', image: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=400', desc: 'Just sitting. Suspend all judgmental thinking and let words, ideas, and images pass.' },
  { id: '4', title: 'Yoga Nidra', category: 'Sleep', durations: [20, 30, 45], difficulty: 'Beginner', guide: 'Yogi Raj', image: 'https://images.unsplash.com/photo-1512438248547-f4f24c4ad79b?auto=format&fit=crop&q=80&w=400', desc: 'The yoga of sleep. A deep relaxation technique for mental and physical restoration.' },
  { id: '5', title: 'Chakra Balancing', category: 'Energy', durations: [15, 30], difficulty: 'Intermediate', guide: 'Amrit Kaur', image: 'https://images.unsplash.com/photo-1515023115689-589c3971630b?auto=format&fit=crop&q=80&w=400', desc: 'A visualization journey through the seven energy centers of the body.' },
];

const MeditationGuru: React.FC = () => {
  const [view, setView] = useState<'library' | 'session' | 'journal'>('library');
  const [activeTrack, setActiveTrack] = useState<MeditationTrack | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showAmbientControls, setShowAmbientControls] = useState(false);
  const [ambientSound, setAmbientSound] = useState('Forest Rain');
  
  // Journal state
  const [note, setNote] = useState('');
  const [mood, setMood] = useState<number | null>(null);

  useEffect(() => {
    let interval: number;
    if (view === 'session' && isPlaying && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isPlaying) {
      setIsPlaying(false);
      setView('journal');
    }
    return () => clearInterval(interval);
  }, [view, isPlaying, timeRemaining]);

  const startSession = (track?: MeditationTrack) => {
    if (track) {
      setActiveTrack(track);
      setTimeRemaining(selectedDuration * 60);
    } else {
      // Custom timer
      setActiveTrack(null);
      setTimeRemaining(selectedDuration * 60);
    }
    setView('session');
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6 overflow-hidden">
      
      {/* Header Tabs */}
      <div className="flex justify-between items-center">
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          {['library', 'journal'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                view === v ? 'bg-white shadow-sm text-black' : 'text-gray-400'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
             <Sparkles size={12} fill="currentColor" /> 14 Day Streak
           </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'library' && (
          <motion.div 
            key="library"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col gap-8 overflow-hidden"
          >
            {/* Custom Timer Card */}
            <Card className="p-8 bg-indigo-600 text-white border-transparent shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-2">Custom Meditation Timer</h2>
                <p className="text-indigo-100 font-light max-w-sm mb-8">Set your own duration and ambient background for a silent or self-guided practice.</p>
                <div className="flex flex-wrap gap-3">
                  {[5, 10, 20, 30, 60].map(d => (
                    <button 
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${selectedDuration === d ? 'bg-white text-indigo-600' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                      {d}m
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 relative z-10">
                <button 
                  onClick={() => startSession()}
                  className="w-24 h-24 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <Play size={32} fill="currentColor" />
                </button>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Start Custom Session</span>
              </div>
              <Compass className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
            </Card>

            <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {MEDITATIONS.map((track) => (
                <Card 
                  key={track.id} 
                  hoverable
                  className="p-4 border-transparent bg-white shadow-sm flex flex-col group"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative">
                    <img src={track.image} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 right-3">
                       <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-black">{track.category}</Badge>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-1">{track.title}</h3>
                    <p className="text-xs text-gray-400 font-medium mb-4">{track.desc}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                         <Clock size={12} /> {track.durations[0]}m+
                      </div>
                      <Button size="sm" className="rounded-xl px-4" onClick={() => { setSelectedDuration(track.durations[0]); startSession(track); }}>Start</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'session' && (
          <motion.div 
            key="session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#0a0a1a] text-white flex flex-col items-center justify-center p-12 overflow-hidden"
          >
            {/* Immersive Breathing Background */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Session Controls Header */}
            <div className="absolute top-12 left-12 flex items-center gap-4 z-20">
               <button 
                 onClick={() => { setIsPlaying(false); setView('library'); }}
                 className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
               >
                 <X size={20} />
               </button>
            </div>

            <div className="absolute top-12 right-12 flex items-center gap-4 z-20">
               <div className="text-right">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Guide</p>
                  <p className="text-sm font-bold">{activeTrack?.guide || 'Self-Guided'}</p>
               </div>
               <div className="h-10 w-px bg-white/10" />
               <button 
                 onClick={() => setIsMuted(!isMuted)}
                 className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
               >
                 {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
               </button>
            </div>

            {/* Central Timer Display */}
            <div className="relative text-center z-10">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="mb-12"
               >
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-4">
                    {activeTrack?.title || 'Presence'}
                  </h2>
                  <div className="text-9xl font-black tracking-tighter tabular-nums text-white">
                    {formatTime(timeRemaining)}
                  </div>
               </motion.div>

               <div className="flex justify-center gap-8 items-center">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl"
                  >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                  </button>
                  <button 
                    onClick={() => setTimeRemaining(0)}
                    className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Square size={20} />
                  </button>
               </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-8 z-10">
               <div className="flex gap-4">
                  {[
                    { label: 'Forest Rain', icon: <Droplets size={16} /> },
                    { label: 'Tibetan Bowls', icon: <Bell size={16} /> },
                    { label: 'Deep Cosmos', icon: <Moon size={16} /> },
                    { label: 'Silence', icon: <VolumeX size={16} /> },
                  ].map(s => (
                    <button 
                      key={s.label}
                      onClick={() => setAmbientSound(s.label)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${ambientSound === s.label ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                    >
                      {s.label}
                    </button>
                  ))}
               </div>
               
               <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <Heart className="text-red-400 animate-pulse" size={16} />
                    <span className="text-xs font-bold text-white/60">HR: 62 BPM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="text-indigo-400" size={16} />
                    <span className="text-xs font-bold text-white/60">HRV: 85 ms</span>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {view === 'journal' && (
          <motion.div 
            key="journal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 flex flex-col gap-8 max-w-4xl mx-auto w-full overflow-hidden"
          >
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
               {/* Reflection Entry */}
               <Card className="p-8 bg-white border-transparent shadow-sm flex flex-col">
                  <Badge variant="success" className="mb-4 self-start">Session Logged</Badge>
                  <h2 className="text-2xl font-black mb-1">Post-Meditation Reflection</h2>
                  <p className="text-xs text-gray-400 font-medium mb-8">How was your session today?</p>

                  <div className="space-y-8 flex-1 flex flex-col">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Mood Entry</h4>
                      <div className="flex justify-between gap-2">
                        {[
                          { emoji: '😔', label: 'Heavy' },
                          { emoji: '😐', label: 'Neutral' },
                          { emoji: '🙂', label: 'Good' },
                          { emoji: '😌', label: 'Calm' },
                          { emoji: '✨', label: 'Radiant' }
                        ].map((m, i) => (
                          <button 
                            key={i}
                            onClick={() => setMood(i)}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border ${mood === i ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                          >
                            <span className="text-2xl">{m.emoji}</span>
                            <span className={`text-[8px] font-bold uppercase tracking-widest ${mood === i ? 'text-indigo-600' : 'text-gray-400'}`}>{m.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Insights & Notes</h4>
                      <textarea 
                        className="flex-1 w-full p-6 bg-gray-50 border border-transparent rounded-[2rem] outline-none focus:bg-white focus:border-indigo-500 transition-all text-sm font-light italic leading-relaxed placeholder-gray-300 resize-none"
                        placeholder="Write down any thoughts, images, or sensations that arose during your practice..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>

                    <Button className="w-full h-14 rounded-2xl" onClick={() => setView('library')}>Save Reflection</Button>
                  </div>
               </Card>

               {/* Stats & History */}
               <div className="space-y-6 overflow-y-auto pr-2 no-scrollbar">
                  <Card className="p-8 bg-gray-900 text-white border-transparent shadow-xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-6">Mastery Progress</h3>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                       <div>
                          <p className="text-4xl font-black mb-1">24.5h</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Total Stillness</p>
                       </div>
                       <div>
                          <p className="text-4xl font-black mb-1">12</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Day Streak</p>
                       </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 w-3/4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-4 opacity-40 text-center">85% to Guru Status</p>
                  </Card>

                  <div className="space-y-4">
                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Recent Reflections</h4>
                     {[
                       { date: 'Yesterday', title: 'Nadi Shodhana Sync', mood: '✨', note: 'Feeling extremely balanced. Right nostril dominance was high.' },
                       { date: '2 days ago', title: 'Zen Silence', mood: '😌', note: 'Quiet mind. Very few intrusive thoughts today.' },
                     ].map((entry, i) => (
                       <Card key={i} className="p-6 bg-white border-transparent shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2">
                                <span className="text-xl">{entry.mood}</span>
                                <h5 className="font-bold text-sm">{entry.title}</h5>
                             </div>
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{entry.date}</span>
                          </div>
                          <p className="text-xs text-gray-400 italic line-clamp-2">"{entry.note}"</p>
                       </Card>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MeditationGuru;
