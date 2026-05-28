'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsVisible(true);
    }, [pathname]);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: 'https://b1.elkaid.com', label: 'B1 Software', isExternal: true },
        { path: 'https://trade.elkaid.com', label: 'B2B Trade', isExternal: true },
        { path: '/our-work', label: 'Innovation' },
        { path: '/why-elkaid', label: 'Why EL KAID' },
        { path: '/blog', label: 'Blog' },
        { path: '/career', label: 'Work With Us' },
        { path: '/updates', label: 'Support Hub' }
    ];

    const isActive = (path) => pathname === path;

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 ease-out will-change-transform ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-24 opacity-0 pointer-events-none'}`}
            aria-hidden={!isVisible}
        >
            {/* Pill shaped glassmorphic top navigation */}
            <div
                className="w-full px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all duration-300 text-white"
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-lg font-bold tracking-[0.2em] hover:opacity-80 transition-opacity leading-none font-outfit">
                        EL KAID
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navItems.map((item) => {
                            const linkProps = item.isExternal
                                ? { href: item.path, target: "_blank", rel: "noopener noreferrer" }
                                : { href: item.path };

                            const Component = item.isExternal ? 'a' : Link;

                            return (
                                <Component
                                    key={item.path}
                                    {...linkProps}
                                    aria-current={isActive(item.path) ? 'page' : undefined}
                                    title={item.label}
                                    className="group relative px-2 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors leading-none"
                                >
                                    <span className={`relative z-10 transition-colors duration-300 ${
                                        item.isExternal
                                            ? item.label === 'B2B Trade'
                                                ? 'text-gold hover:text-gold-hover'
                                                : 'text-neutral-300 hover:text-white'
                                            : isActive(item.path)
                                                ? 'text-white'
                                                : 'text-neutral-400 group-hover:text-white'
                                    }`}>
                                        {item.label}
                                    </span>

                                    {/* Minimal Underline Animation */}
                                    <span className={`absolute left-0 bottom-0 h-[1.5px] bg-white transition-all duration-300 ease-out 
                                        ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}
                                    `} />
                                </Component>
                            );
                        })}
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

            {/* Mobile menu: pill-fitting drop drawer */}
            <div className="w-full lg:hidden">
                <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-white ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100 mt-3 rounded-3xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl' : 'max-h-0 opacity-0 mt-0 border-transparent bg-transparent'}`}
                >
                    <div className="flex flex-col gap-6 py-8 px-6 border-l border-white/15 ml-4 my-2">
                        {navItems.map((item, i) => {
                            const linkProps = item.isExternal
                                ? { href: item.path, target: "_blank", rel: "noopener noreferrer" }
                                : { href: item.path };

                            const Component = item.isExternal ? 'a' : Link;

                            return (
                                <Component
                                    key={item.path}
                                    {...linkProps}
                                    aria-current={isActive(item.path) ? 'page' : undefined}
                                    title={item.label}
                                    className="text-xl font-light tracking-widest uppercase hover:pl-4 transition-all duration-300"
                                    style={{ transitionDelay: `${i * 40}ms` }}
                                >
                                    <span className={
                                        item.isExternal
                                            ? item.label === 'B2B Trade'
                                                ? 'text-gold font-semibold'
                                                : 'text-neutral-300'
                                            : isActive(item.path)
                                                ? 'text-white font-medium'
                                                : 'text-neutral-500'
                                    }>
                                        {item.label}
                                    </span>
                                </Component>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
