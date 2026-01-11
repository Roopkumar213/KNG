import React, { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import Section from '../components/ui/Section';
import { api } from '../services/api';
import { motion } from 'framer-motion';

export default function Heritage() {
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        api.getHeritage().then(data => {
            setAttractions(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="bg-heritage-cream min-h-screen">
            <SEO
                title="Heritage & History"
                description="Explore the 1066 AD Kangundi Fort, profound Neolithic caves, and the sacred Shiva Temple. A journey through resilience and zamindari legacy."
                image="/images/gallery/fortwalk.png"
            />
            <Section className="pt-32 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <span className="text-heritage-earth uppercase tracking-[0.2em] text-sm font-medium mb-4 block">Our Legacy</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-heritage-charcoal mb-8">Echoes of the Ancients</h1>
                    <p className="text-xl leading-relaxed text-heritage-bark font-light">
                        Kangundhi is not just a place; it is a timeline etched in granite. From the prehistoric hands that painted the caves
                        to the Chola architects who raised the temples, every stone here tells a story of resilience, devotion, and power.
                        Standing at the crossroads of empires, this fortress village has witnessed the rise and fall of dynasties for over a millennium.
                    </p>
                </motion.div>
            </Section>

            {/* Feature Blocks (Simulated API Data) */}
            <Section className="py-12">
                {loading ? (
                    <div className="text-center text-heritage-earth italic">Unearthing history...</div>
                ) : (
                    <div className="space-y-24">
                        {attractions.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden relative group">
                                    <img
                                        src={item.image || '/images/gallery/gallery-1.png'}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-heritage-charcoal/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>

                                {/* Connect */}
                                <div className="w-full md:w-1/2">
                                    <span className="text-heritage-clay font-mono text-xs uppercase tracking-widest mb-2 block">{item.category}</span>
                                    <h3 className="text-4xl font-serif text-heritage-charcoal mb-6">{item.title}</h3>
                                    <p className="text-lg text-heritage-bark leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </Section>

            {/* Timeline Section */}
            <Section dark className="bg-heritage-charcoal text-heritage-cream">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif mb-12 text-center text-heritage-clay">The Timeline</h2>
                    <div className="border-l border-heritage-earth/30 ml-8 md:ml-0 md:pl-8 space-y-12">
                        <div className="relative pl-8">
                            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-heritage-clay"></span>
                            <span className="text-heritage-clay font-mono text-sm block mb-1">3000 BC</span>
                            <h4 className="text-xl font-bold mb-2">Neolithic Settlements</h4>
                            <p className="text-heritage-sand/70">Early humans inhabit the caves, leaving behind rock art.</p>
                        </div>
                        <div className="relative pl-8">
                            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-heritage-clay"></span>
                            <span className="text-heritage-clay font-mono text-sm block mb-1">1066 AD</span>
                            <h4 className="text-xl font-bold mb-2">The Fort Rises</h4>
                            <p className="text-heritage-sand/70">Construction of the main citadel begins under the local chieftains.</p>
                        </div>
                        <div className="relative pl-8">
                            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-heritage-clay"></span>
                            <span className="text-heritage-clay font-mono text-sm block mb-1">18th Century</span>
                            <h4 className="text-xl font-bold mb-2">Zamindari Era</h4>
                            <p className="text-heritage-sand/70">Kangundi flourishes as a major administrative center.</p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
