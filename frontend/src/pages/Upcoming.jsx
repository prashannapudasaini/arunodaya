import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Upcoming() {
  const [upcomingProducts, setUpcomingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products specifically marked as 'upcoming'
    axios.get(`${API_BASE_URL}/products.php?type=upcoming`)
      .then(res => {
        // Correctly extracts data from the { success: true, data: [...] } wrapper
        const productArray = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setUpcomingProducts(productArray);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching upcoming products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-brand-gold animate-pulse tracking-widest uppercase text-sm">
        Unlocking Cellars...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-serif text-white italic tracking-[0.1em] mb-6">
            Innovation <span className="text-brand-gold">Reserve</span>
          </h1>
          <div className="w-24 h-[1px] bg-brand-gold/30 mx-auto mb-6"></div>
          <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            A glimpse into the future of Arunodaya. These experimental blends are currently resting in our reserves, waiting for the perfect moment of maturity.
          </p>
        </div>

        {upcomingProducts.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-white/[0.02] rounded-3xl">
            <p className="text-gray-500 tracking-widest uppercase text-xs font-bold">
              The innovation lab is currently resting.
            </p>
          </div>
        ) : (
          <div className="space-y-32">
            {upcomingProducts.map((p, index) => {
              const isEven = index % 2 === 0;
              const imgPath = `${API_BASE_URL.replace('/api', '')}/${p.image}`;

              return (
                <div 
                  key={p.id} 
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}
                >
                  {/* Image Side - Muted/Grayscale for Upcoming */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative group">
                      {/* Soft ambient glow */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full group-hover:bg-brand-gold/10 transition-all duration-1000"></div>
                      
                      <img 
                        src={imgPath} 
                        alt={p.name} 
                        loading="lazy"
                        className="relative z-10 max-h-[550px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                        onLoad={(e) => e.target.classList.add('opacity-60')}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                    <div className="space-y-2">
                      <span className="text-brand-gold text-[10px] font-black tracking-[0.5em] uppercase block opacity-70">
                        {p.category} // Experimental
                      </span>
                      <h2 className="text-4xl md:text-6xl font-serif text-white italic leading-tight">
                        "{p.name}"
                      </h2>
                    </div>

                    <div className="w-16 h-[1px] bg-brand-gold/40 mx-auto md:mx-0"></div>

                    <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">
                      {p.short_description || "An upcoming masterpiece currently undergoing the final stages of maturation in our temperature-controlled cellars."}
                    </p>
                    
                    <div className="pt-8 border-t border-white/10 space-y-4">
                      <div>
                        <h4 className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Anticipated Profile</h4>
                        <p className="text-white font-serif italic text-xl">
                          {p.flavor_notes || "Complex, Oaky, Unrivaled Smoothness"}
                        </p>
                      </div>
                      
                      <div className="pt-4">
                         <span className="inline-block px-8 py-3 border border-white/20 text-white/40 text-[10px] font-black uppercase tracking-widest rounded-full">
                           Currently Maturing
                         </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}