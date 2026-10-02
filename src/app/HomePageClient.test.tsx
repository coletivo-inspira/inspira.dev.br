import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { hubConfig } from "@/data/hub";
import { mainNavLinks } from "@/data/navigation";
import { HomePageClient } from "./HomePageClient";

vi.mock("@/hooks/useGitHubRepos", () => ({
  useGitHubRepos: () => ({
    repos: [],
    metadata: new Map(),
    loading: false,
    error: null,
    rateLimited: false,
  }),
}));

describe("Coletivo Inspira home", () => {
  it("renders the brand hero and required home sections", () => {
    render(<HomePageClient />);

    expect(screen.getByRole("heading", { level: 1, name: "+INSPIRA" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "O que faz a gente fluir" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Ideias que já encontraram correnteza" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Encontros que movem o território" }),
    ).toBeInTheDocument();
    expect(document.getElementById("vitrine")).not.toBeNull();
    expect(document.getElementById("agenda")).not.toBeNull();
  });

  it("exposes Social, Tecnologia, Cultura and Manifesto in the header", () => {
    render(<HomePageClient />);

    for (const link of mainNavLinks) {
      const matches = screen.getAllByRole("link", { name: link.label });
      expect(matches.length).toBeGreaterThan(0);
      expect(matches.some((node) => node.getAttribute("href") === link.href)).toBe(true);
    }
  });

  it("shows the footer seal pointing to /solucoes", () => {
    render(<HomePageClient />);

    const seal = screen.getByRole("link", {
      name: /Selo Inspira — conhecer soluções/i,
    });
    expect(seal).toHaveAttribute("href", hubConfig.solucoesPath);
    expect(seal).toHaveTextContent("inspira.dev.br/solucoes");
  });

  it("presents impact metrics on the home", () => {
    render(<HomePageClient />);

    expect(screen.getByText("Territórios conectados")).toBeInTheDocument();
    expect(screen.getByText("Pilares de impacto")).toBeInTheDocument();
    expect(screen.getByText("Iniciativas no hub")).toBeInTheDocument();
  });

  it("links to the free portfolio builder", () => {
    render(<HomePageClient />);

    expect(
      screen
        .getAllByRole("link", { name: /Criar meu portfólio gratuito/ })
        .every((link) => link.getAttribute("href") === hubConfig.hudiPagesUrl),
    ).toBe(true);
  });

  it("filters the solutions showcase by pillar", () => {
    render(<HomePageClient />);

    fireEvent.click(screen.getByRole("button", { name: "Portfólios +" }));

    expect(screen.getByRole("heading", { name: "HUDI Pages" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Olhares" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Portfólios ×" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
