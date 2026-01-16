
import React from 'react';
import { motion } from 'framer-motion';
import { GURUS } from '../constants';
import { GuruType } from '../types';

interface PlatformShowcaseProps {
  onSelectGuru: (type: GuruType) => void;
}

const PlatformShowcase: React.FC<PlatformShowcaseProps> = ({ onSelectGuru }) => {
  return (
    <section className="py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600 mb-4 block">The Intelligence Layer</span>
          <h2 className="text-5xl font-extrabold mb-8 tracking-tight">10 Specialized AI Gurus</h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Our unified platform brings specialized biometric intelligence to every aspect of your spiritual and physical evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {GURUS.map((guru, idx) => (
            <motion.div 
              key={guru.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              onClick={() => onSelectGuru(guru.type)}
              className="group relative bg-white p-8 rounded-[2.5rem] premium-shadow hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col h-full"
            >
              <div className={`${guru.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform duration-500`}>
                {React.cloneElement(guru.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="font-extrabold text-xl mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">{guru.type}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{guru.desc}</p>
              
              <div className="mt-8 pt-6 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Connect →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
