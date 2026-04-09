import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, getImageUrl } from '../config';
import { MapPin, Mail, Phone, ArrowRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

// Explicitly importing the hero images
import hero1 from '../assets/images/hero_1.jpg';
import hero2 from '../assets/images/hero_2.jpg';
import hero3 from '../assets/images/hero_3.png';

export default function Home() {
  const navigate = useNavigate(); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [upcomingProducts, setUpcomingProducts] = useState([]);

  const slides = [
    { img: hero1, title: "PURITY DISTILLED", subtitle: "Nepal's Finest Spirits" },
    { img: hero2, title: "CRAFTED EXCELLENCE", subtitle: "Artisanal Small Batches" },
    { img: hero3, title: "HIMALAYAN LEGACY", subtitle: "Aged to Perfection" }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // FETCH FEATURED PRODUCTS 
    axios.get(`${API_BASE_URL}/admin/products.php?featured=1`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        // Updated to fetch 4 or 8 items to match the balanced grid look of the reference image
        setFeaturedProducts(data.slice(0, 8)); 
      })
      .catch(err => console.error("Error fetching featured:", err));

    // FETCH UPCOMING PRODUCTS 
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
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <img 
            key={index} 
            src={slide.img} 
            alt={`Arunodaya Distillery Slide ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-50' : 'opacity-0'}`} 
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        ))}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-widest text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            {slides[currentSlide].title}
          </h1>
          <p className="text-brand-gold text-xl md:text-2xl mt-6 font-light tracking-[0.2em] drop-shadow-lg">
            {slides[currentSlide].subtitle}
          </p>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS (MINIMALIST REDESIGN) ================= */}
      <section className="py-24 max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase">Signature</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-white uppercase tracking-wide">Featured Collection</h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6"></div>
        </div>

        {/* Changed to a 4-column grid to match the reference image style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {featuredProducts.length > 0 ? featuredProducts.map((p) => (
            <div 
              key={p.id} 
              onClick={() => navigate('/products', { state: { selectedProduct: p } })} 
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Image Container: Taller height, no background box, floating effect */}
              <div className="relative h-[380px] w-full flex justify-center items-end mb-8">
                {/* Subtle back-glow on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-gold/0 blur-[60px] rounded-full group-hover:bg-brand-gold/10 transition-all duration-700"></div>
                
                <img 
                  src={getImageUrl(p.image)} 
                  alt={p.name} 
                  className="h-full object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700"
                  onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                />
              </div>

              {/* Typography & Button styling matching the reference */}
              <span className="text-gray-400 text-[11px] font-light tracking-[0.2em] uppercase mb-3">
                {p.category}
              </span>
              
              <h3 className="text-2xl font-serif text-white group-hover:text-brand-gold transition-colors duration-300 mb-6 px-4">
                {p.name}
              </h3>
              
              <button className="px-8 py-3 border border-white/20 text-white/70 text-[10px] font-medium uppercase tracking-[0.2em] group-hover:border-brand-gold group-hover:text-brand-gold transition-all duration-300">
                Discover
              </button>
            </div>
          )) : (
            <p className="col-span-full text-center text-gray-500 tracking-widest uppercase font-light">Inventory updating. Please check back soon.</p>
          )}
        </div>
      </section>

      {/* ================= UPCOMING RELEASES (MINIMALIST REDESIGN) ================= */}
      {/* Applied the same elegant styling to upcoming products, but with a grayscale effect */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase">The Innovation Lab</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-white uppercase tracking-wide">Upcoming Releases</h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {upcomingProducts.length > 0 ? upcomingProducts.map((p) => (
              <div 
                key={p.id} 
                onClick={() => navigate('/upcoming', { state: { selectedProduct: p } })} 
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="relative h-[380px] w-full flex justify-center items-end mb-8">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/0 blur-[60px] rounded-full group-hover:bg-white/5 transition-all duration-700"></div>
                  
                  <img 
                    src={getImageUrl(p.image)} 
                    alt={p.name} 
                    className="h-full object-contain relative z-10 grayscale opacity-60 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover:-translate-y-4 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  />
                </div>

                <span className="text-gray-500 text-[11px] font-light tracking-[0.2em] uppercase mb-3">
                  {p.category}
                </span>
                
                <h3 className="text-2xl font-serif text-white/80 group-hover:text-white transition-colors duration-300 mb-6 px-4">
                  {p.name}
                </h3>
                
                <button className="px-8 py-3 border border-white/10 text-white/50 text-[10px] font-medium uppercase tracking-[0.2em] group-hover:border-white/50 group-hover:text-white transition-all duration-300">
                  Notify Me
                </button>
              </div>
            )) : (
              <p className="col-span-full text-center text-gray-600 tracking-widest uppercase font-light">No upcoming releases announced yet.</p>
            )}
          </div>
        </div>
      </section>


      {/* ================= CONTACT & MAP SECTION ================= */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div className="space-y-10 flex flex-col justify-center">
            <div>
              <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-4">Direct Line</span>
              <h2 className="text-5xl font-serif text-white mb-6">Get In Touch</h2>
              <div className="w-12 h-[1px] bg-brand-gold mb-8"></div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <MapPin className="text-brand-gold mt-1" size={24} />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-2">Corporate Office</h4>
                  <p className="text-lg font-light text-gray-300">Simara, Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Mail className="text-brand-gold mt-1" size={24} />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-2">Email Us</h4>
                  <p className="text-lg font-light text-gray-300">arunodayadistallary@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Phone className="text-brand-gold mt-1" size={24} />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-2">Call Us</h4>
                  <p className="text-lg font-light text-gray-300">+977 980-1218585</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden h-[300px] border border-white/10 mt-6 shadow-2xl rounded-sm">
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
          
          <div className="border border-white/10 bg-white/[0.02] p-10 md:p-14 flex flex-col justify-center h-full rounded-sm">
            <h3 className="text-3xl font-serif text-white mb-10">Send an Inquiry</h3>
            <form className="flex flex-col gap-6" onSubmit={async (e) => {
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
                  submitBtn.style.backgroundColor = '#4ade80'; 
                  submitBtn.style.color = '#000';
                  setTimeout(() => {
                    submitBtn.textContent = 'Send Inquiry';
                    submitBtn.style.backgroundColor = ''; 
                    submitBtn.disabled = false;
                  }, 3000);
                } else {
                  submitBtn.textContent = 'Error. Try Again.';
                  submitBtn.disabled = false;
                }
              } catch(err) {
                submitBtn.textContent = 'Server Error';
                submitBtn.disabled = false;
              }
            }}>
              <input type="text" name="name" placeholder="Full Name" required className="w-full bg-black/50 border border-white/10 px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-600 font-light" />
              <input type="email" name="email" placeholder="Email Address" required className="w-full bg-black/50 border border-white/10 px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-600 font-light" />
              <textarea name="message" placeholder="Your Message" rows="5" required className="w-full bg-black/50 border border-white/10 px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-600 font-light resize-none"></textarea>
              <button type="submit" className="border border-brand-gold text-brand-gold font-medium text-xs uppercase tracking-widest py-5 hover:bg-brand-gold hover:text-black transition-all duration-300 mt-4">
                Send Inquiry <ArrowRight size={16} className="inline ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}