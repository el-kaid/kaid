'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** ~50px dead zone at top so small jitter does not hide the bar */
const SCROLL_TOP_THRESHOLD = 50;

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const mobileMenuOpenRef = useRef(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        mobileMenuOpenRef.current = isMobileMenuOpen;
    }, [isMobileMenuOpen]);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handler = () => {
            const currentScrollY = window.scrollY;

            if (mobileMenuOpenRef.current) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY < lastScrollY.current || currentScrollY < SCROLL_TOP_THRESHOLD) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > SCROLL_TOP_THRESHOLD) {
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        handler();
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // New page: show navbar and close mobile menu
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsVisible(true);
    }, [pathname]);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/our-work', label: 'Innovation' },
        { path: '/why-elkaid', label: 'Why EL KAID' },
        { path: '/blog', label: 'Blog' },
        { path: '/career', label: 'Work With Us' },
        { path: '/updates', label: 'Support Hub' }
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav
            className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ease-out will-change-transform ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-20 opacity-0 pointer-events-none'}`}
            aria-hidden={!isVisible}
        >
            {/* mix-blend only on the top bar — avoids the mobile panel blending with the page (unreadable text) */}
            <div
                className="w-full px-4 md:px-8 pt-0 pb-2 md:pb-2.5 mix-blend-difference text-white transition-all duration-300 bg-transparent"
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-[0.2em] hover:opacity-70 transition-opacity leading-none">
                        EL KAID
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                aria-current={isActive(item.path) ? 'page' : undefined}
                                title={item.label}
                                className="group relative px-2 pt-0 pb-2 text-xs font-semibold tracking-widest uppercase transition-colors leading-none"
                            >
                                <span className={`relative z-10 transition-colors duration-300 ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    {item.label}
                                </span>

                                {/* Minimal Underline Animation */}
                                <span className={`absolute left-0 bottom-0 h-[1px] bg-white transition-all duration-300 ease-out 
                  ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}
                `} />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            className="p-2 text-white/80 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <div className="w-6 flex flex-col items-end gap-1.5">
                                <span className={`h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`} />
                                <span className={`h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
                                <span className={`h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-5'}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu: outside mix-blend + solid bg so labels stay readable on any page background */}
            <div className="w-full px-4 md:px-8 lg:hidden">
                <div
                    className={`max-w-7xl mx-auto overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-normal text-white ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100 mt-2 rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl backdrop-blur-sm' : 'max-h-0 opacity-0 mt-0 border-transparent bg-transparent'}`}
                >
                    <div className="flex flex-col gap-6 py-6 pb-8 pl-4 border-l border-white/25 ml-2">
                        {navItems.map((item, i) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                aria-current={isActive(item.path) ? 'page' : undefined}
                                title={item.label}
                                className="text-2xl font-light tracking-wider hover:pl-4 transition-all duration-300"
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <span className={isActive(item.path) ? 'text-white' : 'text-zinc-400'}>
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
