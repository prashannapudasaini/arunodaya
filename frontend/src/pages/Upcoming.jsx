import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import API_BASE_URL from '../config';
import ProductCard from '../components/products/ProductCard'; 

export default function Upcoming() {
  const [upcomingProducts, setUpcomingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products.php?type=upcoming`)
      .then(res => {
        const productArray = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setUpcomingProducts(productArray);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching upcoming products:", err);
        setLoading(false);
      });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center text-gray-900 dark:text-brand-gold animate-pulse tracking-[0.5em] uppercase text-sm font-bold transition-colors duration-500">
        Unlocking Cellars...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 dark:text-white italic tracking-[0.1em] mb-6">
            Upcoming <span className="text-brand-gold not-italic font-bold">Series</span>
          </h1>
          <div className="w-24 h-[2px] bg-brand-gold mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 font-medium dark:font-light max-w-2xl mx-auto leading-relaxed">
            A glimpse into the future of Arunodaya. These experimental blends are currently resting in our reserves.
          </p>
        </div>

        {upcomingProducts.length === 0 ? (
          <div className="text-center py-12 border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-3xl">
            <p className="text-gray-900 dark:text-gray-400 tracking-widest uppercase text-xs font-black">
              The innovation lab is currently resting.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {upcomingProducts.map((p) => (
              <div key={p.id} id={`product-${p.id}`} className="scroll-mt-32">
                <ProductCard product={p} isUpcoming={true} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= THE INNOVATION RESERVE PHILOSOPHY ================= */}
      <section className="py-12 md:py-16 px-6 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-transparent transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center">
          
          <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Our Philosophy</span>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-6">The Innovation Reserve</h2>
          
          <div className="w-16 h-[2px] bg-brand-gold mx-auto mb-8"></div>
          
          <div className="space-y-4 text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium dark:font-light leading-relaxed">
            <p>
              At Arunodaya Distillery, we believe that true mastery requires both a profound respect for tradition and the courage to push beyond it.
            </p>
            <p>
              Our <strong>Innovation Reserve</strong> is the beating heart of our creative process—a dedicated space where our master blenders and distillers experiment with rare grains, unconventional cask finishes, and unique botanical infusions.
            </p>
            <p>
              The spirits showcased here are currently resting in our cellars, slowly developing their character. They represent limited-edition releases, experimental batches, and the future signature profiles of ADL.
            </p>
            <p className="text-xl md:text-2xl font-serif italic text-gray-900 dark:text-brand-gold mt-6">
              Check back often—because perfection takes time, but innovation never rests.
            </p>
          </div>
          
        </div>
      </section>

      {/* ================= PROPOSED SPIRIT PLANT ================= */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#050505] transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Image Side */}
            <div className="relative group w-full h-[300px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-lg dark:shadow-none border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-gold/10 dark:bg-brand-gold/5 blur-[60px] rounded-full group-hover:bg-brand-gold/20 transition-all duration-700"></div>
              
              {/* IMAGE UPDATED TO /images/spirit.png */}
              <img 
                src="/images/spirit.png" 
                alt="Proposed Spirit Plant" 
                className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => { 
                  e.currentTarget.style.display = 'none'; 
                  e.currentTarget.parentElement.innerHTML += '<span class="text-gray-400 dark:text-gray-500 font-serif italic text-xl z-10 relative px-6 text-center">Spirit Plant Facility Image<br/><span class="text-xs font-sans not-italic uppercase tracking-widest mt-2 block">(Upload /images/spirit.png)</span></span>';
                }}
              />
            </div>

            {/* Content Side */}
            <div>
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Infrastructure & Expansion</span>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-2">Proposed Spirit Plant</h2>
              <p className="text-brand-gold font-serif italic text-xl md:text-2xl mb-6">High-Proof Spirit for Aging</p>
              <div className="w-12 h-[2px] bg-brand-gold mb-8"></div>
              
              <p className="text-gray-700 dark:text-gray-300 font-medium dark:font-light leading-relaxed mb-10">
                To support our Innovation Reserve and future scale, our proposed state-of-the-art spirit plant is engineered to maximize output efficiency while maintaining absolute precision over the distillation profile.
              </p>

              <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-brand-gold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Key Advantages</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {[
                    "High Production Efficiency (Lower Cost per Liter)",
                    "Reduced Labor & Operational Cost",
                    "Energy Efficiency",
                    "Higher Alcohol Yield",
                    "Scalability (Economies of Scale)",
                    "Consistent Quality",
                    "Better Control Over Composition"
                  ].map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-brand-gold font-black mt-0.5 text-lg leading-none">▹</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium dark:font-light">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* ================= INNOVATION PROCESS ================= */}
      <section className="py-12 md:py-16 px-6 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-transparent transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase block mb-4">The Crafting Process</span>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white uppercase tracking-wide">How It's Made</h2>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-6"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 font-medium dark:font-light">
              Every drop in our Innovation Reserve undergoes a meticulous, time-honored malt whisky-making journey before it reaches your glass.
            </p>
          </div>

          {/* 5-Column Grid for Desktop, wrapping on smaller screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            
            {[
              { 
                id: "01", 
                title: "Malting", 
                desc: "Raw barley is steeped in water and allowed to germinate. It is then gently dried in a kiln, preparing the natural starches for extraction." 
              },
              { 
                id: "02", 
                title: "Mashing", 
                desc: "The dried malt is milled into grist and mixed with hot water in a mash tun, extracting the fermentable sugars to create a sweet liquid called wort." 
              },
              { 
                id: "03", 
                title: "Fermentation", 
                desc: "Yeast is added to the cooled wort in wooden washbacks. Over several days, it converts the sugars into alcohol, creating a beer-like wash." 
              },
              { 
                id: "04", 
                title: "Distillation", 
                desc: "The wash is carefully heated in traditional copper pot stills. The alcohol evaporates and condenses, purifying and concentrating the spirit." 
              },
              { 
                id: "05", 
                title: "Maturation", 
                desc: "The clear spirit is laid to rest in oak casks. Over years in our cellars, it slowly draws out rich colors, complex flavors, and smooth character." 
              }
            ].map((step) => (
              <div 
                key={step.id} 
                className="relative bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:border-brand-gold dark:hover:border-white/30 transition-all duration-500 shadow-sm hover:shadow-md dark:shadow-none group overflow-hidden"
              >
                {/* Large Background Number */}
                <span className="absolute -top-4 -right-2 text-6xl font-serif italic text-gray-100 dark:text-white/5 group-hover:text-brand-gold/10 transition-colors duration-500 z-0">
                  {step.id}
                </span>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-serif text-gray-900 dark:text-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium dark:font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}