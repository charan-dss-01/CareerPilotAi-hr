import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Mic,
  Rocket,
  GitBranch,
  Compass,
  Search,
  Bookmark,
  Phone,
  Building2,
  ClipboardList,
  User,
  Briefcase,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  const user = await checkUser();
  const isRecruiter = user?.role === "recruiter";

  return (
    <header className="fixed top-4 inset-x-4 max-w-7xl mx-auto rounded-2xl border border-white/[0.08] bg-background/50 backdrop-blur-2xl z-50 supports-[backdrop-filter]:bg-background/40 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] transition-all duration-300">
      <nav className="px-5 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/10 to-background shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_-3px_hsl(var(--primary)/0.4)]">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-display font-bold tracking-tight text-foreground">
              CareerPilot <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI</span>
            </p>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {user ? (
            <>
              {isRecruiter ? (
                <>
                  {/* Recruiter Navigation */}
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                    asChild
                  >
                    <Link href="/recruiter/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Hiring Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0" asChild>
                    <Link href="/recruiter/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                    </Link>
                  </Button>

                  {/* Recruiter Console Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06]">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="hidden md:block font-medium">Recruiter Console</span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-2xl border-white/[0.08] bg-background/80 backdrop-blur-2xl p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link href="/recruiter/dashboard" className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          Hiring Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link href="/recruiter/jobs" className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Manage Jobs
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link href="/recruiter/jobs/new" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Post a Job
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link href="/recruiter/explorer" className="flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Candidate Explorer
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link href="/recruiter/tracker" className="flex items-center gap-2">
                          <ClipboardList className="h-4 w-4" />
                          Candidate Tracker
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link href="/recruiter/explorer?tab=saved" className="flex items-center gap-2">
                          <Bookmark className="h-4 w-4" />
                          Bookmarked Candidates
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Candidate Navigation — COMPLETELY PRESERVED */}
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                    asChild
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Industry Insights
                    </Link>
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0" asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                    </Link>
                  </Button>

                  {/* Growth Tools Dropdown — COMPLETELY PRESERVED */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06]">
                        <StarsIcon className="h-4 w-4 text-primary" />
                        <span className="hidden md:block font-medium">Growth Tools</span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-2xl border-white/[0.08] bg-background/80 backdrop-blur-2xl p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/career-simulator"
                          className="flex items-center gap-2"
                        >
                          <GitBranch className="h-4 w-4" />
                          Career Simulator
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link href="/resume" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Build Resume
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/ai-cover-letter"
                          className="flex items-center gap-2"
                        >
                          <PenBox className="h-4 w-4" />
                          Cover Letter
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link href="/interview" className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Interview Prep
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/live-interview"
                          className="flex items-center gap-2 "
                        >
                          <Mic className="h-4 w-4" />
                          Live Interview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/growth-tools"
                          className="flex items-center gap-2"
                        >
                          <Rocket className="h-4 w-4" />
                          TalentSync AI
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/explore"
                          className="flex items-center gap-2"
                        >
                          <Compass className="h-4 w-4" />
                          Explore Opportunities
                        </Link>
                      </DropdownMenuItem>
                      {/* Job Postings & applications — NEW Candidate ATS portals */}
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/jobs"
                          className="flex items-center gap-2"
                        >
                          <Briefcase className="h-4 w-4" />
                          Browse Jobs
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/applications"
                          className="flex items-center gap-2"
                        >
                          <ClipboardList className="h-4 w-4" />
                          My Applications
                        </Link>
                      </DropdownMenuItem>
                      {/* Interview Calls — NEW for candidates */}
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/interview-calls"
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Interview Calls
                        </Link>
                      </DropdownMenuItem>
                      {/* Candidate Profile link */}
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-white/[0.06] cursor-pointer p-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2"
                        >
                          <User className="h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
                afterSignOutUrl="/"
              />
            </>
          ) : (
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          )}
        </div>
      </nav>
    </header>
  );
}
