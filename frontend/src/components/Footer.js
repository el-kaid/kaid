'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 border-t border-white/10 font-inter">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold tracking-[0.2em] mb-6 font-outfit">EL KAID</h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-6">
              EL KAID Software & Tech Innovation Private Limited. Architecting next-generation digital ecosystems, intelligent ERP software, and global B2B sourcing networks.
            </p>
            <p className="text-neutral-500 text-xs tracking-wider">
              Chennai, India. Sourcing India to GCC
            </p>
          </div>

          {/* Division Ecosystem */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-6 font-outfit">Ecosystem</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://b1.elkaid.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                  B1 Software
                </a>
              </li>
              <li>
                <a href="https://trade.elkaid.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-hover transition-colors font-medium">
                  B2B Trade Desk
                </a>
              </li>
              <li>
                <Link href="/our-work" className="text-neutral-400 hover:text-white transition-colors">
                  Innovation / R&D
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-6 font-outfit">Company</h3>
            <ul className="space-y-4 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Why EL KAID', href: '/why-elkaid' },
                { label: 'Blog & Updates', href: '/blog' },
                { label: 'Work With Us', href: '/career' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support and Demo */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-6 font-outfit">Support</h3>
            <ul className="space-y-4 text-sm">
              {[
                { label: 'Support Hub', href: '/updates' },
                { label: 'Book Demo', href: '/book-demo' },
                { label: 'Contact Sales', href: '/updates' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-neutral-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <p>&copy; {new Date().getFullYear()} EL KAID Software & Tech Innovation Private Limited. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[10px] font-bold">Designed for the future</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
