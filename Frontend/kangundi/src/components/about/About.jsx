import useScrollAnimation from "../../hooks/useScrollAnimation";

const timelineEvents = [
  { year: "1066 AD", title: "The Beginning", desc: "Established as a strategic military outpost by the Kangundhi zamindars." },
  { year: "1600s", title: "Vijayanagara Era", desc: "Flourished under the patronage of the Vijayanagara Empire, expanding the fort fortifications." },
  { year: "1800s", title: "British Influence", desc: "Served as a key administrative center during the British colonial period." },
  { year: "2026", title: "Global Destination", desc: "Reimagined as a sustainable heritage and adventure tourism hub." }
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-cinematic" ref={ref}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

        {/* Editorial Text */}
        <div style={{ alignSelf: 'start' }}>
          <span className="text-gradient-gold" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
            The Legend
          </span>
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: '1.5rem', color: 'var(--c-white)' }}>
            A Fortress in the Sky
          </h2>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--c-mist)', marginBottom: '2rem' }}>
            Kangundhi is not just a place; it’s a living chronicle etched in stone.
            For nearly a millennium, these granite walls have stood sentinel over the valley,
            witnessing the rise and fall of empires.
          </p>
          <div className="stat-grid surface-glass" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '2.5rem', color: 'var(--c-gold)' }}>960</h4>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>Years Old</span>
            </div>
            <div>
              <h4 style={{ fontSize: '2.5rem', color: 'var(--c-gold)' }}>2,500</h4>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>Ft Elevation</span>
            </div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              style={{
                marginBottom: '3rem', position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                transition: `all 0.6s cubic-bezier(0.19, 1, 0.22, 1) ${index * 0.2}s`
              }}
            >
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute', left: '-2.45rem', top: '0.5rem',
                width: '12px', height: '12px', borderRadius: '50%', background: 'var(--c-gold)',
                boxShadow: '0 0 10px var(--c-gold)'
              }}></div>

              <span style={{ fontSize: '0.9rem', color: 'var(--c-gold)', fontWeight: 700, letterSpacing: '0.05em' }}>
                {event.year}
              </span>
              <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.5rem', color: 'var(--c-white)' }}>
                {event.title}
              </h3>
              <p style={{ color: 'var(--c-mist)', fontSize: '1rem', lineHeight: '1.6' }}>
                {event.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
