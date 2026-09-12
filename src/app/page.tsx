import { readFile } from "fs/promises";
import path from "path";
import { TeamTiersPage } from "@/components/TeamTiersPage";
import type { TeamTiersPayload } from "@/lib/types";

async function loadTeamTiers(): Promise<TeamTiersPayload> {
  const file = path.join(
    process.cwd(),
    "public",
    "data",
    "team_tiers_2025.json",
  );
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as TeamTiersPayload;
}

export default async function HomePage() {
  const data = await loadTeamTiers();
  return <TeamTiersPage data={data} />;
}
