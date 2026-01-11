import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function Footer() {
    const location = useLocation();
    const isBouldering = location.pathname.startsWith('/bouldering');

    const footerBg = isBouldering ? 'bg-stone-900 text-stone-300' : 'bg-heritage-charcoal text-heritage-cream';


    return (
        <footer className={cn("relative py-16 md:py-24 px-6", footerBg)}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="container mx-auto max-w-7xl">
                <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="font-serif text-3xl mb-6 text-heritage-clay">
                            Kangundhi
                        </h3>
                        <p className="opacity-80 leading-relaxed max-w-sm text-base">
                            Discover the timeless beauty of granite tors, ancient temples, and rich heritage.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col gap-4"
                    >
                        <h4 className="font-bold uppercase tracking-wider text-sm opacity-70 mb-2">Explore</h4>
                        <Link
                            to="/heritage"
                            className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all duration-200 w-fit"
                        >
                            Heritage
                        </Link>
                        <Link
                            to="/bouldering"
                            className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all duration-200 w-fit"
                        >
                            Bouldering
                        </Link>
                        <Link
                            to="/experiences"
                            className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all duration-200 w-fit"
                        >
                            Experiences
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        <h4 className="font-bold uppercase tracking-wider text-sm opacity-70 mb-2">Contact</h4>
                        <a
                            href="mailto:contact@kangundi.com"
                            className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all duration-200 w-fit"
                        >
                            contact@kangundi.com
                        </a>
                        <p className="opacity-80">+91 90000 00000</p>
                        <p className="text-sm opacity-50 mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
                            <span>© 2026 Kangundhi Tourism. All rights reserved.</span>
                            <Link to="/roadmap" className="hover:text-white transition-colors">Future Vision & Roadmap</Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
