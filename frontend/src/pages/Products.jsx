import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { API_BASE_URL, getImageUrl } from '../config'; 

// Explore Section Liquor Images (Used for the Dynamic Branding Showcase)
const showcaseStages = [
  {
    id: "mr-black",
    bg: "/images/back2.png",         
    product: "/images/mr_black.png", 
    title: "Iconic Balance",
    subtitle: "The Gold Standard",
    desc: "Mr. Black Extra Strong is more than a spirit; it is a legacy of Himalayan intensity refined into smooth perfection.",
    side: "right" 
  },
  {
    id: "bare-shine",
    bg: "/images/back3.png",         
    product: "/images/bare_shine.png", 
    title: "Crystal Purity",
    subtitle: "The Bare Shine Reserve",
    desc: "Experience the extra dry, clean finish of our premium Bare Shine vodka, distilled for those who seek uncompromised clarity.",
    side: "left"
  },
  {
    id: "makhan",
    bg: "/images/back4.png",         
    product: "/images/makhan.png",   
    title: "Premium Apple",
    subtitle: "Himalayan Harvest",
    desc: "Our Makhan series brings the crisp sweetness of Himalayan apples together with a bold, smooth distillation profile.",
    side: "right"
  },
  {
    id: "enjoy",
    bg: "/images/back2.png",         
    product: "/images/enjoy.png", 
    title: "Enjoy",
    subtitle: "Celebration Series",
    desc: "A vibrantly crafted spirit designed for celebration. Enjoy delivers a perfectly balanced, smooth profile that elevates every toast and shared moment.",
    side: "right"
  },
  {
    id: "basanti",
    bg: "/images/back3.png",         
    product: "/images/basanti.png", 
    title: "Basanti",
    subtitle: "Citrus Reserve",
    desc: "A citrus-forward whisky featuring vibrant notes of fresh lemon. Basanti offers a refreshing twist on tradition, blending smooth maturation with a zesty, invigorating finish.",
    side: "left"
  },
  {
    id: "vodka",
    bg: "/images/back4.png",         
    product: "/images/vodka.png",   
    title: "Premium 555 Vodka",
    subtitle: "Ultra-Pure Series",
    desc: "Distilled for ultimate purity, Premium 555 Vodka offers an exceptionally clean and crisp tasting experience, perfect for sipping chilled or mixing in classic cocktails.",
    side: "right"
  }
];

// Single source of truth for fallback image
const FALLBACK_IMAGE = "/images/fallback.png";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation(); 
  const navigate = useNavigate();

  // Featured products carousel state
  const featuredScrollRef = useRef(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const autoScrollInterval = useRef(null);

  // Helper: scroll to a specific featured product index
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

  // Auto-scroll every 3 seconds – with race condition fix + visibility API
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

  // Visibility change: pause auto-scroll when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopAutoScroll();
      else startAutoScroll();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Scroll listener to sync currentFeaturedIndex
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

  // Auto-scroll activation when featured products are loaded
  useEffect(() => {
    if (featuredProducts.length > 0) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [featuredProducts]);

  // Initial Data Fetching – safe API parsing
  useEffect(() => {
    axios.get(`${API_BASE_URL}/products.php`)
      .then(res => {
        const data = res.data?.data || [];
        setProducts(data);
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

  // Handle Hash Links and Deep Linking
  useEffect(() => {
    if (!loading && products.length > 0) {
      let targetId = null;

      if (location.state && location.state.targetId) {
        targetId = `product-${location.state.targetId}`;
      } else if (location.hash) {
        targetId = location.hash.replace('#', '');
      }

      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      } else if (!location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, [loading, products, location.state, location.hash]);

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-brand-gold animate-pulse uppercase tracking-[0.5em] text-sm">
      Loading Collection...
    </div>
  );

  // Helper to safely build image URL with null check and consistent fallback
  const safeImageUrl = (imagePath) => {
    if (!imagePath) return FALLBACK_IMAGE;
    try {
      return getImageUrl ? getImageUrl(imagePath) : `${API_BASE_URL.replace('/api','')}/${imagePath}`;
    } catch {
      return FALLBACK_IMAGE;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden text-white pt-24">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* ================= 1. ALL PRODUCTS BANNER ================= */}
      <section className="w-full border-t border-white/5 bg-black py-12 lg:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-wide mb-8">Our Collection</h2>
        </div>
        <div className="max-w-[1400px] mx-auto flex justify-center">
          <img 
            src="/images/allproducts.png" 
            alt="All Products Collection" 
            className="w-full h-auto object-contain" 
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        </div>
      </section>

      {/* ================= 2. FEATURED PRODUCTS ================= */}
      <section className="relative flex flex-col justify-center py-12 lg:py-16 overflow-hidden border-t border-white/5">
        <div className="text-center px-6 mb-8 lg:mb-12">
          <span className="text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase">Signature</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 text-white uppercase tracking-wide">Featured Collection</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6"></div>
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
                  className="group relative flex-shrink-0 snap-center w-[85vw] md:w-[45vw] lg:w-[28vw] h-[55vh] lg:h-[60vh] bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-[2rem] p-6 lg:p-8 flex flex-col items-center justify-between cursor-pointer transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  <div className="relative w-full h-[60%] lg:h-[65%] flex justify-center items-end mt-2 lg:mt-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 bg-brand-gold/0 blur-[60px] rounded-full group-hover:bg-brand-gold/20 transition-all duration-700"></div>
                    <img 
                      src={safeImageUrl(p.image)} 
                      alt={p.name} 
                      className="h-full object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-700"
                      onError={(e) => { 
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE; 
                      }}
                    />
                  </div>

                  <div className="text-center relative z-10 w-full mt-4">
                    <span className="text-gray-400 text-[10px] font-light tracking-[0.2em] uppercase block mb-2">{p.category}</span>
                    <h3 className="text-xl md:text-3xl font-serif text-white group-hover:text-brand-gold transition-colors duration-300 mb-4 truncate w-full px-2">{p.name}</h3>
                    <button className="px-6 py-3 w-full border border-white/20 text-white/70 text-[10px] font-medium uppercase tracking-[0.2em] group-hover:border-brand-gold group-hover:text-brand-gold transition-all duration-300 rounded-full">
                      View Details
                    </button>
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
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 tracking-widest uppercase font-light w-full">Inventory updating...</p>
        )}
      </section>

      {/* ================= 3. ALL PRODUCTS LIST ================= */}
      <section className="py-12 lg:py-20 px-6 overflow-hidden border-t border-white/5">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase">The Cellars</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mt-4 text-white uppercase tracking-wide">Complete Collection</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6"></div>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mt-6 font-light">
            Discover our full range of premium spirits, each crafted with Himalayan precision
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-10 lg:space-y-32">
          {products.map((p, index) => {
            const isEven = index % 2 === 0;
            const imgPath = safeImageUrl(p.image);
            
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
                    onError={(e) => { 
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE; 
                    }}
                  />
                </div>

                {/* TEXT SIDE – fixed invalid HTML nesting */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-4 lg:space-y-6 text-center md:text-left relative z-20 -mt-20 md:mt-0">
                  <div className="text-brand-gold text-[20px] md:text-2xl font-black tracking-[0.5em] uppercase block">
                    <p className="text-white font-serif italic text-2xl">
                      {p.flavor_notes || "Vanilla, Oak, Smooth Finish"}
                    </p>
                  </div>
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
      </section>

      {/* ================= 4. DYNAMIC BRANDING SHOWCASE ================= */}
      <section className="relative border-t border-white/5 bg-[#050505]">
        {showcaseStages.map((stage) => (
          <ShowcaseStage key={stage.id} stage={stage} navigate={navigate} />
        ))}
      </section>

    </div>
  );
}

// ================= THE SHOWCASE STAGE COMPONENT =================
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
              
              {/* Image Section with lazy loading and fallback */}
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
                
                <div className="w-12 sm:w-16 h-[1px] bg-brand-gold mx-auto lg:mx-0"></div>
                
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