"use client";

import { useEffect, useRef, useState } from "react";
import { pillars } from "@/data/hub";
import styles from "./SectionPillars.module.css";

type RevealState = "idle" | "pending" | "in";

export function SectionPillars() {
  const [openId, setOpenId] = useState(pillars[0]?.id ?? "Tecnologia");
  const [reveal, setReveal] = useState<RevealState>("idle");
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || typeof IntersectionObserver === "undefined") return;
    if (stack.getBoundingClientRect().top < window.innerHeight) return;

    setReveal("pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setReveal("in");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(stack);
    return () => observer.disconnect();
  }, []);

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

        <div className={styles.stack} ref={stackRef} data-reveal={reveal}>
          {pillars.map((pillar, index) => {
            const open = openId === pillar.id;
            return (
              <article
                className={styles.folder}
                data-tone={pillar.tone}
                data-open={open}
                key={pillar.id}
                style={{ ["--index" as string]: index }}
              >
                <button
                  type="button"
                  className={styles.tab}
                  aria-expanded={open}
                  aria-controls={`pilar-${pillar.id}`}
                  onClick={() => setOpenId(pillar.id)}
                >
                  <span>{pillar.number}</span>
                  <strong>{pillar.title}</strong>
                  <b className={styles.arrow} aria-hidden="true">
                    →
                  </b>
                </button>
                <div className={styles.panel} id={`pilar-${pillar.id}`} inert={!open}>
                  <div className={styles.panelInner}>
                    <div className={styles.body}>
                      <p>{pillar.description}</p>
                      <p className={styles.summary}>{pillar.summary}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
