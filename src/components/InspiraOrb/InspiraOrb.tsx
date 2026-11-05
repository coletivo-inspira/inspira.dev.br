"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/basePath";
import { createOrbSystem, drawOrbFrame } from "@/lib/inspiraOrbDraw";
import styles from "./InspiraOrb.module.css";

const DEFAULT_LABEL = "Coletivo Inspira — ir ao site oficial";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type InspiraOrbProps = {
  href?: string;
  label?: string;
};

export function InspiraOrb({
  href = "/",
  label = DEFAULT_LABEL,
}: InspiraOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engagedRef = useRef(false);
  const reducedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => {
      reducedRef.current = media.matches;
      setReducedMotion(media.matches);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    const system = createOrbSystem(12);
    let frame = 0;
    let breath = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = canvas.clientWidth || 84;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = (now: number) => {
      if (!running) return;
      const reduced = reducedRef.current;
      breath += reduced ? 0 : 0.012;
      drawOrbFrame({
        ctx,
        width: canvas.clientWidth || 84,
        height: canvas.clientHeight || 84,
        now,
        system,
        engaged: engagedRef.current,
        reducedMotion: reduced,
        breath,
      });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const setEngaged = (value: boolean) => {
    engagedRef.current = value;
  };

  const resolvedHref = withBasePath(href);
  const className = reducedMotion
    ? `${styles.orb} ${styles.reduced}`
    : styles.orb;

  return (
    <a
      className={className}
      href={resolvedHref}
      aria-label={label}
      data-reduced-motion={reducedMotion ? "true" : undefined}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={() => setEngaged(false)}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <span className={styles.plus} aria-hidden="true">
        <svg className={styles.plusSvg} viewBox="0 0 196 196" focusable="false">
          <path
            d="M75 19 H121 V75 H177 V121 H121 V177 H75 V121 H19 V75 H75 V19 Z"
            fill="#133824"
          />
        </svg>
      </span>
    </a>
  );
}
