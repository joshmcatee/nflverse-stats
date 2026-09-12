import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ComingSoon";

export default function Page() {
  return (
    <AppShell active="quarterbacks">
      <ComingSoon title="Quarterbacks" />
    </AppShell>
  );
}
