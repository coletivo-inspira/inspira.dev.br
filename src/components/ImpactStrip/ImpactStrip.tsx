"use client";

import { useEffect, useState } from "react";
import { impactMetrics as fallbackMetrics, type ImpactMetric } from "@/data/impact";
import { getImpactMetrics } from "@/lib/impact";
import styles from "./ImpactStrip.module.css";

export function ImpactStrip() {
  const [metrics, setMetrics] = useState<readonly ImpactMetric[]>(fallbackMetrics);

  useEffect(() => {
    let cancelled = false;

    void getImpactMetrics().then((next) => {
      if (!cancelled) {
        setMetrics(next);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.strip} aria-labelledby="impact-title">
      <h2 id="impact-title" className="sr-only">
        O Coletivo Inspira em números
      </h2>
      <div className={styles.inner}>
        {metrics.map((metric) => (
          <div className={styles.metric} data-tone={metric.tone ?? "mint"} key={metric.label}>
            <div className={styles.top}>
              <strong>{metric.value}</strong>
            </div>
            <div className={styles.base}>
              <b>{metric.label}</b>
              <span>{metric.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
