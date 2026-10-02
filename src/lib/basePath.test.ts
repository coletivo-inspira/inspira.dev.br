import { afterEach, describe, expect, it } from "vitest";
import { withBasePath } from "./basePath";

describe("withBasePath", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
  });

  it("keeps root-relative paths when the site is served from /", () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;

    expect(withBasePath("/manifesto/")).toBe("/manifesto/");
    expect(withBasePath("/#vitrine")).toBe("/#vitrine");
    expect(withBasePath("/image/logo/versao3.jpg")).toBe("/image/logo/versao3.jpg");
  });

  it("prefixes internal paths for the GitHub Pages project site", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/inspira.dev.br";

    expect(withBasePath("/manifesto/")).toBe("/inspira.dev.br/manifesto/");
    expect(withBasePath("/solucoes/")).toBe("/inspira.dev.br/solucoes/");
    expect(withBasePath("/#agenda")).toBe("/inspira.dev.br/#agenda");
    expect(withBasePath("/image/image2.png")).toBe("/inspira.dev.br/image/image2.png");
  });

  it("strips a trailing slash from the configured base", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/inspira.dev.br/";

    expect(withBasePath("/#inicio")).toBe("/inspira.dev.br/#inicio");
  });

  it("leaves external URLs and in-page anchors untouched", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/inspira.dev.br";

    expect(withBasePath("https://coletivo-inspira.github.io/hudi-pg/")).toBe(
      "https://coletivo-inspira.github.io/hudi-pg/",
    );
    expect(withBasePath("mailto:ola@inspira.dev.br")).toBe("mailto:ola@inspira.dev.br");
    expect(withBasePath("#conteudo")).toBe("#conteudo");
  });
});
