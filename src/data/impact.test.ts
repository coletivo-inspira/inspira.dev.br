import { describe, expect, it, vi, afterEach } from "vitest";
import { impactMetrics } from "./impact";
import { getImpactMetrics } from "@/lib/impact";

describe("impact metrics", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.NEXT_PUBLIC_IMPACT_URL;
  });

  it("keeps the static transparency indicators", () => {
    expect(impactMetrics.map((metric) => metric.label)).toEqual([
      "Frentes regionais",
      "Pilares conectados",
      "Iniciativas no hub",
    ]);
  });

  it("falls back to static metrics when no endpoint is configured", async () => {
    await expect(getImpactMetrics()).resolves.toEqual(impactMetrics);
  });

  it("falls back when the remote endpoint fails", async () => {
    process.env.NEXT_PUBLIC_IMPACT_URL = "https://example.test/impact.json";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down")),
    );

    await expect(getImpactMetrics()).resolves.toEqual(impactMetrics);
  });
});
