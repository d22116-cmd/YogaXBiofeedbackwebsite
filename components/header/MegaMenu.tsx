
import React from 'react';
import { motion } from 'framer-motion';
import { GURUS, PRODUCTS } from '../../constants';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface MegaMenuProps {
  activeMenu: string;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ activeMenu, onClose, onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl py-12"
      onMouseEnter={() => {}}
    >
      <div className="max-w-7xl mx-auto px-6">
        {activeMenu === 'hardware' && (
          <div className="grid grid-cols-4 gap-12">
            <div className="col-span-1 border-r border-gray-100 pr-12">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Explore Hardware</h4>
              <ul className="space-y-4">
                <li><button className="text-lg font-bold hover:text-indigo-600 transition-colors">Compare Models</button></li>
                <li><button className="text-lg font-bold hover:text-indigo-600 transition-colors">Sensor Technology</button></li>
                <li><button className="text-lg font-bold hover:text-indigo-600 transition-colors">Bundle & Save</button></li>
                <li><button className="text-lg font-bold hover:text-indigo-600 transition-colors">Refurbished</button></li>
              </ul>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-8">
              {PRODUCTS.map(product => (
                <div 
                  key={product.id}
                  onClick={() => { onNavigate('hardware'); onClose(); }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h5 className="font-bold mb-1">{product.name}</h5>
                  <p className="text-xs text-gray-400 line-clamp-1">{product.description}</p>
                </div>
              ))}
              <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <Sparkles className="text-indigo-600 w-6 h-6 mb-4" />
                  <h5 className="font-bold text-indigo-900">Holiday Special</h5>
                  <p className="text-xs text-indigo-700/70 mt-2">Get 20% off all bundles this week.</p>
                </div>
                <button className="text-indigo-600 text-xs font-bold flex items-center gap-1 group">
                  Shop Deals <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'platform' && (
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-1 border-r border-gray-100 pr-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">The Unified Path</h4>
              <div className="p-4 bg-gray-50 rounded-2xl mb-4">
                <Zap className="text-yellow-500 w-5 h-5 mb-2" />
                <h5 className="text-xs font-bold">Mastery Hub</h5>
                <p className="text-[10px] text-gray-500 mt-1">Unified stats from all 10 Gurus.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <ShieldCheck className="text-green-500 w-5 h-5 mb-2" />
                <h5 className="text-xs font-bold">Clinical Privacy</h5>
                <p className="text-[10px] text-gray-500 mt-1">HIPAA compliant bio-data storage.</p>
              </div>
            </div>
            <div className="col-span-4 grid grid-cols-4 gap-4">
              {GURUS.slice(0, 8).map(guru => (
                <div 
                  key={guru.id}
                  onClick={() => { onNavigate('platform'); onClose(); }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className={`${guru.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0`}>
                    {React.cloneElement(guru.icon as React.ReactElement, { size: 18 })}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold group-hover:text-indigo-600 transition-colors">{guru.type}</h5>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{guru.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MegaMenu;
