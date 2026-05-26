import React from "react";
import { getCandidateCalls } from "@/actions/candidate";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Briefcase, Building2, Clock, Sparkles, ChevronRight, ArrowRight } from "lucide-react";

export default async function InterviewCallsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  let calls = [];
  try {
    calls = await getCandidateCalls();
  } catch (error) {
    console.error("Error fetching candidate calls:", error);
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-400/10 text-amber-400 border-amber-400/20">Pending</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-blue-400/10 text-blue-400 border-blue-400/20">Accepted</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-400/10 text-red-400 border-red-400/20">Rejected</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-purple-400/10 text-purple-400 border-purple-400/20">Scheduled</Badge>;
      case "selected":
        return <Badge variant="outline" className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20">Selected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10 border-[hsl(var(--success))]/20";
    if (score >= 40) return "text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10 border-[hsl(var(--warning))]/20";
    return "text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10 border-[hsl(var(--destructive))]/20";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tighter gradient-title">
              Interview Invitations
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage and respond to interview invitations from recruiters
            </p>
          </div>
        </div>
      </div>

      {calls.length === 0 ? (
        <Card className="glass py-16">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.06]">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold tracking-tight">No Interview Invitations</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                You haven't received any interview invitations yet. Complete your profile and discovery settings to get noticed by recruiters.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calls.map((call) => (
            <Card key={call.id} className="group glass hover-lift overflow-hidden card-glow relative flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] via-transparent to-accent/[0.01] pointer-events-none" />
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold font-display tracking-tight truncate text-foreground group-hover:text-primary transition-colors">
                        {call.jobTitle}
                      </h2>
                      {call.aiMatchScore != null && (
                        <Badge variant="outline" className={`text-[10px] font-semibold px-2 py-0 h-4.5 flex items-center ${getScoreColor(call.aiMatchScore)}`}>
                          <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                          {Math.round(call.aiMatchScore)}% Match
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="font-semibold truncate">{call.companyName}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {getStatusBadge(call.status)}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 flex-1 flex flex-col justify-between p-6 pt-0">
                {/* Meta details & Brief Description preview */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl text-xs text-muted-foreground">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Current Stage</span>
                      <span className="text-foreground/90 font-medium block truncate">
                        {call.currentStage || "Resume Screening"}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Received</span>
                      <span className="text-foreground/90 font-medium block">
                        {new Date(call.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Job Preview</span>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2 h-9">
                      {call.jobDescription}
                    </p>
                  </div>
                </div>

                {/* Manage Invitation Link */}
                <Link href={`/interview-calls/${call.id}`} className="w-full mt-4 block">
                  <Button className="w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] text-xs text-foreground/95 flex items-center justify-center gap-2 py-4.5 rounded-xl transition-all duration-300 group-hover:shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]">
                    <span>Manage Interview</span>
                    <ArrowRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
