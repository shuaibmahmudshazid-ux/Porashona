'use client';

import React, { useState } from 'react';
import {
  FileText,
  RotateCcw,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface UpcomingTask {
  id: string;
  category: 'ASSIGNMENT' | 'REVISION' | 'DEADLINE';
  title: string;
  subject: string;
  subjectBadgeStyle: string;
  dueDate: string;
  dueLabel: string;
  isUrgent?: boolean;
  meta: string;
}

const UPCOMING_TASKS: UpcomingTask[] = [
  {
    id: 'up-1',
    category: 'ASSIGNMENT',
    title: 'Class 9 Homework: Proof of Irrationality for √3 & √5',
    subject: 'Mathematics',
    subjectBadgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dueDate: '2026-10-02',
    dueLabel: 'Due Tomorrow, 9 PM',
    isUrgent: true,
    meta: '18 of 22 Submitted',
  },
  {
    id: 'up-2',
    category: 'REVISION',
    title: "Spaced Revision: Newton's Equations of Motion",
    subject: 'Physics',
    subjectBadgeStyle: 'bg-sky-50 text-sky-700 border-sky-200',
    dueDate: '2026-10-03',
    dueLabel: 'Scheduled Oct 3',
    meta: '5 Students Pending Review',
  },
  {
    id: 'up-3',
    category: 'DEADLINE',
    title: 'Mid-Term Unit 1 & 2 Syllabus Cutoff',
    subject: 'English & Biology',
    subjectBadgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dueDate: '2026-10-08',
    dueLabel: 'In 6 Days',
    meta: 'Exam Preparation Assessment',
  },
  {
    id: 'up-4',
    category: 'ASSIGNMENT',
    title: 'Chemical Reactions & Balancing Equations Worksheet',
    subject: 'Chemistry',
    subjectBadgeStyle: 'bg-amber-50 text-amber-700 border-amber-200',
    dueDate: '2026-10-05',
    dueLabel: 'Due Sunday',
    meta: 'Assigned to Class 9 Science',
  },
];

export function UpcomingTasksList() {
  const [filter, setFilter] = useState<'ALL' | 'ASSIGNMENT' | 'REVISION' | 'DEADLINE'>('ALL');

  const filteredTasks =
    filter === 'ALL' ? UPCOMING_TASKS : UPCOMING_TASKS.filter((t) => t.category === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-base text-slate-900 tracking-tight">Upcoming Tasks</h3>
          <p className="text-xs text-slate-500">Assignments, spaced revisions, and deadlines</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl text-[11px] font-medium text-slate-600 border border-slate-200/50">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filter === 'ALL' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('ASSIGNMENT')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filter === 'ASSIGNMENT' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setFilter('REVISION')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filter === 'REVISION' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Revision
          </button>
          <button
            onClick={() => setFilter('DEADLINE')}
            className={`px-2.5 py-1 rounded-lg transition ${
              filter === 'DEADLINE' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Deadlines
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`p-2 rounded-xl shrink-0 mt-0.5 border ${
                  task.category === 'ASSIGNMENT'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
                    : task.category === 'REVISION'
                    ? 'bg-amber-50 text-amber-700 border-amber-100'
                    : 'bg-rose-50 text-rose-700 border-rose-100'
                }`}
              >
                {task.category === 'ASSIGNMENT' && <FileText className="w-4 h-4" />}
                {task.category === 'REVISION' && <RotateCcw className="w-4 h-4" />}
                {task.category === 'DEADLINE' && <Calendar className="w-4 h-4" />}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${task.subjectBadgeStyle}`}
                  >
                    {task.subject}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{task.meta}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                  {task.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl border ${
                  task.isUrgent
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {task.dueLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
