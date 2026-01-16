
import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialTab?: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, initialTab, className = '' }) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].id);
  const baseId = useId();

  return (
    <div className={`w-full ${className}`}>
      <div 
        role="tablist" 
        className="flex space-x-2 p-1 bg-gray-50 rounded-2xl mb-8"
        aria-label="Content Selection"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${baseId}-panel-${tab.id}`}
            id={`${baseId}-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl
              ${activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'}
            `}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <motion.div
        key={activeTab}
        role="tabpanel"
        id={`${baseId}-panel-${activeTab}`}
        aria-labelledby={`${baseId}-tab-${activeTab}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        tabIndex={0} // Make panel focusable for screen readers if it contains long content
        className="focus:outline-none"
      >
        {tabs.find(t => t.id === activeTab)?.content}
      </motion.div>
    </div>
  );
};

export default Tabs;
