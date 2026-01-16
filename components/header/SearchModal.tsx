
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  Wind, 
  ShoppingBag, 
  HelpCircle, 
  ChevronRight,
  Sparkles,
  Command
} from 'lucide-react';
import { Card, Badge } from '../ui';
import { GURUS, PRODUCTS } from '../../constants';

interface SearchResult {
  id: string;
  type: 'product' | 'technique' | 'article';
  title: string;
  subtitle?: string;
  image?: string;
  price?: string;
  link: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simulated data for demo purposes - in production this would come from Algolia
const MOCK_TECHNIQUES = [
  { id: 't1', title: 'Nadi Shodhana', guru: 'AI Pranayama Guru', link: 'platform' },
  { id: 't2', title: 'Surya Bhedana', guru: 'AI Pranayama Guru', link: 'platform' },
  { id: 't3', title: 'Vipassana Insight', guru: 'AI Meditation Guru', link: 'platform' },
  { id: 't4', title: 'Warrior II Alignment', guru: 'AI Asana Guru', link: 'platform' },
];

const MOCK_ARTICLES = [
  { id: 'a1', title: 'Understanding HRV & Stress', excerpt: 'How biofeedback predicts burnout before it happens.', link: 'learn' },
  { id: 'a2', title: 'The Science of Svara', excerpt: 'Deep dive into nostril dominance and neural states.', link: 'learn' },
  { id: 'a3', title: 'Setting up PranaFlow', excerpt: 'Getting started with your first respiratory sensor.', link: 'support' },
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    products: SearchResult[];
    techniques: SearchResult[];
    articles: SearchResult[];
  }>({ products: [], techniques: [], articles: [] });
  const [recentSearches, setRecentSearches] = useState<string[]>(['HRV Science', 'PranaFlow Setup', 'Nadi Shodhana']);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Handle Search Logic (Simulated Algolia InstantSearch)
  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], techniques: [], articles: [] });
      return;
    }

    const filteredProducts = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3).map(p => ({
      id: p.id,
      type: 'product' as const,
      title: p.name,
      subtitle: p.oneLiner,
      image: p.image,
      price: p.price,
      link: `product-${p.id}`
    }));

    const filteredTechniques = MOCK_TECHNIQUES.filter(t => 
      t.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3).map(t => ({
      id: t.id,
      type: 'technique' as const,
      title: t.title,
      subtitle: t.guru,
      link: t.link
    }));

    const filteredArticles = MOCK_ARTICLES.filter(a => 
      a.title.toLowerCase().includes(query.toLowerCase()) || 
      a.excerpt.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3).map(a => ({
      id: a.id,
      type: 'article' as const,
      title: a.title,
      subtitle: a.excerpt,
      link: a.link
    }));

    setResults({
      products: filteredProducts,
      techniques: filteredTechniques,
      articles: filteredArticles
    });
  }, [query]);

  // Keyboard Navigation
  const totalResults = results.products.length + results.techniques.length + results.articles.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < totalResults - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      // Logic to navigate to the selected result
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const hasResults = totalResults > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-white/95 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="relative w-full max-w-3xl"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="relative group border-b border-gray-100 pb-6">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-indigo-600" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, gurus, or science..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-24 py-4 text-4xl font-extrabold bg-transparent border-none outline-none placeholder-gray-200 tracking-tight"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg border border-gray-200 text-[10px] font-black text-gray-400">
                <Command size={10} /> <span>K</span>
             </div>
             <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-y-auto max-h-[70vh] no-scrollbar pb-12">
          {!query && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
              <div>
                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                  <Clock className="w-3.5 h-3.5" /> Recent Searches
                </h4>
                <div className="space-y-2">
                  {recentSearches.map((link, i) => (
                    <button 
                      key={i}
                      onClick={() => setQuery(link)}
                      className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-gray-50 text-left group transition-all"
                    >
                      <span className="text-lg font-bold text-gray-700">{link}</span>
                      <ArrowRight className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                  <TrendingUp className="w-3.5 h-3.5" /> Popular Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Svara Yoga', 'Biofeedback Setup', 'Clinical HRV', 'Pranayama Mastery', 'Corporate Wellness'].map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="mt-10 p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 relative overflow-hidden">
                   <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-indigo-100" />
                   <h5 className="font-bold text-indigo-900 mb-2">Guided Assistant</h5>
                   <p className="text-xs text-indigo-700/70 font-medium leading-relaxed">Try asking: "How do I balance my Ida and Pingala nadis?"</p>
                </div>
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-20 text-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-gray-200" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">No results for "{query}"</h3>
               <p className="text-gray-400 font-light max-w-xs mx-auto">Try checking your spelling or using more general terms.</p>
            </div>
          )}

          {query && hasResults && (
            <div className="space-y-12 pt-4">
              {/* Products Section */}
              {results.products.length > 0 && (
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                    <ShoppingBag size={14} /> Products
                  </h4>
                  <div className="space-y-4">
                    {results.products.map((item, idx) => (
                      <div 
                        key={item.id}
                        className={`flex items-center gap-6 p-4 rounded-3xl transition-all cursor-pointer group ${selectedIndex === idx ? 'bg-indigo-50/50 ring-1 ring-indigo-100 shadow-sm' : 'hover:bg-gray-50'}`}
                      >
                        <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                          <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="font-bold text-lg text-gray-900">{item.title}</h5>
                            <span className="text-indigo-600 font-black">{item.price}</span>
                          </div>
                          <p className="text-sm text-gray-400 font-medium">{item.subtitle}</p>
                        </div>
                        <div className="p-2 bg-white rounded-full shadow-sm text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Techniques Section */}
              {results.techniques.length > 0 && (
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                    <Wind size={14} /> Techniques & Practices
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.techniques.map((item, idx) => (
                      <div 
                        key={item.id}
                        className={`p-6 rounded-[2rem] transition-all cursor-pointer border flex items-center justify-between group ${selectedIndex === results.products.length + idx ? 'bg-indigo-50/50 border-indigo-200' : 'bg-white border-gray-100 hover:border-indigo-100 hover:bg-gray-50'}`}
                      >
                        <div>
                          <h5 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</h5>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{item.subtitle}</p>
                        </div>
                        <Badge variant="primary" className="lowercase">Start</Badge>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Articles Section */}
              {results.articles.length > 0 && (
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                    <HelpCircle size={14} /> Knowledge & Help
                  </h4>
                  <div className="space-y-2">
                    {results.articles.map((item, idx) => (
                      <div 
                        key={item.id}
                        className={`p-6 rounded-2xl transition-all cursor-pointer group flex items-start gap-6 ${selectedIndex === results.products.length + results.techniques.length + idx ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}
                      >
                         <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0 group-hover:text-indigo-600 group-hover:bg-indigo-50">
                           <HelpCircle size={20} />
                         </div>
                         <div>
                            <h5 className="font-bold text-gray-900 mb-1">{item.title}</h5>
                            <p className="text-sm text-gray-500 font-light line-clamp-2 leading-relaxed">{item.subtitle}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* View All Footer */}
              <div className="pt-8 border-t border-gray-100 text-center">
                 <button className="text-sm font-black uppercase tracking-widest text-indigo-600 hover:underline">
                   See all results for "{query}"
                 </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchModal;