import React from 'react';
import { Package, PlusCircle, LogOut, FlaskConical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'products', label: 'Signature Collection', icon: Package },
    { id: 'upcoming', label: 'Upcoming Releases', icon: FlaskConical },
    { id: 'add_product', label: 'Add New Spirit', icon: PlusCircle },
  ];

  return (
    <div className="w-64 liquid-glass border-y-0 border-l-0 rounded-none bg-black/80 flex flex-col h-[calc(100vh-80px)] hidden md:flex">
      <div className="p-8 border-b border-white/10">
        <h3 className="text-brand-gold text-xs font-black uppercase tracking-[0.3em]">Distillery</h3>
        <p className="text-white font-serif mt-1 text-xl">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-sm tracking-wide font-light ${
                isActive 
                  ? 'bg-brand-gold text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm uppercase tracking-widest font-bold"
        >
          <LogOut size={16} />
          Secure Logout
        </button>
      </div>
    </div>
  );
}