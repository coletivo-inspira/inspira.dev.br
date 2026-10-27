import { describe, expect, it } from "vitest";
import { connectPoints, segmentAlpha, snapToGrid } from "./dotTrail";

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

describe("segmentAlpha", () => {
  it("fades from 1 to 0 over the lifetime", () => {
    expect(segmentAlpha(0, 700)).toBe(1);
    expect(segmentAlpha(350, 700)).toBeCloseTo(0.75);
    expect(segmentAlpha(700, 700)).toBe(0);
    expect(segmentAlpha(900, 700)).toBe(0);
  });
});
