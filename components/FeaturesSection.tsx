
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Wind, 
  TrendingUp, 
  Microscope, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { Card } from './ui';

const FEATURES = [
  {
    title: "Real-time Biofeedback",
    description: "Monitor heart rate, HRV, and breathing patterns in real-time with clinical-grade accuracy using our proprietary sensors.",
    icon: <Heart className="w-6 h-6" />,
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    title: "10 Specialized AI Gurus",
    description: "Personalized guidance from AI experts in pranayama, yoga, meditation, ayurveda, and holistic wellness protocols.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    title: "Nostril-Specific Flow",
    description: "The world's first platform to measure Svara (nostril dominance) for optimal energy balance and pranayama precision.",
    icon: <Wind className="w-6 h-6" />,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    title: "Intelligent Stress Detection",
    description: "Advanced pattern recognition distinguishes between physical exertion and mental stress automatically.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    title: "Research-Backed Science",
    description: "Built on peer-reviewed studies from IIT Mandi and leading global research institutions in neuro-respiratory science.",
    icon: <Microscope className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Clinical-Grade Privacy",
    description: "Your biometric data is encrypted and stays with you. Open API for researchers, but never sold to third parties.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50"
  }
];

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight"
          >
            Everything you need.<br /><span className="gradient-text">In one ecosystem.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 font-light leading-relaxed"
          >
            We've unified the most advanced biometric sensors with ancient Vedic frameworks to provide a holistic view of your evolution.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Card 
                hoverable 
                className="p-10 flex flex-col h-full bg-[#fbfbfd] border-transparent hover:bg-white"
              >
                <div className={`${feature.bgColor} ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light flex-grow">
                  {feature.description}
                </p>
                <div className="mt-auto">
                  <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase tracking-widest group">
                    Learn More 
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
