import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurWork from './pages/OurWork';
import Updates from './pages/Updates';
import BuySoftware from './pages/BuySoftware';
import Career from './pages/Career';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; 
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <div className="bg-darkBackground min-h-screen text-white">
      <Router>
        <Navbar />
        <main className="px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/buy-software" element={<BuySoftware />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;