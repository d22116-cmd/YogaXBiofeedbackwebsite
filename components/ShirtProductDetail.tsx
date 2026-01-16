
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Minus, 
  Star, 
  Box, 
  ShieldCheck, 
  Zap, 
  Battery, 
  Bluetooth, 
  Waves, 
  Activity, 
  Info,
  ChevronDown,
  Ruler,
  Wind,
  Droplets,
  Layers
} from 'lucide-react';
import { Button, Badge, Card, Modal } from './ui';

interface ShirtProductDetailProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const SHIRT_IMAGES = [
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=1200'
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Midnight Black', hex: '#1d1d1f' },
  { name: 'Arctic White', hex: '#f5f5f7' },
  { name: 'Slate Gray', hex: '#4b5563' }
];

const ShirtProductDetail: React.FC<ShirtProductDetailProps> = ({ onBack, onNavigate }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [activeSpec, setActiveSpec] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { title: "Stress Detection", desc: "Recognizes pattern shifts instantly", icon: <Zap /> },
    { title: "ECG/EMG Sensors", desc: "Clinical accuracy in a fabric", icon: <Activity /> },
    { title: "All-Day Comfort", desc: "Seamless knit technology", icon: <Layers /> },
    { title: "Machine Washable", desc: "Remove module and toss in", icon: <Droplets /> },
    { title: "20h Battery", desc: "USB-C fast charging module", icon: <Battery /> },
    { title: "Breath Analysis", desc: "Detailed thoracic mapping", icon: <Wind /> }
  ];

  const specs = [
    { id: 'fabric', title: 'Fabric & Composition', content: '85% Recycled Italian Nylon, 15% Elastane. Four-way stretch compression for optimal sensor contact. Antimicrobial and moisture-wicking properties.' },
    { id: 'sensors', title: 'Integrated Technology', content: 'Six medical-grade dry electrodes woven directly into the chest and abdomen. Removable YogaX Core Module with ARM Cortex-M4 processor.' },
    { id: 'care', title: 'Care Instructions', content: 'Machine wash cold (30°C) on delicate cycle. Remove Core Module before washing. Do not tumble dry. Do not iron sensors.' },
    { id: 'battery', title: 'Power & Charging', content: 'Magnetic charging interface on the module. 2-hour full charge time. Up to 20 hours of continuous high-fidelity data tracking.' }
  ];

  const faqs = [
    { q: "How tight should the shirt be?", a: "For accurate biometric readings, the shirt should have a compression fit. It should feel snug like a second skin without restricting your breathing." },
    { q: "Can I wear it while exercising?", a: "Absolutely. The Prana Shirt is designed for high-intensity activity. The AI automatically distinguishes between physical exertion and mental stress." },
    { q: "Is the module waterproof?", a: "The Core Module is IP67 water-resistant, meaning it can handle sweat and light rain, but it should be removed before machine washing the shirt." }
  ];

  return (
    <div className="bg-white pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <button onClick={() => onNavigate('home')} className="hover:text-black">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => onNavigate('hardware')} className="hover:text-black">Hardware</button>
        <ChevronRight size={10} />
        <span className="text-black">Prana Shirt</span>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        <div className="relative group">
          <div className="aspect-[4/5] bg-[#fbfbfd] rounded-[3rem] overflow-hidden relative premium-shadow">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={SHIRT_IMAGES[activeImage]} 
                alt="Prana Shirt" 
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button 
                onClick={() => setActiveImage(prev => (prev === 0 ? SHIRT_IMAGES.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg pointer-events-auto hover:bg-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setActiveImage(prev => (prev === SHIRT_IMAGES.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg pointer-events-auto hover:bg-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            {SHIRT_IMAGES.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-indigo-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Badge variant="primary" className="mb-6 self-start">Best Seller</Badge>
          <h1 className="text-6xl font-extrabold tracking-tight mb-4">Prana Shirt</h1>
          <p className="text-2xl text-indigo-600 font-bold mb-8 tracking-tight">Intelligent fabric for high-stakes focus.</p>
          <div className="text-4xl font-light mb-12">$199.00</div>
          
          {/* Color Selection */}
          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Color: {selectedColor.name}</h4>
            <div className="flex gap-3">
              {COLORS.map((color) => (
                <button 
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all p-1 ${selectedColor.name === color.name ? 'border-indigo-600 scale-110' : 'border-transparent'}`}
                >
                  <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Select Size</h4>
              <button 
                onClick={() => setIsSizeChartOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline"
              >
                <Ruler size={14} /> Size Chart
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {SIZES.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl border text-sm font-bold transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-500 hover:border-gray-900'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 rounded-[2rem] h-16 text-lg">Buy Now</Button>
            <Button size="lg" variant="outline" className="flex-1 rounded-[2rem] h-16 text-lg">Add to Cart</Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-[#fbfbfd] py-32 mb-32">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-20">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Invisible tech. Tangible results.</h2>
            <p className="text-gray-500 font-light">The ultimate performance wearable for the mindful athlete.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] premium-shadow"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fit Guide */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-[3rem] overflow-hidden bg-gray-50">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" alt="Fit Model" className="w-full h-full object-cover" />
          </div>
          <div>
            <Badge variant="primary" className="mb-6">Fit Guide</Badge>
            <h2 className="text-4xl font-extrabold tracking-tight mb-6">Designed for a 'Second Skin' feel.</h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
              The Prana Shirt uses a graduated compression knit that ensures every sensor maintains perfect contact with your skin without restricting movement.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Compression Fit</h4>
                  <p className="text-sm text-gray-400">Snug fit for clinical-grade signal quality.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Breathable Knit</h4>
                  <p className="text-sm text-gray-400">Micro-perforations for heat regulation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Accordion */}
      <section className="max-w-3xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-extrabold mb-12 tracking-tight">Product Specifications</h2>
        <div className="border-t border-gray-100">
          {specs.map((spec) => (
            <div key={spec.id} className="border-b border-gray-100 overflow-hidden">
              <button 
                onClick={() => setActiveSpec(activeSpec === spec.id ? null : spec.id)}
                className="w-full py-8 flex justify-between items-center text-left group"
              >
                <span className="text-lg font-bold group-hover:text-indigo-600 transition-colors">{spec.title}</span>
                <div className={`transition-transform duration-300 ${activeSpec === spec.id ? 'rotate-180' : ''}`}>
                  <ChevronDown size={20} className="text-gray-300" />
                </div>
              </button>
              <AnimatePresence>
                {activeSpec === spec.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pb-8 text-gray-500 font-light leading-relaxed text-sm"
                  >
                    {spec.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Care Instructions Visual */}
      <section className="bg-gray-900 text-white py-32 mb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Droplets className="text-indigo-400" />
            </div>
            <h4 className="text-xl font-bold mb-3">Machine Washable</h4>
            <p className="text-sm text-gray-400 font-light">Wash at 30°C on a delicate cycle.</p>
          </div>
          <div>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="text-yellow-400" />
            </div>
            <h4 className="text-xl font-bold mb-3">Remove Module</h4>
            <p className="text-sm text-gray-400 font-light">Snap off the magnetic Core before washing.</p>
          </div>
          <div>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Wind className="text-blue-400" />
            </div>
            <h4 className="text-xl font-bold mb-3">Line Dry Only</h4>
            <p className="text-sm text-gray-400 font-light">Air dry to maintain sensor elasticity.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-extrabold mb-12 tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i} className="overflow-hidden border-gray-100">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left"
              >
                <span className="font-bold">{faq.q}</span>
                <Plus size={18} className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-45' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-6 pb-6 text-gray-500 font-light text-sm"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
              <div className="hidden sm:block">
                <p className="font-bold text-sm">Prana Shirt — {selectedSize}</p>
                <p className="text-xs text-indigo-600 font-bold">$199.00</p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <Button className="flex-1 sm:w-48 rounded-2xl h-12">Buy Now</Button>
                <Button variant="outline" className="hidden md:block w-48 rounded-2xl h-12">Care Guide</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Chart Modal */}
      <Modal 
        isOpen={isSizeChartOpen} 
        onClose={() => setIsSizeChartOpen(false)}
        title="Size Chart"
        maxWidth="max-w-lg"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 font-bold text-gray-400">Size</th>
                <th className="py-4 font-bold text-gray-400">Chest (in)</th>
                <th className="py-4 font-bold text-gray-400">Waist (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[['XS', '32-34', '26-28'], ['S', '35-37', '29-31'], ['M', '38-40', '32-34'], ['L', '41-43', '35-37'], ['XL', '44-46', '38-40'], ['XXL', '47-49', '41-43']].map(([s, c, w]) => (
                <tr key={s}>
                  <td className="py-4 font-bold">{s}</td>
                  <td className="py-4 text-gray-500">{c}</td>
                  <td className="py-4 text-gray-500">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-xs text-gray-400 leading-relaxed">
          *Measurements refer to body size, not garment dimensions. If you're between sizes, we recommend sizing down for optimal sensor contact.
        </p>
        <Button className="w-full mt-8 rounded-2xl" onClick={() => setIsSizeChartOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
};

export default ShirtProductDetail;
