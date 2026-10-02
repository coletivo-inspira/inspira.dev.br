import { culturalEvents } from "@/data/events";
import { withBasePath } from "@/lib/basePath";
import styles from "./AgendaCultural.module.css";

export function AgendaCultural() {
  return (
    <section id="agenda" className={styles.section} aria-labelledby="agenda-title">
      <div className="section-container">
        <div className="section-heading">
          <p className="eyebrow">Agenda cultural</p>
          <h2 id="agenda-title">Encontros que movem o território</h2>
          <p>
            Festas, mostras e experiências do pilar Cultura — de Bonito a Belo
            Horizonte — em uma linha do tempo viva.
          </p>
        </div>

        <div className={styles.list}>
          {culturalEvents.map((event) => (
            <article className={styles.card} key={event.id}>
              <div className={styles.meta}>
                <span className={styles.status}>{event.status}</span>
                <span>{event.when}</span>
              </div>
              <p className={styles.eyebrow}>{event.eyebrow}</p>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className={styles.footer}>
                <span>{event.location}</span>
                {event.href ? (
                  <a href={withBasePath(event.href)}>
                    Detalhes <span aria-hidden="true">-&gt;</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
