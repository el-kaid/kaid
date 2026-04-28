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
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Explore</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'Innovation', href: '/our-work' },
                { label: 'Blog', href: '/blog' },
                { label: 'Support Hub', href: '/updates' },
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
              {[
                { label: 'Book Demo', href: '/book-demo' },
                { label: 'Why EL KAID', href: '/why-elkaid' },
                { label: 'Contact', href: '/updates' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
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
