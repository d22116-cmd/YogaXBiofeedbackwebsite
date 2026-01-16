
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  ShoppingBag, 
  Cpu, 
  Trophy, 
  CreditCard, 
  Zap, 
  AlertCircle, 
  Check,
  CheckCircle2,
  X,
  ArrowRight,
  MoreVertical,
  Settings
} from 'lucide-react';
import { Notification } from '../../types';
import { Badge, Button } from '../ui';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'order', title: 'Order Shipped', description: 'Your PranaFlow (YX-882910) is on its way. Track your package now.', created_at: '2h ago', read_at: null },
  { id: '2', type: 'achievement', title: '7-Day Streak!', description: 'Incredible dedication. You\'ve unlocked the "Consistent Master" badge.', created_at: '5h ago', read_at: null },
  { id: '3', type: 'device', title: 'Low Battery Alert', description: 'Your Prana Shirt is at 12%. Please charge it before your next session.', created_at: '1d ago', read_at: '2025-05-12T10:00:00Z' },
  { id: '4', type: 'session', title: 'Summary Ready', description: 'Your clinical Nadi Shodhana report from this morning is now available.', created_at: '1d ago', read_at: '2025-05-12T09:00:00Z' },
  { id: '5', type: 'billing', title: 'Plan Renewed', description: 'Your YogaX Pro subscription has been successfully renewed for June.', created_at: '3d ago', read_at: '2025-05-10T10:00:00Z' },
];

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose, onNavigate }) => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read_at).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingBag size={14} className="text-indigo-600" />;
      case 'device': return <Cpu size={14} className="text-blue-600" />;
      case 'achievement': return <Trophy size={14} className="text-yellow-600" />;
      case 'billing': return <CreditCard size={14} className="text-green-600" />;
      case 'session': return <Zap size={14} className="text-purple-600" />;
      default: return <AlertCircle size={14} className="text-gray-600" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 mt-4 w-96 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden z-[100]"
        >
          <header className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black tracking-tight">Notifications</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{unreadCount} Unread Alerts</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={markAllRead}
                className="p-2 text-indigo-600 hover:bg-white rounded-xl transition-all"
                title="Mark all as read"
              >
                <CheckCircle2 size={18} />
              </button>
              <button 
                onClick={() => { onNavigate('settings'); onClose(); }}
                className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-xl transition-all"
              >
                <Settings size={18} />
              </button>
            </div>
          </header>

          <div className="max-h-[480px] overflow-y-auto no-scrollbar">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-6 flex gap-4 transition-colors relative group ${!n.read_at ? 'bg-indigo-50/30' : 'hover:bg-gray-50'}`}
                  >
                    {!n.read_at && (
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                    )}
                    
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      {getIcon(n.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-bold truncate pr-4">{n.title}</h4>
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter whitespace-nowrap">{n.created_at}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">{n.description}</p>
                      
                      {!n.read_at && (
                        <div className="mt-4 flex gap-2">
                          <button 
                            onClick={() => markAsRead(n.id)}
                            className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline"
                          >
                            Mark as read
                          </button>
                          <span className="text-gray-200">|</span>
                          <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell size={32} className="text-gray-200" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">All caught up</h3>
                <p className="text-xs text-gray-400 font-medium">No new notifications for your journey.</p>
              </div>
            )}
          </div>

          <footer className="p-4 bg-gray-50/50 border-t border-gray-100">
            <button 
              onClick={() => { onNavigate('notifications'); onClose(); }}
              className="w-full py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              View All Notifications <ArrowRight size={12} />
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
