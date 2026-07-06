import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Upcoming from './pages/Upcoming';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScrollParticles from './components/ScrollParticles'; 

// Import the ProtectedRoute wrapper
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <>
      {/* Background Particles layer (fixed behind everything) */}
      <ScrollParticles />

      {/* Main App Wrapper with responsive Light/Dark classes */}
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-500 relative z-10">
        <Navbar />
        <main className="pt-20">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;