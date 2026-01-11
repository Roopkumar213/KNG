import React, { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import BoulderMap from '../components/bouldering/BoulderMap';
import { AlertTriangle, Download, Calendar, X, Check } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function Bouldering() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const { t } = useLanguage();
    const [bookingState, setBookingState] = useState('idle'); // idle, submitting, success
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        document.documentElement.classList.add('dark');
        // Fetch map data
        api.getBoulders().then(setMapData);

        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, []);

    const handleDownload = () => {
        // Mock download
        const element = document.createElement("a");
        const file = new Blob(["Mock PDF Content"], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "kangundi_topo_2026.pdf";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setBookingState('submitting');
        // Mock API call
        api.bookGuide({ date: e.target.date.value, size: e.target.size.value }).then(() => {
            setBookingState('success');
            setTimeout(() => {
                setIsBookingOpen(false);
                setBookingState('idle');
            }, 3000);
        });
    };

    return (
        <div className="bg-stone-900 min-h-screen text-stone-100 font-sans selection:bg-rust selection:text-white">
            <SEO
                title="Bouldering Guide"
                description="The ultimate guide to bouldering in Kangundhi. 450+ granite problems, topomaps, safety guides, and climbing festivals."
                image="/images/gallery/HillView2.png"
            />

            {/* HERO */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-stone-800">
                <div className="absolute inset-0 bg-stone-900 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/50"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-rust font-mono text-sm tracking-widest uppercase mb-4 block">
                            Established 2026
                        </span>
                        <h1 className="text-6xl md:text-9xl font-serif font-black mb-6 tracking-tight text-white uppercase leading-none">
                            {t('bouldering.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-400 max-w-2xl mx-auto mb-10 font-light">
                            {t('bouldering.subtitle')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button variant="rust" onClick={() => setIsBookingOpen(true)}>{t('bouldering.book_btn')}</Button>
                            <Button variant="outline" onClick={handleDownload} className="text-stone-300 border-stone-600 hover:bg-stone-800 hover:border-stone-500 cursor-pointer">
                                {t('bouldering.download_btn')}
                                <Download size={16} className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STATS STRIP */}
            <div className="border-b border-stone-800 bg-stone-900/50 py-8">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-stone-400 font-mono text-sm">
                    <div>
                        <strong className="block text-3xl text-white mb-1 font-sans">450+</strong>
                        Problems
                    </div>
                    <div>
                        <strong className="block text-3xl text-white mb-1 font-sans">Granite</strong>
                        Rock Type
                    </div>
                    <div>
                        <strong className="block text-3xl text-white mb-1 font-sans">Nov-Feb</strong>
                        Best Season
                    </div>
                    <div>
                        <strong className="block text-3xl text-white mb-1 font-sans">V0-V12</strong>
                        Grade Range
                    </div>
                </div>
            </div>

            {/* LANDSCAPE CONTEXT DIVIDER */}
            <Section className="py-24" noPadding>
                <div className="relative h-[60vh] overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src="/images/gallery/HillView2.png"
                        alt="Rocky hill terrain near Kangundi bouldering zones"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-stone-900/20"></div>
                </div>
            </Section>

            {/* MAP SECTION */}
            <Section dark className="bg-stone-900" id="map">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="md:w-1/3">
                        <h2 className="text-4xl font-serif mb-6 text-white">The Crag</h2>
                        <p className="text-stone-400 mb-6 leading-relaxed">
                            Kangundi's boulder fields are scattered across three major zones.
                            The rock is high-quality granite with excellent friction.
                            Landings are generally flat, but a spotter is always recommended.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {mapData.map((spot, i) => (
                                <li key={spot.id} className="flex items-start gap-3">
                                    <span className="text-rust font-bold mt-1">0{i + 1}</span>
                                    <div>
                                        <h4 className="font-bold text-white">{spot.name}</h4>
                                        <p className="text-sm text-stone-500">{spot.description} ({spot.grade})</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" className="border-stone-700 text-stone-300 w-full justify-center">
                            Get Directions
                        </Button>
                    </div>
                    <div className="md:w-2/3 w-full">
                        <BoulderMap />
                    </div>
                </div>
            </Section>

            {/* EVENT & SAFETY as before... */}
            <Section dark className="bg-stone-900 border-t border-stone-800">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-serif mb-6 flex items-center gap-3">
                            <Calendar className="text-rust" /> Upcoming Events
                        </h3>
                        <div className="bg-stone-800 p-6 rounded border border-stone-700 hover:border-rust/50 transition-colors">
                            <span className="text-xs font-mono text-rust mb-2 block">JAN 24-26, 2026</span>
                            <h4 className="text-xl font-bold mb-2">Kangundi Bouldering Fest</h4>
                            <p className="text-sm text-stone-400 mb-4">
                                International climbing festival featuring workshops by pro climbers,
                                night climbing sessions, and local cultural exchanges.
                            </p>
                            <Button variant="stone" className="text-xs py-2 h-auto">Register Now</Button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-rust" /> Safety & Ethics
                        </h3>
                        <ul className="space-y-4 text-stone-400 text-sm">
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-rust mt-2 flex-shrink-0"></span>
                                <span><strong>Leave No Trace:</strong> Pack out all trash, including tape and chalk spills.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-rust mt-2 flex-shrink-0"></span>
                                <span><strong>Respect Locals:</strong> We scale rocks on private and community land. Be polite and ask permission.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-rust mt-2 flex-shrink-0"></span>
                                <span><strong>Emergency:</strong> Nearest hospital is 15km away in Kuppam. Emergency Contact: +91 90000 00000.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Section>

            {/* BOOKING MODAL */}
            <AnimatePresence>
                {isBookingOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-stone-800 border border-stone-700 p-8 rounded-xl max-w-md w-full relative"
                        >
                            <button onClick={() => setIsBookingOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-white">
                                <X />
                            </button>

                            {bookingState === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-moss/20 text-moss mb-4">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="text-2xl font-serif mb-2">Request Sent</h3>
                                    <p className="text-stone-400">Our guides will contact you shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-serif mb-6">Book a Guide</h3>
                                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Date</label>
                                            <input name="date" type="date" required className="w-full bg-stone-900 border border-stone-700 p-3 rounded text-stone-100 focus:border-rust outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Group Size</label>
                                            <select name="size" className="w-full bg-stone-900 border border-stone-700 p-3 rounded text-stone-100 focus:border-rust outline-none">
                                                <option>1 Climber</option>
                                                <option>2-4 Climbers</option>
                                                <option>5+ Group</option>
                                            </select>
                                        </div>
                                        <Button disabled={bookingState === 'submitting'} variant="rust" className="w-full justify-center mt-4">
                                            {bookingState === 'submitting' ? 'Booking...' : 'Confirm Request'}
                                        </Button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
