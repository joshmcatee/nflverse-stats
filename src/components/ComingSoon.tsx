type Props = {
  title: string;
};

export function ComingSoon({ title }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-10 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">
        Coming soon — this section will use the same shell (filters, chart card,
        sortable table) once nflverse-backed data is wired via{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
          scripts/refresh_nflverse.py
        </code>
        .
      </p>
    </div>
  );
}
