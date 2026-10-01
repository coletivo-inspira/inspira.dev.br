"use client";

import { useEffect, useRef, useCallback } from "react";
import type { GitHubRepo, RepoMetadata } from "@/types/github";
import { formatGitHubDate } from "@/lib/github";
import styles from "./RepoModal.module.css";

interface RepoModalProps {
  repo: GitHubRepo | null;
  metadata: RepoMetadata | undefined;
  onClose: () => void;
}

export function RepoModal({ repo, metadata, onClose }: RepoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open/close the dialog when repo changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (repo) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [repo]);

  // Sync the native close event (Escape, backdrop click) with React state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  // Close on backdrop click (click on <dialog> itself, not its children)
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        dialogRef.current?.close();
      }
    },
    [],
  );

  const portfolioUrl = metadata?.portfolioUrl ?? null;
  const contributorDisplay =
    metadata?.contributors !== null && metadata?.contributors !== undefined
      ? String(metadata.contributors)
      : "—";

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="repo-modal-title"
      onClick={handleBackdropClick}
    >
      {repo ? (
        <article className={styles.panel}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => dialogRef.current?.close()}
            aria-label="Fechar modal"
          >
            <svg
              className={styles.closeIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className={styles.content}>
            <h2 id="repo-modal-title" className={styles.title}>
              {repo.name}
            </h2>

            <p className={styles.description}>
              {repo.description || "Sem descrição disponível."}
            </p>

            <div className={styles.metaGrid}>
              <MetaBlock label="Linguagem" value={repo.language || "—"} />
              <MetaBlock label="Contribuidores" value={contributorDisplay} />
              <MetaBlock
                label="Criado em"
                value={formatGitHubDate(repo.created_at)}
              />
              <MetaBlock
                label="Atualizado em"
                value={formatGitHubDate(repo.updated_at)}
              />
            </div>

            {repo.topics && repo.topics.length > 0 ? (
              <div className={styles.topicsSection}>
                <p className={styles.topicsLabel}>Tópicos</p>
                <div className={styles.topicsList}>
                  {repo.topics.map((topic) => (
                    <span key={topic} className={styles.topicChip}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className={styles.actions}>
              {portfolioUrl ? (
                <>
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryAction}
                  >
                    Visitar Portfólio
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryAction}
                  >
                    Ver no GitHub
                  </a>
                </>
              ) : (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryAction}
                >
                  Ver no GitHub
                </a>
              )}
            </div>
          </div>
        </article>
      ) : null}
    </dialog>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metaBlock}>
      <p className={styles.metaLabel}>{label}</p>
      <p className={styles.metaValue}>{value}</p>
    </div>
  );
}
