
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ShieldAlert, 
  Trash2, 
  Mail, 
  ExternalLink, 
  Cpu, 
  CreditCard, 
  ShoppingBag, 
  History, 
  Activity,
  User,
  Settings,
  Lock,
  Globe,
  Plus
} from 'lucide-react';
import { Modal, Card, Badge, Button, Tabs, Input } from '../ui';

interface UserDetailModalProps {
  user: any;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={14} /> },
    { id: 'devices', label: 'Devices', icon: <Cpu size={14} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={14} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={14} /> },
    { id: 'activity', label: 'Logs', icon: <Activity size={14} /> }
  ];

  const renderProfile = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <Input label="Full Name" defaultValue={user.name} />
        <Input label="Email Address" defaultValue={user.email} />
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Role</label>
          <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:bg-white border border-transparent focus:border-indigo-500 text-sm font-medium">
            <option value="user">User</option>
            <option value="pro">Pro Practitioner</option>
            <option value="researcher">Clinical Researcher</option>
            <option value="admin">Global Admin</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Status</label>
          <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:bg-white border border-transparent focus:border-indigo-500 text-sm font-medium">
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Restricted">Restricted</option>
          </select>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
         <Button variant="outline" className="rounded-xl flex-1" leftIcon={<Lock size={16} />}>Reset Password</Button>
         <Button variant="outline" className="rounded-xl flex-1" leftIcon={<Globe size={16} />}>Impersonate</Button>
         <Button variant="outline" className="rounded-xl flex-1" leftIcon={<Mail size={16} />}>Send Email</Button>
      </div>

      <Card className="p-6 bg-red-50/50 border-red-100">
         <h4 className="text-red-900 font-bold text-sm flex items-center gap-2 mb-2">
           <ShieldAlert size={16} /> Danger Zone
         </h4>
         <p className="text-xs text-red-700/70 mb-4 leading-relaxed">
           Deleting this user will permanently remove all biometric history, device links, and AI interactions. This action cannot be undone.
         </p>
         <Button variant="danger" size="sm" className="rounded-xl" leftIcon={<Trash2 size={14} />}>Permanently Delete Account</Button>
      </Card>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-4">
      {[
        { name: 'PranaFlow Sensor', sn: 'PF-9921-X882', status: 'Online', battery: '85%' },
        { name: 'Prana Shirt V2', sn: 'PS-1102-M001', status: 'Offline', battery: '12%' }
      ].map((dev, i) => (
        <Card key={i} className="p-4 bg-white border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-indigo-600">
               <Cpu size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">{dev.name}</p>
              <p className="text-[10px] text-gray-400 font-mono tracking-wider">{dev.sn}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
               <p className={`text-[10px] font-black uppercase tracking-widest ${dev.status === 'Online' ? 'text-green-500' : 'text-gray-400'}`}>{dev.status}</p>
               <p className="text-[10px] font-bold text-gray-400">Batt: {dev.battery}</p>
            </div>
            <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
          </div>
        </Card>
      ))}
      <Button variant="outline" className="w-full rounded-2xl border-dashed py-6 border-gray-200 text-gray-400 text-xs font-bold uppercase tracking-widest" leftIcon={<Plus size={16} />}>
        Provision New Hardware
      </Button>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <Card className="p-8 border-transparent bg-indigo-600 text-white shadow-xl relative overflow-hidden">
         <div className="relative z-10">
           <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Current Tier</p>
           <h3 className="text-3xl font-black mb-1">Practitioner Pro</h3>
           <p className="text-sm text-indigo-100 font-medium">Billed monthly • $14.99/mo</p>
           
           <div className="mt-8 flex gap-3">
             <Button className="bg-white text-black hover:bg-gray-100 rounded-xl h-10 text-xs">Update Plan</Button>
             <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl h-10 text-xs">Cancel Auto-Renew</Button>
           </div>
         </div>
         <CreditCard className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 rotate-12" />
      </Card>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Payment Methods</h4>
        <Card className="p-4 flex items-center justify-between border-gray-100">
           <div className="flex items-center gap-3">
             <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px] font-black">VISA</div>
             <p className="text-sm font-bold">•••• 4242</p>
           </div>
           <Badge variant="outline">Default</Badge>
        </Card>
      </div>

      <div className="pt-4">
        <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:underline">
          View in Stripe Dashboard <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      maxWidth="max-w-3xl"
      showClose={false}
    >
      <div className="flex flex-col h-full max-h-[85vh]">
        {/* Modal Header */}
        <header className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
               <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
               <div className="flex items-center gap-3 mb-1">
                 <h2 className="text-3xl font-black tracking-tight">{user.name}</h2>
                 <Badge variant="success">Verified</Badge>
               </div>
               <p className="text-gray-400 text-sm font-medium">Joined May 12, 2023 • {user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-8 self-start">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                activeTab === t.id ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'devices' && renderDevices()}
          {activeTab === 'billing' && renderBilling()}
          {activeTab === 'orders' && (
             <div className="space-y-4">
                {[1, 2].map(i => (
                  <Card key={i} className="p-4 border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Order #YX-88291{i}</p>
                      <p className="text-[10px] text-gray-400">Jan 1{i}, 2025 • Delivered</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black">$299.00</p>
                       <button className="text-[10px] font-black uppercase text-indigo-600 hover:underline">Details</button>
                    </div>
                  </Card>
                ))}
             </div>
          )}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              {[
                { event: 'Login', time: '2 hours ago', ip: '192.168.1.1' },
                { event: 'Session Start: Nadi Shodhana', time: '3 hours ago', ip: '192.168.1.1' },
                { event: 'Pro Plan Renewal', time: '1 day ago', ip: 'System' },
                { event: 'Password Changed', time: '5 days ago', ip: '192.168.1.1' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start relative group">
                  {i !== 3 && <div className="absolute left-1.5 top-4 bottom-[-24px] w-0.5 bg-gray-50" />}
                  <div className="w-3 h-3 rounded-full bg-indigo-100 mt-1 shrink-0 border-2 border-white shadow-sm z-10 group-hover:bg-indigo-600 transition-colors" />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{log.event}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{log.time} • IP: {log.ip}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <footer className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <History size={12} /> Last edited by Satyam (Admin) 2 days ago
           </div>
           <Button onClick={onClose} size="sm" className="rounded-xl px-8">Save Changes</Button>
        </footer>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
