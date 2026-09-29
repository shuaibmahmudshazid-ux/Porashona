'use client';

import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface TodayTaskItem {
  id: string;
  subject: string;
  subjectColor: string;
  topic: string;
  chapter: string;
  plannedMinutes: number;
  actualMinutes: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  type: 'TOPIC_STUDY' | 'REVISION' | 'ASSIGNMENT';
}

const INITIAL_TASKS: TodayTaskItem[] = [
  {
    id: 'task-1',
    subject: 'Mathematics',
    subjectColor: '#4f46e5',
    topic: 'Quadratic Equations & Roots Formula',
    chapter: 'Chapter 3: Algebraic Equations',
    plannedMinutes: 60,
    actualMinutes: 45,
    status: 'IN_PROGRESS',
    type: 'TOPIC_STUDY',
  },
  {
    id: 'task-2',
    subject: 'English',
    subjectColor: '#0ea5e9',
    topic: 'Direct to Indirect Speech Rules',
    chapter: 'Unit 2: Grammar & Narration',
    plannedMinutes: 30,
    actualMinutes: 30,
    status: 'COMPLETED',
    type: 'TOPIC_STUDY',
  },
  {
    id: 'task-3',
    subject: 'Physics',
    subjectColor: '#f59e0b',
    topic: "Newton's Second Law & Momentum Problems",
    chapter: 'Chapter 2: Dynamics & Force',
    plannedMinutes: 45,
    actualMinutes: 0,
    status: 'PENDING',
    type: 'REVISION',
  },
  {
    id: 'task-4',
    subject: 'Biology',
    subjectColor: '#10b981',
    topic: 'Cell Division: Mitosis Stages & Diagrams',
    chapter: 'Chapter 4: Cell Biology',
    plannedMinutes: 40,
    actualMinutes: 0,
    status: 'PENDING',
    type: 'TOPIC_STUDY',
  },
];

interface TodayStudyPlanProps {
  onStartSession?: (task: TodayTaskItem) => void;
}

export function TodayStudyPlan({ onStartSession }: TodayStudyPlanProps) {
  const [tasks, setTasks] = useState<TodayTaskItem[]>(INITIAL_TASKS);

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isDone = t.status === 'COMPLETED';
          return {
            ...t,
            status: isDone ? 'PENDING' : 'COMPLETED',
            actualMinutes: isDone ? 0 : t.plannedMinutes,
          };
        }
        return t;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.status === 'COMPLETED').length;
  const totalPlannedMinutes = tasks.reduce((sum, t) => sum + t.plannedMinutes, 0);
  const totalActualMinutes = tasks.reduce((sum, t) => sum + t.actualMinutes, 0);

  return (
    <div className="space-y-4">
      {/* Header and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900 tracking-tight">Today&apos;s Study Plan</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
              {completedCount} of {tasks.length} Completed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Planned Time: <span className="font-semibold text-slate-700">{Math.floor(totalPlannedMinutes / 60)}h {totalPlannedMinutes % 60}m</span> • Actual Logged: <span className="font-semibold text-emerald-600">{Math.floor(totalActualMinutes / 60)}h {totalActualMinutes % 60}m</span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Study Window: 7:00 PM – 9:30 PM
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const isDone = task.status === 'COMPLETED';
          const isInProgress = task.status === 'IN_PROGRESS';

          return (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200/80 opacity-80'
                  : isInProgress
                  ? 'bg-indigo-50/30 border-indigo-200 shadow-sm shadow-indigo-100/40 ring-1 ring-indigo-500/20'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5 min-w-0">
                {/* Complete checkbox button */}
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                  className={`mt-1 w-5 h-5 rounded-lg border flex items-center justify-center transition shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 hover:border-indigo-500 bg-white'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white tracking-wide"
                      style={{ backgroundColor: task.subjectColor }}
                    >
                      {task.subject}
                    </span>

                    <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">
                      {task.chapter}
                    </span>

                    {task.type === 'REVISION' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <RotateCcw className="w-3 h-3" /> Revision
                      </span>
                    )}

                    {isInProgress && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" /> In Progress
                      </span>
                    )}
                  </div>

                  <h4
                    className={`text-sm font-semibold mt-1.5 leading-snug ${
                      isDone ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {task.topic}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Duration: <strong className="text-slate-700">{task.plannedMinutes} mins</strong>
                    </span>
                    {task.actualMinutes > 0 && (
                      <span className="text-emerald-600 font-medium">
                        • Logged: {task.actualMinutes} mins
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {!isDone && (
                  <Button
                    size="sm"
                    variant={isInProgress ? 'primary' : 'outline'}
                    onClick={() => {
                      if (onStartSession) {
                        onStartSession(task);
                      } else {
                        toggleTaskCompletion(task.id);
                      }
                    }}
                    className="text-xs gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isInProgress ? 'Resume Timer' : 'Start Study'}</span>
                  </Button>
                )}

                <Button
                  size="sm"
                  variant={isDone ? 'outline' : 'ghost'}
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`text-xs ${isDone ? 'text-emerald-700 border-emerald-200 bg-emerald-50/50' : 'text-slate-600'}`}
                >
                  {isDone ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
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
    </div>
  );
}
