import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
// Pointing directly to your updated logo.png
import logo from '../../assets/images/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Theme State (Defaults to dark, saves preference in browser)
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'dark');
  const location = useLocation();

  // Handle Theme Toggle
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Close the mobile menu automatically AND scroll to top when a user clicks a link and changes pages
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0); // Forces scroll to top on route change
  }, [location]);

  // Handle the scroll behavior (Hide on scroll down, Show on scroll up)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add the dark glass background only after the user scrolls down 50px
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide the navbar when scrolling down (if past the top 100px), show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true); // User is scrolling down
      } else {
        setIsHidden(false); // User is scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Upcoming', path: '/upcoming' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-in-out ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/10 shadow-2xl py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo Showcase (Left Side, Nudged Down Vertically) */}
          <Link to="/" className="flex items-center gap-3 z-50 group">
            <img
              src={logo}
              alt="Arunodaya Distillery Logo"
              // 🚨 Added translate-y-2 (mobile), translate-y-4 (tablet), translate-y-6 (desktop)
              // This acts like top-padding to push the scaled logo down into the perfect vertical center!
              className="h-10 md:h-12 w-auto object-contain origin-left scale-[2] md:scale-[2.75] lg:scale-[3.5] translate-y-2 md:translate-y-4 lg:translate-y-3 group-hover:scale-[2.1] md:group-hover:scale-[2.85] lg:group-hover:scale-[3.6] transition-transform duration-300 drop-shadow-lg"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </Link>

          {/* Desktop Links & Theme Toggle */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-xs font-black uppercase tracking-[0.15em] transition-colors duration-300 ${
                      location.pathname === link.path 
                        ? 'text-brand-gold' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Desktop Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="text-gray-300 hover:text-brand-gold transition-colors duration-300 ml-4"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Buttons (Theme Toggle + Menu) */}
          <div className="flex md:hidden items-center gap-5 z-50">
            {/* Mobile Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="text-brand-gold hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            {/* Mobile Menu Toggle Button */}
            <button
              className="text-brand-gold hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-[900] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-10">
          {navLinks.map((link, index) => (
            <li 
              key={link.name}
              style={{ 
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.4s ease ${index * 0.1}s`
              }}
            >
              <Link
                to={link.path}
                className={`text-2xl font-serif uppercase tracking-widest transition-colors ${
                  location.pathname === link.path ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}