import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);

    try {
      const response = await axios.post(`${API_BASE_URL}/contact.php`, data);
      if (response.data.success) {
        setStatus({ submitting: false, success: true, error: '' });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus({ submitting: false, success: false, error: response.data.message });
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: 'Server error. Please try again later.' });
    }
  };

  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16 md:mb-24">
        
        {/* Contact Info */}
        <div>
          <span className="text-brand-gold text-xs font-black tracking-[0.4em] uppercase mb-4 block">Get in Touch</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Let's<br/><span className="text-brand-gold italic">Connect</span></h1>
          <div className="w-12 h-0.5 bg-brand-gold mb-6 md:mb-8"></div>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 md:mb-12 font-light">Partner with Nepal's fastest-growing premium distillery.</p>
          <div className="space-y-4 md:space-y-6">
            <div className="liquid-glass p-5 md:p-6 bg-white/5 border-none flex items-start gap-4">
              <MapPin className="text-brand-gold" size={24} />
              <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-1 md:mb-2">Corporate Office</h3>
                  <p className="text-base md:text-lg font-light">Birgunj, Nepal</p>
              </div>
            </div>
            <div className="liquid-glass p-5 md:p-6 bg-white/5 border-none flex items-start gap-4">
              <Mail className="text-brand-gold" size={24} />
              <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-1 md:mb-2">Email Us</h3>
                  <p className="text-base md:text-lg font-light break-all">arunodayadistallary@gmail.com</p>
              </div>
            </div>
            <div className="liquid-glass p-5 md:p-6 bg-white/5 border-none flex items-start gap-4">
              <Phone className="text-brand-gold" size={24} />
              <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-1 md:mb-2">Call Us</h3>
                  <p className="text-base md:text-lg font-light">+977 980-1218585</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="liquid-glass p-6 md:p-10 mt-6 lg:mt-0">
          <h2 className="text-2xl md:text-3xl font-serif mb-6 md:mb-8 text-brand-gold">Send a Message</h2>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange} required
              placeholder="Full Name" 
              className="w-full bg-black/50 border border-white/20 rounded-xl px-4 md:px-5 py-3 md:py-4 text-white outline-none focus:border-brand-gold transition-colors text-sm md:text-base" 
            />
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange} required
              placeholder="Email Address" 
              className="w-full bg-black/50 border border-white/20 rounded-xl px-4 md:px-5 py-3 md:py-4 text-white outline-none focus:border-brand-gold transition-colors text-sm md:text-base" 
            />
            <textarea 
              name="message" value={formData.message} onChange={handleChange} required
              placeholder="Your Message" rows="5" 
              className="w-full bg-black/50 border border-white/20 rounded-xl px-4 md:px-5 py-3 md:py-4 text-white outline-none focus:border-brand-gold transition-colors resize-none text-sm md:text-base"
            ></textarea>
            
            {status.success && <p className="text-green-400 text-sm tracking-widest uppercase">Message sent successfully!</p>}
            {status.error && <p className="text-red-400 text-sm tracking-widest uppercase">{status.error}</p>}
            
            <button 
              type="submit" disabled={status.submitting}
              className="w-full bg-brand-gold text-black py-3 md:py-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 mt-2"
            >
              {status.submitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>

      {/* OFFICIAL GOOGLE MAPS EMBED */}
      <div className="liquid-glass overflow-hidden h-[300px] md:h-[400px] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-3xl">
         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2172.9675294794256!2d84.8060845092122!3d27.058449611905488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993570026312449%3A0x8e6e98cc027979bf!2zQXJ1bm9kYXlhIERpc3RpbGxhcnkg4KSF4KSw4KWB4KSj4KWL4KSm4KSvIOCkoeCkv-CkuOCljeCkn-Ckv-CksOClgA!5e0!3m2!1sen!2snp!4v1775110099069!5m2!1sen!2snp"
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
  );
}