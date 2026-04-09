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
    /* Added min-h-[750px] to ensure vertical consistency across the row */
    <div 
      onClick={handleCardClick} 
      className="flex flex-col items-center text-center group cursor-pointer w-full min-h-[750px]"
    >
      
      {/* 1. Image Container: 
          - Increased to h-[580px] for a much larger product presence
          - Maintained mb-12 for the distance you requested
      */}
      <div className="relative h-[580px] w-full flex justify-center items-end mb-12">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-[80px] rounded-full transition-all duration-700 ${
          isUpcoming ? 'bg-white/0 group-hover:bg-white/5' : 'bg-brand-gold/0 group-hover:bg-brand-gold/10'
        }`}></div>
        
        <img 
          src={imgPath} 
          alt={product.name} 
          className={`h-full object-contain relative z-10 transition-all duration-700 drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)] group-hover:-translate-y-6 group-hover:scale-105 ${
            isUpcoming 
              ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' 
              : ''
          }`}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* 2. Typography Section */}
      <span className="text-gray-400 text-[11px] font-light tracking-[0.3em] uppercase mb-4">
        {product.category || (isUpcoming ? 'Innovation Reserve' : 'Signature')}
      </span>
      
      <h3 className={`text-3xl font-serif transition-colors duration-300 mb-8 px-4 leading-tight ${
        isUpcoming ? 'text-white/80 group-hover:text-white' : 'text-white group-hover:text-brand-gold'
      }`}>
        {product.name}
      </h3>
      
      {/* 3. Button: Positioned at the bottom using mt-auto if needed */}
      <button className={`mt-auto px-12 py-4 border text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
        isUpcoming 
          ? 'border-white/10 text-white/50 group-hover:border-white/50 group-hover:text-white' 
          : 'border-white/20 text-white/70 group-hover:border-brand-gold group-hover:text-brand-gold'
      }`}>
        {isUpcoming ? 'Notify Me' : 'Discover'}
      </button>

    </div>
  );
}