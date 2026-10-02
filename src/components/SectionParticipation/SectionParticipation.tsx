import { hubConfig, participationPaths } from "@/data/hub";
import { withBasePath } from "@/lib/basePath";
import styles from "./SectionParticipation.module.css";

export function SectionParticipation() {
  return (
    <section id="participe" className={styles.section} aria-labelledby="participation-title">
      <div className="section-container">
        <div className="section-heading">
          <p className="eyebrow">Chegue junto</p>
          <h2 id="participation-title">Escolha o seu jeito de fazer parte.</h2>
          <p>
            Você pode começar pela sua história, pelo seu negócio ou pela comunidade.
            O importante é colocar a primeira ideia em movimento.
          </p>
        </div>

        <div className={styles.grid}>
          {participationPaths.map((path, index) => (
            <article className={styles.card} data-accent={path.accent} key={path.title}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <p className={styles.label}>{path.label}</p>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <a href={withBasePath(path.href)}>
                {path.cta} <span aria-hidden="true">-&gt;</span>
              </a>
            </article>
          ))}
        </div>

        <div className={styles.finalCta}>
          <div>
            <p className={styles.finalEyebrow}>O próximo movimento</p>
            <h3>Uma boa ideia pode começar com você.</h3>
            <p>
              Traga sua ideia e descubra como cultura, tecnologia e cuidado podem fazê-la
              fluir.
            </p>
          </div>
          <a className="button buttonPrimary" href={hubConfig.instagramUrl}>
            Falar com o Coletivo Inspira
          </a>
        </div>
      </div>
    </section>
  );
}
