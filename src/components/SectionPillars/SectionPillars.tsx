import { pillars } from "@/data/hub";
import styles from "./SectionPillars.module.css";

export function SectionPillars() {
  return (
    <section id="pilares" className={styles.section} aria-labelledby="pillars-title">
      <div className="section-container">
        <div className="section-heading">
          <p className="eyebrow">Três frentes, um movimento</p>
          <h2 id="pillars-title">O que faz a gente fluir</h2>
          <p>
            Cada projeto nasce em uma frente e cresce conectado às outras. É assim
            que transformamos boas ideias em impacto real.
          </p>
        </div>

        <div className={styles.grid}>
          {pillars.map((pillar) => (
            <article className={styles.card} data-accent={pillar.accent} key={pillar.id}>
              <span className={styles.number}>{pillar.number}</span>
              <p className={styles.label}>{pillar.id}</p>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <a href={pillar.id === "Cultura" ? "/#agenda" : "/#vitrine"}>
                Ver iniciativas
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
