import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DotTrail } from "./DotTrail";

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
  } as unknown as CanvasRenderingContext2D);
}

function pointerListenerAdded(spy: { mock: { calls: unknown[][] } }) {
  return spy.mock.calls.some(([type]) => type === "pointermove" || type === "mousemove");
}

describe("DotTrail", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders a decorative canvas", () => {
    mockMatchMedia([]);
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const { container } = render(<DotTrail />);
    const canvas = container.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps following the mouse when reduced motion is requested (calm mode)", () => {
    mockMatchMedia(["prefers-reduced-motion"]);
    mockCanvasContext();
    const addListener = vi.spyOn(window, "addEventListener");

    render(<DotTrail />);

    expect(pointerListenerAdded(addListener)).toBe(true);
  });

  it("still runs on touchscreen laptops that report hover: none / pointer: coarse", () => {
    mockMatchMedia(["hover: none", "pointer: coarse"]);
    mockCanvasContext();
    const addListener = vi.spyOn(window, "addEventListener");

    render(<DotTrail />);

    expect(pointerListenerAdded(addListener)).toBe(true);
  });
});
