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
    const timer = setInterval(() => {
      setCurrent(s => (s + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-black">

      {/* Background Images */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.img}
          alt={slide.title}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ${
            index === current ? 'opacity-60 scale-100' : 'opacity-0 scale-105'
          }`}
          onError={(e) => (e.target.style.display = 'none')}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">

        <p className="text-brand-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-4 transition-all duration-500">
          {slides[current].sub}
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-10 leading-tight transition-all duration-700">
          {slides[current].title}
        </h1>

        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">

          <Link
            to="/products"
            className="group relative px-10 py-4 bg-brand-gold text-black font-bold tracking-widest overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 text-[11px] uppercase">
              Explore Collection <ChevronRight size={16} />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            to="/about"
            className="px-10 py-4 border border-white/30 hover:border-brand-gold transition-colors tracking-widest text-[11px] uppercase text-white"
          >
            Our Story
          </Link>

        </div>
      </div>

      {/* Side Label */}
      <div className="absolute left-6 bottom-10 hidden lg:block z-20">
        <p className="text-white/20 text-[10px] tracking-[0.5em] [writing-mode:vertical-lr] uppercase">
          Since 1994 • Arunodaya
        </p>
      </div>
    </section>
  );
};

export default Hero;