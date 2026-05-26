"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Send,
  PhoneCall,
  Award,
  Trophy,
  FileCheck,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights, growthStats }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-[hsl(var(--success))]";
      case "medium":
        return "bg-[hsl(var(--warning))]";
      case "low":
        return "bg-[hsl(var(--destructive))]";
      default:
        return "bg-muted";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-[hsl(var(--success))]" };
      case "neutral":
        return { icon: LineChart, color: "text-[hsl(var(--warning))]" };
      case "negative":
        return { icon: TrendingDown, color: "text-[hsl(var(--destructive))]" };
      default:
        return { icon: LineChart, color: "text-muted-foreground" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true },
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Personal Growth & Application metrics */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold tracking-tight text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> Personal Growth & Application Metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="glass border-white/[0.08] hover:border-white/[0.12] transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Applications Sent</span>
                <span className="text-2xl font-bold tracking-tight text-foreground">{growthStats?.applicationsSent ?? 0}</span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/10 border border-blue-400/20">
                <Send className="w-4 h-4 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/[0.08] hover:border-white/[0.12] transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Shortlist Rate</span>
                <span className="text-2xl font-bold tracking-tight text-teal-400">{growthStats?.shortlistRate ?? 0}%</span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-400/10 border border-teal-400/20">
                <Award className="w-4 h-4 text-teal-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/[0.08] hover:border-white/[0.12] transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Success Rate</span>
                <span className="text-2xl font-bold tracking-tight text-emerald-400">{growthStats?.successRate ?? 0}%</span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                <Trophy className="w-4 h-4 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/[0.08] hover:border-white/[0.12] transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Interview Invites</span>
                <span className="text-2xl font-bold tracking-tight text-purple-400">{growthStats?.interviewsCount ?? 0}</span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-400/10 border border-purple-400/20">
                <PhoneCall className="w-4 h-4 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/[0.08] hover:border-white/[0.12] transition-all col-span-2 md:col-span-1">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Assessments Taken</span>
                <span className="text-2xl font-bold tracking-tight text-amber-400">{growthStats?.assessmentsCount ?? 0}</span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/20">
                <FileCheck className="w-4 h-4 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="border-t border-white/[0.05] pt-6 space-y-4">
        <h2 className="text-xl font-display font-bold tracking-tight text-foreground">
          Industry & Market Outlook Overview
        </h2>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Market Outlook */}
        <Card className="group glass hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">
              Market Outlook
            </CardTitle>
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110 ${outlookColor}`}>
              <OutlookIcon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold tracking-tighter">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        {/* Industry Growth */}
        <Card className="group glass hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">
              Industry Growth
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold tracking-tighter">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-3 h-1.5" />
          </CardContent>
        </Card>

        {/* Demand Level */}
        <Card className="group glass hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Demand Level</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110">
              <BriefcaseIcon className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold tracking-tighter">{insights.demandLevel}</div>
            <div
              className={`h-1.5 w-full rounded-full mt-3 ${getDemandLevelColor(
                insights.demandLevel,
              )}`}
            />
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card className="group glass hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Top Skills</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110">
              <Brain className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mt-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="font-display tracking-tight text-xl">Salary Ranges by Role</CardTitle>
          <CardDescription>
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="hsl(var(--border))"
                  opacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                  tickFormatter={(value) => `$${value}k`}
                />
                <Tooltip
                  cursor={{ fill: 'hsla(var(--primary) / 0.04)' }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass-strong rounded-xl p-4 shadow-2xl border border-white/[0.08]">
                          <p className="font-semibold text-foreground mb-2 text-sm tracking-tight">{label}</p>
                          <div className="space-y-1.5">
                            {payload.map((item) => (
                              <div
                                key={item.name}
                                className="flex items-center justify-between gap-8"
                              >
                                <span className="text-xs text-muted-foreground flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                  {item.name}
                                </span>
                                <span className="text-xs font-semibold text-foreground">${item.value}k</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="min"
                  fill="hsl(var(--primary) / 0.35)"
                  name="Min Salary"
                  radius={[4, 4, 0, 0]}
                  barSize={22}
                />
                <Bar
                  dataKey="median"
                  fill="hsl(var(--primary))"
                  name="Median Salary"
                  radius={[4, 4, 0, 0]}
                  barSize={22}
                />
                <Bar
                  dataKey="max"
                  fill="hsl(var(--accent))"
                  name="Max Salary"
                  radius={[4, 4, 0, 0]}
                  barSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends & Recommended Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-display tracking-tight text-xl">Key Industry Trends</CardTitle>
            <CardDescription>
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3 group/trend cursor-default">
                  <div className="relative mt-1.5 flex h-2.5 w-2.5 items-center justify-center shrink-0">
                    <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
                    <div className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm leading-relaxed text-foreground/90 group-hover/trend:text-foreground transition-colors duration-200">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-display tracking-tight text-xl">Recommended Skills</CardTitle>
            <CardDescription>Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2.5">
              {insights.recommendedSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1.5 text-sm bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
