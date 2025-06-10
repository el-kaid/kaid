import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurWork from './pages/OurWork';
import Updates from './pages/Updates';
import BuySoftware from './pages/BuySoftware';
import Career from './pages/Career';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="bg-darkBackground min-h-screen text-white">
      <Router>
        <Navbar />
        <main className="pt-8 pb-10 px-4">
          {/* Padding at top to avoid overlap with Navbar, adjust as needed */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/buy-software" element={<BuySoftware />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
