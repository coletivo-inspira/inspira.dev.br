import type { GitHubRepo, RepoMetadata } from "@/types/github";
import { RepoCard, RepoCardSkeleton } from "@/components/RepoCard/RepoCard";
import styles from "./RepoGrid.module.css";

interface RepoGridProps {
  repos: GitHubRepo[];
  metadata: Map<number, RepoMetadata>;
  loading: boolean;
  onSelectRepo: (repo: GitHubRepo) => void;
}

const SKELETON_COUNT = 6;

export function RepoGrid({ repos, metadata, loading, onSelectRepo }: RepoGridProps) {
  if (loading) {
    return (
      <div className={styles.grid} aria-busy="true">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <RepoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
          metadata={metadata.get(repo.id)}
          onSelect={onSelectRepo}
        />
      ))}
    </div>
  );
}
