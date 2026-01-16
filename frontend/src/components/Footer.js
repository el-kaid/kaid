import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Top Section - Navigation Columns */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12">
          {/* Company Info Column */}
          <div className="col-span-1">
            <h3 
              className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase"
              style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              EL KAID
            </h3>
            <p className="text-sm sm:text-base text-gray-300 uppercase mb-2">Built for Progress</p>
           
          </div>

          {/* Products Column */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-[#9B8AFB]">PRODUCTS</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/buy-software" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  B1 - FOR BUSINESS
                </Link>
              </li>
              <li>
                <Link to="/buy-software" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  B2 - SMART WORKSPACE
                </Link>
              </li>
              <li>
                <Link to="/buy-software" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  BUY SOFTWARE
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-[#9B8AFB]">COMPANY</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/our-work" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  INNOVATION
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  WORK WITH US
                </Link>
              </li>
              <li>
                <Link to="/home" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  ABOUT US
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-[#9B8AFB]">SUPPORT</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/updates" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  SUPPORT HUB
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  DOCUMENTATION
                </a>
              </li>
              <li>
                <a href="#updates" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  CONTACT US
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1">
            <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-[#9B8AFB]">RESOURCES</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="our-work" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  BLOG
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  PRIVACY POLICY
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors uppercase">
                  TERMS OF SERVICE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Separator Line with gradient */}
      <div className="relative z-10 border-t border-gray-800">
        <div className="absolute inset-0 border-t border-purple-500/20"></div>
      </div>

      {/* Bottom Section - Social Media & Copyright */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10">
        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <a 
            href="#" 
            className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300 group"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:border-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 group"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-400 uppercase">
            ©Copyright. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
