import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import ProductCard from '../products/ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note the /admin/ path addition to match your new backend structure
    axios.get(`${API_BASE_URL}/admin/products.php?featured=1`)
      .then(res => {
        // UNWRAP: Extracts the array from the { success: true, data: [...] }
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Home Featured Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center py-20 text-brand-gold animate-pulse tracking-widest uppercase text-[10px] font-black">
      Curating Showcase...
    </div>
  );

  // Section stays hidden if no products are marked as 'Featured'
  if (products.length === 0) return null;

  return (
    /* Updated: grid-cols-1 for mobile, md:grid-cols-2 for tablets, lg:grid-cols-3 for desktop.
       Added gap-16 and lg:gap-20 to provide room for taller ProductCards.
    */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20 max-w-7xl mx-auto">
      {products.map(p => (
        <ProductCard key={p.id} product={p} isUpcoming={false} />
      ))}
    </div>
  );
}