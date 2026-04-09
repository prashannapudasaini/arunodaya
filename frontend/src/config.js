// Pointing to the specific folder where products.php and auth.php live
export const API_BASE_URL = "https://arunodayadistillery.com/backend/api";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/images/logo.png';
  
  // The root of your backend files
  const baseUrl = "https://arunodayadistillery.com/backend";
  
  // Clean the path to prevent double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${baseUrl}/${cleanPath}`;
};

export default API_BASE_URL;