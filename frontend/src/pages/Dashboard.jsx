import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, getImageUrl } from '../config'; 
import { Trash2, Plus, Star, Package, Clock, Upload, X, CheckCircle, Edit3 } from 'lucide-react';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', category: 'Whisky', type: 'regular',
    short_description: '', flavor_notes: '', image: null, 
    is_featured: false, existing_image: ''
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/products.php`);
      setProducts(res.data.data || []);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      name: p.name, category: p.category, type: p.type || 'regular',
      short_description: p.short_description || '', flavor_notes: p.flavor_notes || '',
      is_featured: p.is_featured == 1, existing_image: p.image, image: null
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    
    // Ensure ID is ALWAYS sent as a string if editing
    if (editingId) {
        data.append('id', String(editingId));
    }
    
    // Append standard text fields
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('type', formData.type);
    data.append('short_description', formData.short_description);
    data.append('flavor_notes', formData.flavor_notes);
    data.append('is_featured', formData.is_featured ? '1' : '0');

    // ✅ PROPER FIX: Separate File vs. String logic
    // If new image selected → send as FILE
    if (formData.image) {
      data.append('image', formData.image);
      console.log("Uploading file:", formData.image.name);
    }

    // If editing and no new image → send existing string separately
    if (editingId && !formData.image && formData.existing_image) {
      data.append('existing_image', formData.existing_image);
      console.log("Using existing:", formData.existing_image);
    }

    // 🔍 DEBUG TOOL: Log exactly what is being sent to the server
    console.log("=== SENDING FORM DATA ===");
    for (let pair of data.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    try {
      // ✅ No manual headers, let Axios handle the boundary
      const response = await axios.post(`${API_BASE_URL}/admin/products.php`, data);
      console.log("Server Response:", response.data);
      
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', category: 'Whisky', type: 'regular', short_description: '', flavor_notes: '', image: null, is_featured: false, existing_image: '' });
      fetchData();
    } catch (err) { 
      console.error("❌ ERROR RESPONSE:", err.response?.data);
      console.error("❌ STATUS:", err.response?.status);
      alert(`Save failed. Status: ${err.response?.status}. Check console for details.`); 
    } finally {
      setLoading(false);
    }
  };

  const deleteProd = async (id) => {
    if (window.confirm("Delete spirit?")) {
      await axios.delete(`${API_BASE_URL}/admin/products.php?id=${id}`);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
          <h1 className="text-3xl font-serif text-brand-gold uppercase tracking-[0.2em]">Cellar Management</h1>
          <button onClick={() => { setShowForm(!showForm); if (showForm) setEditingId(null); }} className="w-full md:w-auto bg-brand-gold text-black px-8 py-4 rounded-full font-black uppercase text-xs flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            {showForm ? <><X size={16}/> Close</> : <><Plus size={16}/> Add New Spirit</>}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[40px] mb-16 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-brand-gold font-serif text-xl italic uppercase">{editingId ? `Editing: ${formData.name}` : "New Entry"}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <input required value={formData.name} placeholder="Spirit Name" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-brand-gold" onChange={e => setFormData({...formData, name: e.target.value})} />
              <select value={formData.type} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none" onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="regular">Signature Series</option>
                <option value="upcoming">Innovation Reserve</option>
              </select>
            </div>
            <textarea value={formData.short_description} placeholder="Story..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none" rows="3" onChange={e => setFormData({...formData, short_description: e.target.value})} />
            <div className="grid md:grid-cols-2 gap-8">
              <input value={formData.flavor_notes} placeholder="Flavor Notes" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none" onChange={e => setFormData({...formData, flavor_notes: e.target.value})} />
              <div className="relative w-full bg-black/40 border border-dashed border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-gray-400">
                
                {editingId && !formData.image && formData.existing_image && (
                  <img src={getImageUrl(formData.existing_image)} alt="Current" className="h-12 object-contain mb-2 opacity-50" />
                )}
                
                <div className="flex items-center gap-2">
                    <Upload size={18}/> {formData.image ? formData.image.name : "Select High-Res Image"}
                </div>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFormData({...formData, image: e.target.files[0]})} />
              </div>
            </div>
            <label className="flex items-center gap-4 p-5 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl cursor-pointer">
              <input type="checkbox" checked={formData.is_featured} className="w-6 h-6 accent-brand-gold" onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
              <div className="flex flex-col"><span className="text-xs font-black uppercase text-brand-gold">Home Page Showcase</span></div>
            </label>
            <button disabled={loading} className="w-full bg-brand-gold text-black font-black uppercase py-6 rounded-2xl text-xs tracking-widest">
              {loading ? "Processing..." : <><CheckCircle size={18}/> {editingId ? "Save Changes" : "Finalize Entry"}</>}
            </button>
          </form>
        )}

        <div className="grid gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-black rounded-xl p-2 flex items-center justify-center">
                  <img 
                    src={getImageUrl(p.image)} 
                    onError={(e) => { e.target.onerror = null; e.target.src = "/images/logo.png"; }}
                    className="max-h-full object-contain mx-auto" 
                    alt={p.name}
                  />
                </div>
                <div><h3 className="font-serif text-lg">{p.name}</h3><div className="flex gap-3 text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                  <span>{p.type === 'upcoming' ? <Clock size={10} className="inline mr-1"/> : <Package size={10} className="inline mr-1"/>}{p.type}</span>
                  {p.is_featured == 1 && <span className="text-yellow-500"><Star size={10} fill="currentColor" className="inline mr-1"/>Featured</span>}
                </div></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="p-3 bg-brand-gold/10 text-brand-gold rounded-full"><Edit3 size={18}/></button>
                <button onClick={() => deleteProd(p.id)} className="p-3 bg-red-500/10 text-red-500 rounded-full"><Trash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}