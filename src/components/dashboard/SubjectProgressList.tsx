'use client';

import React from 'react';
import {
  BookOpen,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { SubjectData, TopicData } from '@/types';

interface SubjectProgressListProps {
  subjects: SubjectData[];
  topics: TopicData[];
  onAddSubject?: () => void;
}

export function SubjectProgressList({
  subjects = [],
  topics = [],
  onAddSubject,
}: SubjectProgressListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Subject Progress</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subjects.length} Subject{subjects.length !== 1 ? 's' : ''} Configured
          </p>
        </div>
        {onAddSubject && (
          <Button size="sm" variant="ghost" onClick={onAddSubject} className="text-xs text-indigo-700 dark:text-indigo-400 gap-1 px-2 h-7">
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </Button>
        )}
      </div>

      {subjects.length === 0 ? (
        <div className="py-10 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">No Subjects Added Yet</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[200px] mt-0.5 mb-3 leading-relaxed">
            Create subjects such as Mathematics or English to start syllabus tracking.
          </p>
          {onAddSubject && (
            <Button size="sm" onClick={onAddSubject} className="gap-1 text-xs h-8">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Subject</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {subjects.map((subject) => {
            const subTopics = topics.filter((t) => t.subjectId === subject.id);
            const percentage = 0; // Starts at zero

            return (
              <div
                key={subject.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-xs transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10 text-white font-bold text-xs"
                      style={{ backgroundColor: subject.color }}
                    >
                      {subject.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{subject.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {subject.chapterCount || 0} Chapters • 0/{subTopics.length} Topics
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                      {percentage}%
                    </span>
                    <span className="block text-[10px] text-slate-400 font-medium">mastered</span>
                  </div>
                </div>

                <ProgressBar value={percentage} color={subject.color} size="sm" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
