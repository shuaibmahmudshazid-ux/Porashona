'use client';

import React, { useState } from 'react';
import {
  FileText,
  RotateCcw,
  Calendar,
  Clock,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AssignmentData } from '@/types';

interface UpcomingTasksListProps {
  assignments: AssignmentData[];
  onAddAssignment?: () => void;
}

export function UpcomingTasksList({
  assignments = [],
  onAddAssignment,
}: UpcomingTasksListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Upcoming Tasks</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {assignments.length} Task{assignments.length !== 1 ? 's' : ''} Scheduled
          </p>
        </div>

        {onAddAssignment && (
          <Button size="sm" variant="ghost" onClick={onAddAssignment} className="text-xs text-indigo-700 dark:text-indigo-400 gap-1 px-2 h-7">
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </Button>
        )}
      </div>

      {assignments.length === 0 ? (
        <div className="py-10 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">No Assignments or Deadlines</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[200px] mt-0.5 mb-3 leading-relaxed">
            Create an assignment or homework set to track student deadlines.
          </p>
          {onAddAssignment && (
            <Button size="sm" onClick={onAddAssignment} className="gap-1 text-xs h-8">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Assignment</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((task) => (
            <div
              key={task.id}
              className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-2 rounded-xl shrink-0 mt-0.5 border bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/60">
                  <FileText className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                      {task.subjectName || 'General'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Marks: {task.totalMarks}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                    {task.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
