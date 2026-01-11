import React, { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import { api } from '../services/api';
import { Clock } from 'lucide-react';

export default function Itineraries() {
    const [itineraries, setItineraries] = useState([]);

    useEffect(() => {
        api.getItineraries().then(setItineraries);
    }, []);

    return (
        <div className="bg-heritage-cream min-h-screen">
            <SEO
                title="Travel Itineraries"
                description="One-day to three-day travel plans for Kangundhi. Optimized for heritage lovers, adventure seekers, and families."
                image="/images/gallery/hillview1.png"
            />
            <Section className="text-center pt-32" separator>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-heritage-charcoal mb-8 leading-tight tracking-tight">
                        Plan Your Journey
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-heritage-charcoal/70 leading-relaxed font-light">
                        Thoughtfully crafted itineraries to help you make the most of your time in Kangundhi.
                    </p>
                </motion.div>
            </Section>

            <Section className="py-12 space-y-32">
                {itineraries.map((itinerary, index) => (
                    <motion.article
                        key={itinerary.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: index * 0.2, ease: [0.19, 1, 0.22, 1] }}
                        className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-heritage-sand/20 group"
                        itemScope
                        itemType="https://schema.org/TouristTrip"
                    >
                        <header className="text-center mb-16 md:mb-20">
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-serif text-heritage-charcoal mb-6 leading-tight tracking-tight"
                                itemProp="name"
                            >
                                {itinerary.title}
                            </h2>
                            <p
                                className="text-heritage-earth italic text-lg md:text-xl max-w-2xl mx-auto"
                                itemProp="description"
                            >
                                {itinerary.description}
                            </p>
                        </header>

                        {/* Timeline Container */}
                        <div className="max-w-4xl mx-auto">
                            <div className="relative">
                                {/* Vertical Timeline Line (Desktop) */}
                                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-heritage-sand/40"></div>

                                {/* Timeline Items */}
                                <div className="space-y-8 md:space-y-12">
                                    {itinerary.timeline.map((slot, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.6, delay: (index * 0.2) + (i * 0.08), ease: [0.19, 1, 0.22, 1] }}
                                            className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-8"
                                        >
                                            {/* Timeline Marker (Desktop) */}
                                            <div className="hidden md:block relative z-10 mt-1.5">
                                                <div className="w-16 h-16 rounded-full bg-white border-4 border-heritage-earth flex items-center justify-center shadow-lg">
                                                    <Clock size={20} className="text-heritage-earth" aria-hidden="true" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 md:pl-4">
                                                <div className="flex items-center gap-4 mb-3 md:hidden">
                                                    <div className="w-12 h-12 rounded-full bg-heritage-earth/10 flex items-center justify-center flex-shrink-0">
                                                        <Clock size={20} className="text-heritage-earth" aria-hidden="true" />
                                                    </div>
                                                    <time
                                                        className="font-bold text-heritage-charcoal text-lg md:text-xl"
                                                        dateTime={slot.time}
                                                        itemProp="startTime"
                                                    >
                                                        {slot.time}
                                                    </time>
                                                </div>

                                                <time
                                                    className="hidden md:block font-bold text-heritage-charcoal text-xl mb-4"
                                                    dateTime={slot.time}
                                                    itemProp="startTime"
                                                >
                                                    {slot.time}
                                                </time>

                                                <p
                                                    className="text-heritage-bark/80 leading-relaxed text-base md:text-lg"
                                                    itemProp="description"
                                                >
                                                    {slot.activity}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </Section>
        </div>
    );
}