
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  Mail, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Eye, 
  UserPlus,
  ArrowUpDown
} from 'lucide-react';
import { Card, Badge, Button } from '../ui';
import UserDetailModal from './UserDetailModal';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'pro' | 'admin' | 'researcher';
  subscription: 'Free' | 'Pro' | 'Family';
  devices: number;
  lastLogin: string;
  status: 'Active' | 'Suspended' | 'Deleted';
  avatar: string;
}

const MOCK_USERS: UserRecord[] = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: i === 0 ? 'Satyam Yoga' : `Practitioner ${i + 1}`,
  email: i === 0 ? 'satyam@yoga.x' : `user${i + 1}@example.com`,
  role: i % 4 === 0 ? 'pro' : 'user',
  subscription: i % 3 === 0 ? 'Pro' : 'Free',
  devices: Math.floor(Math.random() * 3),
  lastLogin: `${i + 1}h ago`,
  status: 'Active',
  avatar: `https://i.pravatar.cc/150?u=${i}`
}));

const ITEMS_PER_PAGE = 5;

const UserManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState({ role: 'all', status: 'all' });

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                           u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = filters.role === 'all' || u.role === filters.role;
      return matchesSearch && matchesRole;
    });
  }, [search, filters]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedUsers.length) setSelectedIds([]);
    else setSelectedIds(paginatedUsers.map(u => u.id));
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return <Badge variant="error" className="lowercase">Admin</Badge>;
      case 'pro': return <Badge variant="success" className="lowercase">Pro</Badge>;
      default: return <Badge variant="outline" className="lowercase">User</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 border-transparent bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          
          <select 
            value={filters.role}
            onChange={(e) => { setFilters({...filters, role: e.target.value}); setPage(1); }}
            className="px-4 py-2.5 bg-gray-50 border-none rounded-xl text-xs font-bold uppercase tracking-widest text-gray-500"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="pro">Pro</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
           <Button size="sm" variant="outline" className="rounded-xl" leftIcon={<Download size={14} />}>Export</Button>
           <Button size="sm" className="rounded-xl" leftIcon={<UserPlus size={14} />}>Invite</Button>
        </div>
      </Card>

      <Card className="border-transparent bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-6 py-4">
                  <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === paginatedUsers.length} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 text-indigo-600" />
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Subscription</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Last Login</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => setSelectedIds(prev => prev.includes(user.id) ? prev.filter(i => i !== user.id) : [...prev, user.id])} className="w-4 h-4 rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img src={user.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-[10px] text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 text-xs font-bold">{user.subscription}</td>
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setSelectedUser(user); setIsDetailOpen(true); }} className="p-2 text-gray-400 hover:text-indigo-600">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
             Page {page} of {totalPages} ({filteredUsers.length} total)
           </p>
           <div className="flex gap-2">
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={14} /></Button>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg" disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight size={14} /></Button>
           </div>
        </div>
      </Card>

      {isDetailOpen && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setIsDetailOpen(false)} />
      )}
    </div>
  );
};

export default UserManagement;