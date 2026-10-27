import { describe, expect, it } from "vitest";
import { connectPoints, extendTrail, segmentAlpha, snapToGrid } from "./dotTrail";

describe("snapToGrid", () => {
  it("rounds to the nearest grid point", () => {
    expect(snapToGrid(10, 12, 22)).toEqual({ x: 0, y: 22 });
    expect(snapToGrid(33, 54, 22)).toEqual({ x: 44, y: 44 });
  });
});

describe("connectPoints", () => {
  it("walks horizontally first, then vertically, without skipping dots", () => {
    expect(connectPoints({ x: 0, y: 0 }, { x: 44, y: -44 }, 22)).toEqual([
      { x: 22, y: 0 },
      { x: 44, y: 0 },
      { x: 44, y: -22 },
      { x: 44, y: -44 },
    ]);
  });

  it("returns an empty path for the same point", () => {
    expect(connectPoints({ x: 22, y: 22 }, { x: 22, y: 22 }, 22)).toEqual([]);
  });
});

describe("extendTrail", () => {
  const options = { step: 22, maxSegments: 40, maxLinkCells: 12, calm: false };

  it("links consecutive dots with bars", () => {
    const trail = extendTrail([], { x: 0, y: 0 }, { x: 44, y: 0 }, 10, options);

    expect(trail).toEqual([
      { point: { x: 22, y: 0 }, from: { x: 0, y: 0 }, born: 10 },
      { point: { x: 44, y: 0 }, from: { x: 22, y: 0 }, born: 10 },
    ]);
  });

  it("starts a new trail after a long jump", () => {
    const trail = extendTrail([], { x: 0, y: 0 }, { x: 22 * 20, y: 0 }, 10, options);

    expect(trail).toEqual([{ point: { x: 440, y: 0 }, from: null, born: 10 }]);
  });

  it("keeps only the dot under the cursor in calm mode", () => {
    const previous = [{ point: { x: 0, y: 0 }, from: null, born: 0 }];
    const trail = extendTrail(previous, { x: 0, y: 0 }, { x: 44, y: 0 }, 10, {
      ...options,
      calm: true,
    });

    expect(trail).toEqual([{ point: { x: 44, y: 0 }, from: null, born: 10 }]);
  });

  it("caps the number of segments", () => {
    const trail = extendTrail([], { x: 0, y: 0 }, { x: 22 * 10, y: 0 }, 10, {
      ...options,
      maxSegments: 3,
    });

    expect(trail).toHaveLength(3);
    expect(trail[2].point).toEqual({ x: 220, y: 0 });
  });
});

describe("segmentAlpha", () => {
  it("fades from 1 to 0 over the lifetime", () => {
    expect(segmentAlpha(0, 700)).toBe(1);
    expect(segmentAlpha(350, 700)).toBeCloseTo(0.75);
    expect(segmentAlpha(700, 700)).toBe(0);
    expect(segmentAlpha(900, 700)).toBe(0);
  });
});
