import { useState } from "react";
import { faqs } from "../../data/faq";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function FAQ() {
    const { ref, isVisible } = useScrollAnimation();
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section-cinematic" ref={ref}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="text-gradient-gold" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        Information
                    </span>
                    <h2 style={{ fontSize: 'var(--text-h2)', color: 'var(--c-white)' }}>Answers</h2>
                </div>

                <div className="surface-glass" style={{ padding: '2rem', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease' }}>
                    {faqs.map((item, index) => (
                        <div
                            key={index}
                            className="faq-item"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 0' }}
                        >
                            <div
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 500, color: 'var(--c-white)' }}
                            >
                                {item.q}
                                <span style={{
                                    color: 'var(--c-gold)',
                                    transform: activeIndex === index ? 'rotate(45deg)' : 'rotate(0)',
                                    transition: 'transform 0.4s var(--ease-spring)'
                                }}>
                                    +
                                </span>
                            </div>
                            <div
                                className={`faq-answer ${activeIndex === index ? "open" : ""}`}
                                style={{
                                    maxHeight: activeIndex === index ? '300px' : '0', overflow: 'hidden',
                                    transition: 'max-height 0.5s var(--ease-cinema), opacity 0.5s ease',
                                    opacity: activeIndex === index ? 1 : 0,
                                    marginTop: activeIndex === index ? '1rem' : '0'
                                }}
                            >
                                <p style={{ color: 'var(--c-mist)', fontSize: '1rem', lineHeight: '1.6' }}>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
