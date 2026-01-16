
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Search, 
  Download, 
  Settings, 
  Plus,
  LayoutDashboard,
  RefreshCw,
  Server,
  Database as DbIcon,
  Globe,
  CheckCircle2,
  Mail,
  Zap,
  Ticket,
  AlertCircle,
  Truck,
  ArrowUpRight,
  MoreVertical,
  Box
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, Badge, Button } from '../ui';
import UserManagement from './UserManagement';
import InventoryManagement from './InventoryManagement';

// Mock Data for Charts
const GROWTH_DATA = [
  { date: '01 May', users: 820, revenue: 12000 },
  { date: '05 May', users: 890, revenue: 15400 },
  { date: '10 May', users: 950, revenue: 14200 },
  { date: '15 May', users: 1050, revenue: 18900 },
  { date: '20 May', users: 1120, revenue: 21000 },
  { date: '25 May', users: 1180, revenue: 19500 },
  { date: '30 May', users: 1242, revenue: 24500 },
];

const GURU_USAGE = [
  { name: 'Pranayama', value: 450 },
  { name: 'Asana', value: 320 },
  { name: 'Meditation', value: 380 },
  { name: 'Ayurveda', value: 150 },
  { name: 'Jyotish', value: 90 },
];

const SUBSCRIPTION_DATA = [
  { name: 'Free', value: 400, color: '#94a3b8' },
  { name: 'Pro', value: 650, color: '#6366f1' },
  { name: 'Family', value: 120, color: '#8b5cf6' },
  { name: 'Corporate', value: 72, color: '#1e293b' },
];

const ACTIVITY_LOG = [
  { id: 1, event: 'New Registration', user: 'Liam Neeson', time: 'Just now', icon: <Users size={14} />, color: 'text-blue-500' },
  { id: 2, event: 'Order Placed', user: 'YX-882914', time: '5m ago', icon: <ShoppingBag size={14} />, color: 'text-green-500' },
  { id: 3, event: 'Ticket Escalated', user: 'Firmware Bug', time: '12m ago', icon: <AlertCircle size={14} />, color: 'text-red-500' },
  { id: 4, event: 'Pro Plan Upgrade', user: 'Sarah Jenkins', time: '22m ago', icon: <Zap size={14} />, color: 'text-indigo-500' },
  { id: 5, event: 'Device Linked', user: 'PranaFlow Sensor', time: '1h ago', icon: <Truck size={14} />, color: 'text-orange-500' },
];

const ALERTS = [
  { id: 1, type: 'stock', msg: 'PranaFlow inventory below 50 units', priority: 'high' },
  { id: 2, type: 'payment', msg: '3 failed renewal attempts in last hour', priority: 'med' },
  { id: 3, type: 'system', msg: 'Cloud sync latency spike in EU-West', priority: 'low' },
];

const AdminDashboard: React.FC = () => {
  const [adminView, setAdminView] = useState<'overview' | 'users' | 'orders' | 'inventory' | 'settings'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[
          { label: "Total Active Users", val: "12,402", trend: "+14%", icon: <Users className="text-blue-500" /> },
          { label: "Monthly Recurring", val: "$142,500", trend: "+8.2%", icon: <DollarSign className="text-green-500" /> },
          { label: "Devices Sold (MTD)", val: "842", trend: "+22%", icon: <ShoppingBag className="text-orange-500" /> },
          { label: "Open Tickets", val: "14/156", trend: "Stable", icon: <Ticket className="text-indigo-500" /> },
          { label: "System Health", val: "99.98%", trend: "Optimal", icon: <Server className="text-teal-500" /> },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-transparent bg-white shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-green-500 flex items-center gap-1">
                {stat.trend} <ArrowUpRight size={12} />
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black tracking-tighter">{stat.val}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Analytics Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* User Growth & Revenue Chart */}
          <Card className="p-8 border-transparent bg-white shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Growth & Revenue</h3>
                <p className="text-xs text-gray-400 font-medium">Last 30 days performance</p>
              </div>
              <div className="flex gap-2">
                 <Badge variant="primary" className="bg-indigo-50 text-indigo-600">Users</Badge>
                 <Badge variant="outline">Revenue</Badge>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GROWTH_DATA}>
                  <defs>
                    <linearGradient id="adminGrow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#6366f1" fillOpacity={1} fill="url(#adminGrow)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-transparent bg-white shadow-sm">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Zap size={18} className="text-yellow-500" /> Guru Popularity
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GURU_USAGE}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-8 border-transparent bg-white shadow-sm">
              <h3 className="font-bold mb-6">Subscription Mix</h3>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SUBSCRIPTION_DATA}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {SUBSCRIPTION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-black">1.2K</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Active</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {SUBSCRIPTION_DATA.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Alerts Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALERTS.map((alert) => (
              <Card key={alert.id} className={`p-6 border-transparent shadow-sm relative overflow-hidden ${
                alert.priority === 'high' ? 'bg-red-50 text-red-900 border-red-100' : 
                alert.priority === 'med' ? 'bg-orange-50 text-orange-900' : 'bg-gray-50'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-xl ${
                    alert.priority === 'high' ? 'bg-red-500 text-white' : 'bg-white/50'
                  }`}>
                    {alert.type === 'stock' ? <ShoppingBag size={18} /> : alert.type === 'payment' ? <DollarSign size={18} /> : <Server size={18} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">{alert.type} Alert</p>
                    <p className="text-xs font-bold leading-relaxed">{alert.msg}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Log & Quick Actions */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Actions Card */}
          <Card className="p-8 border-transparent bg-gray-900 text-white shadow-xl">
             <h3 className="text-sm font-black uppercase tracking-widest opacity-40 mb-6">Management Tools</h3>
             <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                   <Mail size={20} className="text-indigo-400" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Broadcast</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                   <Settings size={20} className="text-blue-400" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Settings</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                   <DbIcon size={20} className="text-green-400" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Database</span>
                </button>
                <button className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                   <Globe size={20} className="text-purple-400" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Region</span>
                </button>
             </div>
             <Button variant="premium" className="w-full mt-6 h-14 rounded-xl text-sm" leftIcon={<CheckCircle2 size={16} />}>Run Health Check</Button>
          </Card>

          {/* Activity Feed */}
          <Card className="p-8 border-transparent bg-white shadow-sm flex flex-col h-full min-h-[500px]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold tracking-tight">Real-time Feed</h3>
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar">
               {ACTIVITY_LOG.map((item) => (
                 <div key={item.id} className="flex gap-4 relative group">
                   <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 ${item.color} group-hover:scale-110 transition-transform`}>
                     {item.icon}
                   </div>
                   <div className="flex-1 border-b border-gray-50 pb-4">
                     <div className="flex justify-between items-start mb-0.5">
                       <p className="text-sm font-bold tracking-tight">{item.event}</p>
                       <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                     </div>
                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.user}</p>
                   </div>
                 </div>
               ))}
            </div>
            <button className="w-full py-4 mt-6 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black border-t border-gray-100 transition-colors">
              Expand Full Audit Log
            </button>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Global Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100 flex items-center gap-2">
              <Server size={10} /> Live System Terminal
            </span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Master Admin</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {adminView === 'overview' ? 'Platform Command Center.' : adminView === 'users' ? 'User Directory.' : adminView === 'inventory' ? 'Supply Chain Hub.' : 'Management.'}
          </h1>
        </div>
        
        <div className="flex items-center bg-gray-100 p-1 rounded-2xl">
          {[
            { id: 'overview', icon: <LayoutDashboard size={14} />, label: 'Overview' },
            { id: 'users', icon: <Users size={14} />, label: 'Users' },
            { id: 'orders', icon: <ShoppingBag size={14} />, label: 'Orders' },
            { id: 'inventory', icon: <Box size={14} />, label: 'Inventory' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAdminView(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                adminView === tab.id ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={adminView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {adminView === 'overview' && renderOverview()}
          {adminView === 'users' && <UserManagement />}
          {adminView === 'inventory' && <InventoryManagement />}
          {adminView === 'orders' && (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <ShoppingBag size={64} className="text-gray-100 mb-6" />
              <h2 className="text-2xl font-bold">Order Management</h2>
              <p className="text-gray-400 max-w-xs mt-2 font-light">Comprehensive fulfillment and shipping hub under construction.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
