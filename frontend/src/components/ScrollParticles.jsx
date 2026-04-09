import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ScrollParticles = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let scrollY = window.scrollY;

    // Set Canvas Size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Track scroll velocity for particle effect
    let scrollVelocity = 0;
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      scrollVelocity = (newScrollY - scrollY) * 0.5; // Adjust multiplier for sensitivity
      scrollY = newScrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Particle Setup
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // Golden for dark mode, dark gray for light mode
        this.color = theme === 'dark' ? 'rgba(212, 175, 55, 0.6)' : 'rgba(30, 30, 30, 0.4)';
      }
      update() {
        this.x += this.speedX;
        // Normal float + Scroll momentum
        this.y += this.speedY - scrollVelocity; 
        
        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create initial particles (Adjust number based on preference)
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Gradually decay scroll velocity back to normal floating
      scrollVelocity *= 0.9; 

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-render particles if theme changes to update color

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500"
    />
  );
};

export default ScrollParticles;