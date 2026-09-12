export type TeamTier = {
  team: string;
  full_name: string;
  logo: string;
  off_epa: number;
  def_epa: number;
  off_sr: number;
  def_sr: number;
  off_pass_epa: number;
  def_pass_epa: number;
  weighted_off_epa: number;
  weighted_def_epa: number;
};

export type TeamTiersPayload = {
  meta: {
    season: number;
    week_min: number;
    week_max: number;
    updated: string;
    source: string;
  };
  teams: TeamTier[];
};

export type FilterState = {
  seasonMin: number;
  seasonMax: number;
  weekMin: number;
  weekMax: number;
};

export const DEFAULT_FILTERS: FilterState = {
  seasonMin: 2025,
  seasonMax: 2025,
  weekMin: 1,
  weekMax: 1,
};

export type SectionId =
  | "team-tiers"
  | "offense"
  | "defense"
  | "quarterbacks"
  | "pass-over-expected"
  | "fourth-downs"
  | "rb-career"
  | "hvt"
  | "wopr";

export const SECTIONS: { id: SectionId; label: string; href: string }[] = [
  { id: "team-tiers", label: "Team Tiers", href: "/" },
  { id: "offense", label: "Offense", href: "/offense" },
  { id: "defense", label: "Defense", href: "/defense" },
  { id: "quarterbacks", label: "Quarterbacks", href: "/quarterbacks" },
  { id: "pass-over-expected", label: "Pass Over Expected", href: "/pass-over-expected" },
  { id: "fourth-downs", label: "Fourth Downs", href: "/fourth-downs" },
  { id: "rb-career", label: "RB Career", href: "/rb-career" },
  { id: "hvt", label: "HVT", href: "/hvt" },
  { id: "wopr", label: "WOPR", href: "/wopr" },
];
