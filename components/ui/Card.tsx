
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false, glass = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-[2rem] border border-gray-100 transition-all duration-300
        ${glass ? 'apple-blur border-white/40' : 'bg-white'}
        ${hoverable ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : 'shadow-sm'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
