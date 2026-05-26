import React from "react";
import { getInterviewCallDetails } from "@/actions/candidate";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Briefcase, Building2, Clock, MessageSquare, Sparkles } from "lucide-react";
import CallActions from "../_components/call-actions";

export default async function InterviewCallDetailPage({ params }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;

  let call = null;
  try {
    call = await getInterviewCallDetails(id);
  } catch (error) {
    console.error("Error fetching call details:", error);
  }

  if (!call) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-3xl text-center space-y-4 mt-16">
        <Card className="glass p-12">
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-display font-bold tracking-tight">Invitation Not Found</h2>
            <p className="text-muted-foreground text-sm">
              The interview invitation could not be found or you do not have permission to view it.
            </p>
            <Link href="/interview-calls">
              <Button className="mt-4">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Invitations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-500">
      {/* Back Button */}
      <Link href="/interview-calls" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Invitations
      </Link>

      <Card className="glass overflow-hidden card-glow relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />
        
        <CardHeader className="pb-6 border-b border-white/[0.06]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-display font-bold tracking-tight">
                  {call.jobTitle}
                </h1>
                {call.aiMatchScore != null && (
                  <Badge variant="outline" className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getScoreColor(call.aiMatchScore)}`}>
                    <Sparkles className="h-3 w-3 mr-1" />
                    {Math.round(call.aiMatchScore)}% AI Match
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4 text-primary" />
                  {call.companyName}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Stage: {call.currentStage || "Resume Screening"}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Received: {new Date(call.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start md:self-center">
              {getStatusBadge(call.status)}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-8">
          {/* Job Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-display text-foreground/90">Job Description</h3>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl">
              {call.jobDescription}
            </div>
          </div>

          {/* Recruiter Message */}
          {call.recruiterMessage && (
            <div className="p-5 rounded-2xl bg-primary/[0.02] border border-primary/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <MessageSquare className="h-4 w-4" />
                Message from Recruiter
              </div>
              <p className="text-sm text-foreground/90 italic leading-relaxed">
                "{call.recruiterMessage}"
              </p>
            </div>
          )}

          {/* Action Buttons Container */}
          <div className="pt-6 border-t border-white/[0.06]">
            <div className="space-y-3">
              <h3 className="text-lg font-bold font-display text-foreground/90 mb-2">Manage Application</h3>
              <CallActions call={{
                id: call.id,
                status: call.status,
                candidateDecision: call.candidateDecision,
                googleMeetLink: call.googleMeetLink,
                scheduledAt: call.scheduledAt,
                humanMessage: call.humanMessage,
                candidateFeedback: call.candidateFeedback
              }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
