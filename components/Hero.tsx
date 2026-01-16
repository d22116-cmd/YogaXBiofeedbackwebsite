
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from './ui';
import OptimizedImage from './ui/OptimizedImage';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Optimized Background - Hardware acceleration */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div style={{ opacity, scale }} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] uppercase text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100/50">
              Introducing YogaX V2.0
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.9] mb-10"
          >
            Ancient Wisdom.<br />
            <span className="gradient-text">Modern Science.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-500 mb-12 font-light leading-relaxed"
          >
            The world's first integrated platform combining Vedic respiratory precision with clinical-grade real-time biofeedback.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button 
              size="lg" 
              variant="premium"
              onClick={() => onNavigate('platform')}
              className="w-full sm:w-auto min-w-[200px]"
              rightIcon={<ChevronRight size={18} />}
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('hardware-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Explore Hardware
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Hero Visual - High Priority Loading */}
      <motion.div 
        style={{ y: y1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-20 w-full max-w-6xl mx-auto px-6 relative pointer-events-none"
      >
        <div className="relative">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
            alt="YogaX Biofeedback System Visualization" 
            aspectRatio="aspect-video"
            loading="eager"
            fetchPriority="high"
            className="rounded-[2.5rem] shadow-2xl"
          />
          
          <motion.div 
            style={{ y: y2 }}
            className="absolute -top-10 -right-10 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 z-20 hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <div className="animate-pulse">❤️</div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heart Rate Variability</p>
                <p className="text-xl font-bold">98% <span className="text-xs font-normal text-green-500">Coherent</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="text-gray-300 w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;