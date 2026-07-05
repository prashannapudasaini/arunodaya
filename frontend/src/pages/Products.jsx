import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { API_BASE_URL, getImageUrl } from '../config'; 
import ProductCard from '../components/products/ProductCard'; 

const showcaseStages = [
  { id: "mr-black", bg: "/images/back2.png", product: "/images/mr_black.png", title: "Iconic Balance", subtitle: "The Gold Standard", desc: "Mr. Black Extra Strong is more than a spirit; it is a legacy of Himalayan intensity refined into smooth perfection.", side: "right" },
  { id: "bare-shine", bg: "/images/back3.png", product: "/images/bare_shine.png", title: "Crystal Purity", subtitle: "The Bare Shine Reserve", desc: "Experience the extra dry, clean finish of our premium Bare Shine vodka, distilled for those who seek uncompromised clarity.", side: "left" },
  { id: "makhan", bg: "/images/back4.png", product: "/images/makhan.png", title: "Premium Apple", subtitle: "Himalayan Harvest", desc: "Our Makhan series brings the crisp sweetness of Himalayan apples together with a bold, smooth distillation profile.", side: "right" },
  { id: "enjoy", bg: "/images/back2.png", product: "/images/enjoy.png", title: "Enjoy", subtitle: "Celebration Series", desc: "A vibrantly crafted spirit designed for celebration. Enjoy delivers a perfectly balanced, smooth profile that elevates every toast and shared moment.", side: "right" },
  { id: "basanti", bg: "/images/back3.png", product: "/images/basanti.png", title: "Basanti", subtitle: "Citrus Reserve", desc: "A citrus-forward whisky featuring vibrant notes of fresh lemon. Basanti offers a refreshing twist on tradition, blending smooth maturation with a zesty, invigorating finish.", side: "left" },
  { id: "vodka", bg: "/images/back4.png", product: "/images/vodka.png", title: "Premium 555 Vodka", subtitle: "Ultra-Pure Series", desc: "Distilled for ultimate purity, Premium 555 Vodka offers an exceptionally clean and crisp tasting experience, perfect for sipping chilled or mixing in classic cocktails.", side: "right" }
];

const FALLBACK_IMAGE = "/images/fallback.png";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation(); 
  const navigate = useNavigate();
  const featuredScrollRef = useRef(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const autoScrollInterval = useRef(null);

  const scrollToFeaturedIndex = (index) => {
    if (!featuredScrollRef.current || !featuredProducts.length) return;
    const container = featuredScrollRef.current;
    const firstCard = container.children[0];
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;
    const scrollAmount = index * (cardWidth + gap);
    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  };

  const startAutoScroll = () => {
    if (autoScrollInterval.current) return;
    autoScrollInterval.current = setInterval(() => {
      if (!featuredProducts.length) return;
      setCurrentFeaturedIndex(prev => {
        const next = (prev + 1) % featuredProducts.length;
        scrollToFeaturedIndex(next);
        return next;
      });
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  const resetAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopAutoScroll();
      else startAutoScroll();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const container = featuredScrollRef.current;
    if (!container || !featuredProducts.length) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const firstCard = container.children[0];
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const gap = parseFloat(getComputedStyle(container).gap) || 0;
      const totalItemWidth = cardWidth + gap;
      let newIndex = Math.round(scrollLeft / totalItemWidth);
      newIndex = Math.min(newIndex, featuredProducts.length - 1);
      if (newIndex !== currentFeaturedIndex) {
        setCurrentFeaturedIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [featuredProducts]);

  useEffect(() => {
    if (featuredProducts.length > 0) startAutoScroll();
    return () => stopAutoScroll();
  }, [featuredProducts]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products.php`)
      .then(res => {
        const data = res.data?.data || [];
        // FILTER: Only keep 'regular' (Signature Series) products for the Complete Collection
        const signatureProducts = data.filter(product => product.type === 'regular');
        setProducts(signatureProducts);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    axios.get(`${API_BASE_URL}/admin/products.php?featured=1`)
      .then(res => {
        const list = res.data?.data || [];
        setFeaturedProducts(list.slice(0, 8));
      })
      .catch(err => console.error("Error fetching featured:", err));
      
    return () => stopAutoScroll();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0) {
      let targetId = null;
      if (location.state && location.state.targetId) targetId = `product-${location.state.targetId}`;
      else if (location.hash) targetId = location.hash.replace('#', '');

      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      } else if (!location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, [loading, products, location.state, location.hash]);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center text-gray-900 dark:text-brand-gold animate-pulse tracking-[0.5em] uppercase text-sm font-bold transition-colors duration-500">
      Loading Collection...
    </div>
  );

  const safeImageUrl = (imagePath) => {
    if (!imagePath) return FALLBACK_IMAGE;
    try {
      return getImageUrl ? getImageUrl(imagePath) : `${API_BASE_URL.replace('/api','')}/${imagePath}`;
    } catch {
      return FALLBACK_IMAGE;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] overflow-hidden text-gray-900 dark:text-white pt-24 transition-colors duration-500">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* ================= 1. ALL PRODUCTS BANNER ================= */}
      <section className="w-full border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-black py-12 lg:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-8">Our Collection</h2>
        </div>
        <div className="max-w-[1400px] mx-auto flex justify-center">
          <img 
            src="/images/allproducts.png" 
            alt="All Products Collection" 
            className="w-full h-auto object-contain dark:drop-shadow-none drop-shadow-xl" 
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        </div>
      </section>

      {/* ================= 2. FEATURED PRODUCTS ================= */}
      <section className="relative flex flex-col justify-center py-12 lg:py-16 overflow-hidden border-t border-gray-200 dark:border-white/5 bg-white dark:bg-transparent">
        <div className="text-center px-6 mb-8 lg:mb-12">
          <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase">Signature</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 text-gray-900 dark:text-white uppercase tracking-wide">Featured Collection</h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-6"></div>
        </div>

        {featuredProducts.length > 0 ? (
          <>
            <div 
              ref={featuredScrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-20 gap-4 md:gap-10 pb-6 lg:pb-10"
              onMouseEnter={stopAutoScroll}
              onMouseLeave={startAutoScroll}
              onTouchStart={stopAutoScroll}
              onTouchEnd={startAutoScroll}
            >
              {featuredProducts.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => {
                    const targetElement = document.getElementById(`product-${p.id}`);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }} 
                  className="group relative flex-shrink-0 snap-center w-[85vw] md:w-[45vw] lg:w-[28vw] h-[50vh] lg:h-[55vh] bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-brand-gold dark:hover:border-white/30 rounded-[2.5rem] p-6 lg:p-8 flex flex-col items-center justify-between cursor-pointer transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none"
                >
                  <div className="relative w-full h-[70%] flex justify-center items-end mt-2 lg:mt-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 bg-gray-200 dark:bg-brand-gold/10 dark:blur-[60px] rounded-full transition-all duration-700 group-hover:scale-125"></div>
                    <img 
                      src={safeImageUrl(p.image)} 
                      alt={p.name} 
                      className="h-full object-contain relative z-10 drop-shadow-xl dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-700"
                      onError={(e) => { 
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE; 
                      }}
                    />
                  </div>

                  <div className="text-center relative z-10 w-full mt-4 border-t border-gray-200 dark:border-white/10 pt-6">
                    <h3 className="text-2xl font-serif text-gray-900 dark:text-white group-hover:text-brand-gold transition-colors duration-300 truncate w-full px-2">{p.name}</h3>
                  </div>
                </div>
              ))}
              <div className="flex-shrink-0 w-[5vw] md:w-[20vw]"></div>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              {featuredProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    stopAutoScroll();
                    scrollToFeaturedIndex(idx);
                    resetAutoScroll();
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentFeaturedIndex
                      ? 'w-8 h-2 bg-brand-gold'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 dark:bg-white/30 dark:hover:bg-white/60'
                  }`}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 tracking-widest uppercase font-bold w-full">Inventory updating...</p>
        )}
      </section>

      {/* ================= 3. ALL PRODUCTS GRID ================= */}
      <section className="py-12 lg:py-20 px-6 overflow-hidden border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-transparent">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase">The Cellars</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mt-4 text-gray-900 dark:text-white uppercase tracking-wide">Complete Collection</h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p.id} id={`product-${p.id}`} className="scroll-mt-32">
                <ProductCard product={p} isUpcoming={false} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 font-bold uppercase tracking-widest">
              No signature products available.
            </div>
          )}
        </div>
      </section>

      {/* ================= 4. DYNAMIC BRANDING SHOWCASE ================= */}
      <section className="relative border-t border-gray-800 bg-[#050505]">
        {showcaseStages.map((stage) => (
          <ShowcaseStage key={stage.id} stage={stage} navigate={navigate} />
        ))}
      </section>
    </div>
  );
}

// ================= THE SHOWCASE STAGE COMPONENT (LOCKED TO DARK/CINEMATIC) =================
function ShowcaseStage({ stage, navigate }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const containerY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [60, 0, 0, -60]);

  const isTextOnRight = stage.side === 'right';
  const FALLBACK_IMAGE = "/images/fallback.png";

  return (
    <div ref={ref} className="h-[100svh] relative flex items-center overflow-hidden border-b border-gray-800">
      <motion.div 
        style={{ opacity, backgroundImage: `url(${stage.bg})` }} 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0 opacity-50"
      />
      
      <div className={`relative z-10 w-full flex ${stage.side === 'right' ? 'justify-end' : 'justify-start'} px-4 sm:px-6 lg:px-8`}>
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-3/5 xl:w-2/5">
          <motion.div 
            style={{ opacity, y: containerY }}
            className={`backdrop-blur-xl bg-black/60 border border-white/10 rounded-[2rem] shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 ${
              stage.side === 'right' ? 'mr-0 sm:mr-0.5 ml-auto' : 'ml-0 sm:ml-0.5 mr-auto'
            }`}
          >
            <div className={`flex flex-col lg:flex-row items-center ${isTextOnRight ? '' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 md:gap-10`}>
              
              {/* Image Section */}
              <div className="flex justify-center items-center w-full lg:w-2/5 mt-4 md:mt-0 mb-6 md:mb-0">
                <img 
                  src={stage.product} 
                  alt={stage.title} 
                  loading="lazy"
                  className="max-h-[35vh] sm:max-h-[45vh] md:max-h-[65vh] lg:max-h-[75vh] xl:max-h-[85vh] w-auto object-contain drop-shadow-2xl transition-transform duration-500 scale-110 hover:scale-125 md:scale-[1.35] md:hover:scale-[1.6]" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>
              
              {/* Content Section */}
              <div className="w-full lg:w-3/5 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center lg:text-left mt-8 lg:mt-0">
                <span className="text-brand-gold text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase block">
                  {stage.subtitle}
                </span>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white uppercase leading-tight">
                  {stage.title}
                </h2>
                
                <div className="w-12 sm:w-16 h-[2px] bg-brand-gold mx-auto lg:mx-0"></div>
                
                <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                  {stage.desc}
                </p>
                
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}