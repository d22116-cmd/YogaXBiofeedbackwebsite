
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui';

interface MiniCartProps {
  isOpen: boolean;
  onNavigate: (page: string) => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ isOpen, onNavigate }) => {
  const { items, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 pointer-events-auto"
        >
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h4 className="font-bold text-sm tracking-tight">Shopping Bag</h4>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{items.length} Items</span>
          </div>

          <div className="max-h-64 overflow-y-auto no-scrollbar">
            {items.length > 0 ? (
              items.slice(0, 3).map((item) => (
                <div key={item.id} className="p-4 flex gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{item.name}</p>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-tighter mt-0.5">{item.variant}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] font-bold text-gray-500">Qty: {item.quantity}</span>
                      <span className="text-xs font-bold">${item.price}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <ShoppingBag size={32} className="text-gray-100 mx-auto mb-4" />
                <p className="text-xs text-gray-400 font-medium">Your bag is empty</p>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 bg-gray-50/50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase">Subtotal</span>
                <span className="text-sm font-black">${subtotal.toFixed(2)}</span>
              </div>
              <Button 
                onClick={() => onNavigate('cart')}
                className="w-full rounded-xl py-3 text-xs" 
                rightIcon={<ArrowRight size={14} />}
              >
                Checkout
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
