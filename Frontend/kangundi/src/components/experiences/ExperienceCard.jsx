export default function ExperienceCard({ title, tag, duration, description }) {
  return (
    <article className="feature-card">
      <span className="text-accent" style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {tag}
      </span>
      <h3 style={{ marginTop: '0.5rem' }}>{title}</h3>
      <p>{description}</p>
      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.9rem', color: '#64748b' }}>
        <i className="duration-icon"></i> {duration}
      </div>
    </article>
  );
}
