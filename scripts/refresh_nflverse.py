#!/usr/bin/env python3
"""
refresh_nflverse.py — future data pipeline for nflverse Stats

Intended flow (not implemented yet):
  1. Use nflreadpy (or nfl_data_py) to pull play-by-play / team stats
     for the requested season(s) and week range.
  2. Aggregate EPA, success rate, pass EPA, etc. per team.
  3. Write parquet intermediates under data/parquet/ for reuse.
  4. Emit public/data/team_tiers_{season}.json (and sibling section
     JSON files) consumed by the Next.js frontend.

Example sketch (do not run as-is without installing deps):

    # pip install nflreadpy pandas pyarrow
    import nflreadpy as nfl
    import pandas as pd
    from pathlib import Path

    season = 2025
    pbp = nfl.load_pbp([season])
    # filter weeks, downs, garbage time, etc.
    # groupby posteam / defteam → off_epa, def_epa, ...
    out = Path("public/data") / f"team_tiers_{season}.json"
    # out.write_text(...)

Usage (once implemented):
    python scripts/refresh_nflverse.py --season 2025 --week-min 1 --week-max 18

Until then the site ships with sample JSON under public/data/ so the
homepage works offline for design / Vercel handoff.
"""

from __future__ import annotations

import argparse
import sys


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Refresh nflverse-derived JSON for the stats site (stub)."
    )
    parser.add_argument("--season", type=int, default=2025)
    parser.add_argument("--week-min", type=int, default=1)
    parser.add_argument("--week-max", type=int, default=18)
    args = parser.parse_args()

    print(
        f"[stub] Would refresh team tiers for season={args.season} "
        f"weeks {args.week_min}-{args.week_max} via nflreadpy → parquet/JSON."
    )
    print("Install nflreadpy + pandas + pyarrow, then implement aggregation.")
    print("Sample data lives at public/data/team_tiers_2025.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
