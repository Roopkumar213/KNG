import { experiencesData } from "../../data/experiences";
import ExperienceCard from "./ExperienceCard";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function Experiences() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="things-to-do" className="section-lg" ref={ref}>
      <div className="container">
        <header className={`section-header animate-item ${isVisible ? "in-view" : ""}`}>
          <span className="section-pretitle">Visitor Experiences</span>
          <h2>Things To Do in Kangundhi</h2>
          <p>
            Authentic experiences combining heritage, spirituality, and adventure
          </p>
        </header>

        <div className={`grid-3 animate-item delay-200 ${isVisible ? "in-view" : ""}`}>
          {experiencesData.map((item, index) => (
            <ExperienceCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
