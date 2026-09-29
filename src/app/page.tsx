'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetricOverviewCards } from '@/components/dashboard/MetricOverviewCards';
import { TodayStudyPlan, TodayTaskItem } from '@/components/dashboard/TodayStudyPlan';
import { SubjectProgressList } from '@/components/dashboard/SubjectProgressList';
import { UpcomingTasksList } from '@/components/dashboard/UpcomingTasksList';
import { RecentNotesList } from '@/components/dashboard/RecentNotesList';
import { StudyActivityChart } from '@/components/dashboard/StudyActivityChart';
import { SyllabusMasteryCard } from '@/components/dashboard/SyllabusMasteryCard';
import { StudyTimerModal } from '@/components/dashboard/StudyTimerModal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  CalendarCheck,
  Plus,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Users,
  BookOpen,
} from 'lucide-react';

export default function StudyTrackDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Timer Modal state
  const [activeStudyTask, setActiveStudyTask] = useState<TodayTaskItem | null>(null);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const handleStartSession = (task: TodayTaskItem) => {
    setActiveStudyTask(task);
    setIsTimerModalOpen(true);
  };

  const handleSessionComplete = (task: TodayTaskItem, minutes: number) => {
    // In our prototype, record minutes and update task
    task.actualMinutes += minutes;
    task.status = 'COMPLETED';
    setActiveStudyTask(null);
  };

  return (
    <DashboardLayout
      activeNav={activeNav}
      onNavClick={(nav) => setActiveNav(nav)}
      searchQuery={searchQuery}
      onSearchChange={(q) => setSearchQuery(q)}
    >
      {/* Dynamic Sub-header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              Academic Control Center
            </span>
            <span className="text-xs text-slate-400">Class 9 & 10 Secondary Cohort</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
            Academic Performance & Study Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor syllabus mastery, generate daily study allocations, and track real-time study hours.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveNav('Study Plan')}
            className="gap-1.5 text-xs"
          >
            <CalendarCheck className="w-4 h-4 text-indigo-600" />
            <span>Plan Today</span>
          </Button>
          <Button
            size="sm"
            onClick={() => setActiveNav('Students')}
            className="gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </Button>
        </div>
      </div>

      {/* 1. Overview Cards (Total Students, Overall Progress, Study Hours, Pending Tasks) */}
      <section aria-label="Metric Overview">
        <MetricOverviewCards />
      </section>

      {/* 2. Overall Syllabus Progress (Feature Showcase Hero) */}
      <section aria-label="Overall Syllabus Progress">
        <SyllabusMasteryCard
          overallPercentage={68}
          completedTopics={112}
          totalTopics={165}
          revisionDueCount={14}
          totalHoursStudied={142.5}
        />
      </section>

      {/* 3. Primary Grid: Today's Study Plan + Subject Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Study Plan */}
        <div className="lg:col-span-2">
          <Card className="p-5 sm:p-6 bg-white shadow-xs">
            <TodayStudyPlan onStartSession={handleStartSession} />
          </Card>
        </div>

        {/* Right 1 Col: Subject Progress (Math 78%, English 65%, Physics 52%, Biology 84%) */}
        <div>
          <Card className="p-5 sm:p-6 bg-white shadow-xs">
            <SubjectProgressList />
          </Card>
        </div>
      </div>

      {/* 4. Secondary Grid: Weekly Study Activity Chart + Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weekly Study Activity Chart */}
        <div className="lg:col-span-2">
          <Card className="p-5 sm:p-6 bg-white shadow-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900 tracking-tight">
                  Weekly Study Activity
                </h3>
                <p className="text-xs text-slate-500">
                  Total student study hours logged over the last 7 days
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                Last 7 Days
              </span>
            </div>

            <StudyActivityChart />
          </Card>
        </div>

        {/* Right 1 Col: Upcoming Tasks (Assignments, Revision, Deadlines) */}
        <div>
          <Card className="p-5 sm:p-6 bg-white shadow-xs">
            <UpcomingTasksList />
          </Card>
        </div>
      </div>

      {/* 5. Full Width Section: Recent Notes (Teacher Notes & Student Notes) */}
      <section aria-label="Recent Academic Notes">
        <Card className="p-5 sm:p-6 bg-white shadow-xs">
          <RecentNotesList />
        </Card>
      </section>

      {/* Interactive Stopwatch / Timer Modal */}
      <StudyTimerModal
        task={activeStudyTask}
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        onSessionComplete={handleSessionComplete}
      />
    </DashboardLayout>
  );
}
