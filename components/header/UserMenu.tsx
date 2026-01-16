
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, LayoutDashboard, Settings, Crown } from 'lucide-react';

interface UserMenuProps {
  user: any;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  isScrolled: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onNavigate, onSignOut, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <button 
        onClick={() => onNavigate('dashboard')}
        className={`text-[12px] font-semibold text-white bg-black px-4 rounded-full hover:bg-gray-800 transition-all shadow-lg active:scale-95 ${
          isScrolled ? 'py-1' : 'py-1.5'
        }`}
      >
        Sign In
      </button>
    );
  }

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, action: () => onNavigate('dashboard') },
    { label: 'Settings', icon: <Settings className="w-4 h-4" />, action: () => onNavigate('settings') },
    { label: 'Sign Out', icon: <LogOut className="w-4 h-4" />, action: onSignOut, danger: true },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-200 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            user.email?.charAt(0).toUpperCase()
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-20"
            >
              <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-bold text-sm truncate">{user.user_metadata?.full_name || 'Yoga Master'}</p>
                  <Crown className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              
              <div className="p-2">
                {menuItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { item.action(); setIsOpen(false); }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      item.danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
