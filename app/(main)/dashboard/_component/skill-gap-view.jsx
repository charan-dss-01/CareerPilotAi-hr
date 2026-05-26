"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  BookOpen,
  Award,
  Clock,
  ExternalLink,
  Sparkles,
  FileText,
  BriefcaseIcon,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import ATSResumeButton from "./ats-resume-button";

const SkillGapView = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeInputMode, setResumeInputMode] = useState("text");
  const [jobInputMode, setJobInputMode] = useState("text");
  const [resumeFileName, setResumeFileName] = useState("");
  const [jobFileName, setJobFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const readTextFromFile = async (file, label) => {
    const isPdfFile =
      file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    const isTextBasedFile =
      file.type.startsWith("text/") ||
      /\.(txt|md|csv|json|rtf)$/i.test(file.name);

    if (!isTextBasedFile && !isPdfFile) {
      throw new Error(
        `${label} file format is not supported. Upload txt, md, csv, json, rtf, or pdf.`,
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error(`${label} file is too large. Max allowed size is 5 MB.`);
    }

    if (isPdfFile) {
      const pdfjsLib = await import("pdfjs-dist");
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
      }

      const data = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data }).promise;
      const pageTexts = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const text = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        pageTexts.push(text);
      }

      return pageTexts.join("\n").trim();
    }

    return file.text();
  };

  const handleResumeFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const extractedText = await readTextFromFile(file, "Resume");
      if (!extractedText.trim()) {
        throw new Error("Resume file appears empty after extraction.");
      }
      setResumeText(extractedText);
      setResumeFileName(file.name);
      setError(null);
    } catch (err) {
      setError(err.message || "Unable to read resume file.");
      setResumeFileName("");
      event.target.value = "";
    }
  };

  const handleJobDescriptionFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const extractedText = await readTextFromFile(file, "Job description");
      if (!extractedText.trim()) {
        throw new Error("JD file appears empty after extraction.");
      }
      setJobDescription(extractedText);
      setJobFileName(file.name);
      setError(null);
    } catch (err) {
      setError(err.message || "Unable to read job description file.");
      setJobFileName("");
      event.target.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please provide both your resume text and a job description.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/skill/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze skills");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResumeText("");
    setJobDescription("");
    setResumeInputMode("text");
    setJobInputMode("text");
    setResumeFileName("");
    setJobFileName("");
    setResult(null);
    setError(null);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "[&>div]:bg-green-500";
    if (percentage >= 50) return "[&>div]:bg-yellow-500";
    return "[&>div]:bg-red-500";
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      {!result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume Input */}
          <Card className="glass group transition-all duration-300 hover:border-white/[0.1]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-lg font-display tracking-tight">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                Your Resume
              </CardTitle>
              <CardDescription>
                Choose one input method: paste text or upload a file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={resumeInputMode} onValueChange={setResumeInputMode}>
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/[0.03] border border-white/[0.06] p-0.5 rounded-lg h-9">
                  <TabsTrigger value="text" className="text-xs rounded-md data-[state=active]:bg-white/[0.06]">Paste Text</TabsTrigger>
                  <TabsTrigger value="file" className="text-xs rounded-md data-[state=active]:bg-white/[0.06]">Upload File</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="mt-0">
                  <Textarea
                    id="resume-input"
                    placeholder="Paste your resume here... Include your skills, experience, education, certifications, etc."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[250px] resize-none text-sm bg-black/20 border-white/[0.06] focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl"
                  />
                </TabsContent>

                <TabsContent value="file" className="mt-0">
                  <label
                    htmlFor="resume-file-input"
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/[0.08] bg-black/20 p-10 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06]">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Click to upload resume</p>
                      <p className="text-xs text-muted-foreground mt-1">txt, md, csv, json, rtf, pdf — Max 5 MB</p>
                    </div>
                    <Input
                      id="resume-file-input"
                      type="file"
                      accept=".txt,.md,.csv,.json,.rtf,.pdf,text/plain,text/markdown,text/csv,application/json,application/rtf,text/rtf,application/pdf"
                      onChange={handleResumeFileUpload}
                      className="hidden"
                    />
                    {resumeFileName && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mt-2">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium text-primary">{resumeFileName}</span>
                      </div>
                    )}
                  </label>
                </TabsContent>
              </Tabs>
              <p className="text-xs text-muted-foreground mt-2">
                {resumeText.length > 0
                  ? `${resumeText.split(/\s+/).filter(Boolean).length} words`
                  : "No content yet"}
              </p>
            </CardContent>
          </Card>

          {/* Job Description Input */}
          <Card className="glass group transition-all duration-300 hover:border-white/[0.1]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-lg font-display tracking-tight">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                  <BriefcaseIcon className="h-4 w-4 text-accent" />
                </div>
                Job Description
              </CardTitle>
              <CardDescription>
                Choose one input method: paste text or upload a file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={jobInputMode} onValueChange={setJobInputMode}>
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/[0.03] border border-white/[0.06] p-0.5 rounded-lg h-9">
                  <TabsTrigger value="text" className="text-xs rounded-md data-[state=active]:bg-white/[0.06]">Paste Text</TabsTrigger>
                  <TabsTrigger value="file" className="text-xs rounded-md data-[state=active]:bg-white/[0.06]">Upload File</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="mt-0">
                  <Textarea
                    id="job-description-input"
                    placeholder="Paste the job description here... Include required skills, qualifications, responsibilities, etc."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[250px] resize-none text-sm bg-black/20 border-white/[0.06] focus-visible:ring-1 focus-visible:ring-accent/40 rounded-xl"
                  />
                </TabsContent>

                <TabsContent value="file" className="mt-0">
                  <label
                    htmlFor="job-description-file-input"
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/[0.08] bg-black/20 p-10 cursor-pointer transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06]">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Click to upload JD file</p>
                      <p className="text-xs text-muted-foreground mt-1">txt, md, csv, json, rtf, pdf — Max 5 MB</p>
                    </div>
                    <Input
                      id="job-description-file-input"
                      type="file"
                      accept=".txt,.md,.csv,.json,.rtf,.pdf,text/plain,text/markdown,text/csv,application/json,application/rtf,text/rtf,application/pdf"
                      onChange={handleJobDescriptionFileUpload}
                      className="hidden"
                    />
                    {jobFileName && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mt-2">
                        <CheckCircle2 className="h-3 w-3 text-accent" />
                        <span className="text-xs font-medium text-accent">{jobFileName}</span>
                      </div>
                    )}
                  </label>
                </TabsContent>
              </Tabs>
              <p className="text-xs text-muted-foreground mt-2">
                {jobDescription.length > 0
                  ? `${jobDescription.split(/\s+/).filter(Boolean).length} words`
                  : "No content yet"}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="pt-6">
            <p className="text-red-400 text-sm flex items-center gap-2 font-medium">
              <XCircle className="h-4 w-4 shrink-0" />
              {error}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Analyze / Reset Buttons */}
      <div className="flex gap-3 justify-center">
        {!result ? (
          <Button
            id="analyze-button"
            onClick={handleAnalyze}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
            size="lg"
            className="px-10 h-13 text-base font-semibold group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Target className="mr-2 h-5 w-5" />
                Analyze Skill Gap
              </>
            )}
          </Button>
        ) : (
          <Button
            id="reset-button"
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="px-8 bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.08]"
          >
            <Upload className="mr-2 h-4 w-4" />
            Analyze Another
          </Button>
        )}
      </div>

      {/* Results Section */}
      {result && result.analysis && (
        <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
          {/* Match Percentage Hero */}
          <Card className="glass overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
            <CardHeader className="text-center pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Skill Match Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-5 relative z-10 pb-10">
              <div
                className={`text-7xl md:text-8xl font-display font-bold tracking-tighter ${getMatchColor(result.analysis.matchPercentage)}`}
              >
                {result.analysis.matchPercentage}%
              </div>
              <div className="w-full max-w-md">
                <Progress
                  value={result.analysis.matchPercentage}
                  className={`h-2 ${getProgressColor(result.analysis.matchPercentage)}`}
                />
              </div>
              {result.analysis.confidenceScore !== undefined && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Confidence:
                  <span className="font-semibold text-foreground">
                    {result.analysis.confidenceScore}%
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Summary */}
          <Card className="glass relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 font-display tracking-tight text-lg">
                <Sparkles className="h-5 w-5 text-primary animate-pulse-smooth" />
                AI Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm leading-relaxed text-foreground/90">
                {result.analysis.summary}
              </p>
            </CardContent>
          </Card>

          {/* Skills Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <Card className="glass">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-display tracking-tight">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Matched Skills
                  <Badge variant="secondary" className="ml-auto bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                    {result.analysis.matchedSkills.length}
                  </Badge>
                </CardTitle>
                <CardDescription>Skills you already have</CardDescription>
              </CardHeader>
              <CardContent>
                {result.analysis.matchedSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.matchedSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/15 transition-colors"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No matching skills found.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Missing Skills */}
            <Card className="glass">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-display tracking-tight">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Missing Skills
                  <Badge variant="secondary" className="ml-auto bg-red-500/10 text-red-400 border-red-500/20 text-xs">
                    {result.analysis.missingSkills.length}
                  </Badge>
                </CardTitle>
                <CardDescription>Skills you need to develop</CardDescription>
              </CardHeader>
              <CardContent>
                {result.analysis.missingSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.missingSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/15 transition-colors"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    You have all required skills! 🎉
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ATS Resume Generator - Only show if there are missing skills */}
          {result.analysis.missingSkills.length > 0 && (
            <Card className="glass relative overflow-hidden border-primary/20 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2 font-display tracking-tight text-lg">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse-smooth" />
                  Generate ATS-Optimized Resume
                </CardTitle>
                <CardDescription>
                  Automatically incorporate missing skills into your resume with AI optimization for Applicant Tracking Systems
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ATSResumeButton
                  resumeText={resumeText}
                  jobDescription={jobDescription}
                  missingSkills={result.analysis.missingSkills}
                />
              </CardContent>
            </Card>
          )}

          {/* Course Recommendations */}
          {result.recommendations && result.recommendations.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display tracking-tight text-lg">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Recommended Courses
                </CardTitle>
                <CardDescription>
                  Curated learning paths to fill your skill gaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.recommendations.map((rec, index) => (
                    <Card
                      key={index}
                      className="bg-white/[0.02] hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-300 border-white/[0.06] group/course"
                    >
                      <CardContent className="p-5 pt-5 md:p-5 md:pt-5 flex flex-col h-full">
                        <div className="mb-3">
                          <Badge variant="outline" className="mb-2.5 text-xs bg-white/[0.03] border-white/[0.08]">
                            {rec.skill || rec.skillName}
                          </Badge>
                          <h4 className="font-semibold text-sm leading-tight text-foreground group-hover/course:text-primary transition-colors">
                            {rec.url ? (
                              <a
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {rec.course_name || rec.courseName}
                              </a>
                            ) : (
                              <span className="text-muted-foreground">
                                {rec.course_name || rec.courseName}
                              </span>
                            )}
                          </h4>
                        </div>

                        <div className="mt-auto flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {rec.platform && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                              <ExternalLink className="h-3 w-3" />
                              {rec.platform}
                            </span>
                          )}
                          {rec.duration && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                              <Clock className="h-3 w-3" />
                              {rec.duration}
                            </span>
                          )}
                          {rec.certification && (
                            <span className="flex items-center gap-1 text-green-400 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                              <Award className="h-3 w-3" />
                              Cert
                            </span>
                          )}
                          {rec.url && (
                            <a
                              href={rec.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors ml-auto px-2 py-0.5 rounded bg-primary/10 border border-primary/20"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Footer */}
          <div className="grid grid-cols-3 gap-5">
            <Card className="glass flex items-center justify-center">
              <CardContent className="p-6 pt-6 md:p-8 md:pt-8 text-center w-full">
                <div className="mx-auto w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/[0.06] mb-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                  {result.analysis.matchedSkills.length +
                    result.analysis.missingSkills.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                  Total Skills
                </p>
              </CardContent>
            </Card>
            <Card className="glass flex items-center justify-center">
              <CardContent className="p-6 pt-6 md:p-8 md:pt-8 text-center w-full">
                <div className="mx-auto w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold tracking-tight text-green-400">
                  {result.analysis.matchedSkills.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">Matched</p>
              </CardContent>
            </Card>
            <Card className="glass flex items-center justify-center">
              <CardContent className="p-6 pt-6 md:p-8 md:pt-8 text-center w-full">
                <div className="mx-auto w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-3">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold tracking-tight text-blue-400">
                  {result.recommendations?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                  Courses
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapView;
