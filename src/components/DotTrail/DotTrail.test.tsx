import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DotTrail } from "./DotTrail";

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

describe("DotTrail", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders a decorative canvas", () => {
    mockMatchMedia(false);
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const { container } = render(<DotTrail />);
    const canvas = container.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("does not listen to the pointer when reduced motion is requested", () => {
    mockMatchMedia(true);
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      {} as CanvasRenderingContext2D,
    );
    const addListener = vi.spyOn(window, "addEventListener");

    render(<DotTrail />);

    expect(addListener).not.toHaveBeenCalledWith("pointermove", expect.anything(), expect.anything());
  });
});
