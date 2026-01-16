
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, HelpCircle, Wind, Activity, Brain, ShieldAlert } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './dashboard/Sidebar';
import Overview from './dashboard/Overview';
import MyDevices from './dashboard/MyDevices';
import SessionHistory from './dashboard/SessionHistory';
import MyOrders from './dashboard/MyOrders';
import AdminDashboard from './admin/AdminDashboard';
import PranayamaGuru from './dashboard/PranayamaGuru';
import AsanaGuru from './dashboard/AsanaGuru';
import MeditationGuru from './dashboard/MeditationGuru';
import NotificationSettings from './dashboard/NotificationSettings';
import ReferralDashboard from './dashboard/ReferralDashboard';
import { Button } from './ui';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeGuruType, setActiveGuruType] = useState<'pranayama' | 'asana' | 'meditation'>('pranayama');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Simple role check based on metadata or email for demo purposes
  const isAdmin = user?.email?.includes('admin') || user?.app_metadata?.role === 'admin';

  useEffect(() => {
    if (activeTab === 'admin' && !isAdmin) {
      setActiveTab('overview');
    }
  }, [activeTab, isAdmin]);

  const renderTabContent = () => {
    if (activeTab === 'admin' && !isAdmin) {
      return (
        <div className="h-[70vh] flex flex-col items-center justify-center text-center px-6">
           <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8 shadow-xl shadow-red-100/50">
              <ShieldAlert size={48} />
           </div>
           <h2 className="text-3xl font-black mb-4">Access Restricted</h2>
           <p className="text-gray-400 font-light max-sm mb-12">This terminal requires Level 9 Admin credentials. Your current mastery level is insufficient for global platform protocols.</p>
           <Button onClick={() => setActiveTab('overview')} size="lg" className="rounded-2xl px-12">Return to Sanctuary</Button>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'devices':
        return <MyDevices />;
      case 'sessions':
        return <SessionHistory />;
      case 'orders':
        return <MyOrders />;
      case 'referrals':
        return <ReferralDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'notifications':
        return <NotificationSettings />;
      case 'gurus':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => setActiveGuruType('pranayama')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeGuruType === 'pranayama' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400 hover:text-black shadow-sm'}`}
              >
                <Wind size={16} /> Pranayama
              </button>
              <button 
                onClick={() => setActiveGuruType('asana')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeGuruType === 'asana' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400 hover:text-black shadow-sm'}`}
              >
                <Activity size={16} /> Asana
              </button>
              <button 
                onClick={() => setActiveGuruType('meditation')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeGuruType === 'meditation' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400 hover:text-black shadow-sm'}`}
              >
                <Brain size={16} /> Meditation
              </button>
            </div>
            {activeGuruType === 'pranayama' && <PranayamaGuru />}
            {activeGuruType === 'asana' && <AsanaGuru />}
            {activeGuruType === 'meditation' && <MeditationGuru />}
          </div>
        );
      case 'progress':
        return (
          <div className="py-20 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8">
               <span className="text-4xl">📈</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Deep Analytics</h2>
            <p className="text-gray-400 font-light max-w-xs">Mapping your neurological evolution over time.</p>
          </div>
        );
      case 'settings':
        return <NotificationSettings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        onSignOut={signOut}
        isAdmin={isAdmin}
      />

      <main 
        className={`transition-all duration-300 min-h-screen pt-24 ${
          isCollapsed ? 'pl-20 md:pl-28' : 'pl-20 md:pl-[300px]'
        } pr-6`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="relative group max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search metrics, gurus, or sessions..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-transparent rounded-2xl shadow-sm focus:bg-white focus:border-indigo-500 transition-all outline-none text-sm"
              />
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`relative p-2 hover:bg-white rounded-full transition-colors group ${activeTab === 'notifications' ? 'bg-white' : ''}`}
              >
                <Bell size={20} className={`${activeTab === 'notifications' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-black'} transition-colors`} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white shadow-sm"></span>
              </button>
              <button className="p-2 hover:bg-white rounded-full transition-colors group">
                <HelpCircle size={20} className="text-gray-400 group-hover:text-black transition-colors" />
              </button>
              <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-black leading-none">{user?.user_metadata?.full_name || 'Yoga Master'}</p>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{isAdmin ? 'Global Admin' : 'Level 4 Mastery'}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-sm border-2 border-white shadow-sm overflow-hidden">
                   {user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.email?.charAt(0).toUpperCase()
                  )}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab === 'gurus' ? `${activeTab}-${activeGuruType}` : activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
