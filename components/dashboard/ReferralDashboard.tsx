
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Copy, 
  Share2, 
  Mail, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  QrCode, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight,
  Award,
  Download,
  Trophy
} from 'lucide-react';
import { Card, Button, Badge } from '../ui';
import { Referral } from '../../types';

const MOCK_REFERRALS: Referral[] = [
  { id: 'r1', referee_email: 'l***n@gmail.com', status: 'converted', reward_amount: 50, created_at: 'Jan 10, 2025', converted_at: 'Jan 12, 2025' },
  { id: 'r2', referee_email: 's***j@tech.co', status: 'signed_up', reward_amount: 0, created_at: 'Jan 15, 2025' },
  { id: 'r3', referee_email: 'd***c@uni.edu', status: 'pending', reward_amount: 0, created_at: 'Jan 18, 2025' },
  { id: 'r4', referee_email: 'a***m@flow.io', status: 'converted', reward_amount: 50, created_at: 'Dec 28, 2024', converted_at: 'Jan 02, 2025' },
];

const ReferralDashboard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "SATYA50";
  const referralLink = `https://yogax.ai/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: Referral['status']) => {
    switch (status) {
      case 'converted': return <Badge variant="success" className="lowercase">Converted</Badge>;
      case 'signed_up': return <Badge variant="primary" className="lowercase">Signed Up</Badge>;
      case 'pending': return <Badge variant="outline" className="lowercase">Invited</Badge>;
      default: return <Badge variant="secondary" className="lowercase">Expired</Badge>;
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <Card className="p-12 bg-gray-900 text-white border-transparent shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
          <Gift size={400} />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" className="bg-indigo-600 text-white border-transparent mb-6">Ambassador Program</Badge>
            <h1 className="text-5xl font-black tracking-tight mb-4">Share YogaX,<br />Get Rewarded.</h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
              Give your friends <span className="text-white font-bold">$50 off</span> their first device. Get <span className="text-white font-bold">$50 credit</span> in your clinical vault when they purchase.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-md">
              <div className="flex-1 px-6 py-2 truncate text-sm font-mono text-gray-300">
                {referralLink}
              </div>
              <Button onClick={handleCopy} className={`h-12 px-8 rounded-2xl min-w-[140px] transition-all ${copied ? 'bg-green-600' : 'bg-white text-black hover:bg-gray-100'}`} leftIcon={copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}>
                {copied ? 'Copied' : 'Copy Link'}
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Card className="p-8 bg-white text-black border-transparent shadow-2xl rotate-3 flex flex-col items-center">
               <div className="p-4 bg-gray-50 rounded-3xl mb-4">
                  <QrCode size={120} className="text-black" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scan to Share</p>
               <Button variant="ghost" size="sm" className="mt-4 text-[10px] uppercase font-black" leftIcon={<Download size={14} />}>Download Card</Button>
            </Card>
          </div>
        </div>
      </Card>

      {/* Stats Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Friends Referred', val: '5', sub: 'Invitations sent', icon: <Users className="text-blue-500" /> },
          { label: 'Conversions', val: '2', sub: 'Successful buyers', icon: <CheckCircle2 className="text-green-500" /> },
          { label: 'Total Earned', val: '$100', sub: 'Lifetime rewards', icon: <DollarSign className="text-indigo-500" /> },
          { label: 'Available Credit', val: '$100', sub: 'Ready at checkout', icon: <Trophy className="text-yellow-500" /> },
        ].map((stat, i) => (
          <Card key={i} className="p-8 bg-white border-transparent shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black">{stat.val}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{stat.sub}</p>
            </div>
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Referral History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 bg-white border-transparent shadow-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold tracking-tight">Referral History</h3>
              <Badge variant="outline" className="text-[9px]">Last 12 Months</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/30">
                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Friend</th>
                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                    <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_REFERRALS.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold font-mono text-gray-600">{r.referee_email}</span>
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(r.status)}
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs text-gray-400 font-medium">{r.created_at}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-black ${r.reward_amount > 0 ? 'text-indigo-600' : 'text-gray-300'}`}>
                          {r.reward_amount > 0 ? `+$${r.reward_amount}` : '--'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button className="w-full py-4 mt-6 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black border-t border-gray-100 transition-colors">
              View Full History
            </button>
          </Card>
        </div>

        {/* Sharing & Mechanics */}
        <aside className="space-y-8">
          <Card className="p-8 bg-indigo-600 text-white border-transparent shadow-xl">
             <h3 className="font-bold text-lg mb-6">Quick Share</h3>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'whatsapp', icon: <MessageCircle size={20} />, label: 'WhatsApp', color: 'bg-green-500' },
                  { id: 'twitter', icon: <Twitter size={20} />, label: 'Twitter', color: 'bg-blue-400' },
                  { id: 'linkedin', icon: <Linkedin size={20} />, label: 'LinkedIn', color: 'bg-blue-600' },
                  { id: 'email', icon: <Mail size={20} />, label: 'Email', color: 'bg-gray-700' },
                ].map((social) => (
                  <button key={social.id} className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/5">
                    <div className={`${social.color} p-2 rounded-xl text-white`}>{social.icon}</div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{social.label}</span>
                  </button>
                ))}
             </div>
             <Button variant="outline" className="w-full mt-6 border-white/20 text-white hover:bg-white/10 rounded-xl h-12" leftIcon={<Share2 size={16} />}>More Options</Button>
          </Card>

          <Card className="p-8 bg-white border-transparent shadow-sm">
             <h3 className="font-bold mb-6">How It Works</h3>
             <div className="space-y-6">
                {[
                  { step: '01', title: 'Share your link', desc: 'Invite friends to the ecosystem.' },
                  { step: '02', title: 'They get $50 off', desc: 'Discount applied at checkout.' },
                  { step: '03', title: 'You get $50', desc: 'Credit added when they buy.' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-xl font-black text-indigo-100">{s.step}</span>
                    <div>
                      <p className="text-sm font-bold">{s.title}</p>
                      <p className="text-xs text-gray-400 font-light">{s.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </Card>

          <Card className="p-8 bg-orange-50 border-orange-100 border text-orange-900">
             <div className="flex items-center gap-3 mb-4">
                <Award size={20} className="text-orange-500" />
                <h3 className="font-bold">Master Ambassador</h3>
             </div>
             <p className="text-xs leading-relaxed opacity-80 mb-6">
               You are 5 referrals away from the "Legend" badge and early access to the Prana Flow V3 beta.
             </p>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden mb-4">
                <div className="h-full bg-orange-500 w-[75%]" />
             </div>
             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                <span>Rank 1,202</span>
                <span>Tier: Gold</span>
             </div>
          </Card>
        </aside>
      </div>

      {/* Leaderboard CTA */}
      <Card className="p-8 border-transparent bg-gray-50 flex items-center justify-between group cursor-pointer hover:bg-indigo-50 transition-colors">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-yellow-500 shadow-sm group-hover:rotate-12 transition-transform">
               <Trophy size={24} />
            </div>
            <div>
               <h4 className="font-bold text-lg">Top Referrers This Month</h4>
               <p className="text-sm text-gray-400 font-light">Join the elite ambassadors spreading Vedic precision technology.</p>
            </div>
         </div>
         <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600">
            View Leaderboard <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </Card>
    </div>
  );
};

export default ReferralDashboard;
