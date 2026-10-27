"use client";

import { useEffect, useRef } from "react";
import { connectPoints, segmentAlpha, snapToGrid, type GridPoint } from "@/lib/dotTrail";
import styles from "./DotTrail.module.css";

/** Must match the dotted `background-size` on `body` in globals.css. */
const GRID = 22;
/** radial-gradient dots sit at the centre of each tile. */
const GRID_OFFSET = GRID / 2;
const LIFETIME_MS = 700;
const NODE_SIZE = 8;
const BAR_WIDTH = 3;
const MAX_SEGMENTS = 40;
/** Jumps longer than this (in grid cells) start a new trail instead of drawing a long bar. */
const MAX_LINK_CELLS = 12;
const FALLBACK_COLOR = "#a3e5c2";

const DISABLED_QUERY = "(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)";

interface Segment {
  point: GridPoint;
  from: GridPoint | null;
  born: number;
}

function snapToDots(x: number, y: number): GridPoint {
  const snapped = snapToGrid(x - GRID_OFFSET, y - GRID_OFFSET, GRID);
  return { x: snapped.x + GRID_OFFSET, y: snapped.y + GRID_OFFSET };
}

export function DotTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || typeof window.matchMedia !== "function") return;

    const disabledQuery = window.matchMedia(DISABLED_QUERY);
    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--color-mint").trim() ||
      FALLBACK_COLOR;

    let segments: Segment[] = [];
    let last: GridPoint | null = null;
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let listening = false;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      segments = segments.filter((segment) => now - segment.born < LIFETIME_MS);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineCap = "square";

      const offsetX = window.scrollX;
      const offsetY = window.scrollY;

      for (const segment of segments) {
        const alpha = segmentAlpha(now - segment.born, LIFETIME_MS);
        const scale = 0.35 + 0.65 * alpha;
        const x = segment.point.x - offsetX;
        const y = segment.point.y - offsetY;
        ctx.globalAlpha = alpha;

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

    const ensureRunning = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const trackPointer = () => {
      if (!pointer) return;
      const next = snapToDots(pointer.x + window.scrollX, pointer.y + window.scrollY);
      if (last && last.x === next.x && last.y === next.y) return;

      const now = performance.now();
      const cells = last ? Math.max(Math.abs(next.x - last.x), Math.abs(next.y - last.y)) / GRID : 0;

      if (!last || cells > MAX_LINK_CELLS) {
        segments.push({ point: next, from: null, born: now });
      } else {
        let previous = last;
        for (const point of connectPoints(last, next, GRID)) {
          segments.push({ point, from: previous, born: now });
          previous = point;
        }
      }

      if (segments.length > MAX_SEGMENTS) segments = segments.slice(-MAX_SEGMENTS);
      last = next;
      ensureRunning();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      trackPointer();
    };

    const onPointerLeave = () => {
      pointer = null;
      last = null;
    };

    const start = () => {
      if (listening) return;
      listening = true;
      resize();
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", trackPointer, { passive: true });
      window.addEventListener("resize", resize);
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", trackPointer);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
      frame = 0;
      segments = [];
      last = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const sync = () => (disabledQuery.matches ? stop() : start());
    sync();
    disabledQuery.addEventListener?.("change", sync);

    return () => {
      disabledQuery.removeEventListener?.("change", sync);
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
