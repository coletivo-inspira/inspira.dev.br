"use client";

import { useEffect, useRef } from "react";
import {
  extendTrail,
  segmentAlpha,
  snapToGrid,
  type GridPoint,
  type TrailSegment,
} from "@/lib/dotTrail";
import styles from "./DotTrail.module.css";

/** Must match the dotted `background-size` on `body` in globals.css. */
const GRID = 22;
/** radial-gradient dots sit at the centre of each tile. */
const GRID_OFFSET = GRID / 2;
const LIFETIME_MS = 700;
const CALM_LIFETIME_MS = 450;
const NODE_SIZE = 8;
const BAR_WIDTH = 3;
const MAX_SEGMENTS = 40;
const MAX_LINK_CELLS = 12;
const FALLBACK_COLOR = "#a3e5c2";
/** Without `mix-blend-mode` the mint would sit on top of text, so it is drawn lighter. */
const NO_BLEND_OPACITY = 0.55;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function snapToDots(x: number, y: number): GridPoint {
  const snapped = snapToGrid(x - GRID_OFFSET, y - GRID_OFFSET, GRID);
  return { x: snapped.x + GRID_OFFSET, y: snapped.y + GRID_OFFSET };
}

/**
 * Touch and pen input are ignored by checking `pointerType` on each event rather than
 * `(hover: none)` / `(pointer: coarse)`: touchscreen laptops and some desktop browsers
 * report those media features even when a mouse is in use.
 */
function isMouseEvent(event: PointerEvent | MouseEvent): boolean {
  return !("pointerType" in event) || !event.pointerType || event.pointerType === "mouse";
}

export function DotTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion =
      typeof window.matchMedia === "function" ? window.matchMedia(REDUCED_MOTION_QUERY) : null;
    const blendSupported =
      typeof CSS !== "undefined" && typeof CSS.supports === "function"
        ? CSS.supports("mix-blend-mode", "multiply")
        : false;
    const opacity = blendSupported ? 1 : NO_BLEND_OPACITY;
    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--color-mint").trim() ||
      FALLBACK_COLOR;
    const moveEvent = "PointerEvent" in window ? "pointermove" : "mousemove";

    let calm = reducedMotion?.matches ?? false;
    let segments: TrailSegment[] = [];
    let last: GridPoint | null = null;
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const lifetime = () => (calm ? CALM_LIFETIME_MS : LIFETIME_MS);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const life = lifetime();
      segments = segments.filter((segment) => now - segment.born < life);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineCap = "square";

      const offsetX = window.scrollX;
      const offsetY = window.scrollY;

      for (const segment of segments) {
        const alpha = segmentAlpha(now - segment.born, life);
        const scale = calm ? 1 : 0.35 + 0.65 * alpha;
        const x = segment.point.x - offsetX;
        const y = segment.point.y - offsetY;
        ctx.globalAlpha = alpha * opacity;

        if (segment.from) {
          ctx.lineWidth = BAR_WIDTH * scale;
          ctx.beginPath();
          ctx.moveTo(segment.from.x - offsetX, segment.from.y - offsetY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        const size = NODE_SIZE * scale;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
      frame = segments.length > 0 ? requestAnimationFrame(draw) : 0;
    };

    const trackPointer = () => {
      if (!pointer) return;
      const next = snapToDots(pointer.x + window.scrollX, pointer.y + window.scrollY);
      if (last && last.x === next.x && last.y === next.y) return;

      segments = extendTrail(segments, last, next, performance.now(), {
        step: GRID,
        maxSegments: MAX_SEGMENTS,
        maxLinkCells: MAX_LINK_CELLS,
        calm,
      });
      last = next;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: Event) => {
      const move = event as PointerEvent | MouseEvent;
      if (!isMouseEvent(move)) return;
      pointer = { x: move.clientX, y: move.clientY };
      trackPointer();
    };

    const onLeave = () => {
      pointer = null;
      last = null;
    };

    const onMotionChange = () => {
      calm = reducedMotion?.matches ?? false;
      segments = [];
      last = null;
    };

    resize();
    window.addEventListener(moveEvent, onMove, { passive: true });
    window.addEventListener("scroll", trackPointer, { passive: true });
    window.addEventListener("resize", resize);
    document.documentElement.addEventListener("mouseleave", onLeave);
    reducedMotion?.addEventListener?.("change", onMotionChange);

    return () => {
      window.removeEventListener(moveEvent, onMove);
      window.removeEventListener("scroll", trackPointer);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      reducedMotion?.removeEventListener?.("change", onMotionChange);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
