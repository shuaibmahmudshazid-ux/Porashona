'use client';

import React from 'react';
import { Award, BookCheck, Clock, RotateCcw, Sparkles } from 'lucide-react';

interface SyllabusMasteryCardProps {
  overallPercentage?: number;
  completedTopics?: number;
  totalTopics?: number;
  revisionDueCount?: number;
  totalHoursStudied?: number;
}

export function SyllabusMasteryCard({
  overallPercentage = 68,
  completedTopics = 112,
  totalTopics = 165,
  revisionDueCount = 14,
  totalHoursStudied = 142.5,
}: SyllabusMasteryCardProps) {
  // SVG circular gauge math
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercentage / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 shadow-xl border border-indigo-800/50">
      {/* Decorative ambient background blur */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side: description and metrics */}
        <div className="space-y-4 max-w-sm text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Academic Term 2026-27 Milestone</span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Syllabus Completion
            </h3>
            <p className="text-xs text-indigo-200/80 mt-1 leading-relaxed">
              Tracking across all secondary classes, units, and priority topics. Currently on pace for scheduled mid-term exams.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-indigo-300 text-xs mb-1">
                <BookCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mastered Topics</span>
              </div>
              <div className="text-lg font-bold text-white">
                {completedTopics} <span className="text-xs font-normal text-indigo-300">/ {totalTopics}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-indigo-300 text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Total Study Time</span>
              </div>
              <div className="text-lg font-bold text-white">
                {totalHoursStudied} <span className="text-xs font-normal text-indigo-300">hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Circular Progress Gauge */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
              {/* Track */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Bar */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="text-indigo-400 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="url(#progressGradient)"
                fill="transparent"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner text */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {overallPercentage}%
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
                Completed
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span>{revisionDueCount} topics ready for revision</span>
          </div>
        </div>
      </div>
    </div>
  );
}
