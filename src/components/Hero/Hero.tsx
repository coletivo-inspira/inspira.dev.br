import Image from "next/image";
import { hubConfig } from "@/data/hub";
import { withBasePath } from "@/lib/basePath";
import styles from "./Hero.module.css";

const BURST_TEXT = "BONITO-MS • BELO HORIZONTE • COLETIVO INSPIRA • ";

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <Image
          src={withBasePath("/image/image1.png")}
          alt="Encontros do Coletivo Inspira junto à água"
          fill
          sizes="(min-width: 960px) 46vw, 100vw"
          className={styles.background}
          priority
        />
        <svg className={styles.nodes} viewBox="0 0 400 280" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M40 180 C 90 120, 140 210, 200 150 S 320 80, 370 140" />
            <path d="M30 70 C 110 40, 160 110, 240 80" />
          </g>
          <g fill="currentColor">
            <circle cx="40" cy="180" r="4" />
            <circle cx="200" cy="150" r="5" />
            <circle cx="370" cy="140" r="4" />
            <circle cx="240" cy="80" r="3.5" />
          </g>
        </svg>
      </div>

      <div className={styles.copy}>
        <p className={styles.eyebrow}>{hubConfig.location}</p>
        <h1 id="hero-title">+INSPIRA</h1>
        <p className={styles.lead}>Onde a natureza encontra a tecnologia.</p>
        <p className={styles.text}>
          Tecnologia, cultura, cuidado e diversidade conectando Bonito-MS a Belo Horizonte.
        </p>
        <div className={styles.actions}>
          <a href={hubConfig.hudiPagesUrl} className="button buttonPrimary">
            Criar meu portfólio gratuito <span aria-hidden="true">-&gt;</span>
          </a>
          <a href={withBasePath(hubConfig.manifestoPath)} className="button buttonSecondary">
            Ler o manifesto
          </a>
        </div>
      </div>

      <div className={styles.burst} aria-hidden="true">
        <svg viewBox="0 0 120 120" className={styles.burstShape}>
          <polygon
            fill="currentColor"
            points="60,4 68,38 96,14 78,46 116,46 84,62 112,92 74,76 78,114 60,84 42,114 46,76 8,92 36,62 4,46 42,46 24,14 52,38"
          />
        </svg>
        <svg viewBox="0 0 120 120" className={styles.burstRing}>
          <defs>
            <path id="burst-circle" d="M60,60 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
          </defs>
          <text>
            <textPath href="#burst-circle">{BURST_TEXT}</textPath>
          </text>
        </svg>
        <span className={styles.burstPlus}>+</span>
      </div>
    </section>
  );
}
