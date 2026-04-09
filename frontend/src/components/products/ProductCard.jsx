import React from 'react';
// Ensure this matches your named export setup from earlier!
import { API_BASE_URL } from '../../config'; 

export default function ProductCard({ product, isUpcoming }) {
  // Image path logic remains intact
  const imgPath = product.image?.startsWith('http') 
      ? product.image 
      : `${API_BASE_URL.replace('/api', '')}/${product.image}`;

  return (
    <div className="flex flex-col items-center text-center group cursor-pointer w-full">
      
      {/* 1. Image Container: Taller, no background box, floating effect */}
      <div className="relative h-[380px] w-full flex justify-center items-end mb-8">
        {/* Subtle back-glow on hover based on whether it is upcoming or featured */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 blur-[60px] rounded-full transition-all duration-700 ${
          isUpcoming ? 'bg-white/0 group-hover:bg-white/5' : 'bg-brand-gold/0 group-hover:bg-brand-gold/10'
        }`}></div>
        
        <img 
          src={imgPath} 
          alt={product.name} 
          className={`h-full object-contain relative z-10 transition-all duration-700 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] group-hover:-translate-y-4 group-hover:scale-105 ${
            isUpcoming 
              ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' 
              : ''
          }`}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* 2. Typography: Clean, thin, and elegant (No pricing, no descriptions) */}
      <span className="text-gray-400 text-[11px] font-light tracking-[0.2em] uppercase mb-3">
        {product.category || (isUpcoming ? 'Innovation Reserve' : 'Signature')}
      </span>
      
      <h3 className={`text-2xl font-serif transition-colors duration-300 mb-6 px-4 ${
        isUpcoming ? 'text-white/80 group-hover:text-white' : 'text-white group-hover:text-brand-gold'
      }`}>
        {product.name}
      </h3>
      
      {/* 3. Button: Minimalist outline that fills/colors on hover */}
      <button className={`px-8 py-3 border text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
        isUpcoming 
          ? 'border-white/10 text-white/50 group-hover:border-white/50 group-hover:text-white' 
          : 'border-white/20 text-white/70 group-hover:border-brand-gold group-hover:text-brand-gold'
      }`}>
        {isUpcoming ? 'Notify Me' : 'Discover'}
      </button>

    </div>
  );
}