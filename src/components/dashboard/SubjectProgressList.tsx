'use client';

import React from 'react';
import {
  Calculator,
  BookOpen,
  Atom,
  Dna,
  FlaskConical,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface SubjectProgressItem {
  id: string;
  name: string;
  percentage: number;
  completedTopics: number;
  totalTopics: number;
  chaptersCount: number;
  color: string;
  icon: React.ElementType;
}

const SUBJECTS_DATA: SubjectProgressItem[] = [
  {
    id: 'math',
    name: 'Mathematics',
    percentage: 78,
    completedTopics: 28,
    totalTopics: 36,
    chaptersCount: 5,
    color: '#4f46e5', // Indigo
    icon: Calculator,
  },
  {
    id: 'bio',
    name: 'Biology',
    percentage: 84,
    completedTopics: 31,
    totalTopics: 37,
    chaptersCount: 4,
    color: '#10b981', // Emerald
    icon: Dna,
  },
  {
    id: 'eng',
    name: 'English',
    percentage: 65,
    completedTopics: 22,
    totalTopics: 34,
    chaptersCount: 4,
    color: '#0ea5e9', // Sky
    icon: BookOpen,
  },
  {
    id: 'chem',
    name: 'Chemistry',
    percentage: 60,
    completedTopics: 18,
    totalTopics: 30,
    chaptersCount: 4,
    color: '#f59e0b', // Amber
    icon: FlaskConical,
  },
  {
    id: 'phys',
    name: 'Physics',
    percentage: 52,
    completedTopics: 15,
    totalTopics: 29,
    chaptersCount: 4,
    color: '#8b5cf6', // Violet
    icon: Atom,
  },
];

export function SubjectProgressList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-base text-slate-900 tracking-tight">Subject Progress</h3>
          <p className="text-xs text-slate-500">Class 9 & 10 Core Syllabus Tracks</p>
        </div>
        <span className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer flex items-center gap-0.5">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>

      <div className="space-y-3.5">
        {SUBJECTS_DATA.map((subject) => {
          const Icon = subject.icon;
          return (
            <div
              key={subject.id}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: subject.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{subject.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {subject.chaptersCount} Chapters • {subject.completedTopics}/{subject.totalTopics} Topics
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 font-mono">
                    {subject.percentage}%
                  </span>
                  <span className="block text-[10px] text-slate-400">mastered</span>
                </div>
              </div>

              {/* Progress bar */}
              <ProgressBar value={subject.percentage} color={subject.color} size="sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
