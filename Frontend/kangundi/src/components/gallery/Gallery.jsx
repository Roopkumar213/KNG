import { useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const images = [
    { src: "/images/gallery/image.png", alt: "Kangundhi landscape", span: 2 },
    { src: "/images/gallery/image copy.png", alt: "Kangundhi fort view", span: 1 },
    { src: "/images/gallery/image copy 2.png", alt: "Hill trekking trail", span: 1 },
    { src: "/images/gallery/image copy 3.png", alt: "Valley view", span: 2 },
    { src: "/images/gallery/image copy 4.png", alt: "Rock formations", span: 1 },
    { src: "/images/gallery/image copy 5.png", alt: "Scenic hilltop", span: 1 },
    { src: "/images/gallery/image copy 6.png", alt: "Temple surroundings", span: 1 },
    { src: "/images/gallery/image copy 7.png", alt: "Sunset hours", span: 1 }
];

export default function Gallery() {
    const { ref, isVisible } = useScrollAnimation();
    const [lightboxImg, setLightboxImg] = useState(null);

    return (
        <section id="gallery" className="section-cinematic" ref={ref}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="text-gradient-gold" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        Visual Journey
                    </span>
                    <h2 style={{ fontSize: 'var(--text-h2)', color: 'var(--c-white)' }}>Through the Lens</h2>
                </div>

                {/* Editorial Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gridAutoFlow: 'dense',
                    gap: '1.5rem'
                }}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`gallery-item ${img.span === 2 ? 'wide' : ''}`}
                            onClick={() => setLightboxImg(img)}
                            style={{
                                position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'zoom-in',
                                gridColumn: img.span === 2 ? 'span 2' : 'span 1',
                                aspectRatio: img.span === 2 ? '16/9' : '4/5',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transition: `opacity 0.8s ease ${index * 0.05}s, transform 0.8s var(--ease-cinema) ${index * 0.05}s`
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s var(--ease-flow)' }}
                            />
                            <div className="hover-overlay" style={{
                                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', opacity: 0, transition: 'opacity 0.3s ease'
                            }}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Advanced Lightbox */}
            {lightboxImg && (
                <div
                    onClick={() => setLightboxImg(null)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 2000,
                        background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'zoom-out', animation: 'fadeIn 0.3s ease'
                    }}
                >
                    <img
                        src={lightboxImg.src}
                        alt={lightboxImg.alt}
                        style={{
                            maxWidth: '90%', maxHeight: '90vh',
                            boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
                            borderRadius: '4px',
                            animation: 'zoomIn 0.4s var(--ease-spring)'
                        }}
                    />
                </div>
            )}

            <style>{`
        .gallery-item:hover img { transform: scale(1.05); }
        .gallery-item:hover .hover-overlay { opacity: 1; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { transform: scale(0.9); } to { transform: scale(1); } }
        @media (max-width: 768px) {
          .gallery-item { grid-column: span 1 !important; aspect-ratio: 1/1 !important; }
        }
      `}</style>
        </section>
    );
}
