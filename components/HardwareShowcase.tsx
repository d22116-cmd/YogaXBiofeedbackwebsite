
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { Button, Badge, Card } from './ui';
import OptimizedImage from './ui/OptimizedImage';

interface HardwareShowcaseProps {
  onNavigate?: (page: string) => void;
}

const HardwareShowcase: React.FC<HardwareShowcaseProps> = ({ onNavigate }) => {
  return (
    <section id="hardware-section" className="py-32 bg-[#fafafa] scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-indigo-600 mb-4 block"
            >
              Precision Biofeedback
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight"
            >
              Hardware for the <br /><span className="text-gray-400">Enlightened Mind.</span>
            </motion.h2>
          </div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold cursor-pointer group pb-2">
            <span>Compare Specs</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: any; index: number; onNavigate?: (page: string) => void }> = ({ product, index, onNavigate }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex flex-col h-full ${product.isBundle ? 'lg:scale-105 lg:z-10' : ''}`}
    >
      <Card 
        className={`flex-1 flex flex-col p-8 md:p-10 border-transparent ${product.isBundle ? 'bg-white ring-1 ring-indigo-100 shadow-2xl' : 'bg-white shadow-sm hover:shadow-xl'}`}
        hoverable
        onClick={() => onNavigate?.(`product-${product.id}`)}
      >
        <div className="flex justify-between items-start mb-8">
          <Badge variant={product.isBundle ? 'primary' : 'outline'} size="md">
            {product.badge}
          </Badge>
          <span className="text-xl font-light text-gray-400">{product.price}</span>
        </div>

        <div className="relative mb-12 rounded-[2rem] overflow-hidden group">
          <motion.div style={{ y }}>
            <OptimizedImage 
              src={product.image} 
              alt={`${product.name} - Premium Biofeedback Device`}
              aspectRatio="aspect-[4/5]"
              loading="lazy"
              className="group-hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
        </div>

        <div className="mt-auto">
          <h3 className="text-3xl font-extrabold tracking-tight mb-2">{product.name}</h3>
          <p className="text-indigo-600 font-bold text-sm mb-4 tracking-tight">{product.oneLiner}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light line-clamp-2">
            {product.description}
          </p>

          <div className="space-y-4 mb-10">
            {product.features.map((feature: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-50 transition-colors">
                  {feature.icon}
                </div>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Button 
              variant={product.isBundle ? 'premium' : 'primary'} 
              className="flex-1 rounded-2xl"
              onClick={(e) => { e.stopPropagation(); }}
            >
              Buy Now
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 rounded-2xl"
              rightIcon={<ChevronRight size={14} />}
              onClick={(e) => { e.stopPropagation(); onNavigate?.(`product-${product.id}`); }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HardwareShowcase;