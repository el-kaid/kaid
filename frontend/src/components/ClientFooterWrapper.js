'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

const ClientFooterWrapper = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    if (isHomePage) return null;

    return <Footer />;
};

export default ClientFooterWrapper;
