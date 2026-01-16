
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  Calendar, 
  Settings, 
  LayoutDashboard,
  Share2,
  Mail
} from 'lucide-react';
import { Button, Card, Badge } from '../ui';

interface OrderConfirmationProps {
  orderNumber: string;
  total: number;
  formData: any;
  onNavigate: (page: string) => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderNumber, total, formData, onNavigate }) => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="min-h-screen bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 relative">
          {/* Confetti Animation Placeholder */}
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-green-100/50"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Order Confirmed! 🎉</h1>
          <p className="text-gray-400 text-lg font-light">We've received your order and we're getting it ready.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 border-gray-100 text-black font-bold">Order #{orderNumber}</Badge>
            <Badge variant="success" className="px-4 py-2 uppercase tracking-widest font-black">Processing</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border-transparent bg-gray-50/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Truck size={20} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg">Shipping To</h3>
            </div>
            <div className="space-y-1 text-sm font-medium text-gray-500">
              <p className="text-black font-bold mb-2">{formData.fullName}</p>
              <p>{formData.address1}</p>
              <p>{formData.city}, {formData.state} {formData.zip}</p>
              <p className="pt-2 flex items-center gap-2 text-indigo-600">
                <Mail size={14} /> {formData.email}
              </p>
            </div>
          </Card>

          <Card className="p-8 border-transparent bg-gray-50/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Calendar size={20} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg">Expected Delivery</h3>
            </div>
            <div className="space-y-1 text-sm font-medium text-gray-500">
              <p className="text-black font-bold text-2xl mb-1">
                {deliveryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p>Standard Shipping (Fully Tracked)</p>
              <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-4 flex items-center gap-2 hover:underline">
                View Tracking Status <ArrowRight size={12} />
              </button>
            </div>
          </Card>
        </div>

        <Card className="p-8 border-transparent bg-indigo-600 text-white shadow-2xl mb-16 overflow-hidden relative">
          <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12">
            <Settings size={200} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2">While you wait...</h3>
              <p className="text-indigo-100 font-light leading-relaxed">
                Connect your account to the YogaX platform to pre-configure your AI Gurus and explore the clinical setup guide.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button onClick={() => onNavigate('dashboard')} className="bg-white text-black hover:bg-gray-100 rounded-2xl h-14 px-8" leftIcon={<LayoutDashboard size={18} />}>
                Go to Dashboard
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl h-14" leftIcon={<Share2 size={18} />}>
                Share
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-8">A confirmation email has been sent to <span className="font-bold text-gray-600">{formData.email}</span></p>
          <button 
            onClick={() => onNavigate('home')} 
            className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
          >
            Back to Home Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
