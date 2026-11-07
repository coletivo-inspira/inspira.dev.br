"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/basePath";
import { createLiquidOrb, drawLiquidOrb, stepLiquidOrb } from "@/lib/inspiraOrbDraw";
import styles from "./InspiraOrb.module.css";

const DEFAULT_LABEL = "Coletivo Inspira — ir ao site oficial";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const BASE_RADIUS = 22;
/** Distance (px) from the orb edge where it starts leaning toward the cursor. */
const PROXIMITY_RANGE = 140;
const PLUS_PATH = "M75 19 H121 V75 H177 V121 H121 V177 H75 V121 H19 V75 H75 V19 Z";

type InspiraOrbProps = {
  href?: string;
  label?: string;
};

export function InspiraOrb({ href = "/", label = DEFAULT_LABEL }: InspiraOrbProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plusRef = useRef<HTMLSpanElement>(null);
  const hoveringRef = useRef(false);
  const reducedRef = useRef(false);
  const redrawRef = useRef<() => void>(() => {});
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => {
      reducedRef.current = media.matches;
      setReducedMotion(media.matches);
      redrawRef.current();
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const link = linkRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!link || !canvas || !ctx) return;

    const orb = createLiquidOrb();
    let size = 0;
    let frame = 0;
    let last = 0;
    let proximity = 0;
    let pointerAngle = -Math.PI / 4;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth || 104;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (dt: number) => {
      stepLiquidOrb(orb, {
        dt,
        hovering: hoveringRef.current,
        proximity,
        pointerAngle,
        reducedMotion: reducedRef.current,
      });
      const offset = drawLiquidOrb(ctx, orb, size, BASE_RADIUS);
      plusRef.current?.style.setProperty("--orb-plus-x", `${offset.x.toFixed(2)}px`);
      plusRef.current?.style.setProperty("--orb-plus-y", `${offset.y.toFixed(2)}px`);
    };

    const tick = (now: number) => {
      const dt = last ? now - last : 16;
      last = now;
      render(dt);
      frame = reducedRef.current ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    redrawRef.current = () => {
      if (reducedRef.current) {
        cancelAnimationFrame(frame);
        frame = 0;
        render(0);
      } else {
        start();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const rect = link.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy) - rect.width / 2;
      proximity = Math.min(1, Math.max(0, 1 - distance / PROXIMITY_RANGE));
      pointerAngle = Math.atan2(dy, dx);
    };

    const setHover = (value: boolean) => () => {
      hoveringRef.current = value;
      redrawRef.current();
    };
    const onEnter = setHover(true);
    const onLeave = setHover(false);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    link.addEventListener("mouseenter", onEnter);
    link.addEventListener("mouseleave", onLeave);
    link.addEventListener("focus", onEnter);
    link.addEventListener("blur", onLeave);
    redrawRef.current();

    return () => {
      cancelAnimationFrame(frame);
      redrawRef.current = () => {};
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      link.removeEventListener("mouseenter", onEnter);
      link.removeEventListener("mouseleave", onLeave);
      link.removeEventListener("focus", onEnter);
      link.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      className={styles.orb}
      href={withBasePath(href)}
      aria-label={label}
      data-reduced-motion={reducedMotion ? "true" : undefined}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <span ref={plusRef} className={styles.plus} aria-hidden="true">
        <svg viewBox="0 0 196 196" focusable="false">
          <defs>
            <linearGradient id="inspira-orb-plus-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2c6a45" />
              <stop offset="0.55" stopColor="#133824" />
              <stop offset="1" stopColor="#0b2416" />
            </linearGradient>
            <linearGradient id="inspira-orb-plus-sheen" x1="0" y1="0" x2="0.6" y2="0.6">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={PLUS_PATH}
            fill="url(#inspira-orb-plus-fill)"
            stroke="url(#inspira-orb-plus-fill)"
            strokeWidth="14"
            strokeLinejoin="round"
          />
          <path d={PLUS_PATH} fill="url(#inspira-orb-plus-sheen)" />
        </svg>
      </span>
    </a>
  );
}
