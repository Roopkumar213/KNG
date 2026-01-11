import React, { useEffect } from 'react';
import SEO from '../components/common/SEO';
import Section from '../components/ui/Section';
import { motion } from 'framer-motion';
import {
    Wifi, Home, Mountain, BookOpen, Leaf,
    Smartphone, Map, Glasses, CreditCard, Users, BarChart3,
    ArrowRight, Building2, Radio
} from 'lucide-react';

export default function Roadmap() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const destinationPillars = [
        {
            icon: <Radio size={28} className="text-heritage-gold" />,
            id: "A1",
            title: "Smart & Sustainable Infrastructure",
            items: [
                "Digitally managed visitor flow to avoid overcrowding.",
                "Smart signages and QR-based information access points.",
                "Emergency assistance points for travelers.",
                "Weather, terrain, and safety alert integration."
            ]
        },
        {
            icon: <Home size={28} className="text-heritage-earth" />,
            id: "A2",
            title: "Accommodation & Stay Ecosystem",
            items: [
                "Verified homestays and eco-lodges network.",
                "Community-run lodging programs.",
                "Quality and safety certification framework.",
                "Integration of local hospitality providers."
            ]
        },
        {
            icon: <Mountain size={28} className="text-rust" />,
            id: "A3",
            title: "Adventure & Bouldering Advancement",
            items: [
                "Official bouldering route grading standardization.",
                "Safety-certified climbing zones.",
                "Training programs and workshops.",
                "Seasonal and weather-based access planning."
            ]
        },
        {
            icon: <BookOpen size={28} className="text-heritage-charcoal" />,
            id: "A4",
            title: "Cultural Digitization & Heritage",
            items: [
                "Digitally archived heritage assets.",
                "Multilingual audio storytelling.",
                "Guided heritage walks with community participation.",
                "Preservation-first tourism education."
            ]
        },
        {
            icon: <Leaf size={28} className="text-moss" />,
            id: "A5",
            title: "Environmental Sustainability",
            items: [
                "Plastic-free tourism initiatives.",
                "Waste tracking and cleanup coordination.",
                "Local employment through tourism technology.",
                "Community skill development programs."
            ]
        }
    ];

    const platformFeatures = [
        {
            icon: <Building2 size={24} />,
            id: "B1",
            title: "Accommodation Booking System",
            desc: "Centralized booking for homestays and eco-lodges with availability calendars and secure payments."
        },
        {
            icon: <Smartphone size={24} />,
            id: "B2",
            title: "Smart Trip Planning",
            desc: "Intelligent itinerary builder based on duration, interests, and seasonal conditions."
        },
        {
            icon: <Map size={24} />,
            id: "B3",
            title: "Advanced Maps & Intelligence",
            desc: "Interactive geo-mapped exploration with live navigation and offline fallback modes."
        },
        {
            icon: <Glasses size={24} />,
            id: "B4",
            title: "Immersive Technologies",
            desc: "AR-based heritage storytelling and location-triggered audio guides."
        },
        {
            icon: <CreditCard size={24} />,
            id: "B5",
            title: "Payments & Commerce",
            desc: "Secure payment gateway for massive scale event registration and guide bookings."
        },
        {
            icon: <Users size={24} />,
            id: "B6",
            title: "Sustainability Tech Tools",
            desc: "Volunteer program registration and impact reporting dashboards."
        },
        {
            icon: <BarChart3 size={24} />,
            id: "B7",
            title: "Governance & Data Systems",
            desc: "Role-based admin dashboards with booking and visitor analytics."
        }
    ];

    return (
        <div className="bg-white min-h-screen text-heritage-charcoal selection:bg-heritage-gold/30">
            <SEO
                title="Future Vision & Roadmap"
                description="The 2026-2030 Tourism Master Plan for Kangundhi. Smart infrastructure, digital platforms, and sustainable growth strategies."
            />

            {/* HERO HEADER */}
            <Section className="pt-40 pb-20 bg-heritage-cream/50 border-b border-heritage-sand/20">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-charcoal text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-heritage-charcoal">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Official Roadmap 2026-2030
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-black mb-8 leading-none text-heritage-charcoal">
                            Tourism Master Plan
                        </h1>
                        <p className="text-xl text-heritage-bark leading-relaxed max-w-2xl mx-auto">
                            A comprehensive strategic framework integrating physical infrastructure, community development, and advanced digital platforms to establish Kangundi/Kangundhi as a global heritage connection.
                        </p>
                    </motion.div>
                </div>
            </Section>

            {/* SECTION A: DESTINATION VISION */}
            <Section className="py-24 bg-white relative">
                <div className="mb-16 border-l-4 border-heritage-gold pl-6">
                    <span className="text-heritage-gold font-bold uppercase tracking-widest text-sm block mb-2">Section A</span>
                    <h2 className="text-4xl font-serif font-bold text-heritage-charcoal">Destination Vision</h2>
                    <p className="text-heritage-bark max-w-xl mt-2 text-lg">The physical evolution of the place, focused on infrastructure, sustainability, and community leveling.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinationPillars.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-heritage-cream/30 p-8 rounded-2xl border border-heritage-sand/20 hover:border-heritage-gold/50 transition-colors group"
                        >
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-heritage-sand/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold font-serif mb-4 pr-4 border-b border-heritage-sand/10 pb-4">{item.title}</h3>
                            <ul className="space-y-3">
                                {item.items.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-heritage-bark leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold mt-1.5 shrink-0"></span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* DIVIDER */}
            <div className="h-px bg-gradient-to-r from-transparent via-heritage-charcoal/10 to-transparent"></div>

            {/* SECTION B: PLATFORM TECHNOLOGY */}
            <Section className="py-24 bg-stone-50" dark={false}>
                <div className="mb-16 border-l-4 border-rust pl-6">
                    <span className="text-rust font-bold uppercase tracking-widest text-sm block mb-2">Section B</span>
                    <h2 className="text-4xl font-serif font-bold text-heritage-charcoal">Platform Technology</h2>
                    <p className="text-heritage-bark max-w-xl mt-2 text-lg">Advanced digital features to act as the operating system for the destination.</p>
                </div>

                <div className="grid gap-6">
                    {platformFeatures.map((feat, i) => (
                        <motion.div
                            key={feat.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.05 }}
                            className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-white rounded-xl border border-stone-200 hover:shadow-lg transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-heritage-charcoal shrink-0 font-mono font-bold text-sm">
                                {feat.id}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-heritage-charcoal/40 scale-75">{feat.icon}</span>
                                    <h3 className="text-lg font-bold font-serif text-heritage-charcoal">{feat.title}</h3>
                                </div>
                                <p className="text-heritage-bark text-sm md:text-base">{feat.desc}</p>
                            </div>
                            <div className="px-4 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded border border-green-200 whitespace-nowrap">
                                Scheduled 2026
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* CALL TO ACTION */}
            <Section className="bg-heritage-charcoal text-white py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <Building2 className="w-16 h-16 mx-auto mb-6 text-heritage-gold opacity-50" />
                    <h3 className="text-3xl font-serif mb-6">Invest in the Vision</h3>
                    <p className="text-white/60 mb-10 text-lg leading-relaxed">
                        This roadmap represents a commitment to responsible growth. We welcome government stakeholders, technology partners, and conservationists to join us.
                    </p>
                    <a href="mailto:contact@kangundi.com" className="inline-flex items-center gap-2 bg-heritage-gold text-heritage-charcoal px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">
                        Request Detailed Proposal <ArrowRight size={16} />
                    </a>
                </motion.div>
            </Section>
        </div>
    );
}
