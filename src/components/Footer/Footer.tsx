import { hubConfig } from "@/data/hub";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.title}>Coletivo Inspira</p>
          <p>Cultura, tecnologia e impacto social em movimento.</p>
        </div>
        <nav aria-label="Links do rodapé">
          <a href={hubConfig.instagramUrl}>Instagram</a>
          <a href={hubConfig.whatsappUrl}>WhatsApp</a>
          <a href={hubConfig.githubUrl}>GitHub</a>
          <a href={hubConfig.hudiPagesUrl}>HUDI Pages</a>
        </nav>
      </div>

      <div className={styles.sealRow}>
        <a
          className={styles.seal}
          href={hubConfig.solucoesPath}
          aria-label="Selo Inspira — conhecer soluções em inspira.dev.br/solucoes"
        >
          <span className={styles.sealMark} aria-hidden="true">
            +I
          </span>
          <span className={styles.sealCopy}>
            <strong>Feito com Inspira</strong>
            <span>inspira.dev.br/solucoes</span>
          </span>
        </a>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Coletivo Inspira</span>
        <span>Bonito-MS + Belo Horizonte-MG</span>
      </div>
    </footer>
  );
}
