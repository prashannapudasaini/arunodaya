import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, getImageUrl } from '../config';
import { MapPin, Mail, Phone, ArrowRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

// Explicitly importing the hero images (Keep these since they are in assets)
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
        setFeaturedProducts(data.slice(0, 6)); 
      })
      .catch(err => console.error("Error fetching featured:", err));

    // FETCH UPCOMING PRODUCTS 
    axios.get(`${API_BASE_URL}/admin/products.php?type=upcoming`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setUpcomingProducts(data.slice(0, 6)); 
      })
      .catch(err => console.error("Error fetching upcoming:", err));

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <main className="bg-dark-bg text-white min-h-screen">
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

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-xs font-black tracking-[0.4em] uppercase">Signature</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2 uppercase tracking-wide">Featured Collection</h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.length > 0 ? featuredProducts.map((p) => (
            <div 
              key={p.id} 
              onClick={() => navigate('/products', { state: { selectedProduct: p } })} 
              className="liquid-glass p-8 text-center group hover:border-brand-gold/60 transition-all duration-500 cursor-pointer"
            >
              <div className="h-64 flex justify-center items-center mb-6 overflow-hidden">
                <img 
                  src={getImageUrl(p.image)} 
                  alt={p.name} 
                  className="max-h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
                  onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                />
              </div>
              <span className="text-brand-gold text-[10px] font-black tracking-[0.3em] uppercase block mb-3">{p.category}</span>
              <h3 className="text-2xl font-serif mb-4">{p.name}</h3>
              <button className="px-6 py-2 border border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-widest group-hover:bg-brand-gold group-hover:text-black transition-colors">
                Discover
              </button>
            </div>
          )) : (
            <p className="col-span-full text-center text-gray-500 tracking-widest uppercase font-light">Inventory updating. Please check back soon.</p>
          )}
        </div>
      </section>

      {/* ================= UPCOMING RELEASES ================= */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold text-xs font-black tracking-[0.4em] uppercase">The Innovation Lab</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2 uppercase tracking-wide">Upcoming Releases</h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {upcomingProducts.length > 0 ? upcomingProducts.map((p) => (
              <div 
                key={p.id} 
                onClick={() => navigate('/upcoming', { state: { selectedProduct: p } })} 
                className="liquid-glass p-8 text-center group hover:border-brand-gold/60 transition-all duration-500 cursor-pointer"
              >
                <div className="h-64 flex justify-center items-center mb-6 overflow-hidden">
                  <img 
                    src={getImageUrl(p.image)} 
                    alt={p.name} 
                    className="max-h-full object-contain opacity-80 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  />
                </div>
                <span className="text-brand-gold text-[10px] font-black tracking-[0.3em] uppercase block mb-3">{p.category}</span>
                <h3 className="text-2xl font-serif mb-4">{p.name}</h3>
                <p className="text-gray-400 text-sm font-light italic mb-6 line-clamp-2">{p.short_description}</p>
                <button className="px-6 py-2 bg-brand-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                  Notify Me
                </button>
              </div>
            )) : (
              <p className="col-span-full text-center text-gray-500 tracking-widest uppercase font-light">No upcoming releases announced yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* ================= THE MASTER'S RESERVE (Collection Shelf) ================= */}
      <section className="relative w-full overflow-hidden bg-black py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/all.png" 
            alt="Arunodaya Distillery Collection" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-12 h-[1px] bg-brand-gold"></span>
              <span className="text-brand-gold text-xs font-black tracking-[0.4em] uppercase">The Art of Distillation</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight uppercase">
              A LEGACY <br /> 
              <span className="text-brand-gold italic">IN EVERY DROP</span>
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              At Arunodaya, we don't just bottle spirits; we curate experiences. Our master blenders 
              harness Himalayan spring water and heritage grains to create a portfolio 
              ranging from the bold 555 Vodka to the smooth, rich Bare Shine.
            </p>

            <div className="flex flex-wrap gap-6 pt-6">
              <button 
                onClick={() => navigate('/products')}
                className="bg-brand-gold text-black px-10 py-4 font-black text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-2xl"
              >
                View Full Cellar
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="border border-white/30 text-white px-10 py-4 font-black text-xs uppercase tracking-widest hover:border-brand-gold transition-all duration-300"
              >
                Our Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT & MAP SECTION ================= */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10">
          
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <span className="text-brand-gold text-xs font-black tracking-[0.4em] uppercase block mb-2">Direct Line</span>
              <h2 className="text-5xl font-serif text-white mb-6">Get In Touch</h2>
              <div className="w-12 h-0.5 bg-brand-gold mb-8"></div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-brand-gold mt-1" size={24} />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-1">Corporate Office</h4>
                  <p className="text-lg font-light text-gray-300">Simara, Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-brand-gold mt-1" size={24} />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-1">Email Us</h4>
                  <p className="text-lg font-light text-gray-300">arunodayadistallary@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-brand-gold mt-1" size={24} />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-1">Call Us</h4>
                  <p className="text-lg font-light text-gray-300">+977 980-1218585</p>
                </div>
              </div>
            </div>

            <div className="liquid-glass overflow-hidden h-[300px] border border-white/10 mt-4 shadow-2xl">
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
          
          <div className="liquid-glass p-10 md:p-14 flex flex-col justify-center h-full">
            <h3 className="text-3xl font-serif text-brand-gold mb-8">Send an Inquiry</h3>
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
              <input type="text" name="name" placeholder="Full Name" required className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-500 font-light" />
              <input type="email" name="email" placeholder="Email Address" required className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-500 font-light" />
              <textarea name="message" placeholder="Your Message" rows="5" required className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-gold transition-colors placeholder-gray-500 font-light resize-none"></textarea>
              <button type="submit" className="bg-brand-gold text-black font-black uppercase tracking-widest py-5 rounded-xl hover:bg-white transition-all duration-300 mt-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-75">
                Send Inquiry <ArrowRight size={16} className="inline ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}