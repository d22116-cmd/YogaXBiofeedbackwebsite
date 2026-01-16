
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Search, 
  Play, 
  Check, 
  AlertCircle, 
  XCircle, 
  ChevronRight, 
  Plus, 
  Clock, 
  Layers, 
  Trophy, 
  History, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  ArrowLeft,
  Filter,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../ui';

interface Pose {
  id: string;
  name: string;
  sanskrit: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
  focus: string[];
  image: string;
}

const ASANAS: Pose[] = [
  { id: '1', name: 'Mountain Pose', sanskrit: 'Tadasana', difficulty: 'Beginner', benefits: ['Posture', 'Balance'], focus: ['Full Body'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Warrior II', sanskrit: 'Virabhadrasana II', difficulty: 'Beginner', benefits: ['Strength', 'Stamina'], focus: ['Legs', 'Arms'], image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Tree Pose', sanskrit: 'Vrikshasana', difficulty: 'Beginner', benefits: ['Focus', 'Stability'], focus: ['Core', 'Legs'], image: 'https://images.unsplash.com/photo-1552196564-972d46387352?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Triangle Pose', sanskrit: 'Trikonasana', difficulty: 'Intermediate', benefits: ['Flexibility', 'Spine'], focus: ['Hips', 'Shoulders'], image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Down Dog', sanskrit: 'Adho Mukha Svanasana', difficulty: 'Beginner', benefits: ['Hamstrings', 'Circulation'], focus: ['Full Body'], image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400' },
  { id: '6', name: 'Crow Pose', sanskrit: 'Bakasana', difficulty: 'Advanced', benefits: ['Balance', 'Arm Strength'], focus: ['Arms', 'Core'], image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400' },
];

const AsanaGuru: React.FC = () => {
  const [view, setView] = useState<'library' | 'practice' | 'builder' | 'summary'>('library');
  const [selectedPose, setSelectedPose] = useState<Pose | null>(null);
  const [sequence, setSequence] = useState<Pose[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [practiceStep, setPracticeStep] = useState(0);
  const [alignmentScore, setAlignmentScore] = useState(92);
  const [holdTimer, setHoldTimer] = useState(30);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let interval: number;
    if (view === 'practice' && holdTimer > 0) {
      interval = window.setInterval(() => {
        setHoldTimer(prev => prev - 1);
        setAlignmentScore(prev => Math.min(100, Math.max(85, prev + (Math.random() > 0.5 ? 1 : -1))));
      }, 1000);
    } else if (holdTimer === 0 && view === 'practice') {
      if (practiceStep < sequence.length - 1) {
        setPracticeStep(prev => prev + 1);
        setHoldTimer(30);
      } else {
        setView('summary');
      }
    }
    return () => clearInterval(interval);
  }, [view, holdTimer, practiceStep, sequence]);

  const startPractice = (initialSequence?: Pose[]) => {
    const activeSeq = initialSequence || (selectedPose ? [selectedPose] : [ASANAS[0]]);
    setSequence(activeSeq);
    setPracticeStep(0);
    setHoldTimer(30);
    setView('practice');
    
    // Request Camera access
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    }).catch(err => console.error("Camera error:", err));
  };

  const addToSequence = (pose: Pose) => {
    setSequence([...sequence, pose]);
  };

  const filteredAsanas = ASANAS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sanskrit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      
      {/* View Header with Tabs */}
      <div className="flex justify-between items-center">
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          {['library', 'builder', 'progress'].map((t) => (
            <button
              key={t}
              onClick={() => setView(t as any)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                view === t ? 'bg-white shadow-sm text-black' : 'text-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {sequence.length > 0 && view !== 'practice' && (
          <Button 
            onClick={() => startPractice(sequence)}
            className="rounded-xl shadow-lg shadow-indigo-100"
            leftIcon={<Play size={16} />}
          >
            Start Sequence ({sequence.length})
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {view === 'library' && (
          <motion.div 
            key="library"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col gap-6 overflow-hidden"
          >
            <div className="flex gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search asanas by name or benefit..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-indigo-500 transition-all text-sm font-medium"
                />
              </div>
              <Button variant="outline" className="rounded-2xl" leftIcon={<Filter size={16} />}>Filter</Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {filteredAsanas.map((pose) => (
                <Card 
                  key={pose.id} 
                  hoverable 
                  className="p-4 border-transparent bg-white shadow-sm flex flex-col group"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                    <img src={pose.image} alt={pose.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <Badge variant={pose.difficulty === 'Beginner' ? 'success' : 'primary'} className="lowercase">
                        {pose.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-0.5">{pose.name}</h3>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-4 italic">{pose.sanskrit}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pose.focus.map(f => (
                        <span key={f} className="text-[9px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 rounded-xl" onClick={() => startPractice([pose])}>Practice</Button>
                      <button 
                        onClick={() => addToSequence(pose)}
                        className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'practice' && (
          <motion.div 
            key="practice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black text-white p-8 flex flex-col"
          >
            {/* Practice Header */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <button 
                onClick={() => setView('library')}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"
              >
                <ArrowLeft size={16} /> Exit Practice
              </button>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Alignment</p>
                  <p className={`text-2xl font-black ${alignmentScore > 90 ? 'text-green-500' : 'text-yellow-500'}`}>{alignmentScore}%</p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Hold</p>
                  <p className="text-2xl font-black font-mono">00:{holdTimer.toString().padStart(2, '0')}</p>
                </div>
                <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>

            {/* Video Viewport */}
            <div className="flex-1 relative rounded-[3rem] overflow-hidden bg-gray-900 shadow-2xl">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover scale-x-[-1]" 
              />
              
              {/* Simulated Skeleton Overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
                <svg className="w-full h-full" viewBox="0 0 400 600">
                  <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    {/* Head */}
                    <circle cx="200" cy="150" r="15" stroke={alignmentScore > 90 ? "#10b981" : "#f59e0b"} strokeWidth="2" fill="none" />
                    {/* Spine */}
                    <line x1="200" y1="165" x2="200" y2="300" stroke={alignmentScore > 90 ? "#10b981" : "#f59e0b"} strokeWidth="2" />
                    {/* Arms */}
                    <line x1="200" y1="180" x2="140" y2="240" stroke="#10b981" strokeWidth="2" />
                    <line x1="200" y1="180" x2="260" y2="240" stroke="#10b981" strokeWidth="2" />
                    {/* Legs */}
                    <line x1="200" y1="300" x2="160" y2="450" stroke="#10b981" strokeWidth="2" />
                    <line x1="200" y1="300" x2="240" y2="450" stroke="#10b981" strokeWidth="2" />
                  </motion.g>
                </svg>
              </div>

              {/* Real-time Cues */}
              <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                <div className="space-y-4 max-w-sm">
                  <AnimatePresence mode="wait">
                    {alignmentScore < 95 && (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-yellow-500/90 backdrop-blur-md p-4 rounded-2xl flex items-start gap-3 text-black"
                      >
                        <AlertCircle size={20} className="shrink-0" />
                        <div>
                          <p className="font-bold text-sm">Adjustment Needed</p>
                          <p className="text-xs opacity-80">Square your hips and soften your shoulders.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Active Pose</p>
                    <h3 className="text-3xl font-black mb-1">{sequence[practiceStep]?.name}</h3>
                    <p className="text-sm font-medium text-indigo-400">{sequence[practiceStep]?.sanskrit}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/5 text-right w-64">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Sequence Progress</p>
                    <div className="flex gap-2">
                      {sequence.map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < practiceStep ? 'bg-indigo-500' : i === practiceStep ? 'bg-white' : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <p className="text-xs font-bold mt-4 uppercase tracking-widest">{practiceStep + 1} of {sequence.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'builder' && (
          <motion.div 
            key="builder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              <Card className="lg:col-span-2 p-8 bg-white border-transparent shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black">Sequence Builder</h2>
                  <div className="flex gap-2">
                     <Button variant="ghost" size="sm" onClick={() => setSequence([])} leftIcon={<RotateCcw size={16} />}>Reset</Button>
                     <Button variant="primary" size="sm" onClick={() => startPractice(sequence)} disabled={sequence.length === 0}>Preview Practice</Button>
                  </div>
                </div>

                {sequence.length > 0 ? (
                  <div className="space-y-3 overflow-y-auto pr-2">
                    {sequence.map((pose, idx) => (
                      <motion.div 
                        key={`${pose.id}-${idx}`}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-black text-gray-400">
                            {idx + 1}
                          </div>
                          <div className="w-12 h-12 rounded-xl overflow-hidden">
                            <img src={pose.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{pose.name}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pose.sanskrit}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hold</p>
                             <p className="text-xs font-bold">30s</p>
                          </div>
                          <button 
                            onClick={() => {
                              const newSeq = [...sequence];
                              newSeq.splice(idx, 1);
                              setSequence(newSeq);
                            }}
                            className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center text-center p-12">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                      <Layers size={32} className="text-gray-200" />
                    </div>
                    <p className="font-bold mb-2">Your sequence is empty</p>
                    <p className="text-sm text-gray-400 max-w-xs mb-8">Select poses from the library to build your custom daily flow.</p>
                    <Button variant="outline" onClick={() => setView('library')}>Explore Asanas</Button>
                  </div>
                )}
              </Card>

              <aside className="space-y-6">
                <Card className="p-8 bg-indigo-600 text-white border-transparent shadow-xl">
                  <h3 className="font-bold text-lg mb-4">Flow Analytics</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">
                        <span>Difficulty Balance</span>
                        <span>Med</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-2/3" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-4 rounded-2xl">
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Duration</p>
                         <p className="text-xl font-black">{(sequence.length * 0.5).toFixed(1)}m</p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-2xl">
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Focus</p>
                         <p className="text-xl font-black">Core</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white border-transparent shadow-sm">
                   <h3 className="font-bold mb-6">Quick Suggest</h3>
                   <div className="space-y-4">
                     {ASANAS.slice(0, 3).map(p => (
                       <button 
                        key={p.id}
                        onClick={() => addToSequence(p)}
                        className="w-full flex items-center gap-4 p-2 hover:bg-gray-50 rounded-2xl transition-all text-left group"
                       >
                         <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100">
                           <img src={p.image} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1">
                           <p className="text-xs font-bold">{p.name}</p>
                           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{p.sanskrit}</p>
                         </div>
                         <Plus size={14} className="text-gray-300 group-hover:text-indigo-600" />
                       </button>
                     ))}
                   </div>
                </Card>
              </aside>
            </div>
          </motion.div>
        )}

        {view === 'summary' && (
          <motion.div 
            key="summary"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 bg-white rounded-[3rem] shadow-sm flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-10">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4">Practice Mastered</h2>
            <p className="text-gray-400 font-light mb-12 max-w-lg">
              Excellent focus. You maintained optimal alignment for 94% of the session. Your hip mobility shows significant improvement compared to last week.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Session Score</p>
                <p className="text-4xl font-black text-indigo-600">96</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Duration</p>
                <p className="text-4xl font-black">12:00</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Poses Completed</p>
                <p className="text-4xl font-black">{sequence.length}</p>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <Button onClick={() => setView('library')} size="lg" className="flex-1 h-16 rounded-2xl">Return to Platform</Button>
              <Button variant="outline" size="lg" className="flex-1 h-16 rounded-2xl" leftIcon={<RotateCcw size={18} />}>Repeat Practice</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AsanaGuru;
