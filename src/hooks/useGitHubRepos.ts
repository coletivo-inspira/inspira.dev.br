"use client";

import { useEffect, useState, useCallback } from "react";
import type { GitHubRepo, RepoMetadata } from "@/types/github";
import {
  fetchOrgRepos,
  fetchContributorCount,
  getPortfolioUrl,
} from "@/lib/github";

export interface UseGitHubReposResult {
  repos: GitHubRepo[];
  /** Keyed by repo id */
  metadata: Map<number, RepoMetadata>;
  loading: boolean;
  error: string | null;
  rateLimited: boolean;
}

interface CacheData {
  timestamp: number;
  repos: GitHubRepo[];
  metadataRecord: Record<number, RepoMetadata>;
}

const CACHE_KEY = "coletivo_inspira_github_cache";
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

export function useGitHubRepos(): UseGitHubReposResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [metadata, setMetadata] = useState<Map<number, RepoMetadata>>(
    () => new Map(),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);

  const saveToCache = useCallback((currentRepos: GitHubRepo[], currentMetadata: Map<number, RepoMetadata>) => {
    if (typeof window === "undefined") return;
    const metadataRecord = Object.fromEntries(currentMetadata.entries());
    const cacheData: CacheData = {
      timestamp: Date.now(),
      repos: currentRepos,
      metadataRecord,
    };
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch {
      // Ignore quota errors
    }
  }, []);

  const loadContributors = useCallback(
    (repoList: GitHubRepo[], currentMeta: Map<number, RepoMetadata>) => {
      for (const repo of repoList) {
        // Skip if we already have the contributor count from cache
        if (currentMeta.get(repo.id)?.contributors != null) {
          continue;
        }

        fetchContributorCount(repo.name).then((count) => {
          setMetadata((prev) => {
            const next = new Map(prev);
            const existing = next.get(repo.id);
            next.set(repo.id, {
              portfolioUrl: existing?.portfolioUrl ?? getPortfolioUrl(repo),
              contributors: count,
              contributorStatus: count !== null ? "loaded" : "unavailable",
            });
            // Update cache progressively
            saveToCache(repoList, next);
            return next;
          });
        });
      }
    },
    [saveToCache],
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Check cache first
      if (typeof window !== "undefined") {
        try {
          const cachedString = window.localStorage.getItem(CACHE_KEY);
          if (cachedString) {
            const cached: CacheData = JSON.parse(cachedString);
            if (Date.now() - cached.timestamp < CACHE_DURATION_MS) {
              setRepos(cached.repos);
              const cachedMeta = new Map(
                Object.entries(cached.metadataRecord).map(([k, v]) => [Number(k), v])
              );
              setMetadata(cachedMeta);
              setLoading(false);
              
              // We still want to fire loadContributors in case some repos failed to load 
              // contributors previously (e.g. rate limit hit mid-way during last visit)
              loadContributors(cached.repos, cachedMeta);
              return;
            }
          }
        } catch {
          // Ignore parse errors, just fetch fresh
        }
      }

      try {
        const result = await fetchOrgRepos();

        if (cancelled) return;

        if (result.rateLimited) {
          setRateLimited(true);
          setLoading(false);
          return;
        }

        const repoList = result.repos;
        setRepos(repoList);

        // Initialize metadata with portfolioUrl right away
        const initialMeta = new Map<number, RepoMetadata>();
        for (const repo of repoList) {
          initialMeta.set(repo.id, {
            portfolioUrl: getPortfolioUrl(repo),
            contributors: null,
            contributorStatus: "loaded",
          });
        }
        setMetadata(initialMeta);
        setLoading(false);

        // Save initial state to cache (no contributors yet)
        saveToCache(repoList, initialMeta);

        // Fire off contributor fetches (progressive update)
        loadContributors(repoList, initialMeta);
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os repositórios.",
        );
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [loadContributors, saveToCache]);

  return { repos, metadata, loading, error, rateLimited };
}
