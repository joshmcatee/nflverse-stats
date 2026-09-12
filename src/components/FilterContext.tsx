"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_FILTERS, type FilterState } from "@/lib/types";

type FilterCtx = {
  draft: FilterState;
  applied: FilterState;
  setDraft: (next: FilterState) => void;
  apply: () => void;
  restore: () => void;
};

const Ctx = createContext<FilterCtx | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<FilterState>(DEFAULT_FILTERS);
  const [applied, setApplied] = useState<FilterState>(DEFAULT_FILTERS);

  const apply = useCallback(() => setApplied({ ...draft }), [draft]);
  const restore = useCallback(() => {
    setDraft(DEFAULT_FILTERS);
    setApplied(DEFAULT_FILTERS);
  }, []);

  const value = useMemo(
    () => ({ draft, applied, setDraft, apply, restore }),
    [draft, applied, apply, restore],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFilters() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider");
  return ctx;
}
