import { formatGitHubDate } from "@/lib/github";
import type { GitHubRepo, RepoMetadata } from "@/types/github";
import styles from "./RepoCard.module.css";

interface RepoCardProps {
  repo: GitHubRepo;
  metadata: RepoMetadata | undefined;
  onSelect: (repo: GitHubRepo) => void;
}

export function RepoCard({ repo, metadata, onSelect }: RepoCardProps) {
  const portfolioUrl = metadata?.portfolioUrl ?? null;
  const contributors = metadata?.contributors;

  return (
    <article className={styles.card}>
      <div className={styles.index}>GH</div>
      <div className={styles.body}>
        <div className={styles.header}>
          <h3>{repo.name}</h3>
          {repo.language ? <span>{repo.language}</span> : null}
        </div>
        <p className={styles.description}>
          {repo.description || "Este repositório ainda não possui descrição."}
        </p>
        <dl className={styles.meta}>
          <div>
            <dt>Contribuidores</dt>
            <dd>{contributors ?? "--"}</dd>
          </div>
          <div>
            <dt>Atualizado</dt>
            <dd>{formatGitHubDate(repo.updated_at)}</dd>
          </div>
        </dl>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={() => onSelect(repo)}>
          Ver detalhes
        </button>
        {portfolioUrl ? (
          <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
            Abrir portfólio
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`} aria-hidden="true">
      <div className={styles.index}>--</div>
      <div className={styles.body}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
      </div>
    </div>
  );
}
