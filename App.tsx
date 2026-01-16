
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import AuthModal from './components/auth/AuthModal';
import SEOManager from './components/SEOManager';
import { GuruType } from './types';
import { Spinner } from './components/ui/Loading';

// Lazy load heavy page-level components
const Dashboard = lazy(() => import('./components/Dashboard'));
const GuruInterface = lazy(() => import('./components/GuruInterface'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const ShirtProductDetail = lazy(() => import('./components/ShirtProductDetail'));
const BundleProductDetail = lazy(() => import('./components/BundleProductDetail'));
const CartPage = lazy(() => import('./components/shop/CartPage'));
const CheckoutPage = lazy(() => import('./components/shop/CheckoutPage'));
const HardwareShowcase = lazy(() => import('./components/HardwareShowcase'));
const PlatformShowcase = lazy(() => import('./components/PlatformShowcase'));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white" role="status">
    <Spinner size="lg" />
    <span className="sr-only">Loading page content...</span>
  </div>
);

const AppContent: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [activeGuru, setActiveGuru] = useState<GuruType | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingNav, setPendingNav] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    const protectedPages = ['dashboard', 'platform', 'checkout'];
    if (protectedPages.includes(page) && !user) {
      setPendingNav(page);
      setIsAuthModalOpen(true);
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveGuru(null);
  };

  const handleSelectGuru = (guru: GuruType) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveGuru(guru);
  };

  useEffect(() => {
    if (user && pendingNav) {
      setCurrentPage(pendingNav);
      setPendingNav(null);
    }
  }, [user, pendingNav]);

  const renderContent = () => {
    if (authLoading) return <PageLoader />;

    if (activeGuru) {
      return (
        <Suspense fallback={<PageLoader />}>
          <motion.div
            key="guru"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
          >
            <GuruInterface 
              guru={activeGuru} 
              onBack={() => setActiveGuru(null)} 
            />
          </motion.div>
        </Suspense>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {(() => {
              if (currentPage === 'cart') return <CartPage onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;
              if (currentPage === 'checkout') return <CheckoutPage onBack={() => setCurrentPage('cart')} onNavigate={handleNavigate} />;
              if (currentPage === 'product-pranaflow') return <ProductDetail productId="pranaflow" onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;
              if (currentPage === 'product-pranashirt') return <ShirtProductDetail onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;
              if (currentPage === 'product-bundle') return <BundleProductDetail onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;
              if (currentPage.startsWith('product-')) {
                const productId = currentPage.split('-')[1];
                return <ProductDetail productId={productId} onBack={() => setCurrentPage('home')} onNavigate={handleNavigate} />;
              }

              switch (currentPage) {
                case 'home':
                  return (
                    <>
                      <Hero onNavigate={handleNavigate} />
                      <HardwareShowcase onNavigate={handleNavigate} />
                      <FeaturesSection />
                      <PlatformShowcase onSelectGuru={handleSelectGuru} />
                      <SocialProof />
                    </>
                  );
                case 'hardware': return <HardwareShowcase onNavigate={handleNavigate} />;
                case 'platform': return <PlatformShowcase onSelectGuru={handleSelectGuru} />;
                case 'dashboard': return <Dashboard />;
                case 'science':
                  return (
                    <article className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-3xl mx-auto text-center mb-20">
                        <h2 className="text-5xl font-extrabold mb-8 tracking-tight">Science & Clinical Validation</h2>
                        <p className="text-xl text-gray-500 leading-relaxed font-light">Bridging 5,000 years of Vedic wisdom with precision biometric research.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[{ title: "Neuro-Respiratory Sync", desc: "Patented algorithms detecting neural oscillation states.", icon: "🧠" },
                          { title: "HRV Resilience Study", desc: "22% improvement in stress markers through biofeedback.", icon: "❤️" },
                          { title: "Svara Flow Mapping", desc: "Nostril dominance tracking for hemispheric lateralization.", icon: "🌬️" }
                        ].map((item, i) => (
                          <section key={i} className="p-10 bg-white rounded-[2rem] border border-gray-100 premium-shadow">
                            <div className="text-4xl mb-6" aria-hidden="true">{item.icon}</div>
                            <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                          </section>
                        ))}
                      </div>
                    </article>
                  );
                default: return <Hero onNavigate={handleNavigate} />;
              }
            })()}
          </motion.div>
        </Suspense>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOManager page={currentPage} />
      <AnimatePresence>
        {!activeGuru && (
          <header>
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
          </header>
        )}
      </AnimatePresence>
      
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {renderContent()}
      </main>

      <AnimatePresence>
        {!activeGuru && (
          <Footer />
        )}
      </AnimatePresence>

      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <CartProvider>
      <AppContent />
    </CartProvider>
  </AuthProvider>
);

export default App;
