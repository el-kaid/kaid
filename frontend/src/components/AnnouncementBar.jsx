'use client';

import React, { useState, useEffect } from 'react';
// Removed X import as close button is removed

const AnnouncementBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Target date: March 31, 2026
    const targetDate = new Date('2026-03-31T23:59:59').getTime();

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                isVisible && setIsVisible(false);
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial calculation

        return () => clearInterval(timer);
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-white text-black flex items-center justify-center px-3 md:px-6 shadow-sm">
            <div className="flex items-center justify-center gap-1.5 md:gap-3 text-[11px] md:text-xs font-medium leading-none">
                <span className="hidden sm:inline-block font-bold tracking-wide uppercase text-black/80">
                    🚀 Launching March 31, 2026
                </span>

                <div className="flex items-center gap-1 md:gap-1.5 font-mono text-xs md:text-sm leading-none">
                    <div className="flex items-center gap-1">
                        <span className="font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="text-xs uppercase text-gray-500 font-sans">d</span>
                    </div>
                    <span className="text-gray-400">:</span>
                    <div className="flex items-center gap-1">
                        <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-xs uppercase text-gray-500 font-sans">h</span>
                    </div>
                    <span className="text-gray-400">:</span>
                    <div className="flex items-center gap-1">
                        <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-xs uppercase text-gray-500 font-sans">m</span>
                    </div>
                    <span className="text-gray-400 hidden sm:inline">:</span>
                    <div className="flex items-center gap-1 hidden sm:flex">
                        <span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-xs uppercase text-gray-500 font-sans">s</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
