"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import styles from "./SectionHistory.module.css";

export function SectionHistory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const total = rect.height + window.innerHeight * 0.4;
      const seen = window.innerHeight * 0.7 - rect.top;
      setProgress(Math.min(1, Math.max(0, seen / total)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="history-title"
      style={{ ["--route" as string]: String(progress) }}
    >
      <svg className={styles.map} viewBox="0 0 1200 640" aria-hidden="true">
        <g className={styles.contours}>
          <path d="M-20 120 C 180 80, 280 200, 460 140 S 760 40, 980 160 1220 80" />
          <path d="M-20 220 C 160 180, 340 300, 520 230 S 820 140, 1220 250" />
          <path d="M-20 340 C 200 280, 380 420, 600 340 S 900 260, 1220 360" />
          <path d="M-20 470 C 220 420, 420 540, 680 460 S 980 400, 1220 500" />
        </g>
        <path
          className={styles.route}
          d="M120 470 C 280 430, 360 360, 520 390 S 780 250, 1040 180"
          pathLength={1}
        />
        <circle className={styles.marker} cx={120 + progress * 920} cy={470 - progress * 290} r="10" />
      </svg>

      <div className="section-container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className="eyebrow">Nossa história</p>
            <h2 id="history-title">De Bonito-MS a Belo Horizonte.</h2>
            <p className={styles.lead}>
              O Coletivo Inspira nasceu quando amigos de infância voltaram para a
              cidade onde cresceram e decidiram criar o que gostariam de encontrar por lá.
            </p>
            <ol className={styles.milestones}>
              <li>
                <strong>Marco 01 · Bonito-MS</strong>
                Infância e Rio Formoso. A correnteza ainda é o ponto de partida.
              </li>
              <li>
                <strong>Marco 02 · Belo Horizonte</strong>
                A expansão urbana e digital, sem soltar a raiz.
              </li>
            </ol>
            <blockquote>“Seguimos fortes como as correntezas do Rio Formoso.”</blockquote>
          </div>
          <figure className={styles.gallery}>
            <Image
              src={withBasePath("/image/image2.png")}
              alt="Encontro cultural promovido pelo Coletivo Inspira"
              width={900}
              height={640}
              className={styles.mainPhoto}
            />
            <Image
              src={withBasePath("/image/image3.png")}
              alt="Pessoas da comunidade reunidas em uma ação do coletivo"
              width={600}
              height={600}
              className={styles.detailPhoto}
            />
            <figcaption>Bonito-MS / cultura em movimento</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
