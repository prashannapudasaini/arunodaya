import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products.php`).then(res => {
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      setProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-brand-gold animate-pulse uppercase tracking-[0.5em] text-xs">Accessing Reserves...</div>;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        {products.map((p, index) => {
          const isEven = index % 2 === 0;
          const imgPath = `${API_BASE_URL.replace('/api','')}/${p.image}`;
          return (
            <div key={p.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24 animate-in fade-in slide-in-from-bottom-10 duration-1000`}>
              <div className="w-full md:w-1/2 flex justify-center relative">
                <div className="absolute inset-0 bg-brand-gold/10 blur-[120px] rounded-full"></div>
                <img 
                  src={imgPath} 
                  loading="lazy" 
                  className="relative z-10 max-h-[550px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-1000 opacity-0 scale-95" 
                  onLoad={(e) => { e.target.style.opacity = 1; e.target.style.transform = 'scale(1)'; }}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                <span className="text-brand-gold text-[10px] font-black tracking-[0.5em] uppercase block">{p.category}</span>
                <h2 className="text-5xl md:text-7xl font-serif text-white uppercase">{p.name}</h2>
                <div className="w-20 h-[1px] bg-brand-gold/40 mx-auto md:mx-0"></div>
                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">{p.short_description || "A signature expression of artisanal perfection."}</p>
                <div className="pt-8 border-t border-white/10">
                  <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-2">Tasting Notes</p>
                  <p className="text-white font-serif italic text-xl">{p.flavor_notes || "Vanilla, Oak, Smooth Finish"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}