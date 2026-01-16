
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings, 
  LayoutDashboard,
  ArrowRight,
  ExternalLink,
  Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { GURUS, PRODUCTS } from '../constants';
import SearchModal from './header/SearchModal';
import UserMenu from './header/UserMenu';
import MegaMenu from './header/MegaMenu';
import MiniCart from './shop/MiniCart';
import NotificationCenter from './header/NotificationCenter';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadNotifications] = useState(2); // Simulated count
  const menuTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuId: string) => {
    if (menuTimeout.current) window.clearTimeout(menuTimeout.current);
    setActiveMenu(menuId);
    if (menuId === 'cart') setIsMiniCartOpen(true);
    if (menuId === 'notifications') setIsNotificationsOpen(true);
  };

  const handleMouseLeave = () => {
    menuTimeout.current = window.setTimeout(() => {
      setActiveMenu(null);
      setIsMiniCartOpen(false);
      setIsNotificationsOpen(false);
    }, 150);
  };

  const navItems = [
    { id: 'hardware', name: 'Hardware', hasMenu: true },
    { id: 'platform', name: 'Platform', hasMenu: true },
    { id: 'science', name: 'Science', hasMenu: false },
    { id: 'learn', name: 'Learn', hasMenu: false },
    { id: 'shop', name: 'Shop', hasMenu: false },
    { id: 'support', name: 'Support', hasMenu: false },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[150] transition-all duration-500 border-b border-gray-200/40 ${
          isScrolled ? 'h-12 apple-blur' : 'h-16 bg-white/80 backdrop-blur-md'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <span className={`text-xl font-bold tracking-tight transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
              Yoga<span className="gradient-text">X</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.hasMenu && handleMouseEnter(item.id)}
              >
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`text-[12px] font-medium tracking-wide transition-colors hover:text-black ${
                    currentPage === item.id ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:text-indigo-600 transition-colors"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
            
            {/* Notification Bell */}
            {user && (
              <div 
                className="relative group p-1"
                onMouseEnter={() => setIsNotificationsOpen(true)}
              >
                <Bell className="w-[18px] h-[18px] cursor-pointer hover:text-indigo-600 transition-colors" />
                <AnimatePresence>
                  {unreadNotifications > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-[9px] text-white rounded-full flex items-center justify-center font-black"
                    >
                      {unreadNotifications}
                    </motion.span>
                  )}
                </AnimatePresence>
                <NotificationCenter 
                  isOpen={isNotificationsOpen} 
                  onClose={() => setIsNotificationsOpen(false)} 
                  onNavigate={onNavigate}
                />
              </div>
            )}

            <div 
              className="relative group p-1"
              onMouseEnter={() => setIsMiniCartOpen(true)}
              onClick={() => onNavigate('cart')}
            >
              <ShoppingBag className="w-[18px] h-[18px] cursor-pointer hover:text-indigo-600 transition-colors" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-[10px] text-white rounded-full flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
              <MiniCart isOpen={isMiniCartOpen} onNavigate={onNavigate} />
            </div>

            <UserMenu 
              user={user} 
              onNavigate={onNavigate} 
              onSignOut={signOut} 
              isScrolled={isScrolled}
            />

            <button 
              className="lg:hidden p-1"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mega Menu Portal */}
        <AnimatePresence>
          {activeMenu && !['cart', 'notifications'].includes(activeMenu) && (
            <MegaMenu 
              activeMenu={activeMenu} 
              onClose={() => setActiveMenu(null)} 
              onNavigate={onNavigate}
            />
          )}
        </AnimatePresence>
      </nav>

      {/* Overlays */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onNavigate={onNavigate}
        navItems={navItems}
      />
    </>
  );
};

const MobileMenu = ({ isOpen, onClose, onNavigate, navItems }: any) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[100] bg-white p-8 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-12">
          <span className="text-2xl font-bold">YogaX</span>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>
        <div className="space-y-6">
          {navItems.map((item: any) => (
            <button 
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose(); }}
              className="block w-full text-left text-3xl font-bold tracking-tight hover:text-indigo-600 transition-colors"
            >
              {item.name}
            </button>
          ))}
          <hr className="my-8 border-gray-100" />
          <button onClick={() => { onNavigate('cart'); onClose(); }} className="flex items-center gap-2 text-xl font-medium text-gray-500">
            Cart <ShoppingBag className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 text-xl font-medium text-gray-500">
            Account <User className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Navbar;
