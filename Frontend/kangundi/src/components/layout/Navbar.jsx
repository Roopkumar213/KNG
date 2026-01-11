import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { blogs } from '../../data/blogs';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showBlogMenu, setShowBlogMenu] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();

  const isBouldering = location.pathname.includes('bouldering');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // STUNNING V2 DESIGN TOKENS
  // Floating Glass Effect for Scrolled State
  const navContainerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
    scrolled ? "py-4" : "py-8"
  );

  const navBarClass = cn(
    "mx-auto flex justify-between items-center transition-all duration-500 px-6 md:px-12 rounded-full",
    scrolled
      ? (isBouldering ? "bg-stone-900/80 backdrop-blur-2xl shadow-2xl shadow-black/40 border border-white/5 max-w-7xl" : "bg-nature-sand/85 backdrop-blur-xl shadow-xl shadow-nature-forest/5 border border-white/20 max-w-7xl")
      : "bg-transparent max-w-[98%]"
  );

  const logoClass = cn(
    "font-serif font-black tracking-tighter uppercase relative z-50 transition-all duration-300",
    scrolled ? "text-2xl" : "text-3xl md:text-4xl",
    isBouldering ? "text-white" : "text-heritage-charcoal"
  );

  const linkClass = (active) => cn(
    "relative text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 py-2",
    isBouldering
      ? (active ? "text-rust" : "text-stone-300 hover:text-white")
      : (active ? "text-nature-moss" : "text-nature-forest/80 hover:text-nature-forest")
  );

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'kn', label: 'ಕನ್ನಡ' }
  ];

  return (
    <nav className={navContainerClass}>
      <div className={navBarClass}>

        {/* === BRAND === */}
        <Link to="/" className={logoClass}>
          Kangundhi
        </Link>

        {/* === DESKTOP NAVIGATION === */}
        <div className="hidden lg:flex items-center gap-8">

          {/* Main Links */}
          <div className="flex items-center gap-8 px-6 py-2 rounded-full bg-transparent">
            {['Heritage', 'Experiences', 'Itineraries'].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => linkClass(isActive)}
              >
                {t(`nav.${item.toLowerCase()}`)}
                {/* Magnetic Dot Indicator */}
                <span className="current-dot absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-current -translate-x-1/2 opacity-0 transition-opacity duration-300 transform scale-0" />
              </NavLink>
            ))}

            {/* JOURNAL MEGA MENU TRIGGER */}
            <div
              className="relative group h-full flex items-center"
              onMouseEnter={() => setShowBlogMenu(true)}
              onMouseLeave={() => setShowBlogMenu(false)}
            >
              <Link to="/blog" className={cn(linkClass(false), "flex items-center gap-1 group-hover:opacity-100")}>
                Journal
              </Link>

              {/* MEGA MENU PANEL */}
              <AnimatePresence>
                {showBlogMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-10 w-[85vw] max-w-5xl z-40 fixed"
                    style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)' }} // Force fixed centering
                  >
                    <div className="bg-nature-sand/95 backdrop-blur-3xl rounded-3xl shadow-[0_20px_50px_rgba(15,44,35,0.1)] border border-white/30 overflow-hidden p-8 grid grid-cols-4 gap-8">
                      {/* Editorial Context */}
                      <div className="col-span-1 border-r border-black/5 pr-6 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-heritage-earth mb-3 block">The Edition</span>
                          <h3 className="font-serif text-3xl text-heritage-charcoal mb-4 leading-tight">Stories from<br />the Granite.</h3>
                          <p className="text-heritage-bark text-sm leading-relaxed mb-6 font-medium">
                            Curated tales of adventure, history, and culture from the heart of Kangundhi.
                          </p>
                        </div>
                        <Link to="/blog" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-heritage-charcoal hover:text-heritage-earth transition-colors group/link bg-heritage-sand/20 py-3 px-4 rounded-lg w-fit">
                          Read Journal <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      {/* Article Cards */}
                      {blogs.slice(0, 3).map((blog, i) => (
                        <Link key={blog.id} to={`/blog/${blog.slug}`} className="group/card block relative">
                          <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 relative shadow-md group-hover/card:shadow-xl transition-all duration-500">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-white/90 mb-2 block border-l-2 border-heritage-gold pl-2">
                                {blog.category}
                              </span>
                            </div>
                          </div>
                          <h4 className="font-serif text-lg text-heritage-charcoal leading-snug group-hover/card:text-heritage-earth transition-colors">
                            {blog.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/gallery" className={({ isActive }) => linkClass(isActive)}>{t('nav.gallery')}</NavLink>
            <NavLink to="/bouldering" className={({ isActive }) => linkClass(isActive)}>{t('nav.bouldering')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => linkClass(isActive)}>{t('nav.contact')}</NavLink>
          </div>

          {/* === ACTIONS AREA === */}
          <div className="flex items-center gap-3 pl-6 border-l border-current/10">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={cn(
                  "p-2 rounded-full transition-all duration-300 hover:bg-current/10",
                  isBouldering ? "text-stone-300 hover:text-white" : "text-heritage-charcoal/70 hover:text-heritage-charcoal"
                )}
                aria-label="Switch Language"
              >
                <Globe size={18} strokeWidth={1.5} />
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-full mt-4 w-40 bg-nature-sand/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/30 overflow-hidden p-1.5"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { changeLanguage(lang.code); setShowLangMenu(false); }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-between",
                          language === lang.code ? "bg-heritage-charcoal text-white" : "hover:bg-heritage-sand/20 text-heritage-bark"
                        )}
                      >
                        {lang.label}
                        {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-heritage-gold"></div>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FUTURE VISION CTA - STUNNING */}
            <Link
              to="/roadmap"
              className={cn(
                "group relative overflow-hidden rounded-full px-5 py-2.5 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95",
                isBouldering
                  ? "bg-rust text-white shadow-rust/20"
                  : "bg-heritage-charcoal text-white shadow-heritage-charcoal/20"
              )}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest">Future Vision</span>
                <Zap size={12} className="group-hover:text-heritage-gold transition-colors" fill="currentColor" />
              </div>
            </Link>
          </div>
        </div>

        {/* === MOBILE TOGGLE === */}
        <button
          onClick={() => setIsOpen(true)}
          className={cn("lg:hidden p-2 transition-transform active:scale-95", isBouldering ? "text-white" : "text-heritage-charcoal")}
          aria-label="Open Menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* === MOBILE OVERLAY (UNCHANGED LOGIC, POLISHED STYLE) === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-nature-sand/98 backdrop-blur-3xl lg:hidden flex flex-col"
          >
            <div className="p-6 md:p-12 flex justify-between items-center">
              <span className="font-serif text-3xl font-black uppercase text-heritage-charcoal tracking-tighter">Navigate</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-4 bg-white/50 rounded-full hover:bg-white transition-colors shadow-sm"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 text-heritage-charcoal" />
              </button>
            </div>

            <div className="flex-1 px-8 md:px-16 flex flex-col justify-center gap-6 overflow-y-auto">
              {/* Mobile Links with Stagger */}
              {['Heritage', 'Experiences', 'Itineraries', 'Gallery', 'Journal', 'Bouldering', 'Contact'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    to={item === 'Journal' ? '/blog' : `/${item.toLowerCase()}`}
                    className={({ isActive }) => cn(
                      "block font-serif text-4xl md:text-6xl font-black uppercase tracking-tight transition-all duration-300 hover:pl-6",
                      isActive ? "text-heritage-earth" : "text-heritage-charcoal hover:text-heritage-earth/80",
                      item === 'Bouldering' && "text-rust hover:text-rust/80"
                    )}
                  >
                    {item}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-heritage-charcoal/10"
              >
                <Link to="/roadmap" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-3 bg-heritage-charcoal text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl">
                  <Zap size={16} fill="currentColor" /> View Strategic Roadmap
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
