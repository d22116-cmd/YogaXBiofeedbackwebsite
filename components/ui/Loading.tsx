
import React from 'react';
import { motion } from 'framer-motion';

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg', className?: string }> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };
  
  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-gray-100"
        initial={false}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-indigo-600 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string, circle?: boolean }> = ({ className = '', circle = false }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-100 ${circle ? 'rounded-full' : 'rounded-2xl'} ${className}`}
    />
  );
};
