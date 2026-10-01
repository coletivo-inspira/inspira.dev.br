import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGitHubRepos } from './useGitHubRepos';
import * as githubLib from '@/lib/github';

// Mock the github lib
vi.mock('@/lib/github', () => ({
  fetchOrgRepos: vi.fn(),
  fetchContributorCount: vi.fn(),
  getPortfolioUrl: vi.fn(),
}));

describe('useGitHubRepos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with empty state and loading true', () => {
    // Need to defer the mock resolution to see the initial state
    vi.mocked(githubLib.fetchOrgRepos).mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useGitHubRepos());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.repos).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should load repos and update state', async () => {
    const mockRepos = [
      { id: 1, name: 'repo-1', created_at: '2023-01-01', updated_at: '2023-01-02', html_url: '' }
    ] as any;

    vi.mocked(githubLib.fetchOrgRepos).mockResolvedValue({
      repos: mockRepos,
      rateLimited: false,
    });
    vi.mocked(githubLib.getPortfolioUrl).mockReturnValue('https://example.com');
    vi.mocked(githubLib.fetchContributorCount).mockResolvedValue(5);

    const { result } = renderHook(() => useGitHubRepos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repos).toEqual(mockRepos);
    expect(result.current.rateLimited).toBe(false);
    expect(result.current.metadata.get(1)?.portfolioUrl).toBe('https://example.com');

    // Wait for contributors to be loaded progressively
    await waitFor(() => {
      expect(result.current.metadata.get(1)?.contributors).toBe(5);
    });
  });

  it('should handle rate limits gracefully', async () => {
    vi.mocked(githubLib.fetchOrgRepos).mockResolvedValue({
      repos: [],
      rateLimited: true,
    });

    const { result } = renderHook(() => useGitHubRepos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.rateLimited).toBe(true);
    expect(result.current.repos).toEqual([]);
  });

  it('should handle API errors gracefully', async () => {
    vi.mocked(githubLib.fetchOrgRepos).mockRejectedValue(new Error('API failed'));

    const { result } = renderHook(() => useGitHubRepos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('API failed');
    expect(result.current.repos).toEqual([]);
  });
});
