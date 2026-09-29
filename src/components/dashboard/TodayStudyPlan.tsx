'use client';

import React from 'react';
import {
  Play,
  CheckCircle2,
  Clock,
  RotateCcw,
  Check,
  Plus,
  CalendarClock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DailyStudyPlanItem } from '@/types';

interface TodayStudyPlanProps {
  tasks: DailyStudyPlanItem[];
  onToggleComplete: (itemId: string) => void;
  onStartSession?: (task: DailyStudyPlanItem) => void;
  onAddTask?: () => void;
}

export function TodayStudyPlan({
  tasks = [],
  onToggleComplete,
  onStartSession,
  onAddTask,
}: TodayStudyPlanProps) {
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalPlannedMinutes = tasks.reduce((sum, t) => sum + t.targetMinutes, 0);
  const totalActualMinutes = tasks.reduce((sum, t) => sum + t.actualMinutes, 0);

  return (
    <div className="space-y-4">
      {/* Header and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Today&apos;s Study Plan</h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {completedCount} of {tasks.length} Completed
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Planned: <strong className="text-slate-700 dark:text-slate-300">{Math.floor(totalPlannedMinutes / 60)}h {totalPlannedMinutes % 60}m</strong> • Logged: <strong className="text-emerald-700 dark:text-emerald-400">{Math.floor(totalActualMinutes / 60)}h {totalActualMinutes % 60}m</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onAddTask && (
            <Button size="sm" variant="outline" onClick={onAddTask} className="text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </Button>
          )}
        </div>
      </div>

      {/* Task List or Empty State */}
      {tasks.length === 0 ? (
        <div className="py-12 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 shadow-2xs">
            <CalendarClock className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Study Tasks Scheduled Today</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4 leading-relaxed">
            Your study queue is at zero. Allocate a syllabus topic to set today&apos;s planned focus time.
          </p>
          {onAddTask && (
            <Button size="sm" onClick={onAddTask} className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Allocate First Task</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => {
            const isDone = task.isCompleted;

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-slate-50/60 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-800/60 opacity-75'
                    : 'bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-xs'
                }`}
              >
                {/* Left Details */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <button
                    onClick={() => onToggleComplete(task.id)}
                    title={isDone ? 'Mark incomplete' : 'Mark completed'}
                    className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                        : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800"
                      >
                        {task.subjectName}
                      </span>

                      <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">
                        {task.chapterTitle}
                      </span>

                      {task.type === 'REVISION' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <RotateCcw className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Revision
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-sm font-semibold mt-1.5 leading-snug ${
                        isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.topicTitle}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Target: <strong className="text-slate-700 dark:text-slate-300">{task.targetMinutes} mins</strong>
                      </span>
                      {task.actualMinutes > 0 && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                          • Logged: {task.actualMinutes} mins
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {!isDone && onStartSession && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onStartSession(task)}
                      className="text-xs gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Study</span>
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant={isDone ? 'outline' : 'ghost'}
                    onClick={() => onToggleComplete(task.id)}
                    className={`text-xs ${
                      isDone
                        ? 'text-emerald-800 border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isDone ? (
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Done
                      </span>
                    ) : (
                      'Mark Complete'
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
