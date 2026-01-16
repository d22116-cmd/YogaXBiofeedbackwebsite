
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Settings, 
  MoreVertical, 
  Battery, 
  BatteryLow, 
  BatteryMedium, 
  BatteryFull,
  RefreshCw,
  Cpu,
  Search,
  CheckCircle2,
  Trash2,
  Edit2,
  AlertCircle,
  Wifi,
  ChevronRight
} from 'lucide-react';
import { Card, Badge, Button, Modal, Input } from '../ui';

interface Device {
  id: string;
  name: string;
  nickname: string;
  type: 'pranaflow' | 'pranashirt';
  serialNumber: string;
  status: 'active' | 'inactive';
  battery: number;
  lastSync: string;
  firmware: string;
  updateAvailable?: boolean;
  image: string;
}

const INITIAL_DEVICES: Device[] = [
  {
    id: '1',
    name: 'PranaFlow',
    nickname: 'Living Room Flow',
    type: 'pranaflow',
    serialNumber: 'PF-9921-X882',
    status: 'active',
    battery: 85,
    lastSync: '2 hours ago',
    firmware: 'v2.1.3',
    image: 'https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'Prana Shirt',
    nickname: 'Gym Wear Pro',
    type: 'pranashirt',
    serialNumber: 'PS-1102-M001',
    status: 'inactive',
    battery: 18,
    lastSync: '1 day ago',
    firmware: 'v1.4.0',
    updateAvailable: true,
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=200'
  }
];

const MyDevices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [newDeviceType, setNewDeviceType] = useState<'pranaflow' | 'pranashirt' | null>(null);
  const [serialInput, setSerialInput] = useState('');

  const filteredDevices = devices.filter(d => 
    d.nickname.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRegisterStep(3);
      setIsLoading(false);
    }, 1500);
  };

  const [isLoading, setIsLoading] = useState(false);

  const getBatteryIcon = (level: number) => {
    if (level < 20) return <BatteryLow className="text-red-500" size={18} />;
    if (level < 50) return <BatteryMedium className="text-orange-500" size={18} />;
    return <BatteryFull className="text-green-500" size={18} />;
  };

  const resetModal = () => {
    setIsRegisterModalOpen(false);
    setRegisterStep(1);
    setNewDeviceType(null);
    setSerialInput('');
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Devices</h1>
          <p className="text-gray-400 text-sm mt-1 font-light">Manage your YogaX hardware ecosystem.</p>
        </div>
        <Button 
          onClick={() => setIsRegisterModalOpen(true)}
          leftIcon={<Plus size={18} />}
          className="rounded-2xl shadow-xl shadow-indigo-100"
        >
          Register New Device
        </Button>
      </header>

      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Filter devices..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-indigo-500 transition-all text-sm"
        />
      </div>

      {filteredDevices.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDevices.map((device) => (
            <motion.div 
              key={device.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-8 border-transparent bg-white shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                <div className="flex gap-6 items-start">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                    <img src={device.image} alt={device.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-xl">{device.nickname}</h3>
                          <Badge variant={device.status === 'active' ? 'success' : 'outline'} className="lowercase text-[9px] px-2 py-0.5">
                            {device.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 font-medium">{device.name} • {device.serialNumber}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Settings size={18} className="text-gray-400 hover:text-black" /></button>
                        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><MoreVertical size={18} className="text-gray-400 hover:text-black" /></button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-xl">
                          {getBatteryIcon(device.battery)}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Battery</p>
                          <p className={`text-sm font-bold ${device.battery < 20 ? 'text-red-500' : 'text-gray-700'}`}>{device.battery}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-xl text-indigo-600">
                          <RefreshCw size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Sync</p>
                          <p className="text-sm font-bold text-gray-700">{device.lastSync}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400">Firmware: {device.firmware}</span>
                        {device.updateAvailable && (
                          <Badge variant="primary" className="text-[8px] animate-pulse">Update Available</Badge>
                        )}
                      </div>
                      <Button size="sm" className="rounded-xl px-6">Start Session</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
            <Cpu size={64} className="text-gray-200" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No devices registered yet</h2>
          <p className="text-gray-400 font-light max-w-xs mb-8">Register your first YogaX device to unlock real-time biofeedback and AI guidance.</p>
          <Button onClick={() => setIsRegisterModalOpen(true)} className="rounded-2xl px-12 h-14">Register Your First Device</Button>
        </div>
      )}

      {/* Registration Modal */}
      <Modal 
        isOpen={isRegisterModalOpen} 
        onClose={resetModal}
        title={registerStep === 3 ? "Device Found!" : "Register New Device"}
        maxWidth="max-w-md"
      >
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {registerStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <p className="text-gray-500 text-sm font-light">Select the type of hardware you'd like to register.</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'pranaflow', name: 'PranaFlow', icon: '🌬️', desc: 'Flow Sensor' },
                    { id: 'pranashirt', name: 'Prana Shirt', icon: '👕', desc: 'ECG Wearable' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setNewDeviceType(type.id as any)}
                      className={`p-6 rounded-3xl border-2 transition-all text-center group ${newDeviceType === type.id ? 'border-indigo-600 bg-indigo-50/50 shadow-lg' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{type.icon}</div>
                      <p className="font-bold text-sm mb-1">{type.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{type.desc}</p>
                    </button>
                  ))}
                </div>
                <Button 
                  disabled={!newDeviceType} 
                  onClick={() => setRegisterStep(2)} 
                  className="w-full h-14 rounded-2xl mt-4"
                  rightIcon={<ChevronRight size={18} />}
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {registerStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Serial Number</label>
                  <Input 
                    placeholder="XXXX-XXXX-XXXX" 
                    value={serialInput}
                    onChange={(e) => setSerialInput(e.target.value.toUpperCase())}
                    className="text-lg font-mono tracking-widest text-center"
                  />
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400">
                    <AlertCircle size={12} />
                    <span>Found on the back of your device or packaging.</span>
                  </div>
                </div>
                <Button 
                  isLoading={isLoading}
                  disabled={serialInput.length < 8} 
                  onClick={handleRegister} 
                  className="w-full h-14 rounded-2xl mt-4"
                >
                  Find Device
                </Button>
                <button 
                  onClick={() => setRegisterStep(1)} 
                  className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
                >
                  Back
                </button>
              </motion.div>
            )}

            {registerStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">YogaX {newDeviceType === 'pranaflow' ? 'PranaFlow' : 'Prana Shirt'} Found</h3>
                <p className="text-gray-400 text-sm font-light mb-8">We successfully identified your hardware. It's ready to be added to your profile.</p>
                <div className="bg-gray-50 p-4 rounded-2xl mb-8 flex items-center justify-between text-left">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <Wifi size={14} className="text-indigo-600" />
                      <span className="text-sm font-bold">Encrypted Link Active</span>
                    </div>
                  </div>
                  <Badge variant="success">Verified</Badge>
                </div>
                <Button onClick={resetModal} className="w-full h-14 rounded-2xl">Complete Registration</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </div>
  );
};

export default MyDevices;
