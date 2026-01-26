'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/10 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold tracking-[0.2em] mb-6">EL KAID</h2>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Architecting the future of intelligent financial systems.
              Bridging the gap between silicon and software.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a key={social} href="#" className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Explore</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'Innovation', href: '/our-work' },
                { label: 'Capabilities', href: '/our-work#capabilities' },
                { label: 'Contact', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Legal</h3>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} El Kaid. All rights reserved.</p>
          <p>Designed for the future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
