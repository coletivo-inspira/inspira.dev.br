"use client";

import { useCallback, useState } from "react";
import { RepoGrid } from "@/components/RepoGrid/RepoGrid";
import { RepoModal } from "@/components/RepoModal/RepoModal";
import { hubConfig } from "@/data/hub";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import type { GitHubRepo } from "@/types/github";
import styles from "./SectionCommunity.module.css";

export function SectionCommunity() {
  const { repos, metadata, loading, error, rateLimited } = useGitHubRepos();
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [language, setLanguage] = useState("Todos");
  const handleCloseModal = useCallback(() => setSelectedRepo(null), []);
  const languages = Array.from(
    new Set(repos.map((repo) => repo.language).filter((value): value is string => Boolean(value))),
  );
  const visibleRepos =
    language === "Todos" ? repos : repos.filter((repo) => repo.language === language);

  return (
    <section id="comunidade" className={styles.section} aria-labelledby="community-title">
      <div className="section-container">
        <div className={styles.header}>
          <div className="section-heading">
            <p className="eyebrow">Código aberto, rede viva</p>
            <h2 id="community-title">Comunidade no GitHub</h2>
            <p>
              Repositórios públicos, experimentos e portfólios que fazem parte do
              ecossistema Coletivo Inspira.
            </p>
          </div>
          <a className="button buttonPrimary" href={hubConfig.hudiPagesUrl}>
            Criar meu portfólio
          </a>
        </div>

        {rateLimited ? (
          <div className={styles.statusBox} role="alert">
            <strong>O GitHub pediu uma pausa.</strong>
            <p>O limite público foi atingido. Os projetos voltam a aparecer em alguns minutos.</p>
          </div>
        ) : null}

        {error ? (
          <div className={styles.statusBox} role="alert">
            <strong>Não foi possível carregar a comunidade agora.</strong>
            <p>{error}</p>
          </div>
        ) : null}

        {loading ? (
          <p className={styles.counter} role="status" aria-live="polite">
            Carregando repositórios...
          </p>
        ) : null}

        {!loading && !error && !rateLimited && repos.length > 0 ? (
          <p className={styles.counter} role="status" aria-live="polite">
            {visibleRepos.length} repositórios encontrados
          </p>
        ) : null}

        {languages.length > 0 ? (
          <div className={styles.filters} role="group" aria-label="Filtrar por linguagem">
            {["Todos", ...languages].map((item) => {
              const active = language === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLanguage(active && item !== "Todos" ? "Todos" : item)}
                >
                  {item} {active && item !== "Todos" ? "×" : "+"}
                </button>
              );
            })}
          </div>
        ) : null}

        {!loading && !error && !rateLimited && repos.length === 0 ? (
          <p className={styles.statusBox}>Nenhum repositório público encontrado.</p>
        ) : null}

        {!error && !rateLimited ? (
          <RepoGrid
            repos={visibleRepos}
            metadata={metadata}
            loading={loading}
            onSelectRepo={setSelectedRepo}
          />
        ) : null}
      </div>

      <RepoModal
        repo={selectedRepo}
        metadata={selectedRepo ? metadata.get(selectedRepo.id) : undefined}
        onClose={handleCloseModal}
      />
    </section>
  );
}
