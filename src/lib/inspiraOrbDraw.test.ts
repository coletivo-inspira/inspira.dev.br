import { describe, expect, it } from "vitest";
import { createOrbSystem, mixPalette, ORB_PALETTE } from "./inspiraOrbDraw";

describe("inspiraOrbDraw", () => {
  it("creates the expected number of satellites", () => {
    const system = createOrbSystem(12);
    expect(system.sats).toHaveLength(12);
    expect(system.sats[0].baseRadius).toBeGreaterThan(0);
  });

  it("cycles palette colors over time", () => {
    const a = mixPalette(0);
    const b = mixPalette(7000);
    expect(a).toEqual(ORB_PALETTE[0]);
    expect(b.r).not.toBe(a.r);
  });
});
