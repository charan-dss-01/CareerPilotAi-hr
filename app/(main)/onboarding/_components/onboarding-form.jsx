"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, User, Building2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema, recruiterOnboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null); // null = not chosen yet
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  // Candidate form
  const candidateForm = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  // Recruiter form
  const recruiterForm = useForm({
    resolver: zodResolver(recruiterOnboardingSchema),
  });

  const onCandidateSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
        role: "candidate",
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  const onRecruiterSubmit = async (values) => {
    try {
      await updateUserFn({
        ...values,
        role: "recruiter",
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      if (selectedRole === "recruiter") {
        router.push("/recruiter/dashboard");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = candidateForm.watch("industry");

  // Role Selection Screen
  if (!selectedRole) {
    return (
      <div className="flex items-center justify-center bg-background min-h-[60vh]">
        <div className="w-full max-w-2xl mx-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold gradient-title mb-3">
              Welcome to CareerPilot AI
            </h1>
            <p className="text-muted-foreground text-lg">
              How would you like to use the platform?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Candidate Card */}
            <button
              onClick={() => setSelectedRole("candidate")}
              className="group relative rounded-2xl border border-white/[0.08] bg-background/50 backdrop-blur-xl p-8 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] hover:-translate-y-1"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5">
                <User className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                I&apos;m a Candidate
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Build your resume, practice interviews, analyze skills, simulate
                career paths, and get matched with recruiters.
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>

            {/* Recruiter Card */}
            <button
              onClick={() => setSelectedRole("recruiter")}
              className="group relative rounded-2xl border border-white/[0.08] bg-background/50 backdrop-blur-xl p-8 text-left transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] hover:-translate-y-1"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
                <Building2 className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                I&apos;m a Recruiter
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover top candidates, run AI-powered screening, schedule
                interviews, and make data-driven hiring decisions.
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Recruiter Onboarding Form
  if (selectedRole === "recruiter") {
    return (
      <div className="flex items-center justify-center bg-background">
        <Card className="w-full max-w-lg mt-10 mx-2">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
            </div>
            <CardTitle className="gradient-title text-4xl">
              Set Up Your Recruiter Profile
            </CardTitle>
            <CardDescription>
              Tell us about your organization to start discovering candidates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={recruiterForm.handleSubmit(onRecruiterSubmit)}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="e.g., Google, TCS, Infosys"
                  {...recruiterForm.register("companyName")}
                />
                {recruiterForm.formState.errors.companyName && (
                  <p className="text-sm text-red-500">
                    {recruiterForm.formState.errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyRole">Your Role in Organization</Label>
                <Input
                  id="companyRole"
                  placeholder="e.g., HR Manager, Technical Lead, CTO"
                  {...recruiterForm.register("companyRole")}
                />
                {recruiterForm.formState.errors.companyRole && (
                  <p className="text-sm text-red-500">
                    {recruiterForm.formState.errors.companyRole.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hiringDomain">Hiring Domain</Label>
                <Input
                  id="hiringDomain"
                  placeholder="e.g., Software Engineering, Data Science, DevOps"
                  {...recruiterForm.register("hiringDomain")}
                />
                {recruiterForm.formState.errors.hiringDomain && (
                  <p className="text-sm text-red-500">
                    {recruiterForm.formState.errors.hiringDomain.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyDetails">
                  Company Details{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="companyDetails"
                  placeholder="Brief description of your company..."
                  className="h-24"
                  {...recruiterForm.register("companyDetails")}
                />
                {recruiterForm.formState.errors.companyDetails && (
                  <p className="text-sm text-red-500">
                    {recruiterForm.formState.errors.companyDetails.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">
                  Professional Bio{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="h-24"
                  {...recruiterForm.register("bio")}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Complete Recruiter Profile"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Candidate Onboarding Form — PRESERVED with additions
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setSelectedRole(null)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          </div>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={candidateForm.handleSubmit(onCandidateSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  candidateForm.setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  candidateForm.setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {candidateForm.formState.errors.industry && (
                <p className="text-sm text-red-500">
                  {candidateForm.formState.errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  onValueChange={(value) =>
                    candidateForm.setValue("subIndustry", value)
                  }
                >
                  <SelectTrigger id="subIndustry">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {selectedIndustry?.subIndustries.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {candidateForm.formState.errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {candidateForm.formState.errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...candidateForm.register("experience")}
              />
              {candidateForm.formState.errors.experience && (
                <p className="text-sm text-red-500">
                  {candidateForm.formState.errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...candidateForm.register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {candidateForm.formState.errors.skills && (
                <p className="text-sm text-red-500">
                  {candidateForm.formState.errors.skills.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32"
                {...candidateForm.register("bio")}
              />
              {candidateForm.formState.errors.bio && (
                <p className="text-sm text-red-500">
                  {candidateForm.formState.errors.bio.message}
                </p>
              )}
            </div>

            {/* NEW: Google Drive links for candidate */}
            <div className="space-y-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <p className="text-sm font-medium text-muted-foreground">
                Optional — Help recruiters discover you
              </p>
              <div className="space-y-2">
                <Label htmlFor="resumeDriveUrl">Resume (Google Drive Link)</Label>
                <Input
                  id="resumeDriveUrl"
                  placeholder="https://drive.google.com/file/d/..."
                  {...candidateForm.register("resumeDriveUrl")}
                />
                <p className="text-xs text-muted-foreground">
                  Share your resume as &quot;Anyone with the link can view&quot;
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoResumeUrl">
                  Video Introduction (Google Drive Link)
                </Label>
                <Input
                  id="videoResumeUrl"
                  placeholder="https://drive.google.com/file/d/..."
                  {...candidateForm.register("videoResumeUrl")}
                />
                <p className="text-xs text-muted-foreground">
                  Record a 1-2 min video intro showcasing your communication
                  skills
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
