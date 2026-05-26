"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, Target } from "lucide-react";
import DashboardView from "./dashboard-view";
import SkillGapView from "./skill-gap-view";

const DashboardTabs = ({ insights, growthStats }) => {
    return (
        <div>
            <Tabs defaultValue="insights" className="w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-foreground">
                            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Intelligence</span>
                        </h1>
                        <p className="text-muted-foreground mt-1.5 text-sm md:text-base">Your personalized AI dashboard and skill analysis.</p>
                    </div>
                    <TabsList className="bg-white/[0.03] border border-white/[0.06] p-1 rounded-xl h-auto backdrop-blur-sm">
                        <TabsTrigger value="insights" className="gap-2 px-5 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                            <BarChart3 className="h-4 w-4" />
                            Industry Insights & Growth
                        </TabsTrigger>
                        <TabsTrigger value="skill-gap" className="gap-2 px-5 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:shadow-sm transition-all">
                            <Target className="h-4 w-4" />
                            CareerSync AI
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="insights">
                    <DashboardView insights={insights} growthStats={growthStats} />
                </TabsContent>

                <TabsContent value="skill-gap">
                    <SkillGapView />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DashboardTabs;
