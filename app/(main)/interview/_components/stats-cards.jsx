import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Card className="group glass hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Average Score</CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110">
            <Trophy className="h-4 w-4 text-yellow-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-display font-bold tracking-tighter">{getAverageScore()}%</div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      <Card className="group glass hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">
            Questions Practiced
          </CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110">
            <Brain className="h-4 w-4 text-purple-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-display font-bold tracking-tighter">{getTotalQuestions()}</div>
          <p className="text-xs text-muted-foreground mt-1.5">Total questions</p>
        </CardContent>
      </Card>

      <Card className="group glass hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Latest Score</CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] transition-transform duration-300 group-hover:scale-110">
            <Target className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-display font-bold tracking-tighter">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
