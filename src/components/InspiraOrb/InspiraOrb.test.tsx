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
  const gradient = { addColorStop: vi.fn() };
  const methods: Record<string, unknown> = {
    createRadialGradient: vi.fn(() => gradient),
    createLinearGradient: vi.fn(() => gradient),
  };
  const ctx = new Proxy(methods, {
    get(target, prop: string) {
      if (!(prop in target)) target[prop] = vi.fn();
      return target[prop];
    },
    set(target, prop: string, value) {
      target[prop] = value;
      return true;
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    ctx as unknown as CanvasRenderingContext2D,
  );
  return methods;
}

describe("InspiraOrb", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders a link with the default aria-label and a decorative canvas", () => {
    mockMatchMedia([]);
    mockCanvasContext();
    const { container } = render(<InspiraOrb />);

    const link = screen.getByRole("link", {
      name: "Coletivo Inspira — ir ao site oficial",
    });
    expect(link).toHaveAttribute("href", "/");
    expect(container.querySelector("canvas")).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts a custom href and label", () => {
    mockMatchMedia([]);
    mockCanvasContext();
    render(<InspiraOrb href="https://inspira.dev.br/" label="Voltar ao hub" />);

    const link = screen.getByRole("link", { name: "Voltar ao hub" });
    expect(link).toHaveAttribute("href", "https://inspira.dev.br/");
  });

  it("draws a single static frame when reduced motion is requested", async () => {
    mockMatchMedia(["prefers-reduced-motion"]);
    const methods = mockCanvasContext();
    const raf = vi.spyOn(window, "requestAnimationFrame");
    render(<InspiraOrb />);

    const link = screen.getByRole("link", {
      name: "Coletivo Inspira — ir ao site oficial",
    });
    await waitFor(() => {
      expect(link).toHaveAttribute("data-reduced-motion", "true");
    });
    expect(methods.clip).toHaveBeenCalled();
    expect(raf).not.toHaveBeenCalled();
  });
});
