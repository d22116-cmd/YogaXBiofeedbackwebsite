
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Cpu, 
  History, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  ShoppingBag, 
  ShieldCheck,
  Gift
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onSignOut: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed,
  onSignOut,
  isAdmin = false
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'devices', label: 'My Devices', icon: <Cpu size={20} /> },
    { id: 'sessions', label: 'Sessions', icon: <History size={20} /> },
    { id: 'gurus', label: 'AI Gurus', icon: <Users size={20} /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} /> },
    { id: 'referrals', label: 'Refer & Earn', icon: <Gift size={20} /> },
    { id: 'progress', label: 'Progress', icon: <BarChart3 size={20} /> },
  ];

  return (
    <motion.div 
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed left-0 top-0 bottom-0 bg-white border-r border-gray-100 z-40 flex flex-col pt-20"
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <div className="shrink-0">{item.icon}</div>
            {!isCollapsed && (
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
            )}
          </button>
        ))}
        
        {/* Admin entry - only visible for admins */}
        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-gray-50">
            <button
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all ${
                activeTab === 'admin' 
                  ? 'bg-red-50 text-red-600 shadow-sm border border-red-100' 
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="shrink-0"><ShieldCheck size={20} /></div>
              {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Admin Command</span>}
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-50 space-y-2">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all ${
            activeTab === 'settings' 
              ? 'bg-gray-900 text-white' 
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <div className="shrink-0"><Settings size={20} /></div>
          {!isCollapsed && <span className="text-sm font-bold tracking-tight">Settings</span>}
        </button>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-4 p-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all"
        >
          <div className="shrink-0"><LogOut size={20} /></div>
          {!isCollapsed && <span className="text-sm font-bold tracking-tight">Sign Out</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
