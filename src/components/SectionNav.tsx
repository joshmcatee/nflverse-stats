"use client";

import Link from "next/link";
import { SECTIONS, type SectionId } from "@/lib/types";

type Props = {
  active: SectionId;
};

export function SectionNav({ active }: Props) {
  return (
    <nav
      className="flex flex-wrap gap-2"
      aria-label="Stats sections"
    >
      {SECTIONS.map((s) => {
        const isActive = s.id === active;
        return (
          <Link
            key={s.id}
            href={s.href}
            className={
              isActive
                ? "rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-900 ring-1 ring-sky-200"
                : "rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-900"
            }
          >
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
