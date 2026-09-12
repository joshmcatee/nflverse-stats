"use client";

import type { FilterState } from "@/lib/types";

type Props = {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onApply: () => void;
  onRestore: () => void;
};

export function FilterRail({ filters, onChange, onApply, onRestore }: Props) {
  const set = (patch: Partial<FilterState>) =>
    onChange({ ...filters, ...patch });

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm lg:w-56">
      <h2 className="mb-4 text-base font-semibold text-slate-900">Filters</h2>

      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600">
            Season Min
          </span>
          <input
            type="number"
            value={filters.seasonMin}
            onChange={(e) => set({ seasonMin: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600">
            Season Max
          </span>
          <input
            type="number"
            value={filters.seasonMax}
            onChange={(e) => set({ seasonMax: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600">
            Week Min
          </span>
          <input
            type="number"
            min={1}
            max={22}
            value={filters.weekMin}
            onChange={(e) => set({ weekMin: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600">
            Week Max
          </span>
          <input
            type="number"
            min={1}
            max={22}
            value={filters.weekMax}
            onChange={(e) => set({ weekMax: Number(e.target.value) })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </label>
      </div>

      <div className="mt-5 space-y-2">
        <button
          type="button"
          onClick={onApply}
          className="w-full rounded-xl bg-slate-200/80 px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-300/80"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={onRestore}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Restore Defaults
        </button>
      </div>
    </aside>
  );
}
