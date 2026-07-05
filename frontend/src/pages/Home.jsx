import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL, getImageUrl } from '../config';
import { MapPin, Mail, Phone, ArrowRight, Calendar, ChevronRight, Facebook, Instagram, Youtube, Leaf, Flower2, Trees, Droplets, Wind, Sparkles, Briefcase, FileText, Award, TrendingUp } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; 
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Hero Images
import hero1 from '../assets/images/hero_1.jpg';
import hero2 from '../assets/images/hero_2.png';
import hero3 from '../assets/images/hero_3.png';

// Explore Section Liquor Images
const exploreLiquors = [
  {
    id: 1,
    name: "Premium Whisky",
    description: "Crafted through advanced blended distillation, delivering a smooth, full-bodied character with refined depth and lasting finish.",
    image: "/images/back1.png",
  },
  {
    id: 2,
    name: "Botanical Mist Gin",
    description: "An aromatic blend of juniper, fresh herbs, and floral notes. Light, crisp, and refreshing with a sophisticated herbal complexity.",
    image: "/images/cocktail.png",
  },
  {
    id: 3,
    name: "Classic Reserve Rum",
    description: "A rich and balanced spirit with subtle sweetness, developed for bold flavor and a warm, smooth drinking experience.",
    image: "/images/back4.png"
  },
  {
    id: 4,
    name: "Velvet Spice Rum",
    description: "Rich and warming with notes of caramel, vanilla, and exotic spices. Smooth on entry, with a lingering warmth that defines a premium sipping experience.",
    image: "/images/cocktail1.png"
  },
  {
    id: 5,
    name: "Midnight Premium Blend",
    description: "Dark, intense, and smooth with hints of cocoa and dried fruits. A luxurious finish designed for late-night indulgence.",
    image: "/images/cocktail2.png"
  },
  {
    id: 6,
    name: "Tropical Fusion RTD",
    description: "A lively mix of tropical fruits with a subtle sparkle, delivering a refreshing, ready-to-enjoy experience tailored for modern lifestyles.",
    image: "/images/back3.png"
  },
];

export default function Home() {
  const navigate = useNavigate(); 
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { img: hero1, title: "PURITY DISTILLED", subtitle: "Nepal's Finest Spirits" },
    { img: hero2, title: "CRAFTED EXCELLENCE", subtitle: "Artisanal Small Batches" },
    { img: hero3, title: "HIMALAYAN LEGACY", subtitle: "Aged to Perfection" }
  ];

  const botanicalElements = [
    { icon: Leaf, name: "Juniper", description: "Wild-harvested from Himalayan slopes", color: "emerald" },
    { icon: Flower2, name: "Himalayan Rhododendron", description: "Adds subtle floral notes", color: "rose" },
    { icon: Trees, name: "Oak", description: "Aged in premium oak casks", color: "amber" },
    { icon: Droplets, name: "Spring Water", description: "Pure mountain spring source", color: "blue" },
    { icon: Wind, name: "Mountain Air", description: "Cool climate maturation", color: "indigo" },
    { icon: Sparkles, name: "Botanical Blend", description: "Secret family recipe", color: "gold" },
  ];

  const plantAccents = [
    { name: "Sacred Fig", image: "/images/plant1.png", alt: "Ficus religiosa", description: "A symbol of wisdom and longevity" },
    { name: "Rhododendron", image: "/images/plant2.png", alt: "Rhododendron arboreum", description: "Nepal's national flower" },
    { name: "Juniper", image: "/images/plant3.png", alt: "Juniperus indica", description: "The soul of premium gin" },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <main className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white min-h-screen transition-colors duration-500">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .leaf-pattern {
          background-image: radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .dark .leaf-pattern {
          background-image: radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
        }
      `}</style>

      {/* ================= 1. HERO SECTION (Always Dark Overlay for Images) ================= */}
      <section className="relative h-[100svh] w-full bg-black flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <motion.img 
            key={index} 
            src={slide.img} 
            alt={`Slide ${index + 1}`} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 0.5 : 0,
              scale: index === currentSlide ? 1 : 1.1,
              zIndex: index === currentSlide ? 1 : 0
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover" 
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1]"></div>

        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-brand-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-6 animate-pulse">
                {slides[currentSlide].subtitle}
              </p>
              <h1 className="text-5xl md:text-8xl font-serif uppercase tracking-widest text-white drop-shadow-2xl mb-8 lg:mb-12">
                {slides[currentSlide].title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center">
                <Link to="/products" className="group relative px-8 lg:px-10 py-3 lg:py-4 bg-brand-gold text-black font-bold tracking-widest text-[10px] uppercase overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">Explore Collection <ChevronRight size={16} /></span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link to="/about" className="px-8 lg:px-10 py-3 lg:py-4 border border-white/20 hover:border-brand-gold hover:bg-brand-gold hover:text-black transition-colors tracking-widest text-[10px] uppercase text-white">
                  Our Story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= 2. OUR STORY ================= */}
      <section className="pt-20 lg:pt-28 pb-16 lg:pb-20 px-4 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/5 relative overflow-hidden leaf-pattern transition-colors duration-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-brand-gold/10 dark:bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="absolute left-0 bottom-0 opacity-10 dark:opacity-20 pointer-events-none">
          <Leaf size={120} className="text-emerald-500/50 dark:text-emerald-500/30" />
        </div>
        <div className="absolute right-0 top-20 opacity-10 dark:opacity-20 pointer-events-none">
          <Flower2 size={100} className="text-rose-500/50 dark:text-rose-500/30" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-4">The Legacy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-6">Our Story</h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg lg:text-xl font-light leading-relaxed md:leading-loose drop-shadow-sm dark:drop-shadow-md">
            At Arunodaya Distillery, we are committed to crafting exceptional, artisanal spirits that capture the true essence of Nepal. By seamlessly blending traditional, small-batch distillation methods with modern quality standards, we maintain a deep respect for local craftsmanship. From our meticulous grain-to-glass approach to our world-class portfolio of whisky, vodka, rum, and dry gin, every bottle we produce is a testament to our vision of becoming Nepal's most trusted and globally recognized distillery. Arunodaya distillery limited (ADL) is a manufacturing company focused on producing world-class whisky, vodka, rum, dry gin.
          </p>
          <button onClick={() => navigate('/about')} className="mt-10 px-10 py-4 border border-gray-900 dark:border-white/20 text-gray-900 dark:text-white/80 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-gold hover:border-brand-gold hover:text-black transition-all duration-300 shadow-xl dark:shadow-none">
            Read Full History
          </button>
        </div>
      </section>

      {/* ================= 3. PURE & NATURAL - CRAFTED BY NATURE SECTION 1 ================= */}
      <section className="py-20 lg:py-28 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#050505] border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Pure & Natural</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-6">Crafted by Nature</h2>
              <div className="w-16 h-[1px] bg-brand-gold mb-6"></div>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-6">
                Our spirits are born from the purest Himalayan ingredients—crisp mountain water, hand-picked botanicals, 
                and grains grown in fertile valleys. Every step respects the natural environment, ensuring that what ends 
                in your glass is as authentic as the land it comes from.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 dark:border-none">
                    <Leaf size={18} className="text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium dark:font-normal">100% Natural</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 dark:border-none">
                    <Droplets size={18} className="text-blue-500 dark:text-blue-400" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Pure Spring Water</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 dark:border-none">
                    <Sparkles size={18} className="text-amber-500 dark:text-amber-400" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Small Batch</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl">
                <img 
                  src="https://images.stockcake.com/public/b/9/7/b97ff291-699d-44d9-a63a-3fc9b442e2a6_large/hand-nurturing-nature-stockcake.jpg"  
                  alt="Hand nurturing nature"
                  className="w-full h-auto object-cover min-h-[400px]"
                  onError={(e) => { e.target.src = "https://placehold.co/800x600/1a1a1a/ffffff?text=Nature+Image"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-gold/20 dark:bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 4. PURE & NATURAL - CRAFTED BY NATURE SECTION 2 ================= */}
      <section className="py-20 lg:py-28 px-4 bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="order-2 lg:order-2"
            >
              <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-4">100% Trusted</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-6">Want to Join?</h2>
              <div className="w-16 h-[1px] bg-brand-gold mb-6"></div>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-6">
                Check our job openings to apply for a position at Arunodaya Distillery and apply for respective job.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 dark:border-none">
                    <Trees size={18} className="text-amber-500 dark:text-amber-400" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Satisfies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 dark:border-none">
                    <Wind size={18} className="text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 dark:border-none">
                    <Flower2 size={18} className="text-rose-500 dark:text-rose-400" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Botanical Infused</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="order-1 lg:order-1 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl">
                <img 
                  src="https://www.shutterstock.com/image-photo/group-alcohol-beer-glass-hand-600nw-1192999060.jpg"  
                  alt="Group of alcohol glasses"
                  className="w-full h-auto object-cover min-h-[400px]"
                  onError={(e) => { e.target.src = "https://placehold.co/800x600/1a1a1a/ffffff?text=Join+Us"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-gold/20 dark:bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 5. AGM REPORT & JOB OPENINGS SECTION ================= */}
      <section className="py-20 lg:py-28 px-4 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            
            {/* AGM Report Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => navigate('/about')}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-br dark:from-white/[0.03] dark:to-white/[0.01] border border-gray-200 dark:border-white/10 hover:border-brand-gold/50 dark:hover:border-brand-gold/30 transition-all duration-500 cursor-pointer shadow-lg dark:shadow-none"
            >
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-gold/20 dark:bg-brand-gold/10 rounded-full blur-3xl group-hover:bg-brand-gold/30 dark:group-hover:bg-brand-gold/20 transition-all duration-700"></div>
              <div className="p-8 md:p-10 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 dark:border-none">
                    <FileText size={28} className="text-brand-gold" />
                  </div>
                  <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase">Annual Report</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white mb-4">AGM Report 2025</h3>
                <div className="w-16 h-[1px] bg-brand-gold mb-6"></div>
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                  Review our latest Annual General Meeting report highlighting record-breaking growth, 
                  new product launches, and our expansion into international markets.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 font-medium dark:font-normal">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-emerald-500 dark:text-emerald-400" />
                    <span>+47% Growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-brand-gold" />
                    <span>Industry Award</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="px-6 py-3 bg-transparent border border-brand-gold text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-white dark:hover:text-black transition-all duration-300 rounded-full flex items-center gap-2">
                    Fully Trusted
                  </button>
                  <span className="text-gray-500 text-xs group-hover:text-brand-gold transition-colors font-bold dark:font-normal">Click to learn more →</span>
                </div>
              </div>
            </motion.div>

            {/* Job Openings Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onClick={() => navigate('/contact')}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-br dark:from-white/[0.03] dark:to-white/[0.01] border border-gray-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-400/30 transition-all duration-500 cursor-pointer shadow-lg dark:shadow-none"
            >
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/30 dark:group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              <div className="p-8 md:p-10 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 dark:border-none">
                    <Briefcase size={28} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase">Careers</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white mb-4">Join Our Team</h3>
                <div className="w-16 h-[1px] bg-emerald-500 dark:bg-emerald-400 mb-6"></div>
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                  Want to join Himalayan Distillery? Check our job openings to apply for a position 
                  at Arunodaya Distillery and be part of Nepal's fastest-growing spirits company.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-none rounded-full text-xs text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Production Manager</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-none rounded-full text-xs text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Quality Control</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-none rounded-full text-xs text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Brand Ambassador</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-none rounded-full text-xs text-gray-700 dark:text-gray-300 font-medium dark:font-normal">Sales Executive</span>
                </div>
                <div className="flex items-center justify-between">
                  <button className="px-6 py-3 bg-transparent border border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-black transition-all duration-300 rounded-full flex items-center gap-2">
                    100% Satisfied
                  </button>
                  <span className="text-gray-500 text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-bold dark:font-normal">Click to contact us →</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 p-6 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-brand-gold/10 dark:via-transparent dark:to-emerald-500/10 border border-gray-200 dark:border-white/5 text-center shadow-md dark:shadow-none"
          >
            <p className="text-gray-700 dark:text-gray-400 text-sm uppercase tracking-wider font-medium dark:font-normal">
              <span className="text-brand-gold font-bold">Today's high:</span> To break record —  Distillery sets new industry benchmark
            </p>
          </motion.div>
        </div>
      </section>

     {/* ================= 7. BOTANICAL INSPIRATION ================= */}
      <section className="py-20 lg:py-28 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#050505] border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Nature's Essence</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-4">Botanical Inspiration</h2>
            <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-base md:text-lg font-medium dark:font-normal">
              Every sip tells a story of the Himalayan terroir—where pristine botanicals meet masterful craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {botanicalElements.map((item, idx) => {
              const Icon = item.icon;
              // Different background images for each botanical element
              const bgImages = {
                Juniper: " https://tse4.mm.bing.net/th/id/OIP.dji2VGU6wOQ5S3ulRTLY5AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
                "Himalayan Rhododendron": "https://tse3.mm.bing.net/th/id/OIP.vvkQW4lHFVPioA5sLjf91AHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
                Oak: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&h=400&fit=crop",
                "Spring Water": "https://tse2.mm.bing.net/th/id/OIP.S5PzK7IPP-fCc-Z5nu4vOAHaFE?rs=1&pid=ImgDetMain&o=7&rm=3",
                "Mountain Air": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
                "Botanical Blend": "https://tse2.mm.bing.net/th/id/OIP.g08GUY1r8MCVAt9zVwnLpQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
              };
              const bgImage = bgImages[item.name] || bgImages.Juniper;
              
              const colorMap = {
                emerald: "from-emerald-500/20 to-emerald-900/20 border-emerald-500/30",
                rose: "from-rose-500/20 to-rose-900/20 border-rose-500/30",
                amber: "from-amber-500/20 to-amber-900/20 border-amber-500/30",
                blue: "from-blue-500/20 to-blue-900/20 border-blue-500/30",
                indigo: "from-indigo-500/20 to-indigo-900/20 border-indigo-500/30",
                gold: "from-brand-gold/20 to-brand-gold/5 border-brand-gold/30",
              };
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`group text-center p-6 rounded-2xl bg-gradient-to-b ${colorMap[item.color]} border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden min-h-[220px] flex flex-col items-center justify-center`}
                  style={{
                    /* TEXT REMAINS WHITE HERE ALWAYS because of the dark image overlay */
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <Icon size={40} className={`text-${item.color === 'gold' ? 'brand-gold' : item.color}-400 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`} />
                    </div>
                    <h3 className="font-serif text-lg md:text-xl text-white mb-2 drop-shadow-md">{item.name}</h3>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed drop-shadow-md">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 8. CONTACT & MAP SECTION ================= */}
      <section className="py-12 lg:py-16 max-w-[1400px] mx-auto px-6 lg:px-20 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-8 lg:space-y-10 flex flex-col justify-center">
            <div>
              <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Direct Line</span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">Get In Touch</h2>
              <div className="w-16 h-[1px] bg-brand-gold mb-6 lg:mb-8"></div>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-start gap-4 lg:gap-6">
                <MapPin className="text-brand-gold mt-1" size={20} />
                <div><h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1 lg:mb-2">Corporate Office</h4><p className="text-base lg:text-lg font-medium dark:font-light text-gray-700 dark:text-gray-300">Birgunj, Nepal</p></div>
              </div>
              <div className="flex items-start gap-4 lg:gap-6">
                <Mail className="text-brand-gold mt-1" size={20} />
                <div><h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1 lg:mb-2">Email Us</h4><p className="text-base lg:text-lg font-medium dark:font-light text-gray-700 dark:text-gray-300">arunodayadistallary@gmail.com</p></div>
              </div>
              <div className="flex items-start gap-4 lg:gap-6">
                <Phone className="text-brand-gold mt-1" size={20} />
                <div><h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1 lg:mb-2">Call Us</h4><p className="text-base lg:text-lg font-medium dark:font-light text-gray-700 dark:text-gray-300">051-592384</p></div>
              </div>
            </div>
            <div className="liquid-glass overflow-hidden h-[400px] border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-3xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2172.9675294794256!2d84.8060845092122!3d27.058449611905488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993570026312449%3A0x8e6e98cc027979bf!2zQXJ1bm9kYXlhIERpc3RpbGxhcnkg4KSF4KSw4KWB4KSj4KWL4KSm4KSvIOCkoeCkv-CkuOCljeCkn-Ckv-CksOClgA!5e0!3m2!1sen!2snp!4v1775110099069!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arunodaya Distillery Location"
              />
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] p-6 md:p-10 flex flex-col h-full rounded-3xl shadow-lg dark:shadow-none">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white mb-6">
              Send an Inquiry
            </h3>

            <form
              className="flex flex-col flex-1 gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const data = new FormData(form);
                const submitBtn = form.querySelector('button[type="submit"]');

                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                try {
                  const res = await axios.post(
                    `${API_BASE_URL.replace('/api', '')}/contact.php`,
                    data
                  );

                  if (res.data && res.data.success) {
                    form.reset();
                    submitBtn.textContent = 'Message Sent!';
                    setTimeout(() => {
                      submitBtn.textContent = 'Send Inquiry';
                      submitBtn.disabled = false;
                    }, 3000);
                  }
                } catch (err) {
                  submitBtn.disabled = false;
                }
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-400 dark:placeholder-gray-600 text-sm shadow-sm dark:shadow-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-400 dark:placeholder-gray-600 text-sm shadow-sm dark:shadow-none"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full flex-1 min-h-[140px] bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-400 dark:placeholder-gray-600 resize-none text-sm shadow-sm dark:shadow-none"
              />

              <button
                type="submit"
                className="border border-brand-gold text-brand-gold font-bold dark:font-medium text-xs uppercase tracking-widest py-3 hover:bg-brand-gold hover:text-white dark:hover:text-black transition-all duration-300"
              >
                Send Inquiry <ArrowRight size={16} className="inline ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= 9. EXPLORE SECTION ================= */}
      <section className="py-20 lg:py-28 px-4 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-4">Explore</h2>
            <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {exploreLiquors.map((liquor) => (
              <div 
                key={liquor.id} 
                onClick={() => navigate('/products')}
                className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="overflow-hidden rounded-lg mb-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none">
                  <img 
                    src={liquor.image} 
                    alt={liquor.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://placehold.co/400x400/1a1a1a/ffffff?text=" + liquor.name; }}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-gray-900 dark:text-white text-center mb-2 group-hover:text-brand-gold transition-colors">
                  {liquor.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base text-center leading-relaxed font-medium dark:font-normal">
                  {liquor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 10. LET'S GET SOCIAL & FOOTER ================= */}
      <section className="py-8 lg:py-10 px-4 bg-white dark:bg-black border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 dark:text-white uppercase tracking-wide mb-4">Let's Get Social</h2>
            
            <div className="flex justify-center gap-8 mb-4">
              <a 
                href="https://www.facebook.com/p/Arunodaya-Distillery-61574033192591/" 
                className="text-gray-700 dark:text-gray-300 hover:text-brand-gold transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={32} className="drop-shadow-md" />
              </a>
              <a 
                href="https://www.facebook.com/p/Arunodaya-Distillery-61574033192591/" 
                className="text-gray-700 dark:text-gray-300 hover:text-brand-gold transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={32} className="drop-shadow-md" />
              </a>
              <a 
                href="https://www.facebook.com/p/Arunodaya-Distillery-61574033192591/" 
                className="text-gray-700 dark:text-gray-300 hover:text-brand-gold transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={32} className="drop-shadow-md" />
              </a>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}