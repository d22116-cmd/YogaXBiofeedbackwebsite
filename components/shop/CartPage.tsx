
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ShoppingBag,
  Tag,
  ChevronRight,
  Info
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button, Card, Badge, Input } from '../ui';

interface CartPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onBack, onNavigate }) => {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const shipping = subtotal > 100 ? 0 : 15;
  const taxEstimate = subtotal * 0.08;
  const total = subtotal + shipping + taxEstimate;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8"
        >
          <ShoppingBag size={40} className="text-gray-200" />
        </motion.div>
        <h1 className="text-3xl font-extrabold mb-4">Your cart is empty.</h1>
        <p className="text-gray-400 mb-8 max-w-xs font-light">Looks like you haven't added any clinical mastery tools to your journey yet.</p>
        <Button onClick={() => onNavigate('hardware')} size="lg" className="rounded-2xl px-12">Browse Hardware</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <header className="mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to store
        </button>
        <h1 className="text-5xl font-extrabold tracking-tight">Your Cart <span className="text-gray-300 font-light ml-4">({itemCount})</span></h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="p-6 border-transparent bg-white shadow-sm flex items-center gap-6 group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                      {item.variant || 'Standard Edition'}
                    </p>
                    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1 w-fit border border-gray-100/50">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <p className="text-xl font-bold mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Delivery Note */}
          <div className="bg-indigo-50/50 border border-indigo-100 p-6 rounded-[2rem] flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-indigo-900">Complimentary Express Shipping</p>
              <p className="text-xs text-indigo-700/70 mt-1">Order now and receive your package by <span className="font-bold">Wednesday, May 22</span>. Fully tracked and insured.</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <Card className="p-8 border-transparent bg-white shadow-xl">
            <h2 className="text-2xl font-extrabold mb-8 tracking-tight">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Shipping</span>
                <span className={shipping === 0 ? "text-green-500 font-bold" : "font-bold"}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-gray-400 font-medium">
                  Estimated Tax <Info size={12} />
                </div>
                <span className="font-bold">${taxEstimate.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black tracking-tight">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="relative group">
                <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-11 pr-24 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all text-sm font-medium"
                />
                <button 
                  disabled={!promoCode || isApplying}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-800 disabled:bg-gray-200 transition-all"
                >
                  Apply
                </button>
              </div>
            </div>

            <Button 
              onClick={() => onNavigate('checkout')}
              size="lg" 
              className="w-full h-16 rounded-[2rem] text-lg shadow-2xl mb-6" 
              rightIcon={<ChevronRight size={20} />}
            >
              Proceed to Checkout
            </Button>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">256-bit Secure Encryption</span>
              </div>
              <div className="flex justify-center gap-4 opacity-30 grayscale">
                <CreditCard size={24} />
                <ShoppingBag size={24} />
                <Badge variant="outline" className="text-[8px] px-2 py-0.5 border-gray-400">Apple Pay</Badge>
              </div>
            </div>
          </Card>

          <div className="mt-8 p-6 border-2 border-dashed border-gray-100 rounded-[2rem] text-center">
            <p className="text-xs text-gray-400 font-medium mb-4">Questions about your order?</p>
            <button className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">Speak with an advisor</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
