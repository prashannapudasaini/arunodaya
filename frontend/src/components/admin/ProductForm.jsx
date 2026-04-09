import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { Upload, CheckCircle2 } from 'lucide-react';

export default function ProductForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Whisky',
    type: 'regular',
    short_description: '',
    flavor_notes: '',
    image: null,
    is_featured: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'is_featured') data.append(key, formData[key] ? '1' : '0');
      else data.append(key, formData[key]);
    });

    try {
      await axios.post(`${API_BASE_URL}/products.php`, data);
      onComplete();
    } catch (err) { alert("Upload failed"); }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 p-6 md:p-10 rounded-[30px] border border-white/10 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-brand-gold font-black">Spirit Name</label>
          <input required type="text" placeholder="e.g. Royal Reserve" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-brand-gold font-black">Collection Type</label>
          <select className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none" onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="regular">Signature Signature</option>
            <option value="upcoming">Innovation (Upcoming)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-brand-gold font-black">Tasting Notes</label>
          <input type="text" placeholder="e.g. Oak, Vanilla, Caramel" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none" onChange={e => setFormData({...formData, flavor_notes: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-brand-gold font-black">Image Asset</label>
          <div className="relative">
            <input required type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({...formData, image: e.target.files[0]})} />
            <div className="w-full bg-black/40 border border-dashed border-white/20 rounded-xl p-4 flex items-center justify-center gap-3 text-gray-400">
              <Upload size={18}/> {formData.image ? formData.image.name : "Select High-Res Photo"}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-brand-gold font-black">Story / Description</label>
        <textarea rows="3" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none" onChange={e => setFormData({...formData, short_description: e.target.value})}></textarea>
      </div>

      <div className="flex items-center gap-3 p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl">
        <input type="checkbox" className="w-5 h-5 accent-brand-gold" onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-gold">Feature on Home Page Showcase</span>
      </div>

      <button disabled={loading} className="w-full bg-brand-gold text-black font-black uppercase tracking-[0.3em] py-5 rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3">
        {loading ? "Distilling..." : <><CheckCircle2 size={20}/> Finalize Entry</>}
      </button>
    </form>
  );
}