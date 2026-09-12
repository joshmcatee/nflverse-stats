"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TeamTiersChart, type MetricMode } from "@/components/TeamTiersChart";
import { DataTable } from "@/components/DataTable";
import { useFilters } from "@/components/FilterContext";
import type { TeamTiersPayload } from "@/lib/types";

type Props = {
  data: TeamTiersPayload;
};

function TeamTiersContent({ data }: Props) {
  const { applied } = useFilters();
  const [mode, setMode] = useState<MetricMode>("epa");

  const scopeLine = useMemo(() => {
    const season =
      applied.seasonMin !== applied.seasonMax
        ? `${applied.seasonMin}–${applied.seasonMax}`
        : String(applied.seasonMin);
    return `${season}, weeks ${applied.weekMin}–${applied.weekMax} · sample EPA · ${data.meta.source}`;
  }, [applied, data.meta.source]);

  return (
    <>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Team Tiers</h2>
            <p className="mt-0.5 text-xs text-slate-500">{scopeLine}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMode("epa")}
              className={
                mode === "epa"
                  ? "rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900 ring-1 ring-sky-200"
                  : "rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
              }
            >
              EPA
            </button>
            <button
              type="button"
              onClick={() => setMode("weighted")}
              className={
                mode === "weighted"
                  ? "rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900 ring-1 ring-sky-200"
                  : "rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
              }
            >
              Weighted EPA
            </button>
          </div>
        </div>
        <TeamTiersChart teams={data.teams} mode={mode} />
      </div>
      <DataTable teams={data.teams} scopeLine={scopeLine} mode={mode} />
    </>
  );
}

export function TeamTiersPage({ data }: Props) {
  return (
    <AppShell active="team-tiers" updated={data.meta.updated}>
      <TeamTiersContent data={data} />
    </AppShell>
  );
}
