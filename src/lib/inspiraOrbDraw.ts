/** Brand palette for the liquid glass orb (lime → mint → orange). */
export const ORB_PALETTE = [
  { r: 186, g: 255, b: 41 }, // lime #BAFF29
  { r: 163, g: 229, b: 194 }, // mint #A3E5C2
  { r: 240, g: 93, b: 35 }, // orange #F05D23
] as const;

export const ORB_CYCLE_MS = 14000;

export type Rgb = { r: number; g: number; b: number };

export type LiquidBlob = {
  fx: number;
  fy: number;
  phase: number;
  colorOffset: number;
  size: number;
};

export type LiquidWave = {
  k: number;
  amp: number;
  speed: number;
  phase: number;
};

export type LiquidOrb = {
  blobs: LiquidBlob[];
  waves: LiquidWave[];
  time: number;
  hover: number;
  near: number;
  pointerAngle: number;
};

export type LiquidStepInput = {
  dt: number;
  hovering: boolean;
  proximity: number;
  pointerAngle: number;
  reducedMotion: boolean;
};

const TAU = Math.PI * 2;
const SEGMENTS = 72;
const FOREST = "19, 56, 36";

export function mixPalette(timeMs: number): Rgb {
  const t = (((timeMs % ORB_CYCLE_MS) + ORB_CYCLE_MS) % ORB_CYCLE_MS) / ORB_CYCLE_MS;
  const scaled = t * ORB_PALETTE.length;
  const i = Math.floor(scaled) % ORB_PALETTE.length;
  const j = (i + 1) % ORB_PALETTE.length;
  const f = scaled - Math.floor(scaled);
  const a = ORB_PALETTE[i];
  const b = ORB_PALETTE[j];
  return {
    r: a.r + (b.r - a.r) * f,
    g: a.g + (b.g - a.g) * f,
    b: a.b + (b.b - a.b) * f,
  };
}

function lighten(c: Rgb, amount: number): Rgb {
  return {
    r: c.r + (255 - c.r) * amount,
    g: c.g + (255 - c.g) * amount,
    b: c.b + (255 - c.b) * amount,
  };
}

function darken(c: Rgb, amount: number): Rgb {
  return { r: c.r * (1 - amount), g: c.g * (1 - amount), b: c.b * (1 - amount) };
}

function rgba(c: Rgb, a: number) {
  return `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${a})`;
}

export function createLiquidOrb(random: () => number = Math.random): LiquidOrb {
  const blobs: LiquidBlob[] = Array.from({ length: 4 }, (_, i) => ({
    fx: 0.7 + random() * 0.7,
    fy: 0.7 + random() * 0.7,
    phase: random() * TAU,
    colorOffset: (i / 4) * ORB_CYCLE_MS,
    size: 0.7 + random() * 0.25,
  }));
  const waves: LiquidWave[] = [
    { k: 2, amp: 1 },
    { k: 3, amp: 0.7 },
    { k: 5, amp: 0.35 },
  ].map((wave) => ({
    ...wave,
    speed: (0.0006 + random() * 0.0005) * (random() > 0.5 ? 1 : -1),
    phase: random() * TAU,
  }));
  return {
    blobs,
    waves,
    time: random() * ORB_CYCLE_MS,
    hover: 0,
    near: 0,
    pointerAngle: -Math.PI / 4,
  };
}

/** Eases hover/proximity and advances the liquid clock. Reduced motion freezes the clock. */
export function stepLiquidOrb(orb: LiquidOrb, input: LiquidStepInput) {
  const targetHover = input.hovering ? 1 : 0;
  if (input.reducedMotion) {
    orb.hover = targetHover;
    orb.near = 0;
    return;
  }
  const dt = Math.min(Math.max(input.dt, 0), 64);
  const ease = 1 - Math.exp(-dt / 180);
  orb.hover += (targetHover - orb.hover) * ease;
  orb.near += (input.proximity - orb.near) * ease;
  const delta = Math.atan2(
    Math.sin(input.pointerAngle - orb.pointerAngle),
    Math.cos(input.pointerAngle - orb.pointerAngle),
  );
  orb.pointerAngle += delta * ease;
  orb.time += dt * (1 + orb.hover * 0.9);
}

export function orbRadius(orb: LiquidOrb, baseRadius: number) {
  return baseRadius * (1 + orb.hover * 0.14 + 0.025 * Math.sin(orb.time * 0.0011));
}

/** Organic outline: low-frequency waves plus a bulge leaning toward the pointer. */
export function liquidRadius(orb: LiquidOrb, theta: number, radius: number) {
  let wave = 0;
  for (const w of orb.waves) {
    wave += w.amp * Math.sin(w.k * theta + orb.time * w.speed + w.phase);
  }
  const wobble = 0.022 + orb.hover * 0.018 + orb.near * 0.008;
  const lean = Math.max(0, Math.cos(theta - orb.pointerAngle));
  const bulge = 0.07 * orb.near * (1 - orb.hover * 0.6) * lean ** 4;
  return radius * (1 + wobble * wave + bulge);
}

function traceOutline(
  ctx: CanvasRenderingContext2D,
  orb: LiquidOrb,
  cx: number,
  cy: number,
  radius: number,
) {
  const points: Array<[number, number]> = [];
  for (let i = 0; i < SEGMENTS; i++) {
    const theta = (i / SEGMENTS) * TAU;
    const r = liquidRadius(orb, theta, radius);
    points.push([cx + Math.cos(theta) * r, cy + Math.sin(theta) * r]);
  }
  const first = points[0];
  const last = points[SEGMENTS - 1];
  ctx.beginPath();
  ctx.moveTo((last[0] + first[0]) / 2, (last[1] + first[1]) / 2);
  for (let i = 0; i < SEGMENTS; i++) {
    const p = points[i];
    const n = points[(i + 1) % SEGMENTS];
    ctx.quadraticCurveTo(p[0], p[1], (p[0] + n[0]) / 2, (p[1] + n[1]) / 2);
  }
  ctx.closePath();
}

/**
 * Draws one liquid glass frame and returns the offset (px) the plus mark
 * should float by so it drifts with the liquid.
 */
export function drawLiquidOrb(
  ctx: CanvasRenderingContext2D,
  orb: LiquidOrb,
  size: number,
  baseRadius: number,
) {
  const cx = size / 2;
  const cy = size / 2;
  const R = orbRadius(orb, baseRadius);
  const t = orb.time;
  const tint = mixPalette(t);
  const leanX = Math.cos(orb.pointerAngle) * orb.near;
  const leanY = Math.sin(orb.pointerAngle) * orb.near;

  ctx.clearRect(0, 0, size, size);
  ctx.globalAlpha = 0.9 + orb.hover * 0.1;

  const pulse = 0.5 + 0.5 * Math.sin(t * 0.0009);
  const halo = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 1.9);
  halo.addColorStop(0, rgba(tint, 0.26 + 0.12 * orb.hover + 0.06 * pulse));
  halo.addColorStop(1, rgba(tint, 0));
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.9, 0, TAU);
  ctx.fill();

  ctx.save();
  ctx.translate(cx, cy + R * 0.98);
  ctx.scale(1, 0.28);
  const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.85);
  shadow.addColorStop(0, `rgba(${FOREST}, 0.16)`);
  shadow.addColorStop(1, `rgba(${FOREST}, 0)`);
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.arc(0, 0, R * 0.85, 0, TAU);
  ctx.fill();
  ctx.restore();

  ctx.save();
  traceOutline(ctx, orb, cx, cy, R);
  ctx.clip();

  const body = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R * 1.1);
  body.addColorStop(0, rgba(lighten(tint, 0.6), 0.6));
  body.addColorStop(1, rgba(lighten(tint, 0.2), 0.5));
  ctx.fillStyle = body;
  ctx.fillRect(0, 0, size, size);

  const blobAlpha = 0.8 + 0.18 * orb.hover;
  for (const blob of orb.blobs) {
    const bx = cx + R * 0.48 * Math.sin(t * 0.00041 * blob.fx + blob.phase) + leanX * R * 0.22;
    const by = cy + R * 0.48 * Math.cos(t * 0.00033 * blob.fy + blob.phase * 1.3) + leanY * R * 0.22;
    const br = R * blob.size * (1 + orb.hover * 0.1);
    const color = mixPalette(t + blob.colorOffset);
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    g.addColorStop(0, rgba(color, blobAlpha));
    g.addColorStop(0.55, rgba(color, blobAlpha * 0.45));
    g.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, TAU);
    ctx.fill();
  }

  const rim = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.12);
  rim.addColorStop(0, rgba(darken(tint, 0.35), 0));
  rim.addColorStop(1, rgba(darken(tint, 0.35), 0.3));
  ctx.fillStyle = rim;
  ctx.fillRect(0, 0, size, size);

  const causticX = cx + R * 0.18 - leanX * R * 0.1;
  const causticY = cy + R * 0.56 - leanY * R * 0.1;
  const caustic = ctx.createRadialGradient(causticX, causticY, 0, causticX, causticY, R * 0.6);
  caustic.addColorStop(0, "rgba(255, 255, 255, 0.5)");
  caustic.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = caustic;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.translate(cx - R * 0.3 + leanX * R * 0.06, cy - R * 0.46 + leanY * R * 0.06);
  ctx.rotate(-0.5);
  ctx.scale(1, 0.52);
  const spec = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.55);
  spec.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  spec.addColorStop(0.5, "rgba(255, 255, 255, 0.35)");
  spec.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = spec;
  ctx.beginPath();
  ctx.arc(0, 0, R * 0.55, 0, TAU);
  ctx.fill();
  ctx.restore();

  ctx.restore();

  traceOutline(ctx, orb, cx, cy, R + 0.4);
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = `rgba(${FOREST}, 0.18)`;
  ctx.stroke();

  traceOutline(ctx, orb, cx, cy, R - 0.6);
  const edge = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
  edge.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  edge.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
  edge.addColorStop(1, "rgba(255, 255, 255, 0.65)");
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = edge;
  ctx.stroke();

  ctx.globalAlpha = 1;

  return {
    x: leanX * 2 + Math.sin(t * 0.0011) * 0.8,
    y: leanY * 2 + Math.cos(t * 0.0009) * 0.8,
  };
}
