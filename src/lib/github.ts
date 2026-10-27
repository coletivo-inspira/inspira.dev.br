import type { ContributorSummary, GitHubContributor, GitHubRepo } from "@/types/github";

export const GITHUB_ORG = "coletivo-inspira";

export const GITHUB_ORG_REPOS_API =
  `https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100` as const;

const CONTRIBUTORS_PER_PAGE = 100;
export const MAX_CONTRIBUTOR_AVATARS = 5;

export function contributorsApiUrl(repoName: string): string {
  return `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/contributors?per_page=${CONTRIBUTORS_PER_PAGE}`;
}

const GITHUB_HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
};

export function formatGitHubDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "N/A";

  return new Date(isoDate).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getPortfolioUrl(repo: Pick<GitHubRepo, "homepage" | "has_pages" | "name">): string | null {
  if (repo.homepage?.trim()) {
    try {
      return new URL(repo.homepage).toString();
    } catch {
      // Invalid homepage values are ignored in favor of the GitHub Pages fallback.
    }
  }

  if (repo.has_pages) {
    return `https://${GITHUB_ORG}.github.io/${repo.name}/`;
  }

  return null;
}

/**
 * Fetches all public repos for the org.
 * Throws on network errors.
 * Returns `{ repos, rateLimited }`.
 */
export async function fetchOrgRepos(): Promise<{
  repos: GitHubRepo[];
  rateLimited: boolean;
}> {
  const response = await fetch(GITHUB_ORG_REPOS_API, {
    headers: GITHUB_HEADERS,
  });

  if (response.status === 403) {
    return { repos: [], rateLimited: true };
  }

  if (!response.ok) {
    throw new Error(`Falha na API do GitHub (status ${response.status})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    return { repos: [], rateLimited: false };
  }

  return { repos: data as GitHubRepo[], rateLimited: false };
}

/**
 * Fetches the contributor count and the most active contributors of a repo.
 * When the repo has more than one page of contributors, the count is
 * estimated from the `Link` header `last` page.
 *
 * Returns `null` when the data is unavailable (403, 404, network error).
 */
export async function fetchContributors(repoName: string): Promise<ContributorSummary | null> {
  try {
    const response = await fetch(contributorsApiUrl(repoName), {
      headers: GITHUB_HEADERS,
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    const list = Array.isArray(data) ? (data as GitHubContributor[]) : [];
    const top = list.slice(0, MAX_CONTRIBUTOR_AVATARS).map(({ login, avatar_url, html_url }) => ({
      login,
      avatar_url,
      html_url,
    }));

    const lastMatch = response.headers.get("link")?.match(/[?&]page=(\d+)>; rel="last"/);
    const count = lastMatch ? parseInt(lastMatch[1], 10) * CONTRIBUTORS_PER_PAGE : list.length;

    return { count, top };
  } catch {
    return null;
  }
}
