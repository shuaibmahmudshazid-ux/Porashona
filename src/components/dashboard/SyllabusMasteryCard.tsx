'use client';

import React from 'react';
import { Award, BookCheck, Clock, RotateCcw, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

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
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercentage / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800/80">
      {/* Decorative ambient background lighting */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side: Context & Narrative */}
        <div className="space-y-4 max-w-lg text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/25 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Academic Syllabus Mastery • Term 2026-27</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Class 7 Curriculum Progress
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Consolidated tracking across Bangla, English, Mathematics, Science, BGS, ICT, Physical Education, Work & Life, Agriculture/Home Science, and Religious Education.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <BookCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Topics Mastered</span>
              </div>
              <div className="text-lg font-bold text-white font-mono">
                {completedTopics} <span className="text-xs font-normal text-slate-400 font-sans">/ {totalTopics}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">Time Invested</span>
              </div>
              <div className="text-lg font-bold text-white font-mono">
                {totalHoursStudied} <span className="text-xs font-normal text-slate-400 font-sans">hrs</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Pace Velocity</span>
              </div>
              <div className="text-lg font-bold text-emerald-400 font-mono">
                +14.2% <span className="text-xs font-normal text-slate-400 font-sans">MoM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Circular Radial Gauge & Spaced Revision Alert */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
              {/* Subtle Outer Track */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="text-slate-800"
                strokeWidth="11"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Dynamic Gradient Bar */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="transition-all duration-1000 ease-out"
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="url(#masteryGradient)"
                fill="transparent"
              />
              <defs>
                <linearGradient id="masteryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono tabular-nums">
                {overallPercentage}%
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                Completed
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-amber-200 bg-amber-950/70 px-3.5 py-1.5 rounded-full border border-amber-800/80 shadow-xs">
            <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold">{revisionDueCount} Topics Due for Spaced Revision</span>
          </div>
        </div>
      </div>
    </div>
  );
}
