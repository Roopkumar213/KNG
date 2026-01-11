import { whyVisitData } from "../../data/whyVisit";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function WhyVisit() {
  const { ref, isVisible } = useScrollAnimation();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="why-visit" className="section-cinematic" ref={ref}>
      <div className="container">
        <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <span className="text-gradient-gold" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Discover
          </span>
          <h2 style={{ fontSize: 'var(--text-h2)', color: 'var(--c-white)' }}>Why Kangundhi?</h2>
        </div>

        <div className="grid-3 perspective-3d">
          {whyVisitData.features.map((feature, index) => (
            <div
              key={index}
              className="card-3d"
              onMouseMove={handleMouseMove}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`
              }}
            >
              <h3 style={{ color: 'var(--c-gold)', fontSize: '1.75rem', marginBottom: '1rem' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--c-mist)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
