
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
  ChevronDown
} from 'lucide-react';
import { Button, Badge, Card } from './ui';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const PRANAFLOW_IMAGES = [
  'https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1552196564-972d46387352?auto=format&fit=crop&q=80&w=1200'
];

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack, onNavigate }) => {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [activeSpec, setActiveSpec] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { title: "Nostril Flow", desc: "Dual-sensor precision tracking", icon: <Waves /> },
    { title: "Biofeedback", desc: "Real-time respiratory mapping", icon: <Activity /> },
    { title: "30h Battery", desc: "USB-C fast charging", icon: <Battery /> },
    { title: "V5.3 Bluetooth", desc: "Instant sync ecosystem", icon: <Bluetooth /> },
    { title: "Vedic Integration", desc: "Svara Yoga algorithms", icon: <Zap /> },
    { title: "Hypoallergenic", desc: "Medical-grade materials", icon: <ShieldCheck /> }
  ];

  const specs = [
    { id: 'dimensions', title: 'Dimensions & Weight', content: 'Ultra-lightweight at 42g. 64mm x 32mm x 12mm profile. Ergonomic clip design for long-term comfort.' },
    { id: 'battery', title: 'Battery & Power', content: 'Lithium-polymer 450mAh battery. Up to 30 hours of continuous tracking. 0-80% charge in 45 minutes via USB-C.' },
    { id: 'sensors', title: 'Sensors & Accuracy', content: 'Differential pressure sensors with 0.1 Pa sensitivity. High-frequency sampling (100Hz) for precise peak detection.' },
    { id: 'connectivity', title: 'Connectivity', content: 'Bluetooth Low Energy 5.3. Range up to 10 meters. Seamless auto-pairing with iOS and Android apps.' }
  ];

  const faqs = [
    { q: "How does it detect nostril dominance?", a: "PranaFlow uses ultra-sensitive thermal and pressure sensors that detect the differential flow between nostrils, identifying the active Svara (Ida or Pingala)." },
    { q: "Is it safe to wear while sleeping?", a: "Yes, the device is made of medical-grade biocompatible plastic and uses low-energy Bluetooth, making it safe for overnight sessions." },
    { q: "Do I need a subscription?", a: "The core tracking features are free forever. The 10 AI Gurus and advanced Vedic analytics require a YogaX Pro subscription." }
  ];

  const handleAddToCart = () => {
    addItem(productId, 'Standard');
    onNavigate('cart');
  };

  return (
    <div className="bg-white pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <button onClick={() => onNavigate('home')} className="hover:text-black">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => onNavigate('hardware')} className="hover:text-black">Hardware</button>
        <ChevronRight size={10} />
        <span className="text-black">PranaFlow</span>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        <div className="relative group">
          <div className="aspect-square bg-[#fbfbfd] rounded-[3rem] overflow-hidden relative premium-shadow">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={PRANAFLOW_IMAGES[activeImage]} 
                alt="PranaFlow" 
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button 
                onClick={() => setActiveImage(prev => (prev === 0 ? PRANAFLOW_IMAGES.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg pointer-events-auto hover:bg-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setActiveImage(prev => (prev === PRANAFLOW_IMAGES.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg pointer-events-auto hover:bg-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            {PRANAFLOW_IMAGES.map((img, i) => (
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
          <Badge variant="primary" className="mb-6 self-start">New Arrival</Badge>
          <h1 className="text-6xl font-extrabold tracking-tight mb-4">PranaFlow</h1>
          <p className="text-2xl text-indigo-600 font-bold mb-8 tracking-tight">Master the ancient art of Svara Yoga.</p>
          <div className="text-4xl font-light mb-12">$299.00</div>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                <ShieldCheck size={14} />
              </div>
              <span className="text-sm font-medium">In stock and ready to ship</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Box size={14} />
              </div>
              <span className="text-sm font-medium">Free express worldwide shipping</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 rounded-[2rem] h-16 text-lg" onClick={handleAddToCart}>Buy Now</Button>
            <Button size="lg" variant="outline" className="flex-1 rounded-[2rem] h-16 text-lg" onClick={() => addItem(productId, 'Standard')}>Add to Cart</Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-[#fbfbfd] py-32 mb-32">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-20">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Precision-engineered for spiritual depth.</h2>
            <p className="text-gray-500 font-light">The most advanced respiratory sensor ever created for yoga.</p>
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

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <header className="text-center mb-20">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Three steps to mastery.</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { step: "01", title: "Wear", desc: "Clip the PranaFlow device comfortably near your nostrils using our lightweight medical-grade clasp." },
            { step: "02", title: "Sync", desc: "Open the YogaX app. Your device connects instantly via Bluetooth 5.3 to our AI Guru interface." },
            { step: "03", title: "Transform", desc: "Follow real-time guided sessions. Watch your biofeedback data evolve as you master Svara dominance." }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-6xl font-black text-gray-100 mb-8">{item.step}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specs Accordion */}
      <section className="max-w-3xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-extrabold mb-12 tracking-tight">Technical Specifications</h2>
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
                    className="pb-8 text-gray-500 font-light leading-relaxed"
                  >
                    {spec.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Science Section */}
      <section className="bg-black text-white py-32 mb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
          <Activity size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <Badge variant="primary" className="mb-8">The Science</Badge>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">Validated by Neuro-Respiratory Research.</h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
              Svara Yoga is the study of the flow of breath through the nostrils. Modern science confirms that nasal cycle dominance correlates with brain hemisphere activation and nervous system states.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="text-4xl font-bold text-indigo-400 mb-2">98.4%</div>
                <p className="text-sm text-gray-500 font-medium">Measurement correlation with hospital-grade capnography.</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-400 mb-2">IIT Mandi</div>
                <p className="text-sm text-gray-500 font-medium">Clinical validation and algorithmic oversight partner.</p>
              </div>
            </div>
            <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-black">
              Explore Research Papers
            </Button>
          </div>
        </div>
      </section>

      {/* In the Box */}
      <section className="max-w-7xl mx-auto px-6 mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-8">What's in the box.</h2>
          <ul className="space-y-4">
            {['PranaFlow device', 'Lightweight medical clip', 'Premium carrying case', 'USB-C charging cable', 'Quick start guide', '1-year warranty card'].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg text-gray-600 font-light">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="aspect-square bg-gray-50 rounded-[3rem] overflow-hidden flex items-center justify-center p-12">
          <img src="https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=1200" alt="Box Contents" className="w-full h-auto rounded-3xl premium-shadow rotate-3" />
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
                <p className="font-bold text-sm">PranaFlow</p>
                <p className="text-xs text-indigo-600 font-bold">$299.00</p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <Button className="flex-1 sm:w-48 rounded-2xl h-12" onClick={handleAddToCart}>Buy Now</Button>
                <Button variant="outline" className="hidden md:block w-48 rounded-2xl h-12">Specs</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
