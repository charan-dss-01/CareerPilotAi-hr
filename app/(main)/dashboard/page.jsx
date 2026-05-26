import { getIndustryInsights, getCandidateDashboardStats } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardTabs from "./_component/dashboard-tabs";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const [insights, growthStats] = await Promise.all([
    getIndustryInsights(),
    getCandidateDashboardStats(),
  ]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <DashboardTabs insights={insights} growthStats={growthStats} />
    </div>
  );
}
