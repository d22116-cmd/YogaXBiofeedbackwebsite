
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  ArrowLeft,
  Copy,
  MessageCircle,
  XCircle,
  RotateCcw,
  MapPin,
  CreditCard,
  Search,
  Filter
} from 'lucide-react';
import { Card, Badge, Button } from '../ui';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  shippingAddress: string;
  paymentMethod: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    orderNumber: 'YX-882910',
    date: 'Jan 15, 2025',
    status: 'shipped',
    total: 449.00,
    trackingNumber: '1Z999AA10123456784',
    carrier: 'UPS',
    estimatedDelivery: 'Jan 20, 2025',
    shippingAddress: '123 Lotus Lane, San Francisco, CA 94103',
    paymentMethod: 'Visa •••• 4242',
    items: [
      { id: 'p1', name: 'PranaFlow Sensor', price: 299, quantity: 1, image: 'https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=200' },
      { id: 'p2', name: 'Prana Shirt - Black', price: 199, quantity: 1, image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'o2',
    orderNumber: 'YX-771022',
    date: 'Dec 12, 2024',
    status: 'delivered',
    total: 299.00,
    shippingAddress: '123 Lotus Lane, San Francisco, CA 94103',
    paymentMethod: 'Apple Pay',
    items: [
      { id: 'p1', name: 'PranaFlow Sensor', price: 299, quantity: 1, image: 'https://images.unsplash.com/photo-1599056377758-06686e009477?auto=format&fit=crop&q=80&w=200' }
    ]
  }
];

const MyOrders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(o => {
    const matchesFilter = filter === 'all' || o.status === filter;
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         o.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'processing': return { color: 'bg-blue-50 text-blue-600', icon: <Clock size={12} />, label: 'Processing' };
      case 'shipped': return { color: 'bg-indigo-50 text-indigo-600', icon: <Truck size={12} />, label: 'Shipped' };
      case 'delivered': return { color: 'bg-green-50 text-green-600', icon: <CheckCircle2 size={12} />, label: 'Delivered' };
      case 'cancelled': return { color: 'bg-gray-50 text-gray-400', icon: <XCircle size={12} />, label: 'Cancelled' };
      default: return { color: 'bg-gray-50 text-gray-600', icon: <Package size={12} />, label: status };
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here if available
  };

  return (
    <div className="space-y-8 pb-20">
      <AnimatePresence mode="wait">
        {!selectedOrder ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Order History</h1>
                <p className="text-gray-400 text-sm mt-1 font-light">Track shipments and manage your hardware purchases.</p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-2xl">
                {['all', 'processing', 'shipped', 'delivered'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                      filter === f ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </header>

            <div className="relative group max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search by order number or product..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-indigo-500 transition-all text-sm"
              />
            </div>

            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const config = getStatusConfig(order.status);
                  return (
                    <Card 
                      key={order.id} 
                      hoverable 
                      onClick={() => setSelectedOrder(order)}
                      className="p-6 bg-white border-transparent shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group"
                    >
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="flex -space-x-4">
                          {order.items.slice(0, 3).map((item, i) => (
                            <div key={item.id} className="w-16 h-16 rounded-2xl border-2 border-white overflow-hidden shadow-sm bg-gray-50 z-[i]">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-16 h-16 rounded-2xl border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 z-0">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg tracking-tight">{order.orderNumber}</h3>
                            <Badge className={`${config.color} border-none`}>{config.label}</Badge>
                          </div>
                          <p className="text-xs text-gray-400 font-medium">Placed on {order.date} • {order.items.length} items</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                          <p className="font-black text-lg">${order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {order.status === 'shipped' && (
                            <Button size="sm" variant="outline" className="rounded-xl hidden sm:flex">Track</Button>
                          )}
                          <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                  <Package size={40} className="text-gray-200" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No orders found</h2>
                <p className="text-gray-400 font-light max-w-xs mb-8">You haven't placed any orders that match your current filter.</p>
                <Button className="rounded-2xl px-12 h-14">Continue Shopping</Button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <button 
              onClick={() => setSelectedOrder(null)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Back to History
            </button>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-gray-100">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-2">Order {selectedOrder.orderNumber}</h2>
                <p className="text-gray-400 font-medium">Placed on {selectedOrder.date} at 10:30 AM</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:w-auto rounded-2xl" leftIcon={<Download size={16} />}>Invoice</Button>
                <Button variant="outline" className="flex-1 md:w-auto rounded-2xl text-red-500" leftIcon={<XCircle size={16} />}>Cancel</Button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Timeline */}
                <Card className="p-8 border-transparent bg-white shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-8">Delivery Status</h3>
                  <div className="space-y-8">
                    {[
                      { label: 'Order Placed', date: selectedOrder.date, active: true },
                      { label: 'Processing', date: selectedOrder.date, active: true },
                      { label: 'Shipped', date: 'Jan 16, 2025', active: selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered', current: selectedOrder.status === 'shipped' },
                      { label: 'Delivered', date: selectedOrder.estimatedDelivery || 'Est. Jan 20', active: selectedOrder.status === 'delivered' },
                    ].map((step, i, arr) => (
                      <div key={i} className="flex gap-6 relative">
                        {i !== arr.length - 1 && (
                          <div className={`absolute left-4 top-8 bottom-[-24px] w-0.5 ${step.active && arr[i+1].active ? 'bg-indigo-600' : 'bg-gray-100'}`} />
                        )}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          step.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.active ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className={`font-bold ${step.active ? 'text-black' : 'text-gray-400'}`}>{step.label}</p>
                            <p className="text-xs text-gray-400 font-medium">{step.date}</p>
                          </div>
                          {step.current && (
                            <Badge variant="primary" className="mt-2 animate-pulse">Current Step</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Items */}
                <Card className="p-8 border-transparent bg-white shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-8">Items in Order</h3>
                  <div className="space-y-6">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-6 items-center">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-black text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Tracking if available */}
                {selectedOrder.trackingNumber && (
                  <Card className="p-8 border-transparent bg-indigo-600 text-white shadow-xl relative overflow-hidden">
                    <Truck className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200 mb-1">Carrier: {selectedOrder.carrier}</p>
                          <h3 className="text-2xl font-black">{selectedOrder.trackingNumber}</h3>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(selectedOrder.trackingNumber!)}
                          className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors"
                        >
                          <Copy size={20} />
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <Button className="bg-white text-black hover:bg-gray-100 rounded-2xl flex-1 h-14" rightIcon={<ExternalLink size={16} />}>Track on UPS</Button>
                        <button className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors">
                          <MapPin size={20} />
                        </button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              <aside className="space-y-8">
                <Card className="p-8 border-transparent bg-gray-50/50 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Order Details</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <MapPin size={10} /> Shipping Address
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">{selectedOrder.shippingAddress}</p>
                    </div>
                    <div className="pt-6 border-t border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <CreditCard size={10} /> Payment Method
                      </p>
                      <p className="text-xs text-gray-600">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div className="pt-6 border-t border-gray-100 space-y-3">
                      <div className="flex justify-between text-xs font-medium text-gray-400">
                        <span>Subtotal</span>
                        <span className="text-gray-900">${(selectedOrder.total * 0.92).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium text-gray-400">
                        <span>Tax</span>
                        <span className="text-gray-900">${(selectedOrder.total * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-black text-black pt-2">
                        <span>Total</span>
                        <span className="text-indigo-600">${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full rounded-2xl h-14" leftIcon={<RotateCcw size={18} />}>Buy Again</Button>
                  <Button variant="outline" className="w-full rounded-2xl h-14" leftIcon={<MessageCircle size={18} />}>Contact Support</Button>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;
