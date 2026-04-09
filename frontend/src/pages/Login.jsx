import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, User, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAdmin) navigate('/dashboard');
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Call the login function from AuthContext
    const result = await login(creds);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
      // Clear password field on failure for security
      setCreds(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="bg-white/[0.02] backdrop-blur-2xl p-10 border border-white/10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-3 rounded-full bg-brand-gold/10 mb-4 border border-brand-gold/20">
               <ShieldCheck className="text-brand-gold" size={24} />
            </div>
            <h2 className="text-white text-2xl font-serif uppercase tracking-[0.25em]">
              Admin <span className="text-brand-gold">Portal</span>
            </h2>
            <div className="w-10 h-[1px] bg-brand-gold/30 mx-auto mt-4"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-brand-gold/50" />
              </div>
              <input 
                type="text" 
                required 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white text-sm outline-none focus:border-brand-gold/50 transition-all placeholder:text-gray-700" 
                placeholder="USERNAME" 
                value={creds.username}
                onChange={(e) => setCreds({ ...creds, username: e.target.value })} 
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-brand-gold/50" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white text-sm outline-none focus:border-brand-gold/50 transition-all placeholder:text-gray-700" 
                placeholder="PASSWORD" 
                value={creds.password}
                onChange={(e) => setCreds({ ...creds, password: e.target.value })} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-brand-gold transition-colors"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 py-3 rounded-lg">
                <p className="text-red-500 text-[10px] text-center font-bold uppercase tracking-widest animate-pulse">
                  {error}
                </p>
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-brand-gold text-black py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 disabled:opacity-20 mt-4 shadow-xl shadow-brand-gold/5"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-10 text-center opacity-20">
            <p className="text-[8px] text-white uppercase tracking-[0.4em]">Secure Access System</p>
          </div>
        </div>
      </div>
    </div>
  );
}