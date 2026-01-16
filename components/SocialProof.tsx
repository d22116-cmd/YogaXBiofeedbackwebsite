
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, CheckCircle, Award, Landmark } from 'lucide-react';
import { Card } from './ui';

const STATS = [
  { value: '10,000+', label: 'Active Practitioners', sub: 'Growing globally' },
  { value: '500+', label: 'Research Citations', sub: 'Peer-reviewed studies' },
  { value: '98%', label: 'Clinical Accuracy', sub: 'Vs. Gold Standard' },
  { value: '4.9★', label: 'Average Rating', sub: 'User satisfaction' },
];

const TESTIMONIALS = [
  {
    quote: "YogaX has completely transformed how I teach. Measuring Nadi dominance in real-time gives my students a 'visual' of their internal state they never had before.",
    author: "Elena Rodriguez",
    title: "Senior Yoga Instructor",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5
  },
  {
    quote: "The integration of Vedic Svara Yoga with modern HRV biofeedback is a breakthrough. The clinical data we've gathered using the PranaFlow device is remarkable.",
    author: "Dr. Vikram Sethi",
    title: "Professor of Neuroscience, IIT Mandi",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    rating: 5
  },
  {
    quote: "We implemented the YogaX platform across our executive team. The stress detection accuracy allowed us to proactively manage burnout before it impacted performance.",
    author: "Sarah Jenkins",
    title: "Director of People & Culture, TechFlow",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  }
];

const TRUST_BADGES = [
  { name: 'ISO 27001 Certified', icon: <Shield className="w-5 h-5" /> },
  { name: 'HIPAA Ready', icon: <CheckCircle className="w-5 h-5" /> },
  { name: 'CE Marked', icon: <Award className="w-5 h-5" /> },
  { name: 'FDA Registered', icon: <Landmark className="w-5 h-5" /> },
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-2 text-black">
                {stat.value}
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-extrabold tracking-tight mb-4"
          >
            Trusted by Masters & Scientists.
          </motion.h2>
          <p className="text-gray-500 font-light">Join the thousands who have unified their practice with precision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full flex flex-col justify-between border-transparent bg-white shadow-sm hover:shadow-xl transition-all">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg italic font-light leading-relaxed mb-8">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50" />
                  <div>
                    <h4 className="font-bold text-sm text-black">{t.author}</h4>
                    <p className="text-xs text-gray-400">{t.title}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges & Partners */}
        <div className="border-t border-gray-100 pt-16">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {TRUST_BADGES.map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {badge.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{badge.name}</span>
              </div>
            ))}
            <div className="h-8 w-px bg-gray-200 hidden lg:block" />
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Partnered with:</span>
              <div className="text-lg font-black tracking-tighter text-gray-600">IIT MANDI</div>
              <div className="text-lg font-black tracking-tighter text-gray-600">NEUROLAB</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
