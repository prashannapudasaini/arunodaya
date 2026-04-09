import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#050505] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-2xl text-brand-gold mb-6">Arunodaya Distillery</h3>
          <p className="text-gray-400 leading-relaxed">Crafting the finest spirits with a heritage of excellence and a commitment to premium quality.</p>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/products" className="hover:text-brand-gold">Our Spirits</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold">Location</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-widest mb-6">Contact Info</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3"><MapPin className="text-brand-gold" size={18}/> Corporate Office, Nepal</li>
            <li className="flex items-center gap-3"><Phone className="text-brand-gold" size={18}/> +977-980-1218585</li>
            <li className="flex items-center gap-3"><Mail className="text-brand-gold" size={18}/> arunodayadistallary@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} Arunodaya Distillery. All rights reserved.
       <br className="sm:hidden" /> {/* Optional: helps it stack nicely on mobile */}
       <span className="hidden sm:inline"> | </span> 
        Designed and Developed by <a href="https://motionage.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">MotionAge</a>
       </div>
    </footer>
  );
};

export default Footer;