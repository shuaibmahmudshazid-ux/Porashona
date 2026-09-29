'use client';

import React from 'react';
import {
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface MetricOverviewCardsProps {
  totalStudents?: number;
  overallPercentage?: number;
  studyHours?: number;
  pendingTasks?: number;
  completedTopics?: number;
  totalTopics?: number;
}

export function MetricOverviewCards({
  totalStudents = 0,
  overallPercentage = 0,
  studyHours = 0,
  pendingTasks = 0,
  completedTopics = 0,
  totalTopics = 0,
}: MetricOverviewCardsProps) {
  const cards = [
    {
      title: 'Total Enrolled Students',
      value: `${totalStudents}`,
      badge: totalStudents > 0 ? `${totalStudents} active` : '0 students',
      badgePositive: totalStudents > 0,
      description: totalStudents > 0 ? 'Secondary Cohort' : 'No students enrolled yet',
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
      title: 'Overall Syllabus Mastery',
      value: `${overallPercentage}%`,
      badge: `${completedTopics} / ${totalTopics} topics`,
      badgePositive: overallPercentage > 0,
      description: totalTopics > 0 ? `${totalTopics - completedTopics} topics remaining` : 'Add subjects & topics',
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      title: 'Total Study Hours Logged',
      value: `${studyHours.toFixed(1)} h`,
      badge: studyHours > 0 ? `${studyHours.toFixed(1)} hrs total` : '0 hrs logged',
      badgePositive: studyHours > 0,
      description: studyHours > 0 ? 'Recorded via live timer' : 'Start stopwatch to track time',
      icon: Clock,
      iconBg: 'bg-sky-50 text-sky-700 border-sky-100',
    },
    {
      title: 'Pending Action Items',
      value: `${pendingTasks}`,
      badge: pendingTasks > 0 ? `${pendingTasks} tasks` : '0 pending',
      badgePositive: pendingTasks === 0,
      description: pendingTasks > 0 ? 'Assignments & study tasks' : 'All queues clear',
      icon: AlertCircle,
      iconBg: 'bg-amber-50 text-amber-700 border-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 card-shadow-hover group transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${card.iconBg}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
                  {card.value}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    card.badgePositive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {card.badge}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-400 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 font-medium">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
