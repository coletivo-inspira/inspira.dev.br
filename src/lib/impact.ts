import { impactMetrics as staticImpactMetrics, type ImpactMetric } from "@/data/impact";

function isImpactMetric(value: unknown): value is ImpactMetric {
  if (!value || typeof value !== "object") return false;
  const metric = value as Record<string, unknown>;
  return (
    typeof metric.value === "string" &&
    typeof metric.label === "string" &&
    typeof metric.description === "string"
  );
}

/**
 * Consome indicadores de impacto de um endpoint opcional.
 * Sem URL ou em falha, usa o fallback estático versionado.
 */
export async function getImpactMetrics(): Promise<readonly ImpactMetric[]> {
  const endpoint = process.env.NEXT_PUBLIC_IMPACT_URL?.trim();

  if (!endpoint) {
    return staticImpactMetrics;
  }

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return staticImpactMetrics;
    }

    const payload: unknown = await response.json();
    const list = Array.isArray(payload)
      ? payload
      : payload &&
          typeof payload === "object" &&
          Array.isArray((payload as { metrics?: unknown }).metrics)
        ? (payload as { metrics: unknown[] }).metrics
        : null;

    if (!list || list.length === 0 || !list.every(isImpactMetric)) {
      return staticImpactMetrics;
    }

    return list;
  } catch {
    return staticImpactMetrics;
  }
}
