"use client";

import { useMemo, useState } from "react";
import type { TeamTier } from "@/lib/types";
import { formatEpa, formatSr } from "@/lib/format";

type SortKey =
  | "team"
  | "off_epa"
  | "def_epa"
  | "off_sr"
  | "def_sr"
  | "off_pass_epa"
  | "def_pass_epa";

type Props = {
  teams: TeamTier[];
  scopeLine: string;
  mode: "epa" | "weighted";
};

const COLUMNS: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "team", label: "Team" },
  { key: "off_epa", label: "Off EPA/play", numeric: true },
  { key: "def_epa", label: "Def EPA/play", numeric: true },
  { key: "off_sr", label: "Off SR", numeric: true },
  { key: "def_sr", label: "Def SR", numeric: true },
  { key: "off_pass_epa", label: "Off Pass EPA", numeric: true },
  { key: "def_pass_epa", label: "Def Pass EPA", numeric: true },
];

function valueFor(t: TeamTier, key: SortKey, mode: "epa" | "weighted"): string | number {
  if (key === "team") return t.team;
  if (mode === "weighted") {
    if (key === "off_epa") return t.weighted_off_epa;
    if (key === "def_epa") return t.weighted_def_epa;
  }
  return t[key] as number;
}

export function DataTable({ teams, scopeLine, mode }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("off_epa");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const copy = [...teams];
    copy.sort((a, b) => {
      const av = valueFor(a, sortKey, mode);
      const bv = valueFor(b, sortKey, mode);
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc"
          ? av.localeCompare(bv)
          : bv.localeCompare(av);
      }
      const an = Number(av);
      const bn = Number(bv);
      return sortDir === "asc" ? an - bn : bn - an;
    });
    return copy;
  }, [teams, sortKey, sortDir, mode]);

  const onSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "team" ? "asc" : "desc");
    }
  };

  const exportCsv = () => {
    const headers = [
      "#",
      "Team",
      "Off EPA/play",
      "Def EPA/play",
      "Off SR",
      "Def SR",
      "Off Pass EPA",
      "Def Pass EPA",
    ];
    const rows = sorted.map((t, i) => {
      const off = mode === "epa" ? t.off_epa : t.weighted_off_epa;
      const def = mode === "epa" ? t.def_epa : t.weighted_def_epa;
      return [
        i + 1,
        t.team,
        off.toFixed(3),
        def.toFixed(3),
        t.off_sr.toFixed(3),
        t.def_sr.toFixed(3),
        t.off_pass_epa.toFixed(3),
        t.def_pass_epa.toFixed(3),
      ].join(",");
    });
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "team_tiers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Table</h2>
          <p className="mt-0.5 text-xs text-slate-500">{scopeLine}</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-200/80"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
              <th className="px-2 py-2 font-medium">#</th>
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th key={col.key} className="px-2 py-2 font-medium">
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className={`inline-flex items-center gap-1 ${
                        active ? "text-slate-900" : "hover:text-slate-800"
                      }`}
                    >
                      {col.label}
                      <span className="text-[10px] opacity-70">
                        {active ? (sortDir === "desc" ? "▼" : "▲") : "↕"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((t, i) => {
              const off = mode === "epa" ? t.off_epa : t.weighted_off_epa;
              const def = mode === "epa" ? t.def_epa : t.weighted_def_epa;
              return (
                <tr
                  key={t.team}
                  className="border-b border-slate-100 odd:bg-slate-50/50"
                >
                  <td className="px-2 py-2 text-slate-400">{i + 1}</td>
                  <td className="px-2 py-2">
                    <span className="inline-flex items-center gap-2 font-medium text-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.logo}
                        alt=""
                        width={22}
                        height={22}
                        className="h-[22px] w-[22px] object-contain"
                      />
                      {t.team}
                    </span>
                  </td>
                  <td className="px-2 py-2 tabular-nums text-slate-800">
                    {formatEpa(off)}
                  </td>
                  <td className="px-2 py-2 tabular-nums text-slate-800">
                    {formatEpa(def)}
                  </td>
                  <td className="px-2 py-2 tabular-nums text-slate-800">
                    {formatSr(t.off_sr)}
                  </td>
                  <td className="px-2 py-2 tabular-nums text-slate-800">
                    {formatSr(t.def_sr)}
                  </td>
                  <td className="px-2 py-2 tabular-nums text-slate-800">
                    {formatEpa(t.off_pass_epa)}
                  </td>
                  <td className="px-2 py-2 tabular-nums text-slate-800">
                    {formatEpa(t.def_pass_epa)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
