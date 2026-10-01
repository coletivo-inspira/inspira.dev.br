import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell/SiteShell";
import styles from "../institutional.module.css";

export const metadata: Metadata = {
  title: "Manifesto | Coletivo Inspira",
  description:
    "Onde a natureza encontra a tecnologia. Manifesto do Coletivo Inspira — de Bonito-MS a Belo Horizonte.",
};

export default function ManifestoPage() {
  return (
    <SiteShell>
      <article className={styles.page}>
        <div className="section-container">
          <p className="eyebrow">Manifesto</p>
          <h1>Onde a natureza encontra a tecnologia.</h1>
          <p className={styles.lead}>
            A fluidez das águas. A precisão do código. Nascemos no epicentro do
            ecoturismo e expandimos para a energia criativa de Belo Horizonte.
          </p>

          <div className={styles.prose}>
            <p>
              Criado pelos amigos de infância em Bonito-MS, o Coletivo Inspira
              conecta a exuberância natural às inovações tecnológicas globais.
              Nossa expansão para Belo Horizonte não abandona as raízes: cria uma
              simbiose entre a natureza de Mato Grosso do Sul e a festa, a rua e
              a inventividade mineira.
            </p>
            <p>
              Atuamos em três pilares — Social, Tecnologia (LINO/B2B) e Cultura —
              para que portfólios, negócios locais e encontros culturais fluam no
              mesmo movimento.
            </p>
            <p>
              Acolhedores quando o tema é cuidado. Vibrantes quando o tema é
              celebração. Técnico-acessíveis quando o tema é código e deploy.
            </p>
          </div>

          <div className={styles.actions}>
            <a className="button buttonPrimary" href="/#pilares">
              Ver os três pilares
            </a>
            <a className="button buttonSecondary" href="/solucoes/">
              Conhecer soluções
            </a>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
