
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ArrowUp, 
  ChevronRight, 
  Globe, 
  DollarSign,
  Mail
} from 'lucide-react';

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Shop',
      links: ['PranaFlow Device', 'Prana Shirt', 'Bundles', 'Accessories', 'Gift Cards']
    },
    {
      title: 'Platform',
      links: [
        'AI Pranayama Guru', 
        'AI Asana Guru', 
        'AI Meditation Guru', 
        'AI Ayurveda Guru', 
        '+6 specialized Gurus', 
        'Corporate Solutions'
      ]
    },
    {
      title: 'Learn',
      links: ['Blog', 'Research', 'Help Center', 'Webinars', 'Certification']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press Kit', 'Contact', 'Partners']
    }
  ];

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: '#' },
    { icon: <Twitter size={18} />, href: '#' },
    { icon: <Instagram size={18} />, href: '#' },
    { icon: <Youtube size={18} />, href: '#' }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter & Brand Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="max-w-md">
            <div className="flex items-center gap-1 mb-6">
              <span className="text-2xl font-bold tracking-tight">YogaX</span>
              <span className="text-2xl font-light tracking-tight text-gray-400">Biofeedback</span>
            </div>
            <p className="text-gray-500 font-light leading-relaxed mb-8">
              Stay updated with the latest in neuro-respiratory research and Vedic precision technology. Join our global community of masters.
            </p>
            <form 
              onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); setEmail(''); }}
              className="flex items-center gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-indigo-500 transition-colors"
            >
              <div className="pl-4">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium py-2"
                required
              />
              <button 
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 group"
              >
                Join
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 w-full lg:w-auto">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-[13px] font-bold tracking-wider uppercase text-gray-400 mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-10 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-xs text-gray-400">
                Copyright © 2025 YogaXBiofeedback. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Privacy Policy</a>
                <a href="#" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Terms of Use</a>
                <a href="#" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Cookies</a>
              </div>
            </div>

            <div className="flex items-center gap-8">
              {/* Selectors */}
              <div className="flex items-center gap-6 pr-6 border-r border-gray-100 hidden sm:flex">
                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors">
                  <Globe className="w-4 h-4" /> English
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors">
                  <DollarSign className="w-4 h-4" /> USD
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-5">
                {socialLinks.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-black text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:bg-indigo-600 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
