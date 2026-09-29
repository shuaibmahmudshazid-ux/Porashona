'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetricOverviewCards } from '@/components/dashboard/MetricOverviewCards';
import { TodayStudyPlan } from '@/components/dashboard/TodayStudyPlan';
import { SubjectProgressList } from '@/components/dashboard/SubjectProgressList';
import { UpcomingTasksList } from '@/components/dashboard/UpcomingTasksList';
import { RecentNotesList } from '@/components/dashboard/RecentNotesList';
import { StudyActivityChart } from '@/components/dashboard/StudyActivityChart';
import { SyllabusMasteryCard } from '@/components/dashboard/SyllabusMasteryCard';
import { StudyTimerModal } from '@/components/dashboard/StudyTimerModal';
import {
  AddClassModal,
  AddSubjectModal,
  AddTopicModal,
  AddStudentModal,
  AddStudyTaskModal,
  AddNoteModal,
  AddAssignmentModal,
} from '@/components/dashboard/ManualCreationModals';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  CalendarCheck,
  Plus,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Layers,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { dataStore } from '@/lib/store';
import {
  AcademicClassData,
  SubjectData,
  TopicData,
  StudentProfileData,
  DailyStudyPlanItem,
  NoteData,
  AssignmentData,
} from '@/types';

export default function StudyTrackDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Local synced state from dataStore
  const [classes, setClasses] = useState<AcademicClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [topics, setTopics] = useState<TopicData[]>([]);
  const [students, setStudents] = useState<StudentProfileData[]>([]);
  const [tasks, setTasks] = useState<DailyStudyPlanItem[]>([]);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);

  // Modals state
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);

  // Timer modal state
  const [activeStudyTask, setActiveStudyTask] = useState<any>(null);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const refreshState = () => {
    setClasses(dataStore.getClasses());
    setSubjects(dataStore.getSubjects());
    setTopics(dataStore.getTopics());
    setStudents(dataStore.getStudents());
    setTasks(dataStore.getTodayTasks());
    setNotes(dataStore.getNotes());
    setAssignments(dataStore.getAssignments());
  };

  useEffect(() => {
    refreshState();
    const unsubscribe = dataStore.subscribe(() => {
      refreshState();
    });
    return () => unsubscribe();
  }, []);

  const handleResetToZero = () => {
    if (confirm('Are you sure you want to reset all data back to zero?')) {
      dataStore.resetAll();
      refreshState();
    }
  };

  const handleToggleComplete = (itemId: string) => {
    const item = tasks.find((t) => t.id === itemId);
    if (!item) return;
    const nextState = !item.isCompleted;
    dataStore.updatePlanItemStatus('std-001', itemId, nextState);
    refreshState();
  };

  const handleStartSession = (task: DailyStudyPlanItem) => {
    setActiveStudyTask({
      id: task.id,
      subject: task.subjectName,
      badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      topic: task.topicTitle,
      chapter: task.chapterTitle,
      plannedMinutes: task.targetMinutes,
      actualMinutes: task.actualMinutes,
      status: task.isCompleted ? 'COMPLETED' : 'IN_PROGRESS',
      type: task.type,
    });
    setIsTimerModalOpen(true);
  };

  const handleSessionComplete = (task: any, minutes: number) => {
    dataStore.updatePlanItemStatus('std-001', task.id, true, minutes);
    refreshState();
    setActiveStudyTask(null);
  };

  // Calculations
  const totalStudents = students.length;
  const totalTopics = topics.length;
  const progressList = dataStore.getAllProgress();
  const completedTopics = progressList.filter((p) => p.status === 'COMPLETED').length;
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const totalMinutesStudied = progressList.reduce((acc, p) => acc + p.totalStudyMinutes, 0) +
    tasks.reduce((acc, t) => acc + t.actualMinutes, 0);
  const totalHoursStudied = Number((totalMinutesStudied / 60).toFixed(1));
  const pendingTasksCount = assignments.length + tasks.filter((t) => !t.isCompleted).length;

  return (
    <DashboardLayout
      activeNav={activeNav}
      onNavClick={(nav) => {
        setActiveNav(nav);
        if (nav === 'Students') setIsAddStudentOpen(true);
        if (nav === 'Subjects') setIsAddSubjectOpen(true);
        if (nav === 'Syllabus') setIsAddTopicOpen(true);
        if (nav === 'Study Plan') setIsAddTaskOpen(true);
        if (nav === 'Notes') setIsAddNoteOpen(true);
        if (nav === 'Assignments') setIsAddAssignmentOpen(true);
      }}
      searchQuery={searchQuery}
      onSearchChange={(q) => setSearchQuery(q)}
    >
      {/* Top Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
              Manual Management Mode
            </span>
            <span className="text-xs text-slate-400">Database Initialized at 0</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Academic Progress & Study Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add your classes, subjects, topics, and students manually to track custom academic progress.
          </p>
        </div>

        {/* Action Menu Suite */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddClassOpen(true)}
            className="text-xs gap-1.5 h-8"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>+ Class</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddSubjectOpen(true)}
            className="text-xs gap-1.5 h-8"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>+ Subject</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddTopicOpen(true)}
            className="text-xs gap-1.5 h-8"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>+ Topic</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setIsAddStudentOpen(true)}
            className="text-xs gap-1.5 h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>+ Enroll Student</span>
          </Button>

          <Link href="/secure-admin">
            <Button
              size="sm"
              variant="secondary"
              className="text-xs gap-1.5 h-8 bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-700 shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secure Admin</span>
            </Button>
          </Link>

          <button
            onClick={handleResetToZero}
            title="Wipe state back to 0"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. Overview Cards (Calculated directly from zero-state store) */}
      <section aria-label="Metric Overview">
        <MetricOverviewCards
          totalStudents={totalStudents}
          overallPercentage={overallPercentage}
          studyHours={totalHoursStudied}
          pendingTasks={pendingTasksCount}
          completedTopics={completedTopics}
          totalTopics={totalTopics}
        />
      </section>

      {/* 2. Overall Syllabus Progress Showcase */}
      <section aria-label="Overall Syllabus Progress">
        <SyllabusMasteryCard
          overallPercentage={overallPercentage}
          completedTopics={completedTopics}
          totalTopics={totalTopics}
          revisionDueCount={0}
          totalHoursStudied={totalHoursStudied}
        />
      </section>

      {/* 3. Primary Grid: Today's Study Plan + Subject Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Study Plan */}
        <div className="lg:col-span-2">
          <Card className="p-5 sm:p-6 bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <TodayStudyPlan
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onStartSession={handleStartSession}
              onAddTask={() => setIsAddTaskOpen(true)}
            />
          </Card>
        </div>

        {/* Right 1 Col: Subject Progress */}
        <div>
          <Card className="p-5 sm:p-6 bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <SubjectProgressList
              subjects={subjects}
              topics={topics}
              onAddSubject={() => setIsAddSubjectOpen(true)}
            />
          </Card>
        </div>
      </div>

      {/* 4. Secondary Grid: Weekly Study Activity Chart + Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weekly Study Activity Chart */}
        <div className="lg:col-span-2">
          <Card className="p-5 sm:p-6 bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                  Weekly Study Activity
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total student study hours logged over the last 7 days
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Last 7 Days
              </span>
            </div>

            <StudyActivityChart loggedHours={totalHoursStudied} />
          </Card>
        </div>

        {/* Right 1 Col: Upcoming Tasks */}
        <div>
          <Card className="p-5 sm:p-6 bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <UpcomingTasksList
              assignments={assignments}
              onAddAssignment={() => setIsAddAssignmentOpen(true)}
            />
          </Card>
        </div>
      </div>

      {/* 5. Full Width Section: Recent Notes */}
      <section aria-label="Recent Academic Notes">
        <Card className="p-5 sm:p-6 bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs">
          <RecentNotesList
            notes={notes}
            onAddNote={() => setIsAddNoteOpen(true)}
          />
        </Card>
      </section>

      {/* Manual Creation Modals */}
      <AddClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        onSuccess={refreshState}
      />

      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        onSuccess={refreshState}
        classes={classes}
      />

      <AddTopicModal
        isOpen={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        onSuccess={refreshState}
        subjects={subjects}
      />

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onSuccess={refreshState}
        classes={classes}
      />

      <AddStudyTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onSuccess={refreshState}
        subjects={subjects}
      />

      <AddNoteModal
        isOpen={isAddNoteOpen}
        onClose={() => setIsAddNoteOpen(false)}
        onSuccess={refreshState}
        subjects={subjects}
      />

      <AddAssignmentModal
        isOpen={isAddAssignmentOpen}
        onClose={() => setIsAddAssignmentOpen(false)}
        onSuccess={refreshState}
        subjects={subjects}
      />

      {/* Active Stopwatch / Timer Modal */}
      <StudyTimerModal
        task={activeStudyTask}
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        onSessionComplete={handleSessionComplete}
      />
    </DashboardLayout>
  );
}
