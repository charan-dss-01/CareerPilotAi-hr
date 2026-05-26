"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Briefcase,
  Code,
  Sparkles,
  CheckCircle2,
  Loader2,
  FileText,
  Video,
  ExternalLink,
  Save,
  Clock,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { updateUser } from "@/actions/user";
import { industries } from "@/data/industries";

export default function ProfileForm({ initialUser }) {
  const router = useRouter();

  // Helper to split "tech-Software Development" into { industry: "tech", subIndustry: "Software Development" }
  const parsedIndustry = useMemo(() => {
    if (!initialUser.industry) return { industry: "", subIndustry: "" };
    const parts = initialUser.industry.split("-");
    const ind = parts[0] || "";
    const sub = parts.slice(1).join("-") || "";
    return { industry: ind, subIndustry: sub };
  }, [initialUser.industry]);

  // Form states
  const [bio, setBio] = useState(initialUser.bio || "");
  const [experience, setExperience] = useState(initialUser.experience?.toString() || "");
  const [skills, setSkills] = useState(initialUser.skills?.join(", ") || "");
  const [resumeDriveUrl, setResumeDriveUrl] = useState(initialUser.resumeDriveUrl || "");
  const [videoResumeUrl, setVideoResumeUrl] = useState(initialUser.videoResumeUrl || "");
  const [selectedIndustryId, setSelectedIndustryId] = useState(parsedIndustry.industry);
  const [selectedSubIndustry, setSelectedSubIndustry] = useState(parsedIndustry.subIndustry);

  const { fn: fnUpdate, loading } = useFetch(updateUser);

  // Active sub-industries mapping
  const subIndustriesList = useMemo(() => {
    const matched = industries.find((ind) => ind.id === selectedIndustryId);
    return matched ? matched.subIndustries : [];
  }, [selectedIndustryId]);

  // Google Drive preview parser helper
  const getGoogleDriveEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
    return url;
  };

  const resumeEmbedUrl = useMemo(() => getGoogleDriveEmbedUrl(resumeDriveUrl), [resumeDriveUrl]);
  const videoEmbedUrl = useMemo(() => getGoogleDriveEmbedUrl(videoResumeUrl), [videoResumeUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedIndustryId || !selectedSubIndustry) {
      toast.error("Please select both your primary industry and specialization.");
      return;
    }

    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const formattedIndustryStr = `${selectedIndustryId}-${selectedSubIndustry}`;

    try {
      const res = await fnUpdate({
        role: "candidate",
        industry: formattedIndustryStr,
        experience: experience ? parseInt(experience, 10) : 0,
        bio,
        skills: skillsArray,
        resumeDriveUrl,
        videoResumeUrl,
      });

      if (res?.success) {
        toast.success("Profile updated successfully!");
        router.refresh();
      }
    } catch (err) {
      // Handled by useFetch toast
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_-3px_hsl(var(--primary)/0.2)]">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tighter gradient-title">
                Candidate Profile Command
              </h1>
              <p className="text-muted-foreground text-sm">
                Inspect, modify, and review your professional talent settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Overview Header Card */}
      <Card className="glass relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.02] pointer-events-none" />
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          {initialUser.imageUrl ? (
            <img
              src={initialUser.imageUrl}
              alt={initialUser.name || "Profile"}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white/[0.08] shadow-xl"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center shadow-xl">
              <User className="h-8 w-8 text-primary" />
            </div>
          )}
          <div className="space-y-1.5 flex-1 min-w-0 text-center md:text-left">
            <h2 className="text-2xl font-bold font-display text-foreground leading-none">
              {initialUser.name}
            </h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-primary" />
                {initialUser.email}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                Candidate Portfolio
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: Professional details */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <CardTitle className="text-lg font-display tracking-tight">Professional Profile</CardTitle>
            </div>
            <CardDescription>Share your career bio, active skills, and experience metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/95">Biography</label>
              <Textarea
                placeholder="Write a brief description of your professional background, achievements, and career goals..."
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={500}
                className="border-white/[0.08] bg-white/[0.04] backdrop-blur-sm focus-visible:ring-primary/50 text-foreground"
              />
              <div className="text-right text-[10px] text-muted-foreground font-mono">
                {bio.length}/500 chars
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/95">Years of Experience</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    min="0"
                    max="45"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g., 5"
                    className="pl-10 border-white/[0.08] bg-white/[0.04] backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/95">Core Skills (Comma-separated)</label>
                <div className="relative">
                  <Code className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="React, Node.js, Python, AWS"
                    className="pl-10 border-white/[0.08] bg-white/[0.04] backdrop-blur-sm"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">Type tags separated by commas. These index you in recruiter searches.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 2: Industry Alignment */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <CardTitle className="text-lg font-display tracking-tight">Industry & Specialization</CardTitle>
            </div>
            <CardDescription>Select your core industry sector and functional focus</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Industry Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/95">Primary Industry Sector</label>
              <select
                value={selectedIndustryId}
                onChange={(e) => {
                  setSelectedIndustryId(e.target.value);
                  setSelectedSubIndustry(""); // Reset sub-industry
                }}
                className="flex h-11 w-full rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm shadow-sm backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 hover:border-white/[0.15] hover:bg-white/[0.06] appearance-none cursor-pointer text-foreground"
              >
                <option value="" disabled className="bg-background text-muted-foreground">Select an industry</option>
                {industries.map((ind) => (
                  <option key={ind.id} value={ind.id} className="bg-background">
                    {ind.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialization Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/95">Specialization / Focus</label>
              <select
                value={selectedSubIndustry}
                onChange={(e) => setSelectedSubIndustry(e.target.value)}
                disabled={!selectedIndustryId}
                className="flex h-11 w-full rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm shadow-sm backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 hover:border-white/[0.15] hover:bg-white/[0.06] appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
              >
                <option value="" disabled className="bg-background text-muted-foreground">Select specialization</option>
                {subIndustriesList.map((sub, idx) => (
                  <option key={`${sub}-${idx}`} value={sub} className="bg-background">
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 3: Portfolios & Documents */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <CardTitle className="text-lg font-display tracking-tight">Portfolio & Document Portals</CardTitle>
            </div>
            <CardDescription>Provide public Google Drive links to display your CV and video introduction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Link */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/95 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-blue-400" />
                  Google Drive Resume URL
                </label>
                <Input
                  value={resumeDriveUrl}
                  onChange={(e) => setResumeDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/xxx/view?usp=sharing"
                  className="border-white/[0.08] bg-white/[0.04] backdrop-blur-sm"
                />
              </div>

              {/* Video Resume Link */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/95 flex items-center gap-1.5">
                  <Video className="h-4 w-4 text-emerald-400" />
                  Google Drive Video Intro URL
                </label>
                <Input
                  value={videoResumeUrl}
                  onChange={(e) => setVideoResumeUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/xxx/view?usp=sharing"
                  className="border-white/[0.08] bg-white/[0.04] backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Helpful instructions banner */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-primary block mb-1">💡 Google Drive Sharing Instructions:</span>
              To make your resume and introduction video visible to hiring managers, click <strong>Share</strong> inside Google Drive, set General Access to <strong>"Anyone with the link can view"</strong>, and paste the shareable URL here.
            </div>

            {/* Embedded previews */}
            {(resumeEmbedUrl || videoEmbedUrl) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.04]">
                {/* Resume embed */}
                {resumeEmbedUrl && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      Live Resume Preview (Recruiter view)
                    </span>
                    <div className="rounded-xl overflow-hidden border border-white/[0.06] h-72">
                      <iframe src={resumeEmbedUrl} className="w-full h-full" allow="autoplay" title="CV preview" />
                    </div>
                  </div>
                )}

                {/* Video embed */}
                {videoEmbedUrl && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      Live Video Preview (Recruiter view)
                    </span>
                    <div className="rounded-xl overflow-hidden border border-white/[0.06] h-72">
                      <iframe src={videoEmbedUrl} className="w-full h-full" allow="autoplay" title="Video preview" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex justify-end items-center gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="px-8 hover-lift flex items-center gap-2 shadow-[0_0_15px_-3px_hsl(var(--primary)/0.4)]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{loading ? "Saving Changes..." : "Save Profile Details"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
