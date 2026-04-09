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
      {/* Main Container: Maintain rounded-[40px] and border logic 
          Added min-h-[600px] to match the taller card aesthetic.
      */}
      <div className="max-w-7xl mx-auto glass-panel rounded-[40px] overflow-hidden flex flex-col md:flex-row items-center border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl relative min-h-[650px]">
        
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

        {/* Right side image: 
            Increased min-h to [600px] to allow the PNG bottle to sit tall.
        */}
        <div className="md:w-1/2 bg-white/[0.01] flex justify-center items-end p-12 lg:p-20 min-h-[600px] relative">
          <div className="absolute inset-0 bg-brand-gold/5 blur-[120px] rounded-full opacity-30"></div>
          
          <img 
            src={imgPath} 
            alt="Upcoming" 
            loading="lazy"
            /* Updated max-h-[600px] and drop-shadow for consistency with the tall ProductCards.
               Aligned to 'end' so the bottle sits on the invisible floor.
            */
            className="relative z-10 max-h-[600px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-95 hover:scale-105 drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]" 
            onLoad={(e) => { e.target.style.opacity = 0.4; }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>
    </section>
  );
}