import { describe, expect, it } from "vitest";
import { culturalEvents } from "./events";
import { hubConfig, pillars, projects, solutionsOffers } from "./hub";
import { mainNavLinks } from "./navigation";

describe("hub content registry", () => {
  it("keeps the four approved pillars", () => {
    expect(pillars.map((pillar) => pillar.id)).toEqual([
      "Tecnologia",
      "Cultura",
      "Saude",
      "Diversidade",
    ]);
  });

  it("keeps the approved hub highlights and HUDI destination", () => {
    const highlights = projects.filter((project) => project.featured);

    expect(highlights.map((project) => project.id)).toEqual([
      "canto-dos-passaros",
      "olhares",
      "hudi-pages",
    ]);
    expect(projects.find((project) => project.id === "hudi-pages")?.href).toBe(
      hubConfig.hudiPagesUrl,
    );
  });

  it("exposes the public nav required by INSP-001", () => {
    expect(mainNavLinks.map((link) => link.label)).toEqual([
      "Social",
      "Tecnologia",
      "Cultura",
      "Manifesto",
    ]);
  });

  it("keeps cultural agenda and solutions catalog non-empty", () => {
    expect(culturalEvents.length).toBeGreaterThan(0);
    expect(solutionsOffers.length).toBe(3);
    expect(hubConfig.solucoesPath).toBe("/solucoes/");
  });
});
