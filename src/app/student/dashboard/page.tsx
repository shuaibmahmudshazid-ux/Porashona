'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  BookOpen,
  FileText,
  CheckSquare,
  ArrowRight,
  Flame,
  Award,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge, PriorityBadge } from '@/components/ui/Badge';
import { dataStore } from '@/lib/store';
import { DailyStudyPlanItem } from '@/types';

export default function StudentDashboard() {
  const student = dataStore.getStudentById('std-001')!;
  const plan = dataStore.getDailyPlan('std-001');
  const [items, setItems] = useState<DailyStudyPlanItem[]>(plan.items);

  // Active Timer state
  const [activeItem, setActiveItem] = useState<DailyStudyPlanItem | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = (item: DailyStudyPlanItem) => {
    setActiveItem(item);
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleFinishTimer = () => {
    if (!activeItem) return;
    const minutesStudied = Math.max(1, Math.round(timerSeconds / 60));
    dataStore.updatePlanItemStatus('std-001', activeItem.id, true, minutesStudied);
    dataStore.updateTopicProgress('std-001', activeItem.topicId, 100);

    // Refresh local items
    const updatedPlan = dataStore.getDailyPlan('std-001');
    setItems([...updatedPlan.items]);
    setIsTimerRunning(false);
    setActiveItem(null);
    setTimerSeconds(0);
  };

  const toggleItemCompletion = (item: DailyStudyPlanItem) => {
    const nextState = !item.isCompleted;
    dataStore.updatePlanItemStatus('std-001', item.id, nextState);
    if (nextState) {
      dataStore.updateTopicProgress('std-001', item.topicId, 100);
    }
    const updatedPlan = dataStore.getDailyPlan('std-001');
    setItems([...updatedPlan.items]);
  };

  const totalPlannedMinutes = items.reduce((sum, item) => sum + item.targetMinutes, 0);
  const totalActualMinutes = items.reduce((sum, item) => sum + item.actualMinutes, 0);
  const completedItemsCount = items.filter((i) => i.isCompleted).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Student Greeting & Quick Highlights */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome back, {student.name.split(' ')[0]}!
            </h1>
            <span className="text-lg">📚</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Class 9 • Available Study Budget Today: 2 Hours (7:00 PM - 9:00 PM)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-900/60 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {totalActualMinutes} / {totalPlannedMinutes} mins logged
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Study Stopwatch Card (Sticky Focus Section) */}
      <Card className="p-6 bg-gradient-to-br from-indigo-900 via-indigo-850 to-slate-900 text-white shadow-xl relative overflow-hidden border-indigo-800/60">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/60 border border-indigo-700 text-xs font-medium text-indigo-200 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Study Session & Stopwatch</span>
            </div>

            <h2 className="text-lg font-bold text-white">
              {activeItem ? activeItem.topicTitle : 'Select a topic from your daily plan to start study timer'}
            </h2>
            <p className="text-xs text-indigo-200/80 mt-1">
              {activeItem
                ? `${activeItem.subjectName} • Goal: ${activeItem.targetMinutes} minutes`
                : 'Focus mode with direct timestamp logging'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Clock Digits */}
            <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-wider bg-black/30 px-5 py-2.5 rounded-2xl border border-white/10 text-emerald-400 shadow-inner">
              {formatTimer(timerSeconds)}
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-2">
              {isTimerRunning ? (
                <Button
                  onClick={handlePauseTimer}
                  variant="outline"
                  className="bg-white/10 text-white hover:bg-white/20 border-white/20 gap-1.5"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (!activeItem && items.length > 0) {
                      handleStartTimer(items[0]);
                    } else {
                      setIsTimerRunning(true);
                    }
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{timerSeconds > 0 ? 'Resume' : 'Start Study'}</span>
                </Button>
              )}

              {timerSeconds > 0 && (
                <Button
                  onClick={handleFinishTimer}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Record Study Time</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Study Plan Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Plan Tasks (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Today&apos;s Study Plan</h2>
              <p className="text-xs text-slate-500">
                {completedItemsCount} of {items.length} tasks completed
              </p>
            </div>
            <Badge variant="info">
              {totalPlannedMinutes - totalActualMinutes > 0
                ? `${totalPlannedMinutes - totalActualMinutes} min remaining`
                : 'Goal Met! 🎉'}
            </Badge>
          </div>

          <div className="space-y-3">
            {items.map((item) => {
              const isCurrentTimer = activeItem?.id === item.id;
              return (
                <Card
                  key={item.id}
                  className={`p-4 transition ${
                    isCurrentTimer
                      ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-md ring-2 ring-indigo-500/20'
                      : 'hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleItemCompletion(item)}
                        className={`mt-1 w-5 h-5 rounded-lg border flex items-center justify-center transition shrink-0 ${
                          item.isCompleted
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        {item.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: item.subjectColor }}
                          >
                            {item.subjectName}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{item.chapterTitle}</span>
                          <PriorityBadge priority={item.priority} />
                        </div>

                        <h3
                          className={`text-sm font-semibold mt-1.5 ${
                            item.isCompleted
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {item.topicTitle}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Target: {item.targetMinutes} min
                          </span>
                          {item.actualMinutes > 0 && (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                              Logged: {item.actualMinutes} min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {!item.isCompleted && (
                        <Button
                          size="sm"
                          variant={isCurrentTimer ? 'danger' : 'outline'}
                          onClick={() => {
                            if (isCurrentTimer) {
                              setIsTimerRunning(false);
                              setActiveItem(null);
                            } else {
                              handleStartTimer(item);
                            }
                          }}
                          className="text-xs"
                        >
                          {isCurrentTimer ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>Study</span>
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Subject Progress & Teacher Notes */}
        <div className="space-y-6">
          {/* Syllabus Progress Card */}
          <Card className="p-5">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-sm">Subject Progress</CardTitle>
              <CardDescription>Class 9 Syllabus Completion</CardDescription>
            </CardHeader>
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-200">Mathematics</span>
                  <span className="text-indigo-600">66%</span>
                </div>
                <ProgressBar value={66} color="#4f46e5" size="sm" />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-200">Physics</span>
                  <span className="text-sky-600">50%</span>
                </div>
                <ProgressBar value={50} color="#0ea5e9" size="sm" />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-200">English</span>
                  <span className="text-emerald-600">33%</span>
                </div>
                <ProgressBar value={33} color="#10b981" size="sm" />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/student/syllabus">
                <Button variant="ghost" size="sm" className="w-full justify-between text-xs text-indigo-600">
                  <span>Explore Full Syllabus Tree</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Access to Teacher Notes */}
          <Card className="p-5 bg-gradient-to-br from-amber-500/5 to-transparent border-amber-200/60 dark:border-amber-900/40">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold text-xs mb-2">
              <FileText className="w-4 h-4" />
              <span>Teacher Shared Study Note</span>
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Summary Formula Sheet & Contradiction Proofs
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Sir Anwar Hossain shared steps for proving square root of 2 and 3 are irrational.
            </p>
            <div className="mt-3">
              <Link href="/student/notes">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Read Note & Attachments
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
