import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Mouse Parallax Logic
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20; // Move range -10px to 10px
    const y = (e.clientY / innerHeight - 0.5) * 20;
    setOffset({ x, y });
  };

  return (
    <section
      className="hero-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{ isolation: 'isolate' }}
    >
      {/* Background Layer (Parallax Inverted) */}
      <div
        className="hero-bg"
        style={{
          transform: `scale(1.1) translate(${-offset.x * 0.5}px, ${-offset.y * 0.5}px)`,
          transition: 'transform 0.1s linear' // Smooth out jitter
        }}
      ></div>

      {/* Cinematic Gradient Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at center, transparent 40%, #020617 100%), linear-gradient(to bottom, rgba(2,6,23,0.3), #020617)',
        zIndex: 1, pointerEvents: 'none'
      }}></div>

      {/* Content Layer (Parallax Forward) */}
      <div
        className="hero-content container reveal-stagger"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: 'transform 0.1s linear'
        }}
      >
        <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
          <span
            className="text-gradient-gold"
            style={{
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'inline-block'
            }}
          >
            Timeless Heritage
          </span>
        </div>

        <h1 className="hero-title" style={{ mixBlendMode: 'difference', color: 'var(--c-white)' }}>
          KANGUNDHI
        </h1>

        <p className="subtitle" style={{
          fontSize: 'var(--text-body-lg)',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          color: 'var(--c-mist)',
          fontWeight: 300
        }}>
          Where 950 years of fortress history meets the untamed beauty of Andhra’s bouldering landscapes.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="#about" className="btn-cinematic" style={{
            background: 'var(--c-white)', color: 'var(--c-void)',
            padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem',
            transition: 'transform 0.3s ease'
          }}>
            Explore Legend
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, animation: 'bounce 2s infinite', opacity: 0.6
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 10px); }
        }
        .btn-cinematic:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.4); }
      `}</style>
    </section>
  );
}
