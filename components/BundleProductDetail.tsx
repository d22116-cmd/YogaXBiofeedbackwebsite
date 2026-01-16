
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Check, 
  Plus, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Info,
  Package,
  ArrowRight,
  Eye,
  Users
} from 'lucide-react';
import { Button, Badge, Card } from './ui';

interface BundleProductDetailProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const BundleProductDetail: React.FC<BundleProductDetailProps> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'free' | 'pro'>('pro');
  const [viewers, setViewers] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.max(8, prev + Math.floor(Math.random() * 5) - 2));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const bundleItems = [
    {
      name: "PranaFlow Sensor",
      price: "$299",
      desc: "Vedic respiratory sensor for Svara dominance tracking.",
      image: "https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Prana Shirt",
      price: "$199",
      desc: "Smart-fabric wearable for ECG/EMG stress monitoring.",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const features = [
    { name: "Real-time Biofeedback", free: true, pro: true },
    { name: "Nostril Flow Dominance", free: true, pro: true },
    { name: "Stress Pattern Analysis", free: false, pro: true },
    { name: "10 Specialized AI Gurus", free: false, pro: true },
    { name: "Clinical Data Export", free: false, pro: true },
    { name: "Advanced Vedic Astrology Sync", free: false, pro: true },
    { name: "Priority Support", free: false, pro: true }
  ];

  return (
    <div className="bg-white pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => onNavigate('hardware')} className="hover:text-black transition-colors">Hardware</button>
        <ChevronRight size={10} />
        <span className="text-black">Mastery Bundle</span>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-[#fbfbfd] rounded-[3.5rem] p-12 lg:p-20 overflow-hidden relative">
          <div className="absolute top-10 right-10 flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white/50 z-20">
            <Users size={14} className="text-indigo-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{viewers} people viewing now</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Badge variant="success" className="bg-green-100 text-green-600 px-4 py-1.5 rounded-full">Save $49</Badge>
                <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">Limited Time Offer</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">Complete Wellness System.</h1>
              <p className="text-2xl text-gray-500 font-light leading-relaxed mb-12">
                Unify your practice. The Mastery Bundle combines <span className="text-black font-medium">PranaFlow</span> and <span className="text-black font-medium">Prana Shirt</span> for total body-mind integration.
              </p>
              
              <div className="flex items-center gap-6 mb-12">
                <div className="text-5xl font-black tracking-tighter text-black">$449</div>
                <div className="flex flex-col">
                  <span className="text-xl text-gray-300 line-through font-light">$498</span>
                  <span className="text-xs font-bold text-green-500 uppercase tracking-widest">You save 10%</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="premium" className="h-16 px-12 rounded-2xl text-lg shadow-2xl">Add Bundle to Cart</Button>
                <div className="flex items-center justify-center sm:justify-start px-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">or </span>
                  <button onClick={() => onNavigate('hardware')} className="ml-2 text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">Buy individually</button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-[-3deg]"
                >
                  <img src={bundleItems[0].image} alt="PranaFlow" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl translate-y-8 rotate-[3deg]"
                >
                  <img src={bundleItems[1].image} alt="Prana Shirt" className="w-full h-full object-cover" />
                </motion.div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl z-10">
                <Plus className="text-indigo-600" size={32} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">What you get.</h2>
          <p className="text-gray-500 font-light">The complete clinical-grade hardware ecosystem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bundleItems.map((item, i) => (
            <Card key={i} className="p-10 flex items-center gap-8 bg-[#fbfbfd] border-transparent">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="text-green-500" size={18} />
                  <h3 className="text-xl font-bold">{item.name}</h3>
                </div>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">{item.desc}</p>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.price} Value</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Bundle? */}
      <section className="bg-gray-900 text-white py-32 mb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Total Body-Mind Sync</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Connect your thoracic stress patterns from the shirt with your nostril dominance from the flow sensor. The only way to get a 100% complete biometric view.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Single Sync Ecosystem</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Both devices work together flawlessly within the YogaX app. No switching between devices; just one unified dashboard for your entire evolution.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Maximum Value</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Unlock 3 months of YogaX Pro (a $45 value) included free with the bundle. This is the ultimate starter kit for serious practitioners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Tier Table */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Mastery Platform Tiers.</h2>
          <p className="text-gray-500 font-light">Level up your data with YogaX Pro.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl">
          <div className="grid grid-cols-2">
            <button 
              onClick={() => setActiveTab('free')}
              className={`py-8 text-center transition-all ${activeTab === 'free' ? 'bg-white' : 'bg-gray-50 border-b border-gray-100'}`}
            >
              <h4 className="text-lg font-bold">Standard</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Free Forever</p>
            </button>
            <button 
              onClick={() => setActiveTab('pro')}
              className={`py-8 text-center transition-all relative overflow-hidden ${activeTab === 'pro' ? 'bg-white' : 'bg-gray-50 border-b border-gray-100'}`}
            >
              {activeTab !== 'pro' && <div className="absolute inset-0 bg-indigo-600/5" />}
              <h4 className="text-lg font-bold text-indigo-600">YogaX Pro</h4>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mt-1">$14.99 / mo</p>
            </button>
          </div>

          <div className="p-8">
            <table className="w-full">
              <tbody>
                {features.map((feature, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-none">
                    <td className="py-5 font-medium text-gray-700">{feature.name}</td>
                    <td className="py-5 text-center">
                      <div className={`flex justify-center ${activeTab === 'free' ? 'opacity-100' : 'opacity-20'}`}>
                        {feature.free ? <Check size={18} className="text-green-500" /> : <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />}
                      </div>
                    </td>
                    <td className="py-5 text-center">
                      <div className={`flex justify-center ${activeTab === 'pro' ? 'opacity-100' : 'opacity-20'}`}>
                        {feature.pro ? <Check size={18} className="text-indigo-600" /> : <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="mt-12 text-center">
              <Button variant={activeTab === 'pro' ? 'premium' : 'outline'} className="w-full sm:w-64 rounded-2xl h-14">
                {activeTab === 'pro' ? 'Go Pro Now' : 'Stay on Standard'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee */}
      <section className="max-w-7xl mx-auto px-6 mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "30-Day Guarantee", icon: <ShieldCheck className="text-green-500" />, desc: "Try the complete system risk-free. If it doesn't transform your practice, return for a full refund." },
          { title: "VIP Support", icon: <Package className="text-indigo-500" />, desc: "Bundle customers get priority access to our support team and setup consultations." },
          { title: "Secure Checkout", icon: <Zap className="text-yellow-500" />, desc: "Your transactions and biometric data are protected by bank-level encryption." }
        ].map((item, i) => (
          <div key={i} className="text-center p-8">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              {item.icon}
            </div>
            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Footer */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-black text-white p-12 lg:p-16 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent opacity-50" />
          <h2 className="text-4xl font-extrabold tracking-tight mb-8 relative z-10">Ready to master your flow?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 h-16 px-12 rounded-2xl">Buy the Mastery Bundle</Button>
            <button onClick={() => onNavigate('hardware')} className="text-sm font-bold uppercase tracking-widest hover:text-indigo-400 transition-colors flex items-center gap-2">
              Browse products separately <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BundleProductDetail;
