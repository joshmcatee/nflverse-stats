# nflverse Stats

Fantasy NFL analytics site shell (Next.js App Router + TypeScript + Tailwind), light analytics UI: pale blue/gray gradient, white rounded cards, pill section nav, left filter rail, chart + sortable table. Single information architecture.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Homepage loads Team Tiers from `public/data/team_tiers_2025.json` (works offline).

```bash
npm run build   # production build
npm start       # serve production build
```

## Pages

| Route | Status |
|-------|--------|
| `/` | Team Tiers scatter (logos) + sortable table + CSV export |
| `/offense` | Coming soon stub |
| `/defense` | Coming soon stub |
| `/quarterbacks` | Coming soon stub |
| `/pass-over-expected` | Coming soon stub |
| `/fourth-downs` | Coming soon stub |
| `/rb-career` | Coming soon stub |
| `/hvt` | Coming soon stub |
| `/wopr` | Coming soon stub |

Shared shell: title + last-updated chip, pill nav, season/week filters (Apply / Restore Defaults), EPA / Weighted EPA toggles on Team Tiers.

## Data pipeline (future)

`scripts/refresh_nflverse.py` documents the intended nflreadpy → parquet/JSON refresh. Until wired, sample JSON under `public/data/` powers the UI.

```bash
python scripts/refresh_nflverse.py --season 2025 --week-min 1 --week-max 18
```

## Design notes

- Charts: [`@observablehq/plot`](https://observablehq.com/plot/) with ESPN scoreboard logos as marks and dashed median crosshairs.
- Stack: Next.js (App Router), React, TypeScript, Tailwind CSS v4.

## Deploy handoff (Vercel / Dinesh)

1. Connect this repo (`joshmcatee/nflverse-stats`) in Vercel (or GitHub Pages via static export if preferred later).
2. Framework preset: **Next.js**. Build command `npm run build`, output `.next`.
3. No env secrets required for the sample shell.
4. After `scripts/refresh_nflverse.py` is implemented, run it in CI or a scheduled job and commit/publish updated `public/data/*.json`.

## License / attribution

Sample EPA values are illustrative, not live nflverse aggregates. Team logos loaded from ESPN CDN scoreboard URLs for display only.
