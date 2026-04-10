import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL, getImageUrl } from '../config';
import { MapPin, Mail, Phone, ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; 
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Hero Images
import hero1 from '../assets/images/hero_1.jpg';
import hero2 from '../assets/images/hero_2.png';
import hero3 from '../assets/images/hero_3.png';

export default function Home() {
  const navigate = useNavigate(); 
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // API States
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); 
  const [upcomingProducts, setUpcomingProducts] = useState([]);

  const slides = [
    { img: hero1, title: "PURITY DISTILLED", subtitle: "Nepal's Finest Spirits" },
    { img: hero2, title: "CRAFTED EXCELLENCE", subtitle: "Artisanal Small Batches" },
    { img: hero3, title: "HIMALAYAN LEGACY", subtitle: "Aged to Perfection" }
  ];

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
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // 1. FETCH FEATURED PRODUCTS
    axios.get(`${API_BASE_URL}/admin/products.php?featured=1`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setFeaturedProducts(data.slice(0, 8)); 
      })
      .catch(err => console.error("Error fetching featured:", err));

    // 2. FETCH ALL PRODUCTS 
    axios.get(`${API_BASE_URL}/products.php`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setAllProducts(data);
      })
      .catch(err => console.error("Error fetching all products:", err));

    // 3. FETCH UPCOMING PRODUCTS
    axios.get(`${API_BASE_URL}/admin/products.php?type=upcoming`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setUpcomingProducts(data.slice(0, 4)); 
      })
      .catch(err => console.error("Error fetching upcoming:", err));

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <main className="bg-[#050505] text-white min-h-screen">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ================= 1. HERO SECTION ================= */}
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

        <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
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
                <Link to="/about" className="px-8 lg:px-10 py-3 lg:py-4 border border-white/20 hover:border-brand-gold transition-colors tracking-widest text-[10px] uppercase text-white">
                  Our Story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= 2. OUR STORY ================= */}
      <section className="pt-16 lg:pt-24 pb-12 lg:pb-16 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-4">The Legacy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-wide mb-6">Our Story</h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-8"></div>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl font-light leading-relaxed md:leading-loose drop-shadow-md">
            At Arunodaya Distillery, we are committed to crafting exceptional, artisanal spirits that capture the true essence of Nepal. By seamlessly blending traditional, small-batch distillation methods with modern quality standards, we maintain a deep respect for local craftsmanship. From our meticulous grain-to-glass approach to our world-class portfolio of whisky, vodka, rum, and dry gin, every bottle we produce is a testament to our vision of becoming Nepal's most trusted and globally recognized distillery.
          </p>
          <button onClick={() => navigate('/about')} className="mt-10 px-10 py-4 border border-white/20 text-white/80 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-gold hover:border-brand-gold hover:text-black transition-all duration-300 shadow-xl">
            Read Full History
          </button>
        </div>
      </section>
     
      {/* ================= 3. ALL PRODUCTS BANNER ================= */}
      <section className="w-full border-t border-white/5 bg-black py-12 lg:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-wide mb-8">Our Collection</h2>
        </div>
        <div className="max-w-[1400px] mx-auto flex justify-center">
          <img src="/images/allproducts.png" alt="All Products Collection" className="w-full h-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      </section>

      {/* ================= 4. FEATURED PRODUCTS ================= */}
      <section className="relative flex flex-col justify-center py-12 lg:py-16 overflow-hidden lg:min-h-[100svh]">
        <div className="text-center px-6 mb-8 lg:mb-12">
          <span className="text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase">Signature</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 text-white uppercase tracking-wide">Featured Collection</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6"></div>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-20 gap-4 md:gap-10 pb-6 lg:pb-10">
            {featuredProducts.map((p) => (
              <div 
                key={p.id} 
                onClick={() => navigate('/products', { state: { selectedProduct: p } })} 
                className="group relative flex-shrink-0 snap-center w-[85vw] md:w-[45vw] lg:w-[28vw] h-[55vh] lg:h-[60vh] bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-[2rem] p-6 lg:p-8 flex flex-col items-center justify-between cursor-pointer transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative w-full h-[60%] lg:h-[65%] flex justify-center items-end mt-2 lg:mt-4">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 bg-brand-gold/0 blur-[60px] rounded-full group-hover:bg-brand-gold/20 transition-all duration-700"></div>
                  <img 
                    src={getImageUrl(p.image)} 
                    alt={p.name} 
                    className="h-full object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-700"
                    onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  />
                </div>

                <div className="text-center relative z-10 w-full mt-4">
                  <span className="text-gray-400 text-[10px] font-light tracking-[0.2em] uppercase block mb-2">{p.category}</span>
                  <h3 className="text-xl md:text-3xl font-serif text-white group-hover:text-brand-gold transition-colors duration-300 mb-4 truncate w-full px-2">{p.name}</h3>
                  <button className="px-6 py-3 w-full border border-white/20 text-white/70 text-[10px] font-medium uppercase tracking-[0.2em] group-hover:border-brand-gold group-hover:text-brand-gold transition-all duration-300 rounded-full">
                    Discover
                  </button>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[5vw] md:w-[20vw]"></div>
          </div>
        ) : (
          <p className="text-center text-gray-500 tracking-widest uppercase font-light w-full">Inventory updating...</p>
        )}
      </section>

      {/* ================= 5. UPCOMING RELEASES ================= */}
      <section className="bg-[#050505] border-t border-white/5">
        <div className="text-center pt-12 lg:pt-16 pb-8 lg:pb-10 px-6">
          <span className="text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase">The Innovation Lab</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 text-white uppercase tracking-wide">Upcoming Releases</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6"></div>
        </div>

        <div className="flex flex-col">
          {upcomingProducts.length > 0 ? upcomingProducts.map((p, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={p.id} 
                onClick={() => navigate('/upcoming', { state: { selectedProduct: p } })} 
                className={`group cursor-pointer relative h-[100svh] w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} border-t border-white/5 overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px] pointer-events-none"></div>

                <div className="w-full lg:w-1/2 h-[50svh] lg:h-full relative flex justify-center items-center p-6 lg:p-20 bg-white/[0.01]">
                  <div className="absolute inset-0 bg-white/5 blur-[80px] lg:blur-[120px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none"></div>
                  <img 
                    src={getImageUrl(p.image)} 
                    alt={p.name} 
                    className="h-full w-auto object-contain relative z-10 grayscale opacity-50 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  />
                </div>

                <div className="w-full lg:w-1/2 h-[50svh] lg:h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-6 lg:p-24 relative z-10">
                  <span className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-70 border border-white/10 px-4 py-2 rounded-full">{p.category || 'Innovation Reserve'}</span>
                  <h3 className="text-3xl md:text-6xl font-serif text-white/80 group-hover:text-white transition-colors duration-300 leading-tight mb-4 lg:mb-6">"{p.name}"</h3>
                  <p className="text-gray-400 text-xs md:text-lg font-light leading-relaxed max-w-md mb-6 lg:mb-8 line-clamp-3">
                    {p.short_description || "A masterwork in progress, currently maturing in our temperature-controlled reserves."}
                  </p>
                  <button className="px-8 lg:px-10 py-3 lg:py-4 border border-white/20 text-white/70 text-[10px] font-black uppercase tracking-[0.3em] group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-xl">
                    Notify Me
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className="h-[50vh] flex items-center justify-center">
              <p className="text-center text-gray-600 tracking-widest uppercase font-light">No upcoming releases announced yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================= 6. COMPLETE COLLECTION ================= */}
      <section className="py-12 lg:py-16 px-6 overflow-hidden bg-black border-t border-white/5">
        <div className="text-center mb-10 lg:mb-16">
          <span className="text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase">The Cellars</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 text-white uppercase tracking-wide">Complete Collection</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6"></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-10 lg:space-y-32">
          {allProducts.map((p, index) => {
            const isEven = index % 2 === 0;
            const imgPath = getImageUrl(p.image);
            
            return (
              <div 
                key={p.id} 
                id={`product-${p.id}`} 
                className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-0 md:gap-8 lg:gap-24 scroll-mt-32`}
              >
                
                {/* MOBILE ONLY: Tasting Notes */}
                <div className="md:hidden w-full text-center relative z-20 -mb-8">
                  <p className="text-brand-gold text-xs font-black uppercase tracking-widest mb-1">Tasting Notes</p>
                  <p className="text-white font-serif italic text-2xl">{p.flavor_notes || "Vanilla, Oak, Smooth Finish"}</p>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 flex justify-center relative z-10">
                  <div className="absolute inset-0 bg-brand-gold/10 blur-[80px] lg:blur-[120px] rounded-full animate-pulse group-hover:bg-brand-gold/20 transition-all duration-1000"></div>
                  <img 
                    src={imgPath} 
                    loading="lazy" 
                    className="relative z-10 max-h-[380px] lg:max-h-[550px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700 opacity-90 group-hover:-translate-y-6 group-hover:scale-110" 
                    onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  />
                </div>
                
                {/* Text Side */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-3 lg:space-y-6 text-center md:text-left relative z-20 -mt-20 md:mt-0">
                  <span className="text-brand-gold text-[20px] md:text-2xl font-black tracking-[0.5em] uppercase block drop-shadow-lg">{p.category}</span>
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

      {/* ================= 7. DYNAMIC BRANDING SHOWCASE ================= */}
      <section className="relative border-t border-white/5">
        {showcaseStages.map((stage) => (
          <ShowcaseStage key={stage.id} stage={stage} navigate={navigate} />
        ))}
      </section>

      {/* ================= 8. CONTACT & MAP SECTION ================= */}
      <section className="py-12 lg:py-16 max-w-[1400px] mx-auto px-6 lg:px-20 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-8 lg:space-y-10 flex flex-col justify-center">
            <div>
              <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Direct Line</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Get In Touch</h2>
              <div className="w-12 h-[1px] bg-brand-gold mb-6 lg:mb-8"></div>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-start gap-4 lg:gap-6">
                <MapPin className="text-brand-gold mt-1" size={20} />
                <div><h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1 lg:mb-2">Corporate Office</h4><p className="text-base lg:text-lg font-light text-gray-300">Birgunj, Nepal</p></div>
              </div>
              <div className="flex items-start gap-4 lg:gap-6">
                <Mail className="text-brand-gold mt-1" size={20} />
                <div><h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1 lg:mb-2">Email Us</h4><p className="text-base lg:text-lg font-light text-gray-300">arunodayadistallary@gmail.com</p></div>
              </div>
              <div className="flex items-start gap-4 lg:gap-6">
                <Phone className="text-brand-gold mt-1" size={20} />
                <div><h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1 lg:mb-2">Call Us</h4><p className="text-base lg:text-lg font-light text-gray-300">+977 980-1218585</p></div>
              </div>
            </div>
            <div className="liquid-glass overflow-hidden h-[400px] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-3xl">
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
          
          <div className="border border-white/10 bg-white/[0.02] p-8 md:p-14 flex flex-col justify-center h-full rounded-sm">
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-8 lg:mb-10">Send an Inquiry</h3>
            <form className="flex flex-col gap-4 lg:gap-6" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const data = new FormData(form);
              const submitBtn = form.querySelector('button[type="submit"]');
              submitBtn.disabled = true;
              submitBtn.textContent = 'Sending...';
              try {
                const res = await axios.post(`${API_BASE_URL.replace('/api', '')}/contact.php`, data);
                if(res.data && res.data.success) {
                  form.reset();
                  submitBtn.textContent = 'Message Sent!';
                  setTimeout(() => { submitBtn.textContent = 'Send Inquiry'; submitBtn.disabled = false; }, 3000);
                }
              } catch(err) { submitBtn.disabled = false; }
            }}>
              <input type="text" name="name" placeholder="Full Name" required className="w-full bg-black/50 border border-white/10 px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-600 font-light text-sm lg:text-base" />
              <input type="email" name="email" placeholder="Email Address" required className="w-full bg-black/50 border border-white/10 px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-600 font-light text-sm lg:text-base" />
              <textarea name="message" placeholder="Your Message" rows="5" required className="w-full bg-black/50 border border-white/10 px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-600 font-light resize-none text-sm lg:text-base"></textarea>
              <button type="submit" className="border border-brand-gold text-brand-gold font-medium text-xs uppercase tracking-widest py-4 lg:py-5 hover:bg-brand-gold hover:text-black transition-all duration-300 mt-2 lg:mt-4">
                Send Inquiry <ArrowRight size={16} className="inline ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

// ================= SHOWCASE STAGE =================
function ShowcaseStage({ stage, navigate }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [40, 0, 0, -40]);

  return (
    <div ref={ref} className="h-[100svh] relative border-b border-white/5">
      <div className="relative h-full w-full flex items-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale, backgroundImage: `url(${stage.bg})` }} 
          className="absolute inset-0 bg-cover bg-center lg:bg-fixed z-0"
        >
          <div className="absolute inset-0 bg-black/70 lg:bg-black/50 backdrop-blur-[2px] lg:backdrop-blur-[1px]"></div>
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full h-full">
          
          {/* Mobile Stack */}
          <div className="flex flex-col lg:hidden justify-center items-center h-full w-full space-y-6 pt-6">
            <motion.div style={{ opacity, y: imageY }} className="h-[40vh] w-full flex justify-center">
              <img src={stage.product} alt={stage.title} className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" />
            </motion.div>
            <motion.div style={{ opacity }} className="text-center space-y-4 px-2 w-full">
              <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block">{stage.subtitle}</span>
              <h2 className="text-4xl sm:text-5xl font-serif text-white uppercase leading-tight">
                {stage.title.split(' ')[0]} <br/> <span className="italic text-brand-gold">{stage.title.split(' ')[1]}</span>
              </h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
              <p className="text-gray-200 text-sm font-light leading-relaxed drop-shadow-md">{stage.desc}</p>
              <button onClick={() => navigate('/about')} className="bg-brand-gold text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] mt-2 hover:bg-white transition-all shadow-xl">Learn More</button>
            </motion.div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 items-center h-full gap-12">
            <div className="flex justify-center w-full">
              {stage.side === 'left' && <motion.img style={{ y: imageY, opacity }} src={stage.product} className="max-h-[600px] w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)]" />}
            </div>
            <motion.div style={{ opacity }} className="text-center space-y-8">
              <div className="space-y-4">
                <span className="text-brand-gold text-[10px] font-black tracking-[0.5em] uppercase block">{stage.subtitle}</span>
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-serif text-white uppercase leading-tight">
                  {stage.title.split(' ')[0]} <br/> <span className="italic text-brand-gold">{stage.title.split(' ')[1]}</span>
                </h2>
              </div>
              <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
              <p className="text-gray-100 text-lg xl:text-xl font-light leading-relaxed max-w-md mx-auto drop-shadow-lg">{stage.desc}</p>
              <button onClick={() => navigate('/about')} className="bg-brand-gold text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl">Learn More</button>
            </motion.div>
            <div className="flex justify-center w-full">
              {stage.side === 'right' && <motion.img style={{ y: imageY, opacity }} src={stage.product} className="max-h-[600px] w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)]" />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}