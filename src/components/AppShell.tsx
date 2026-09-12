"use client";

import { SectionNav } from "@/components/SectionNav";
import { FilterRail } from "@/components/FilterRail";
import { FilterProvider, useFilters } from "@/components/FilterContext";
import type { SectionId } from "@/lib/types";
import { formatUpdated } from "@/lib/format";

type Props = {
  active: SectionId;
  updated?: string;
  children: React.ReactNode;
};

function ShellInner({ active, updated, children }: Props) {
  const { draft, setDraft, apply, restore } = useFilters();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100/70 via-slate-100/80 to-slate-200/50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              nflverse Stats
            </h1>
            {updated ? (
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200/80">
                Data updated: {formatUpdated(updated)}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <SectionNav active={active} />
          </div>
        </header>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <FilterRail
            filters={draft}
            onChange={setDraft}
            onApply={apply}
            onRestore={restore}
          />
          <main className="min-w-0 flex-1 space-y-5">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function AppShell(props: Props) {
  return (
    <FilterProvider>
      <ShellInner {...props} />
    </FilterProvider>
  );
}
