import React from "react";
import Link from "next/link";
import {
  Users,
  ThumbsUp,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  BarChart3,
  Search,
  Bookmark,
  Briefcase,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PipelineChart from "./_components/pipeline-chart";
import ScoreDistributionChart from "./_components/score-distribution-chart";
import { getRecruiterDashboardStats } from "@/actions/recruiter";

export const dynamic = "force-dynamic";

const RecruiterDashboard = async () => {
  let stats = null;
  try {
    stats = await getRecruiterDashboardStats();
  } catch (error) {
    console.error("Dashboard page failed to fetch stats:", error);
  }

  // Fallback data if no data exists
  const data = {
    totalCandidates: stats?.totalCandidates ?? 0,
    recommendedCount: stats?.recommendedCount ?? 0,
    selectedCount: stats?.selectedCount ?? 0,
    rejectedCount: stats?.rejectedCount ?? 0,
    pendingInterviews: stats?.pendingInterviews ?? 0,
    activeOpenings: stats?.activeOpenings ?? 0,
    avgMatchScore: stats?.avgMatchScore ?? 0,
    statusBreakdown: stats?.statusBreakdown ?? {},
    scoreDistribution: stats?.scoreDistribution ?? {},
    activeJobsList: stats?.activeJobsList ?? [],
  };

  const statCards = [
    {
      label: "Talent Pool",
      value: data.totalCandidates,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      label: "Shortlisted",
      value: data.recommendedCount,
      icon: ThumbsUp,
      color: "text-teal-400",
      bgColor: "bg-teal-400/10",
      borderColor: "border-teal-400/20",
    },
    {
      label: "Hired",
      value: data.selectedCount,
      icon: CheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      borderColor: "border-emerald-400/20",
    },
    {
      label: "Rejected",
      value: data.rejectedCount,
      icon: XCircle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/20",
    },
    {
      label: "Interviews",
      value: data.pendingInterviews,
      icon: Clock,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      borderColor: "border-amber-400/20",
    },
    {
      label: "Avg Qualification Score",
      value: `${data.avgMatchScore}%`,
      icon: Target,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 mb-20 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">
                Hiring Command Center
              </h1>
              <p className="text-muted-foreground text-sm">
                Real-time ATS pipeline logs and recruiter analytics
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-xl border-white/[0.08] bg-white/[0.02]">
            <Link href="/recruiter/jobs">
              <Briefcase className="w-4 h-4 mr-2" /> Manage Jobs
            </Link>
          </Button>
          <Button asChild className="rounded-xl">
            <Link href="/recruiter/jobs/new">
              <Plus className="w-4 h-4 mr-2" /> Post Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="group glass border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {stat.label}
                </CardTitle>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bgColor} border ${stat.borderColor} transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass border-white/[0.08] lg:col-span-2 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="font-display tracking-tight text-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Hiring Pipeline Funnel
            </CardTitle>
            <CardDescription className="text-xs">
              Candidate distribution across the screening and selection stages
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <PipelineChart stats={data} />
          </CardContent>
        </Card>

        <Card className="glass border-white/[0.08] shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="font-display tracking-tight text-xl flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" /> Score Distribution
            </CardTitle>
            <CardDescription className="text-xs">
              Grouping of applicants based on deterministic screening score
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col justify-center">
            <ScoreDistributionChart stats={data} />
          </CardContent>
        </Card>
      </div>

      {/* Job Listings Grid */}
      <Card className="glass border-white/[0.08] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-white/[0.04]">
          <div className="space-y-1">
            <CardTitle className="font-display tracking-tight text-xl flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-400" /> Active Job Postings ({data.activeJobsList.length})
            </CardTitle>
            <CardDescription className="text-xs">
              Active openings with candidates processed in real-time
            </CardDescription>
          </div>
          <Button asChild size="sm" variant="ghost" className="rounded-xl text-xs">
            <Link href="/recruiter/jobs" className="flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {data.activeJobsList.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm font-medium">
              No active job openings posted. Start by creating a new job.
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {data.activeJobsList.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="space-y-1">
                    <Link href={`/recruiter/jobs/${job.id}`} className="font-bold tracking-tight text-foreground hover:text-primary transition-colors text-sm">
                      {job.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                      <span>{job.companyName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {job.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground block font-semibold">Candidates</span>
                      <Badge variant="secondary" className="bg-white/[0.04] border-white/[0.08] text-xs">
                        {job.applicants} applied
                      </Badge>
                    </div>
                    <div className="text-right hidden sm:block">
                      <span className="text-xs text-muted-foreground block font-semibold">Avg Match</span>
                      <span className="text-sm font-bold text-teal-400">{job.avgScore}%</span>
                    </div>
                    <Button asChild size="icon" variant="ghost" className="rounded-xl h-8 w-8">
                      <Link href={`/recruiter/jobs/${job.id}`}>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass border-white/[0.08] hover:border-white/[0.12] transition-all duration-300 group shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="font-display tracking-tight text-lg">
                  Find Candidates
                </CardTitle>
                <CardDescription className="text-xs">
                  Search talent pool by skills, industry domain, and experience
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/recruiter/explorer">
              <Button className="w-full rounded-xl" size="lg">
                <Search className="mr-2 h-4 w-4" />
                Open Candidate Explorer
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="glass border-white/[0.08] hover:border-white/[0.12] transition-all duration-300 group shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/20 transition-transform duration-300 group-hover:scale-105">
                <Bookmark className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <CardTitle className="font-display tracking-tight text-lg">
                  Saved Candidates
                </CardTitle>
                <CardDescription className="text-xs">
                  View bookmarked talent profiles saved for later consideration
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/recruiter/explorer?tab=saved">
              <Button variant="outline" className="w-full rounded-xl border-white/[0.08] bg-white/[0.02]" size="lg">
                <Bookmark className="mr-2 h-4 w-4 text-amber-400" />
                View Bookmarks
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
