import React, { useEffect, useState, useRef } from 'react';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { api } from '../services/api';

function ExperienceCard({ exp, index }) {
    const cardRef = useRef(null);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-heritage-sand/30 flex flex-col perspective-1000"
            onMouseMove={(e) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;

                cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.01, 1.01, 1.01)`;
            }}
            onMouseLeave={() => {
                if (cardRef.current) {
                    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
                }
            }}
        >
            <div className="h-64 bg-heritage-sand relative overflow-hidden">
                <img
                    src={exp.image || '/images/gallery/gallery-3.png'}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="p-8 md:p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-5 text-xs font-bold uppercase tracking-widest text-heritage-earth">
                    <span>{exp.duration}</span>
                    <span>{exp.difficulty}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-5 text-heritage-charcoal leading-tight">
                    {exp.title}
                </h3>
                <p className="text-heritage-bark/80 mb-10 flex-grow leading-relaxed text-base">
                    {exp.description}
                </p>
                <Button to="/contact" variant="outline" className="w-full justify-center">Inquire</Button>
            </div>
        </motion.div>
    );
}

export default function Experiences() {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        api.getExperiences().then(setExperiences);
    }, []);

    return (
        <div className="bg-heritage-cream min-h-screen">
            <SEO
                title="Curated Experiences"
                description="Immersive village walks, fort treks, and spiritual journeys. Curated experiences to connect you with the soul of Kangundhi."
                image="/images/gallery/HeritageStreet1.png"
            />
            <Section className="text-center pt-32" separator>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-heritage-charcoal mb-8 leading-tight tracking-tight">
                        Curated Experiences
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-heritage-charcoal/70 leading-relaxed font-light">
                        Immerse yourself in the landscape. Whether you seek the thrill of a trek or the peace of a pilgrim's path,
                        Kangundhi offers journeys that linger in memory.
                    </p>
                </motion.div>
            </Section>

            <Section noPadding className="pb-32 grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {experiences.map((exp, index) => (
                    <ExperienceCard key={exp.id} exp={exp} index={index} />
                ))}
            </Section>
        </div>
    );
}
