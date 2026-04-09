import React from 'react';
import API_BASE_URL from '../../config';

export default function ProductCard({ product, isUpcoming }) {
  // Correct path replacement for the uploads folder
  const imgPath = product.image?.startsWith('http') 
      ? product.image 
      : `${API_BASE_URL.replace('/api', '')}/${product.image}`;

  return (
    <div className="liquid-glass border border-white/10 bg-black/40 rounded-2xl overflow-hidden group hover:border-brand-gold/50 transition-all duration-500 flex flex-col h-full">
      
      {isUpcoming && (
        <div className="bg-brand-gold/10 text-brand-gold text-[10px] font-black tracking-[0.3em] uppercase text-center py-2 border-b border-brand-gold/20">
          Innovation Reserve
        </div>
      )}

      <div className="h-72 p-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-gold/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <img 
          src={imgPath} 
          alt={product.name} 
          className={`max-h-full object-contain z-10 transition-all duration-700 ${
            isUpcoming 
              ? 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105' 
              : 'drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:-translate-y-2'
          }`}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <div className="p-8 flex flex-col flex-1 border-t border-white/5">
        <div className="mb-4 text-center">
          <span className="text-brand-gold text-[10px] font-black tracking-[0.3em] uppercase block mb-2">
            {product.category}
          </span>
          <h3 className="text-2xl font-serif text-white">{product.name}</h3>
        </div>

        <p className="text-gray-400 text-sm font-light text-center leading-relaxed mb-6 flex-1">
          {product.short_description || (isUpcoming ? "A new signature blend currently resting in our innovation reserves." : "Discover the unique character of this signature release.")}
        </p>

        <div className="pt-4 border-t border-white/10">
          <p className="text-brand-gold/80 text-sm font-serif italic text-center">
            {product.flavor_notes || "Notes of anticipation."}
          </p>
        </div>

        <button className={`w-full py-3 mt-6 border text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
          isUpcoming 
            ? 'border-white/20 text-white/50 hover:bg-white/10 hover:text-white cursor-not-allowed'
            : 'border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black'
        }`}>
          {isUpcoming ? 'Coming Soon' : 'Discover More'}
        </button>
      </div>
    </div>
  );
}