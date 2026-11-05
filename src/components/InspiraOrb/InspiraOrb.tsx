"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/basePath";
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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

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
    >
      <span className={styles.stage} aria-hidden="true">
        <span className={styles.aura} />
        <span className={styles.rings}>
          <span className={styles.ring} />
          <span className={styles.ringInner} />
          <span className={styles.sat1} />
          <span className={styles.sat2} />
          <span className={styles.sat3} />
        </span>
        <span className={styles.core}>
          <span className={styles.blobA} />
          <span className={styles.blobB} />
          <span className={styles.blobC} />
        </span>
        <span className={styles.plus}>
          <svg className={styles.plusSvg} viewBox="0 0 196 196" focusable="false">
            <path
              d="M75 19 H121 V75 H177 V121 H121 V177 H75 V121 H19 V75 H75 V19 Z"
              fill="#133824"
            />
          </svg>
        </span>
      </span>
    </a>
  );
}
