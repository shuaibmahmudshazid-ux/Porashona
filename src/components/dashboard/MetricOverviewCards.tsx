'use client';

import React from 'react';
import {
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  ArrowUpRight,
  BookCheck,
} from 'lucide-react';

export function MetricOverviewCards() {
  const cards = [
    {
      title: 'Total Enrolled Students',
      value: '34',
      badge: '+3 this month',
      badgePositive: true,
      description: 'Active across Class 9 & 10',
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
      title: 'Overall Syllabus Mastery',
      value: '68%',
      badge: '+6% this week',
      badgePositive: true,
      description: '112 of 165 topics completed',
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      title: 'Total Study Hours Logged',
      value: '142.5 h',
      badge: '38.5 hrs this week',
      badgePositive: true,
      description: 'Average 5.5 hrs/student',
      icon: Clock,
      iconBg: 'bg-sky-50 text-sky-700 border-sky-100',
    },
    {
      title: 'Pending Action Items',
      value: '8',
      badge: '3 urgent reviews',
      badgePositive: false,
      description: '5 assignments, 3 revisions due',
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
            className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-xs hover:border-slate-300 card-shadow-hover group transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${card.iconBg}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
                  {card.value}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    card.badgePositive
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {card.badge}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-2.5 pt-2 border-t border-slate-100 font-medium">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
