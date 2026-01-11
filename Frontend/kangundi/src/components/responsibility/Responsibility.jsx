import { responsibilityItems } from "../../data/responsibility";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function Responsibility() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="responsibility" className="section-lg" ref={ref}>
            <div className="container">
                <header className={`section-header animate-item ${isVisible ? "in-view" : ""}`}>
                    <span className="section-pretitle">Travel Mindfully</span>
                    <h2>Responsible Tourism</h2>
                    <p>Help preserve Kangundhi for future generations</p>
                </header>

                <div className={`grid-2 animate-item delay-200 ${isVisible ? "in-view" : ""}`}>
                    {responsibilityItems.map((item, index) => (
                        <div key={index} className="feature-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                            <h3 className="text-accent">{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
