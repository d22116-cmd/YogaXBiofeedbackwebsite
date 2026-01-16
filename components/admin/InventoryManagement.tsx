
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Cpu, 
  RefreshCcw, 
  RotateCcw,
  Truck, 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  AlertTriangle, 
  CheckCircle2, 
  Wifi, 
  Battery, 
  ArrowUpRight,
  Upload,
  Calendar,
  Settings,
  Zap,
  Tag,
  ClipboardList
} from 'lucide-react';
import { Card, Badge, Button, Input } from '../ui';

type InventoryTab = 'stock' | 'registry' | 'active' | 'rma' | 'firmware';

const InventoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InventoryTab>('stock');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'stock', label: 'Overview', icon: <Package size={14} /> },
    { id: 'registry', label: 'Device Registry', icon: <ClipboardList size={14} /> },
    { id: 'active', label: 'Active Units', icon: <Wifi size={14} /> },
    { id: 'rma', label: 'RMA Hub', icon: <Truck size={14} /> },
    { id: 'firmware', label: 'Firmware', icon: <Cpu size={14} /> }
  ];

  const renderStock = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'PranaFlow Sensor', total: 450, available: 382, reserved: 48, status: 'Healthy', img: 'https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=200' },
          { name: 'Prana Shirt V2', total: 124, available: 15, reserved: 8, status: 'Low Stock', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=200' },
          { name: 'Mastery Bundle', total: 85, available: 72, reserved: 13, status: 'Healthy', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200' },
        ].map((item, i) => (
          <Card key={i} className="p-8 border-transparent bg-white shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img src={item.img} alt="" className="w-full h-full object-cover" />
              </div>
              <Badge variant={item.status === 'Low Stock' ? 'error' : 'success'} className="lowercase">{item.status}</Badge>
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-6">{item.name}</h3>
            <div className="space-y-4 flex-1">
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400 font-medium">Total Inventory</span>
                 <span className="font-black">{item.total}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400 font-medium">Available to Sell</span>
                 <span className={`font-black ${item.available < 20 ? 'text-red-500' : 'text-gray-900'}`}>{item.available}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400 font-medium">Reserved</span>
                 <span className="font-bold text-indigo-600">{item.reserved}</span>
               </div>
            </div>
            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden mt-8">
               <div className={`h-full ${item.status === 'Low Stock' ? 'bg-red-500' : 'bg-indigo-600'}`} style={{ width: `${(item.available / item.total) * 100}%` }} />
            </div>
            <Button variant="outline" className="w-full mt-8 rounded-xl h-12" leftIcon={<Plus size={16} />}>Add Stock</Button>
          </Card>
        ))}
      </div>

      <Card className="p-8 border-transparent bg-gray-900 text-white shadow-xl flex items-center justify-between">
         <div>
           <h3 className="text-2xl font-bold mb-2">Global Stock Transfer</h3>
           <p className="text-indigo-100/60 font-light text-sm">Initiate bulk SKU movements between regional warehouses (US-West, EU-Central, IN-South).</p>
         </div>
         <Button className="bg-indigo-600 hover:bg-indigo-500 rounded-xl h-14 px-8" rightIcon={<ArrowUpRight size={18} />}>Manage Logistics</Button>
      </Card>
    </div>
  );

  const renderRegistry = () => (
    <Card className="border-transparent bg-white shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="relative group w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search serial numbers..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all text-sm"
            />
         </div>
         <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl" leftIcon={<Plus size={14} />}>Batch Generate</Button>
            <Button variant="outline" size="sm" className="rounded-xl" leftIcon={<Download size={14} />}>Export Registry</Button>
         </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Serial No.</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Manufactured</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Firmware</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { s: 'PF-9921-X882', t: 'PranaFlow', d: 'May 12, 2024', f: 'v2.1.3', st: 'Sold' },
              { s: 'PF-9921-X883', t: 'PranaFlow', d: 'May 12, 2024', f: 'v2.1.3', st: 'Available' },
              { s: 'PS-1102-M001', t: 'Prana Shirt', d: 'Apr 28, 2024', f: 'v1.4.0', st: 'RMA' },
              { s: 'PS-1102-M002', t: 'Prana Shirt', d: 'Apr 28, 2024', f: 'v1.4.0', st: 'Sold' },
              { s: 'PF-9921-X884', t: 'PranaFlow', d: 'May 14, 2024', f: 'v2.1.3', st: 'Defective' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5 font-mono text-xs font-bold text-gray-600">{row.s}</td>
                <td className="px-6 py-5 text-sm font-bold">{row.t}</td>
                <td className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{row.d}</td>
                <td className="px-6 py-5 text-xs text-indigo-600 font-black">{row.f}</td>
                <td className="px-6 py-5">
                   <Badge variant={row.st === 'Sold' ? 'primary' : row.st === 'Available' ? 'success' : row.st === 'RMA' ? 'warning' : 'error'} size="sm" className="lowercase">
                     {row.st}
                   </Badge>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-gray-300 hover:text-black transition-colors opacity-0 group-hover:opacity-100"><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  const renderActive = () => (
    <div className="space-y-6">
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: 'Active Units', val: '8,402', icon: <Wifi className="text-indigo-500" /> },
           { label: 'Avg Battery', val: '72%', icon: <Battery className="text-green-500" /> },
           { label: 'Daily Sync Rate', val: '94%', icon: <RefreshCcw className="text-blue-500" /> },
           { label: 'Alerts', val: '12', icon: <AlertTriangle className="text-orange-500" /> },
         ].map((stat, i) => (
           <Card key={i} className="p-6 bg-white border-transparent shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">{stat.icon}</div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-xl font-black">{stat.val}</p>
                </div>
              </div>
           </Card>
         ))}
       </div>

       <Card className="border-transparent bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Unit ID</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Owner</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Last Seen</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Battery</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Firmware</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { id: 'PF-8821', user: 'Satyam Yoga', last: '2 mins ago', batt: 85, firm: 'v2.1.3' },
                  { id: 'PS-1102', user: 'Liam Neeson', last: '5 hours ago', batt: 12, firm: 'v1.4.0' },
                  { id: 'PF-4421', user: 'Sarah J.', last: 'Just now', batt: 99, firm: 'v2.1.3' },
                ].map((unit, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5 font-mono text-xs font-bold">{unit.id}</td>
                    <td className="px-6 py-5 text-sm font-bold">{unit.user}</td>
                    <td className="px-6 py-5 text-xs text-gray-400">{unit.last}</td>
                    <td className="px-6 py-5">
                       <div className="flex items-center gap-2">
                          <div className="w-10 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className={`h-full ${unit.batt < 20 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${unit.batt}%` }} />
                          </div>
                          <span className="text-[10px] font-black">{unit.batt}%</span>
                       </div>
                    </td>
                    <td className="px-6 py-5">
                       <Badge variant="outline" className="text-[9px]">{unit.firm}</Badge>
                    </td>
                    <td className="px-6 py-5 text-right">
                       <Button size="sm" variant="ghost" className="rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 opacity-0 group-hover:opacity-100">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </Card>
    </div>
  );

  const renderRma = () => (
    <div className="space-y-6">
       <header className="flex justify-between items-center">
         <h3 className="text-xl font-bold tracking-tight">Active Return Requests</h3>
         <Button size="sm" variant="outline" className="rounded-xl" leftIcon={<Filter size={14} />}>Filter</Button>
       </header>

       <div className="grid grid-cols-1 gap-4">
         {[
           { id: 'RMA-90210', user: 'Elena R.', serial: 'PS-1102-M001', reason: 'Defective Sensor (EMG)', date: '2h ago', status: 'Pending Approval' },
           { id: 'RMA-90211', user: 'David Chen', serial: 'PF-4412-X001', reason: 'Change of Mind', date: '1d ago', status: 'Label Sent' },
           { id: 'RMA-90212', user: 'Amara S.', serial: 'PF-1100-Y221', reason: 'Battery Issue', date: '3d ago', status: 'Received' },
         ].map((rma, i) => (
           <Card key={i} className="p-6 border-transparent bg-white shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                  {/* Fixed error: added missing RotateCcw to lucide-react imports */}
                  <RotateCcw size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-sm">{rma.id}</h4>
                    <Badge variant="outline" className="text-[9px] lowercase">{rma.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">{rma.user} • {rma.serial}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                 <div className="text-right hidden sm:block">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Reason</p>
                   <p className="text-xs font-bold text-gray-700">{rma.reason}</p>
                 </div>
                 <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-xl">View Details</Button>
                    {rma.status === 'Pending Approval' && <Button size="sm" className="rounded-xl bg-green-600 hover:bg-green-700">Approve</Button>}
                 </div>
              </div>
           </Card>
         ))}
       </div>
    </div>
  );

  const renderFirmware = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-transparent bg-white shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold tracking-tight">Active Deployments</h3>
                <Button variant="outline" size="sm" className="rounded-xl" leftIcon={<Plus size={14} />}>New Release</Button>
             </div>
             
             <div className="space-y-6">
                {[
                  { v: 'v2.1.3 (Stable)', date: 'May 10, 2024', target: 'PranaFlow', updated: '94%', total: 4200 },
                  { v: 'v1.4.0 (Stable)', date: 'Apr 22, 2024', target: 'Prana Shirt', updated: '88%', total: 1100 },
                  { v: 'v2.1.4 (Beta)', date: 'Just now', target: 'PranaFlow', updated: '2%', total: 50 },
                ].map((f, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-indigo-600">{f.v}</h4>
                            <Badge variant="outline" className="text-[8px]">{f.target}</Badge>
                          </div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Released on {f.date}</p>
                       </div>
                       <button className="p-2 text-gray-300 hover:text-black transition-colors"><MoreVertical size={16} /></button>
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          <span>Progress</span>
                          <span>{f.updated} ({f.total} units)</span>
                       </div>
                       <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600" style={{ width: f.updated }} />
                       </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                       <Button size="sm" variant="outline" className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest">Changelog</Button>
                       <Button size="sm" className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest">Push Update</Button>
                    </div>
                  </div>
                ))}
             </div>
          </Card>
       </div>

       <aside className="space-y-8">
          <Card className="p-8 border-transparent bg-indigo-600 text-white shadow-xl">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
               <Zap className="text-white" size={24} />
             </div>
             <h3 className="text-xl font-bold mb-4">Rollout Strategy</h3>
             <div className="space-y-4">
                {[
                  { l: 'Beta Testing', d: 'Selected 50 users' },
                  { l: 'Gradual Phase', d: '10% → 50% → 100%' },
                  { l: 'Immediate', d: 'Force all active units' },
                ].map((s, i) => (
                  <button key={i} className="w-full text-left p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors border border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{s.l}</p>
                    <p className="text-xs font-bold">{s.d}</p>
                  </button>
                ))}
             </div>
          </Card>

          <Card className="p-8 border-transparent bg-white shadow-sm">
             <h3 className="font-bold mb-6">Health Monitoring</h3>
             <div className="space-y-4">
                {[
                  { label: 'Update Failure Rate', val: '0.2%', status: 'green' },
                  { label: 'Avg Latency', val: '42ms', status: 'green' },
                  { label: 'Unreachable Units', val: '4', status: 'orange' },
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <span className="text-xs font-medium text-gray-500">{m.label}</span>
                    <div className="flex items-center gap-2">
                       <span className="font-bold text-sm">{m.val}</span>
                       <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'green' ? 'bg-green-500' : 'bg-orange-500'}`} />
                    </div>
                  </div>
                ))}
             </div>
          </Card>
       </aside>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Sub-Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl self-start w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as InventoryTab)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
              activeTab === t.id ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'stock' && renderStock()}
          {activeTab === 'registry' && renderRegistry()}
          {activeTab === 'active' && renderActive()}
          {activeTab === 'rma' && renderRma()}
          {activeTab === 'firmware' && renderFirmware()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InventoryManagement;
