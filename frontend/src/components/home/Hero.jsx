import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const slides = [
    { title: "Pure Heritage", sub: "THE SPIRIT OF THE HIMALAYAS", img: '/images/hero_1.jpg' },
    { title: "Master Distilled", sub: "AGED TO PERFECTION", img: '/images/hero_2.jpg' },
    { title: "Modern Luxury", sub: "CRAFTED FOR CONNOISSEURS", img: '/images/hero_3.png' }
  ];
  
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Changed to h-[100svh] to ensure it fits mobile screens perfectly without UI cut-offs
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Animated Background Images */}
      {slides.map((slide, index) => (
        <img 
          key={index} 
          src={slide.img} 
          alt={slide.title} 
          className={`absolute inset-0 w-full h-full transition-all duration-1000 object-cover object-center ${
            index === current ? 'opacity-60 scale-100' : 'opacity-0 scale-105'
          }`} 
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
      ))}

      {/* Background Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505] z-10" />
      
      {/* Animated Text Content */}
      <div className="z-20 text-center px-6">
        <div className="overflow-hidden mb-2">
          <p className="text-brand-gold text-sm md:text-base tracking-[0.4em] uppercase animate-slideUp">
            {slides[current].sub}
          </p>
        </div>
        <h1 className="text-6xl md:text-9xl font-serif mb-10 transition-all duration-1000 transform hover:scale-105">
          {slides[current].title}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/products" className="group relative px-10 py-4 bg-brand-gold text-black font-bold tracking-widest overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              EXPLORE COLLECTION <ChevronRight size={18} />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          
          <Link to="/about" className="px-10 py-4 border border-white/20 hover:border-brand-gold transition-colors tracking-widest text-sm text-white">
            OUR STORY
          </Link>
        </div>
      </div>

      {/* Decorative side element */}
      <div className="absolute left-10 bottom-10 hidden lg:block z-20">
        <p className="text-white/20 text-xs tracking-[0.5em] [writing-mode:vertical-lr] uppercase">
          Since 1994 • Arunodaya
        </p>
      </div>
    </section>
  );
};

export default Hero;