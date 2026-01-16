
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShieldCheck, 
  ChevronRight, 
  Check, 
  Truck, 
  CreditCard, 
  Lock, 
  MapPin, 
  Box,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button, Card, Input, Badge } from '../ui';
import OrderConfirmation from './OrderConfirmation';

type CheckoutStep = 'shipping' | 'method' | 'payment' | 'review';

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'method', label: 'Method' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' }
];

const CheckoutPage: React.FC<{ onBack: () => void; onNavigate: (page: string) => void }> = ({ onBack, onNavigate }) => {
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderNumber] = useState(`YX-${Math.floor(100000 + Math.random() * 900000)}`);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    shippingMethod: 'standard',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    sameAsShipping: true
  });

  const shippingCosts: Record<string, number> = {
    standard: 0,
    express: 15,
    overnight: 35
  };

  const currentShippingCost = shippingCosts[formData.shippingMethod];
  const taxEstimate = subtotal * 0.08;
  const total = subtotal + currentShippingCost + taxEstimate;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const nextStep = () => {
    if (currentStep === 'shipping') setCurrentStep('method');
    else if (currentStep === 'method') setCurrentStep('payment');
    else if (currentStep === 'payment') setCurrentStep('review');
  };

  const prevStep = () => {
    if (currentStep === 'method') setCurrentStep('shipping');
    else if (currentStep === 'payment') setCurrentStep('method');
    else if (currentStep === 'review') setCurrentStep('payment');
    else onBack();
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setIsConfirmed(true);
    clearCart();
  };

  if (isConfirmed) {
    return <OrderConfirmation orderNumber={orderNumber} total={total} formData={formData} onNavigate={onNavigate} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Checkout Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <button onClick={prevStep} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-6 transition-colors">
            <ArrowLeft size={14} /> Back
          </button>
          <h1 className="text-4xl font-extrabold tracking-tight">Checkout</h1>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex items-center gap-4">
          {STEPS.map((step, idx) => {
            const isCompleted = STEPS.findIndex(s => s.id === currentStep) > idx;
            const isActive = step.id === currentStep;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? <Check size={14} /> : idx + 1}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && <div className="w-8 h-px bg-gray-100" />}
              </React.Fragment>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Main Form Area */}
        <main className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {currentStep === 'shipping' && (
              <motion.section 
                key="shipping"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Shipping Information</h2>
                  <Input 
                    label="Email Address" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="you@example.com" 
                  />
                  <Input 
                    label="Full Name" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    placeholder="Satyam Yoga" 
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      label="Address Line 1" 
                      name="address1" 
                      value={formData.address1} 
                      onChange={handleInputChange} 
                      placeholder="123 Lotus Lane" 
                    />
                    <Input 
                      label="Apartment, Suite (Optional)" 
                      name="address2" 
                      value={formData.address2} 
                      onChange={handleInputChange} 
                      placeholder="Unit 108" 
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Input 
                      label="City" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleInputChange} 
                      placeholder="San Francisco" 
                    />
                    <Input 
                      label="State" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleInputChange} 
                      placeholder="CA" 
                    />
                    <Input 
                      label="ZIP" 
                      name="zip" 
                      value={formData.zip} 
                      onChange={handleInputChange} 
                      placeholder="94103" 
                    />
                  </div>
                  <Input 
                    label="Phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>
                <Button onClick={nextStep} className="w-full h-14 rounded-2xl" rightIcon={<ChevronRight size={18} />}>
                  Continue to Shipping Method
                </Button>
              </motion.section>
            )}

            {currentStep === 'method' && (
              <motion.section 
                key="method"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold tracking-tight">Delivery Method</h2>
                <div className="space-y-4">
                  {[
                    { id: 'standard', label: 'Standard Delivery', time: '5-7 business days', price: 'FREE' },
                    { id: 'express', label: 'Express Shipping', time: '2-3 business days', price: '$15.00' },
                    { id: 'overnight', label: 'Overnight Service', time: 'Next business day', price: '$35.00' }
                  ].map((m) => (
                    <label key={m.id} className={`flex items-center justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                      formData.shippingMethod === m.id ? 'border-indigo-600 bg-indigo-50/30 shadow-md' : 'border-gray-100 hover:border-gray-200'
                    }`}>
                      <div className="flex items-center gap-4">
                        <input 
                          type="radio" 
                          name="shippingMethod" 
                          value={m.id} 
                          checked={formData.shippingMethod === m.id} 
                          onChange={handleInputChange}
                          className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <div>
                          <p className="font-bold">{m.label}</p>
                          <p className="text-xs text-gray-400 font-medium">{m.time}</p>
                        </div>
                      </div>
                      <span className="font-black text-sm">{m.price}</span>
                    </label>
                  ))}
                </div>
                <Button onClick={nextStep} className="w-full h-14 rounded-2xl" rightIcon={<ChevronRight size={18} />}>
                  Continue to Payment
                </Button>
              </motion.section>
            )}

            {currentStep === 'payment' && (
              <motion.section 
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">Payment Details</h2>
                  <div className="flex gap-2 opacity-40 grayscale">
                    <CreditCard size={20} />
                    <Lock size={20} />
                  </div>
                </div>

                <Card className="p-8 border-indigo-100 bg-indigo-50/10">
                  <div className="space-y-6">
                    <Input 
                      label="Cardholder Name" 
                      name="cardName" 
                      value={formData.cardName} 
                      onChange={handleInputChange} 
                      placeholder="NAME ON CARD" 
                    />
                    <Input 
                      label="Card Number" 
                      name="cardNumber" 
                      value={formData.cardNumber} 
                      onChange={handleInputChange} 
                      placeholder="0000 0000 0000 0000" 
                      leftIcon={<CreditCard size={18} />}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        label="Expiry Date" 
                        name="expiry" 
                        value={formData.expiry} 
                        onChange={handleInputChange} 
                        placeholder="MM / YY" 
                      />
                      <Input 
                        label="CVC" 
                        name="cvc" 
                        value={formData.cvc} 
                        onChange={handleInputChange} 
                        placeholder="123" 
                        leftIcon={<Lock size={18} />}
                      />
                    </div>
                  </div>
                </Card>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="sameAsShipping" 
                    name="sameAsShipping" 
                    checked={formData.sameAsShipping} 
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded-md text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="sameAsShipping" className="text-sm font-medium text-gray-600">Billing address same as shipping</label>
                </div>

                <Button onClick={nextStep} className="w-full h-14 rounded-2xl" rightIcon={<ChevronRight size={18} />}>
                  Review Order
                </Button>
              </motion.section>
            )}

            {currentStep === 'review' && (
              <motion.section 
                key="review"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <h2 className="text-2xl font-bold tracking-tight">Review & Confirm</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Shipping To</h3>
                      <button onClick={() => setCurrentStep('shipping')} className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Edit</button>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="font-bold">{formData.fullName}</p>
                      <p className="text-gray-500">{formData.address1}</p>
                      <p className="text-gray-500">{formData.city}, {formData.state} {formData.zip}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Payment Method</h3>
                      <button onClick={() => setCurrentStep('payment')} className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Edit</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <CreditCard size={14} className="text-gray-400" />
                      </div>
                      <span className="text-sm font-bold">•••• •••• •••• {formData.cardNumber.slice(-4) || '4242'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-100 p-6 rounded-[2rem] flex items-start gap-4">
                  <AlertCircle className="text-orange-500 shrink-0" size={20} />
                  <p className="text-xs text-orange-800 leading-relaxed">
                    By placing your order, you agree to YogaX's <span className="font-bold underline">Terms of Use</span> and <span className="font-bold underline">Privacy Policy</span>. Your subscription to YogaX Pro (if applicable) will begin immediately upon order fulfillment.
                  </p>
                </div>

                <Button 
                  onClick={handleSubmitOrder} 
                  isLoading={isProcessing} 
                  className="w-full h-16 rounded-[2.5rem] text-lg shadow-2xl" 
                  leftIcon={<ShieldCheck size={20} />}
                >
                  Pay ${total.toFixed(2)} & Place Order
                </Button>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {/* Sticky Sidebar Summary */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <Card className="p-8 border-transparent bg-white shadow-xl">
            <h3 className="text-lg font-bold mb-8 tracking-tight">Order Summary</h3>
            <div className="space-y-6 mb-8 max-h-80 overflow-y-auto pr-2 no-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">Shipping</span>
                <span className="font-bold">{currentShippingCost === 0 ? 'FREE' : `$${currentShippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">Estimated Tax</span>
                <span className="font-bold">${taxEstimate.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-lg font-black uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black text-indigo-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <Lock size={14} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Secured by SSL Encryption</p>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
