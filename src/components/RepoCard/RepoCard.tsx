import { repoCatalog } from "@/data/repoCatalog";
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
  const contributorList = metadata?.contributorList ?? [];
  const catalog = repoCatalog[repo.name];
  const category = catalog?.category ?? (repo.has_pages ? "Portfólio" : "Repositório");
  const stack = repo.language ?? catalog?.stack ?? null;
  const hiddenContributors =
    typeof contributors === "number" ? Math.max(contributors - contributorList.length, 0) : 0;

  return (
    <article className={styles.card}>
      <div className={styles.index}>
        <span>{category}</span>
        {stack ? <span className={styles.stack}>{stack}</span> : null}
      </div>
      <div className={styles.body}>
        <h3>{repo.name}</h3>
        <p className={styles.description}>
          {repo.description || "Este repositório ainda não possui descrição."}
        </p>
        <dl className={styles.meta}>
          <div>
            <dt>Contribuidores</dt>
            <dd>
              {contributorList.length > 0 ? (
                <ul className={styles.avatars}>
                  {contributorList.map((person) => (
                    <li key={person.login}>
                      <a
                        href={person.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={person.login}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={person.avatar_url} alt={person.login} width={32} height={32} loading="lazy" />
                      </a>
                    </li>
                  ))}
                  {hiddenContributors > 0 ? (
                    <li className={styles.avatarMore} aria-label={`mais ${hiddenContributors}`}>
                      +{hiddenContributors}
                    </li>
                  ) : null}
                </ul>
              ) : (
                (contributors ?? "--")
              )}
            </dd>
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
