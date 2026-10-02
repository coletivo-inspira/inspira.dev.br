import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell/SiteShell";
import { solutionsOffers } from "@/data/hub";
import { withBasePath } from "@/lib/basePath";
import styles from "../institutional.module.css";

export const metadata: Metadata = {
  title: "Soluções | Coletivo Inspira",
  description:
    "Portfólios gratuitos, LINO/B2B e cultura — soluções do Coletivo Inspira em inspira.dev.br/solucoes.",
};

export default function SolucoesPage() {
  return (
    <SiteShell>
      <article className={styles.page}>
        <div className="section-container">
          <p className="eyebrow">Soluções</p>
          <h1>O que o Inspira coloca em movimento.</h1>
          <p className={styles.lead}>
            Sites, automação com o LINO e um modelo freemium cuja mensalidade
            sustenta o Coletivo Cuida e o Respira & Inspira.
          </p>

          <div className={styles.offerGrid}>
            {solutionsOffers.map((offer) => (
              <article className={styles.offerCard} key={offer.id}>
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
                <a href={withBasePath(offer.href)}>
                  {offer.cta} <span aria-hidden="true">-&gt;</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
