import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InspiraOrb } from "./InspiraOrb";

function mockMatchMedia(matchingQueries: string[]) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: matchingQueries.some((item) => query.includes(item)),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

function mockCanvasContext() {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    createRadialGradient: vi.fn(() => ({
      addColorStop: vi.fn(),
    })),
  } as unknown as CanvasRenderingContext2D);
}

describe("InspiraOrb", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders a link with the default aria-label and a canvas", () => {
    mockMatchMedia([]);
    mockCanvasContext();
    const { container } = render(<InspiraOrb />);

    const link = screen.getByRole("link", {
      name: "Coletivo Inspira — ir ao site oficial",
    });
    expect(link).toHaveAttribute("href", "/");
    expect(container.querySelector("canvas")).not.toBeNull();
  });

  it("accepts a custom href and label", () => {
    mockMatchMedia([]);
    mockCanvasContext();
    render(
      <InspiraOrb href="https://inspira.dev.br/" label="Voltar ao hub" />,
    );

    const link = screen.getByRole("link", { name: "Voltar ao hub" });
    expect(link).toHaveAttribute("href", "https://inspira.dev.br/");
  });

  it("marks reduced-motion when the preference is set", async () => {
    mockMatchMedia(["prefers-reduced-motion"]);
    mockCanvasContext();
    render(<InspiraOrb />);

    const link = screen.getByRole("link", {
      name: "Coletivo Inspira — ir ao site oficial",
    });
    await waitFor(() => {
      expect(link).toHaveAttribute("data-reduced-motion", "true");
    });
  });
});
