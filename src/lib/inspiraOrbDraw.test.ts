import { describe, expect, it } from "vitest";
import {
  createLiquidOrb,
  liquidRadius,
  mixPalette,
  ORB_PALETTE,
  stepLiquidOrb,
} from "./inspiraOrbDraw";

function seeded() {
  let value = 0.42;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

describe("inspiraOrbDraw", () => {
  it("cycles palette colors over time", () => {
    const a = mixPalette(0);
    const b = mixPalette(7000);
    expect(a).toEqual(ORB_PALETTE[0]);
    expect(b.r).not.toBe(a.r);
  });

  it("keeps the organic outline close to the base radius", () => {
    const orb = createLiquidOrb(seeded());
    orb.hover = 1;
    orb.near = 1;
    for (let i = 0; i < 64; i++) {
      const r = liquidRadius(orb, (i / 64) * Math.PI * 2, 20);
      expect(r).toBeGreaterThan(20 * 0.85);
      expect(r).toBeLessThan(20 * 1.2);
    }
  });

  it("eases hover in and advances the liquid clock", () => {
    const orb = createLiquidOrb(seeded());
    const start = orb.time;
    stepLiquidOrb(orb, {
      dt: 16,
      hovering: true,
      proximity: 1,
      pointerAngle: 0,
      reducedMotion: false,
    });
    expect(orb.hover).toBeGreaterThan(0);
    expect(orb.hover).toBeLessThan(1);
    expect(orb.time).toBeGreaterThan(start);
  });

  it("freezes the liquid when reduced motion is requested", () => {
    const orb = createLiquidOrb(seeded());
    const start = orb.time;
    stepLiquidOrb(orb, {
      dt: 16,
      hovering: true,
      proximity: 1,
      pointerAngle: 0,
      reducedMotion: true,
    });
    expect(orb.time).toBe(start);
    expect(orb.hover).toBe(1);
    expect(orb.near).toBe(0);
  });
});
