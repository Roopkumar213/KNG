import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}
