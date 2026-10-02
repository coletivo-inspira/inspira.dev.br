"use client";

import { useState } from "react";
import { pillars } from "@/data/hub";
import styles from "./SectionPillars.module.css";

export function SectionPillars() {
  const [openId, setOpenId] = useState(pillars[0]?.id ?? "Tecnologia");

  return (
    <section id="pilares" className={styles.section} aria-labelledby="pillars-title">
      <div className="section-container">
        <div className="section-heading">
          <p className="eyebrow">Quatro frentes, um movimento</p>
          <h2 id="pillars-title">O que faz a gente fluir</h2>
          <p>
            Cada frente abre como uma pasta. Tecnologia, cultura, saúde e diversidade
            seguem no mesmo movimento.
          </p>
        </div>

        <div className={styles.stack}>
          {pillars.map((pillar) => {
            const open = openId === pillar.id;
            return (
              <article className={styles.folder} data-tone={pillar.tone} key={pillar.id}>
                <button
                  type="button"
                  className={styles.tab}
                  aria-expanded={open}
                  aria-controls={`pilar-${pillar.id}`}
                  onClick={() => setOpenId(pillar.id)}
                >
                  <span>{pillar.number}</span>
                  <strong>{pillar.title}</strong>
                  <b aria-hidden="true">{open ? "↓" : "→"}</b>
                </button>
                {open ? (
                  <div className={styles.body} id={`pilar-${pillar.id}`}>
                    <p>{pillar.description}</p>
                    <p className={styles.summary}>{pillar.summary}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
