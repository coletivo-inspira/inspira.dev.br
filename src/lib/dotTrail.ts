export interface GridPoint {
  x: number;
  y: number;
}

export function snapToGrid(x: number, y: number, step: number): GridPoint {
  return {
    x: Math.round(x / step) * step,
    y: Math.round(y / step) * step,
  };
}

/** Grid points walked from `a` to `b` (excluding `a`), horizontal first, then vertical. */
export function connectPoints(a: GridPoint, b: GridPoint, step: number): GridPoint[] {
  const path: GridPoint[] = [];
  const dx = Math.sign(b.x - a.x) * step;
  const dy = Math.sign(b.y - a.y) * step;
  let x = a.x;
  let y = a.y;

  while (dx !== 0 && x !== b.x) {
    x += dx;
    path.push({ x, y });
  }
  while (dy !== 0 && y !== b.y) {
    y += dy;
    path.push({ x, y });
  }

  return path;
}

export interface TrailSegment {
  point: GridPoint;
  from: GridPoint | null;
  born: number;
}

export interface TrailOptions {
  step: number;
  maxSegments: number;
  /** Jumps longer than this (in grid cells) start a new trail instead of drawing a long bar. */
  maxLinkCells: number;
  /** Reduced-motion mode: only the dot under the cursor lights up, without connecting bars. */
  calm: boolean;
}

export function extendTrail(
  segments: TrailSegment[],
  last: GridPoint | null,
  next: GridPoint,
  now: number,
  { step, maxSegments, maxLinkCells, calm }: TrailOptions,
): TrailSegment[] {
  if (calm) return [{ point: next, from: null, born: now }];

  const cells = last ? Math.max(Math.abs(next.x - last.x), Math.abs(next.y - last.y)) / step : 0;
  const added: TrailSegment[] = [];

  if (!last || cells > maxLinkCells) {
    added.push({ point: next, from: null, born: now });
  } else {
    let previous = last;
    for (const point of connectPoints(last, next, step)) {
      added.push({ point, from: previous, born: now });
      previous = point;
    }
  }

  return [...segments, ...added].slice(-maxSegments);
}

/** Remaining visibility of a trail piece: 1 when new, 0 once `lifetime` has passed. */
export function segmentAlpha(age: number, lifetime: number): number {
  if (age <= 0) return 1;
  if (age >= lifetime) return 0;
  const t = age / lifetime;
  return 1 - t * t;
}
