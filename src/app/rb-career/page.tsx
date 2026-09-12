import { AppShell } from "@/components/AppShell";
import { ComingSoon } from "@/components/ComingSoon";

export default function Page() {
  return (
    <AppShell active="rb-career">
      <ComingSoon title="RB Career" />
    </AppShell>
  );
}
