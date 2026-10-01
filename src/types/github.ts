export interface GitHubOwner {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  topics: string[];
  has_pages: boolean;
  private: boolean;
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: GitHubOwner;
}

export type Repo = GitHubRepo;

export type ContributorCount = number | null;

export type ContributorStatus = "loaded" | "unavailable" | "rate-limited";

export interface RepoMetadata {
  portfolioUrl: string | null;
  contributors: ContributorCount;
  contributorStatus: ContributorStatus;
}

export interface GitHubApiError {
  status: number;
  message: string;
}
