'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 20) setIsVisible(true);
            else if (currentScrollY > lastScrollY && currentScrollY > 150) setIsVisible(false);
            else if (currentScrollY < lastScrollY && currentScrollY > 50) setIsVisible(true);

            setIsScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/our-work', label: 'Innovation' },
        { path: '/buy-software', label: 'Buy Software' },
        { path: '/career', label: 'Work With Us' },
        { path: '/contacts', label: 'Support Hub' }
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out mix-blend-difference text-white ${isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
            <div className={`w-full px-4 md:px-8 py-6 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-[0.2em] hover:opacity-70 transition-opacity">
                        EL KAID
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="group relative px-2 py-1 text-xs font-semibold tracking-widest uppercase transition-colors"
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

                {/* Mobile Navigation Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="flex flex-col gap-6 pb-8 pl-4 border-l border-white/20 ml-2">
                        {navItems.map((item, i) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="text-2xl font-light tracking-wider hover:pl-4 transition-all duration-300"
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <span className={isActive(item.path) ? 'text-white' : 'text-gray-500'}>
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
