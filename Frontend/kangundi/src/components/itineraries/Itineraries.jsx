import { itineraries } from "../../data/itineraries";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function Itineraries() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="itineraries" className="section-cinematic" ref={ref}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="text-gradient-gold" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        Journeys
                    </span>
                    <h2 style={{ fontSize: 'var(--text-h2)', color: 'var(--c-white)' }}>Curated Plans</h2>
                </div>

                <div className="grid-2 perspective-3d">
                    {itineraries.map((plan, index) => (
                        <div
                            key={plan.id}
                            className="card-3d"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
                                transition: `all 0.8s var(--ease-cinema) ${index * 0.2}s`
                            }}
                        >
                            <h3 style={{ color: 'var(--c-white)', fontSize: '1.75rem', marginBottom: '2rem' }}>{plan.title}</h3>
                            <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                                {plan.blocks.map((block, i) => (
                                    <li key={i} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                                        <span style={{ color: 'var(--c-gold)', fontWeight: 700, minWidth: '80px' }}>{block.time}</span>
                                        <span style={{ color: 'var(--c-mist)' }}>{block.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
