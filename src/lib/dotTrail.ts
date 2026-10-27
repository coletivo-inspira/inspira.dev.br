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

/** Remaining visibility of a trail piece: 1 when new, 0 once `lifetime` has passed. */
export function segmentAlpha(age: number, lifetime: number): number {
  if (age <= 0) return 1;
  if (age >= lifetime) return 0;
  const t = age / lifetime;
  return 1 - t * t;
}
