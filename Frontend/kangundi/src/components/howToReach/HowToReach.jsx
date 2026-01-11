import { howToReach } from "../../data/howToReach";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function HowToReach() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="reach" className="section-lg" ref={ref}>
            <div className="container">
                <header className={`section-header animate-item ${isVisible ? "in-view" : ""}`}>
                    <span className="section-pretitle">Travel Information</span>
                    <h2>How to Reach Kangundhi</h2>
                    <p>Accessible by road, rail, and nearby airports</p>
                </header>

                <div className={`grid-3 animate-item delay-100 ${isVisible ? "in-view" : ""}`}>
                    {[howToReach.road, howToReach.rail, howToReach.air].map((item, index) => (
                        <div key={index} className="feature-card">
                            <h3>{item.title}</h3>
                            <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', listStyle: 'disc', color: '#64748b' }}>
                                {item.points.map((point, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem' }}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div
                    className={`animate-item delay-300 ${isVisible ? "in-view" : ""}`}
                    style={{
                        marginTop: '4rem',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        height: '450px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                >
                    <iframe
                        src={howToReach.mapEmbedUrl}
                        title="Kangundhi Location Map"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        style={{ width: '100%', height: '100%', border: 0 }}
                    />
                </div>
            </div>
        </section>
    );
}
