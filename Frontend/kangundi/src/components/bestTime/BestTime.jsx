import { bestTime } from "../../data/bestTime";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function BestTime() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="best-time" className="section-lg bg-light" ref={ref}>
            <div className="container">
                <header className={`section-header animate-item ${isVisible ? "in-view" : ""}`}>
                    <span className="section-pretitle">Seasonal Guide</span>
                    <h2>Best Time to Visit</h2>
                    <p>Plan your trip based on weather and activities</p>
                </header>

                <div className={`grid-2 animate-item delay-200 ${isVisible ? "in-view" : ""}`}>
                    {bestTime.map((item, index) => (
                        <div key={index} className="feature-card">
                            <h3 className="text-accent">{item.season}</h3>
                            <span style={{
                                display: 'inline-block',
                                marginBottom: '1rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#1e293b'
                            }}>
                                {item.months}
                            </span>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
