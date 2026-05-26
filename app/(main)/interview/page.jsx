import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-foreground">
            Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Preparation</span>
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm md:text-base">Track performance, practice questions, and improve your scores.</p>
        </div>
      </div>
      <div className="space-y-8">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
