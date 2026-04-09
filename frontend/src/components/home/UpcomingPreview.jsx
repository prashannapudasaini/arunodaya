import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { Calendar } from 'lucide-react';

export default function UpcomingPreview() {
  const [upcoming, setUpcoming] = useState(null);

  useEffect(() => {
    // Note the /admin/ path addition
    axios.get(`${API_BASE_URL}/admin/products.php?type=upcoming`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        if (data.length > 0) {
          setUpcoming(data[0]); // Show the newest one
        }
      })
      .catch(err => console.error("Home Upcoming Fetch Error:", err));
  }, []);

  if (!upcoming) return null;

  // Image path needs to go up two levels from the admin folder to reach uploads
  const imgPath = `${API_BASE_URL.replace('/api', '')}/${upcoming.image}`;

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto glass-panel rounded-[40px] overflow-hidden flex flex-col md:flex-row items-center border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl relative">
        <div className="md:w-1/2 p-12 lg:p-20 space-y-8 relative z-10">
          <div className="flex items-center gap-3 text-brand-gold uppercase tracking-[0.3em] text-[10px] font-black">
            <Calendar size={14} /> Innovation Reserve
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white italic leading-tight">"{upcoming.name}"</h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            {upcoming.short_description || "A masterwork in progress, currently maturing in our reserves."}
          </p>
          <div className="pt-8 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-bold">Anticipated Profile</p>
            <p className="text-white font-serif text-2xl italic">{upcoming.flavor_notes || "Complex & Smooth"}</p>
          </div>
        </div>
        <div className="md:w-1/2 bg-white/[0.02] flex justify-center items-center p-20 min-h-[500px] relative">
          <div className="absolute inset-0 bg-brand-gold/5 blur-[100px] rounded-full opacity-30"></div>
          <img 
            src={imgPath} 
            alt="Upcoming" 
            loading="lazy"
            className="relative z-10 max-h-[500px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-95 hover:scale-100" 
            onLoad={(e) => { e.target.style.opacity = 0.4; }}
          />
        </div>
      </div>
    </section>
  );
}