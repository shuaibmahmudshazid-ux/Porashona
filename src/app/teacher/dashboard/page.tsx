'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  Clock,
  RotateCcw,
  Plus,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { dataStore } from '@/lib/store';

export default function TeacherDashboard() {
  const students = dataStore.getStudents();
  const subjects = dataStore.getSubjects('class-9');
  const topics = dataStore.getTopics();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Teacher Command Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitoring Class 9 & 10 Academic Progress • Session 2026-2027
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/teacher/planner">
            <Button variant="outline" size="sm" className="gap-1.5">
              <CalendarCheck className="w-4 h-4 text-indigo-600" />
              <span>Generate Daily Plans</span>
            </Button>
          </Link>
          <Link href="/teacher/students/new">
            <Button size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Enroll Student</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Enrolled Students</CardDescription>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{students.length}</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Active in Term</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Curriculum Topics</CardDescription>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{topics.length}</div>
            <div className="text-xs text-slate-500 mt-1">Across 4 Class 9 Subjects</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Study Time Logged</CardDescription>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <Clock className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">38.5 hrs</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">+4.2 hrs from last week</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Revision Due Queue</CardDescription>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
              <RotateCcw className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">2 Topics</div>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 mt-1 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Needs student review</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Student Roster & Subject Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Students Roster (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Student Progress Roster</h2>
              <p className="text-xs text-slate-500">Live syllabus completion and allocated study time</p>
            </div>
            <Link
              href="/teacher/students"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {students.map((student) => {
              const progress = dataStore.getProgressForStudent(student.id);
              const completedCount = progress.filter((p) => p.status === 'COMPLETED').length;
              const totalAllocatedMinutes = student.weeklySchedule.reduce(
                (sum, slot) => sum + slot.maxDurationMinutes,
                0
              );
              const completionPercent = Math.round((completedCount / Math.max(1, topics.length)) * 100);

              return (
                <Card key={student.id} className="p-5 hover:border-indigo-200 dark:hover:border-indigo-900 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold text-sm flex items-center justify-center shrink-0">
                        {student.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-900 dark:text-white">
                            {student.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {student.studentIdNumber}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">{student.schoolCollege}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={completionPercent > 30 ? 'success' : 'warning'}>
                        {completionPercent > 30 ? 'On Track' : 'Needs Pace Boost'}
                      </Badge>
                      <Link href={`/teacher/planner?studentId=${student.id}`}>
                        <Button variant="ghost" size="sm" className="text-xs text-indigo-600">
                          Planner
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Progress section */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500 font-medium">Syllabus Completion</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {completedCount} of {topics.length} topics ({completionPercent}%)
                      </span>
                    </div>
                    <ProgressBar value={completionPercent} />

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Available Time Budget: {Math.round(totalAllocatedMinutes / 60)} hrs / week</span>
                      <span>Next slot: Today, 7:00 PM</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Subject Curriculum Status (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Curriculum Distribution</h2>
              <p className="text-xs text-slate-500">Class 9 subjects & topics</p>
            </div>
            <Link
              href="/teacher/curriculum"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {subjects.map((sub) => {
              const subTopics = topics.filter((t) => t.subjectId === sub.id);
              return (
                <Card key={sub.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: sub.color }}
                      />
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                        {sub.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {subTopics.length} Topics
                    </span>
                  </div>
                  <ProgressBar
                    value={sub.name === 'Mathematics' ? 66 : sub.name === 'Physics' ? 50 : 25}
                    color={sub.color}
                    size="sm"
                  />
                  <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>{sub.code}</span>
                    <span>{sub.name === 'Mathematics' ? '2 completed' : '1 completed'}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
