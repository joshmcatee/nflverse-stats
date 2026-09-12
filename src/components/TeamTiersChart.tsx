"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import type { TeamTier } from "@/lib/types";
import { median } from "@/lib/format";

export type MetricMode = "epa" | "weighted";

type Props = {
  teams: TeamTier[];
  mode: MetricMode;
};

export function TeamTiersChart({ teams, mode }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || teams.length === 0) return;

    const xKey = mode === "epa" ? "off_epa" : "weighted_off_epa";
    const yKey = mode === "epa" ? "def_epa" : "weighted_def_epa";

    const points = teams.map((t) => ({
      ...t,
      x: t[xKey] as number,
      y: t[yKey] as number,
    }));

    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const medX = median(xs);
    const medY = median(ys);

    const pad = 0.04;
    const xMin = Math.min(...xs, medX) - pad;
    const xMax = Math.max(...xs, medX) + pad;
    const yMin = Math.min(...ys, medY) - pad;
    const yMax = Math.max(...ys, medY) + pad;

    const width = Math.max(640, el.clientWidth || 720);

    const plot = Plot.plot({
      width,
      height: 480,
      marginLeft: 56,
      marginRight: 24,
      marginTop: 28,
      marginBottom: 48,
      style: {
        background: "transparent",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        fontSize: "12px",
        color: "#334155",
      },
      x: {
        label:
          mode === "epa"
            ? "Offense EPA/play →"
            : "Offense Weighted EPA/play →",
        labelAnchor: "center",
        grid: true,
        domain: [xMin, xMax],
        tickFormat: (d: number) => d.toFixed(2),
      },
      y: {
        label:
          mode === "epa"
            ? "↑ Defense EPA/play (lower better)"
            : "↑ Defense Weighted EPA/play (lower better)",
        labelAnchor: "center",
        grid: true,
        domain: [yMax, yMin],
        tickFormat: (d: number) => d.toFixed(2),
      },
      marks: [
        Plot.ruleX([medX], {
          stroke: "#94a3b8",
          strokeDasharray: "6,4",
          strokeWidth: 1.5,
        }),
        Plot.ruleY([medY], {
          stroke: "#94a3b8",
          strokeDasharray: "6,4",
          strokeWidth: 1.5,
        }),
        Plot.image(points, {
          x: "x",
          y: "y",
          src: "logo",
          width: 28,
          height: 28,
          title: (d: (typeof points)[0]) =>
            `${d.team}: Off ${d.x.toFixed(3)}, Def ${d.y.toFixed(3)}`,
        }),
      ],
    });

    el.replaceChildren(plot);
    return () => {
      el.replaceChildren();
    };
  }, [teams, mode]);

  return (
    <div
      ref={containerRef}
      className="mt-1 w-full overflow-x-auto rounded-xl bg-slate-50/60 ring-1 ring-slate-100"
    />
  );
}
