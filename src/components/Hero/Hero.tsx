import Image from "next/image";
import { hubConfig } from "@/data/hub";
import { withBasePath } from "@/lib/basePath";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <Image
        src={withBasePath("/image/image1.png")}
        alt="Integrantes e encontros do Coletivo Inspira"
        fill
        sizes="100vw"
        className={styles.background}
        priority
      />
      <div className={styles.colorBlock} aria-hidden="true" />
      <div className={styles.currentLine} aria-hidden="true">
        <span />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{hubConfig.location}</p>
          <h1 id="hero-title">+INSPIRA</h1>
          <p className={styles.lead}>
            Onde a natureza encontra a tecnologia.
          </p>
          <p className={styles.text}>
            Social, LINO/B2B e cultura viva conectando Bonito-MS a Belo Horizonte.
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
      </div>
    </section>
  );
}
