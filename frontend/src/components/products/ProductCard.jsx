import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getImageUrl } from '../../config'; 

const FALLBACK_IMAGE = "/images/fallback.png";

export default function ProductCard({ product, isUpcoming }) {
  const navigate = useNavigate();

  // Safe image URL builder
  const safeImageUrl = (imagePath) => {
    if (!imagePath) return FALLBACK_IMAGE;
    try {
      return getImageUrl ? getImageUrl(imagePath) : `${API_BASE_URL.replace('/api', '')}/${imagePath}`;
    } catch {
      return FALLBACK_IMAGE;
    }
  };

  const imgPath = safeImageUrl(product.image);

  const handleCardClick = () => {
    const targetPage = (product.type === 'upcoming' || isUpcoming) ? '/upcoming' : '/products';
    navigate(`${targetPage}#product-${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick} 
      /* REDUCED padding (p-6) and rounded corners (rounded-3xl) for a tighter, smaller card */
      className="relative flex flex-col items-center text-center group cursor-pointer w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-brand-gold dark:hover:border-white/30 rounded-3xl p-5 md:p-6 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md dark:shadow-none"
    >
      {/* 1. Image Container - REDUCED to h-[280px] to make the card much shorter */}
      <div className="relative h-[240px] md:h-[280px] w-full flex justify-center items-end mb-6 mt-2">
        
        {/* Background glow orb - Scaled down to match the new compact card size */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gray-200 dark:bg-brand-gold/10 dark:blur-[40px] rounded-full transition-all duration-1000 group-hover:scale-125"></div>
        
        <img 
          src={imgPath} 
          alt={product.name} 
          /* Hover effect kept, but scaled appropriately for a smaller bottle */
          className="h-full object-contain relative z-10 transition-all duration-700 drop-shadow-md dark:drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:-translate-y-3 group-hover:scale-105"
          onError={(e) => { 
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE; 
          }}
        />
      </div>

      {/* 2. Typography Section - NAME ONLY, Removed the top border to make it seamlessly minimal */}
      <div className="relative z-10 w-full mt-auto">
        <h3 className="text-xl md:text-2xl font-serif text-gray-900 dark:text-white group-hover:text-brand-gold transition-colors duration-300 leading-tight">
          {product.name}
        </h3>
      </div>
    </div>
  );
}