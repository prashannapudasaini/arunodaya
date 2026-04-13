import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products.php`).then(res => {
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      setProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }, [loading, location.hash]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-brand-gold animate-pulse uppercase tracking-[0.5em] text-sm">Accessing Reserves...</div>;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 lg:space-y-32">
        {products.map((p, index) => {
          const isEven = index % 2 === 0;
          const imgPath = `${API_BASE_URL.replace('/api','')}/${p.image}`;
          return (
            <div 
              key={p.id} 
              id={`product-${p.id}`} 
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-0 md:gap-12 lg:gap-24 animate-in fade-in slide-in-from-bottom-10 duration-1000 scroll-mt-32`}
            >
              

              {/* IMAGE SIDE */}
              <div className="w-full md:w-1/2 flex justify-center relative z-10">
                <div className="absolute inset-0 bg-brand-gold/10 blur-[120px] rounded-full"></div>
                <img 
                  src={imgPath} 
                  loading="lazy" 
                  className="relative z-10 max-h-[380px] md:max-h-[550px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-1000 opacity-0 scale-95" 
                  onLoad={(e) => { e.target.style.opacity = 1; e.target.style.transform = 'scale(1)'; }}
                />
              </div>

              {/* TEXT SIDE (Bottom text overlapping the reflection on mobile) */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-4 lg:space-y-6 text-center md:text-left relative z-20 -mt-20 md:mt-0">
                <span className="text-brand-gold text-[20px] md:text-2xl font-black tracking-[0.5em] uppercase block drop-shadow-lg"> <p className="text-white font-serif italic text-2xl">{p.flavor_notes || "Vanilla, Oak, Smooth Finish"}</p></span>
                <h2 className="text-5xl md:text-7xl font-serif text-white uppercase">{p.name}</h2>
                <div className="w-16 lg:w-20 h-[1px] bg-brand-gold/40 mx-auto md:mx-0"></div>
                <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-xl px-6 md:px-0">
                  {p.short_description || "A signature expression of artisanal perfection."}
                </p>
                
                {/* DESKTOP ONLY: Tasting Notes */}
                <div className="hidden md:block pt-8 border-t border-white/10 w-full">
                  <p className="text-brand-gold text-sm font-black uppercase tracking-widest mb-2">Tasting Notes</p>
                  <p className="text-white font-serif italic text-2xl">{p.flavor_notes || "Vanilla, Oak, Smooth Finish"}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}