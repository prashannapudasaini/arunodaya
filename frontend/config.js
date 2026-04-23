// src/config.js

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocal 
  ? "http://localhost/arunodaya-distillery/backend/api" 
  : "https://arunodayadistillery.com/backend/api";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/images/logo.png";
  if (imagePath.startsWith('http')) return imagePath;
  
  let cleanPath = imagePath.replace(/^\/+/, '');
  
  // 🔥 THE FIX: Bridge the gap between DB "uploads/" and Folder "uploads/products/"
  if (cleanPath.startsWith('uploads/') && !cleanPath.includes('uploads/products/')) {
    cleanPath = cleanPath.replace('uploads/', 'uploads/products/');
  }

  const base = isLocal 
    ? "http://localhost/arunodaya-distillery/backend/" 
    : "https://arunodayadistillery.com/backend/";

  return `${base}${cleanPath}`;
};

export default API_BASE_URL;