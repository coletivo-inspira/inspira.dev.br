import Image from "next/image";
import styles from "./SectionHistory.module.css";

export function SectionHistory() {
  return (
    <section id="sobre" className={styles.section} aria-labelledby="history-title">
      <div className="section-container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className="eyebrow">Nossa história</p>
            <h2 id="history-title">Amizade virou movimento.</h2>
            <p className={styles.lead}>
              O Coletivo Inspira nasceu quando amigos de infância voltaram para a
              cidade onde cresceram e decidiram criar o que gostariam de encontrar por lá.
            </p>
            <p>
              Começamos com encontros em Bonito-MS e seguimos conectando arte,
              cultura, desenvolvimento e diversão. Hoje, a correnteza alcança também
              Belo Horizonte e o ambiente digital, sempre com o mesmo compromisso:
              fazer junto, cuidar do território e abrir espaço para novas ideias.
            </p>
            <blockquote>
              “Seguimos fortes como as correntezas do Rio Formoso.”
            </blockquote>
          </div>

          <figure className={styles.gallery}>
            <Image
              src="/image/image2.png"
              alt="Encontro cultural promovido pelo Coletivo Inspira"
              width={900}
              height={640}
              className={styles.mainPhoto}
            />
            <Image
              src="/image/image3.png"
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
