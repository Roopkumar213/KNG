import React, { useState, useRef, useEffect } from 'react';
import SEO from '../components/common/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import { X } from 'lucide-react';

const IMAGES = [
    { id: 1, src: '/images/gallery/fortwalk.png', alt: 'Historic fort pathway in Kangundhi', aspect: 'aspect-video' },
    { id: 2, src: '/images/gallery/heritagestreet.png', alt: 'Traditional heritage street art in Kangundhi village', aspect: 'aspect-square' },
    { id: 3, src: '/images/gallery/hillview1.png', alt: 'Wide hill landscape around Kangundhi village', aspect: 'aspect-[4/3]' }, // Used wide
    { id: 4, src: '/images/gallery/HeritageStreet1.png', alt: 'Village heritage street reflecting local culture', aspect: 'aspect-video' },
    { id: 5, src: '/images/gallery/temple.png', alt: 'Historic temple in Kangundhi village', aspect: 'aspect-square' },
    { id: 6, src: '/images/gallery/HillView2.png', alt: 'Rocky hill terrain near Kangundi bouldering zones', aspect: 'aspect-[4/3]' },
];

function GalleryCard({ img, index, onClick }) {
    const cardRef = useRef(null);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
            onClick={() => onClick(img)}
            className="break-inside-avoid mb-6 cursor-pointer group perspective-1000"
            onMouseMove={(e) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }}
            onMouseLeave={() => {
                if (cardRef.current) {
                    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                }
            }}
        >
            <div className={`bg-heritage-sand rounded-2xl overflow-hidden ${img.aspect} relative shadow-lg group-hover:shadow-2xl transition-all duration-500`}>
                <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </motion.div>
    );
}

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    return (
        <div className="bg-heritage-cream min-h-screen">
            <SEO
                title="Visual Gallery"
                description="A visual journey through Kangundhi's landscapes, heritage structures, and vibrant community life."
            />
            <Section className="text-center pt-32 pb-16" separator>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-heritage-charcoal mb-6 leading-tight tracking-tight">
                        Visual Stories
                    </h1>
                    <p className="text-lg md:text-xl text-heritage-charcoal/60 max-w-2xl mx-auto">
                        Capturing the essence of Kangundhi through the lens
                    </p>
                </motion.div>
            </Section>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 px-6 pb-32 max-w-7xl mx-auto">
                {IMAGES.map((img, index) => (
                    <GalleryCard
                        key={img.id}
                        img={img}
                        index={index}
                        onClick={setSelectedImage}
                    />
                ))}
            </div>

            {/* Cinematic Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 md:top-12 md:right-12 text-white/80 hover:text-white hover:scale-110 transition-all duration-200 z-10 p-3 rounded-full hover:bg-white/10"
                        >
                            <X size={32} />
                        </motion.button>

                        <motion.img
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-6xl w-full max-h-[90vh] object-contain rounded-3xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
