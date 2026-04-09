import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config'; 

export default function ProductCard({ product, isUpcoming }) {
  const navigate = useNavigate();

  const imgPath = product.image?.startsWith('http') 
      ? product.image 
      : `${API_BASE_URL.replace('/api', '')}/${product.image}`;

  const handleCardClick = () => {
    const targetPage = (product.type === 'upcoming' || isUpcoming) ? '/upcoming' : '/products';
    navigate(`${targetPage}#product-${product.id}`);
  };

  return (
    /* CARD WRAPPER: 
      Surrounds the content with a glassy background, borders, and padding.
    */
    <div 
      onClick={handleCardClick} 
      className="relative flex flex-col items-center text-center group cursor-pointer w-full bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-[2.5rem] p-8 transition-all duration-500 overflow-hidden"
    >
      
      {/* ANIMATED CARD BACKGROUND: Fades in a soft bottom-up gradient on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
        isUpcoming ? 'bg-gradient-to-t from-white/5 to-transparent' : 'bg-gradient-to-t from-brand-gold/10 to-transparent'
      }`}></div>

      {/* 1. Image Container: 
        Made larger (h-[420px]) to ensure the product looks bigger inside the card.
      */}
      <div className="relative h-[420px] w-full flex justify-center items-end mb-10 mt-4">
        
        {/* ANIMATED PRODUCT GLOW: Continuously pulses and expands on hover */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 blur-[70px] rounded-full transition-all duration-1000 group-hover:scale-150 animate-pulse ${
          isUpcoming ? 'bg-white/10' : 'bg-brand-gold/20'
        }`}></div>
        
        <img 
          src={imgPath} 
          alt={product.name} 
          /* BIGGER PRODUCT HOVER: Added group-hover:scale-110 for a bold pop-out effect */
          className={`h-full object-contain relative z-10 transition-all duration-700 drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] group-hover:-translate-y-6 group-hover:scale-110 ${
            isUpcoming 
              ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' 
              : ''
          }`}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* 2. Typography Section (Kept above the animated background with z-10) */}
      <div className="relative z-10">
        <span className="text-gray-400 text-[11px] font-light tracking-[0.3em] uppercase block mb-4">
          {product.category || (isUpcoming ? 'Innovation Reserve' : 'Signature')}
        </span>
        
        <h3 className={`text-3xl font-serif transition-colors duration-300 mb-8 px-4 leading-tight ${
          isUpcoming ? 'text-white/80 group-hover:text-white' : 'text-white group-hover:text-brand-gold'
        }`}>
          {product.name}
        </h3>
        
        {/* 3. Button: Added subtle background color on hover to match the new card aesthetic */}
        <button className={`px-10 py-3.5 border text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
          isUpcoming 
            ? 'border-white/10 text-white/50 group-hover:border-white/50 group-hover:text-white group-hover:bg-white/5' 
            : 'border-white/20 text-white/70 group-hover:border-brand-gold group-hover:text-brand-gold group-hover:bg-brand-gold/5'
        }`}>
          {isUpcoming ? 'Notify Me' : 'Discover'}
        </button>
      </div>

    </div>
  );
}