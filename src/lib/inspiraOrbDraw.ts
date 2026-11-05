/** Brand palette for the LINO-style orb (lime → mint → orange). */
export const ORB_PALETTE = [
  { r: 186, g: 255, b: 41 }, // lime #BAFF29
  { r: 163, g: 229, b: 194 }, // mint #A3E5C2
  { r: 240, g: 93, b: 35 }, // orange #F05D23
] as const;

export type Rgb = { r: number; g: number; b: number };

export type OrbSatellite = {
  angle: number;
  baseRadius: number;
  radius: number;
  speed: number;
  size: number;
  phase: number;
};

export type OrbSystem = {
  sats: OrbSatellite[];
};

const TAU = Math.PI * 2;
const CYCLE_MS = 14000;

export function createOrbSystem(count = 12): OrbSystem {
  const sats: OrbSatellite[] = Array.from({ length: count }, () => {
    const dir = Math.random() > 0.5 ? 1 : -1;
    const baseRadius = 16 + Math.random() * 20;
    return {
      angle: Math.random() * TAU,
      baseRadius,
      radius: baseRadius,
      speed: dir * (0.008 + Math.random() * 0.01),
      size: 1.4 + Math.random() * 2,
      phase: Math.random() * TAU,
    };
  });
  return { sats };
}

export function mixPalette(nowMs: number): Rgb {
  const t = (nowMs % CYCLE_MS) / CYCLE_MS;
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

function rgba(c: Rgb, a: number) {
  return `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${a})`;
}

function lighten(c: Rgb, amount: number): Rgb {
  return {
    r: c.r + (255 - c.r) * amount,
    g: c.g + (255 - c.g) * amount,
    b: c.b + (255 - c.b) * amount,
  };
}

export type DrawOrbFrameOptions = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  now: number;
  system: OrbSystem;
  engaged: boolean;
  reducedMotion: boolean;
  breath: number;
};

/** Draws one LINO-style frame: soft core + orbiting shiny satellites. */
export function drawOrbFrame({
  ctx,
  width,
  height,
  now,
  system,
  engaged,
  reducedMotion,
  breath,
}: DrawOrbFrameOptions) {
  ctx.clearRect(0, 0, width, height);

  const cx = width * 0.5;
  const cy = height * 0.5;
  const color = mixPalette(now);
  const hi = lighten(color, 0.55);
  const soft = lighten(color, 0.25);
  const alpha = 0.92;
  const speedBoost = reducedMotion ? 0 : 1 + (engaged ? 2.4 : 0);
  const breathFactor = 0.9 + Math.sin(breath) * 0.08 + (engaged ? 0.08 : 0);

  for (const sat of system.sats) {
    if (!reducedMotion) {
      sat.angle += sat.speed * speedBoost;
    }
    const orbitRadius =
      sat.baseRadius * (1 + 0.12 * Math.sin(now * 0.0017 + sat.phase));
    const fusedRadius = 7 + 2.2 * Math.sin(now * 0.005 + sat.phase);
    const fusion = engaged && !reducedMotion ? 0.35 : 0;
    const targetRadius = orbitRadius * (1 - fusion) + fusedRadius * fusion;
    sat.radius += (targetRadius - sat.radius) * (0.08 + fusion * 0.12);

    const sx = cx + Math.cos(sat.angle) * sat.radius;
    const sy = cy + Math.sin(sat.angle) * sat.radius;
    const satAlpha = alpha * (0.55 + fusion * 0.2);

    ctx.beginPath();
    ctx.fillStyle = rgba(soft, satAlpha * 0.35);
    ctx.arc(sx, sy, sat.size * 2.6, 0, TAU);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = rgba(hi, satAlpha);
    ctx.arc(sx, sy, sat.size, 0, TAU);
    ctx.fill();
  }

  const glowRadius = (34 + Math.sin(breath * 0.6) * 4) * breathFactor;
  const innerRadius = 7.5 * breathFactor;

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
  glow.addColorStop(0, rgba(hi, 0.28 * alpha));
  glow.addColorStop(0.45, rgba(soft, 0.1 * alpha));
  glow.addColorStop(1, rgba(color, 0));
  ctx.beginPath();
  ctx.fillStyle = glow;
  ctx.arc(cx, cy, glowRadius, 0, TAU);
  ctx.fill();

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerRadius);
  core.addColorStop(0, rgba(hi, 0.9 * alpha));
  core.addColorStop(1, rgba(color, 0.06 * alpha));
  ctx.beginPath();
  ctx.fillStyle = core;
  ctx.arc(cx, cy, innerRadius, 0, TAU);
  ctx.fill();

  if (engaged && !reducedMotion) {
    const spin = now * 0.0025;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.strokeStyle = rgba(hi, alpha * (0.18 - i * 0.04));
      ctx.lineWidth = 1.2 - i * 0.2;
      ctx.arc(cx, cy, 16 + i * 5, spin + i * 0.9, spin + i * 0.9 + 2.1);
      ctx.stroke();
    }
  }
}
