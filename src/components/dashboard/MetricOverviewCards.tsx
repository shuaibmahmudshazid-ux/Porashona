'use client';

import React from 'react';
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export function MetricOverviewCards() {
  const cards = [
    {
      title: 'Total Students',
      value: '34',
      badge: '+3 this month',
      badgePositive: true,
      description: 'Active across Class 9 & 10',
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Overall Progress',
      value: '68%',
      badge: '+6% this week',
      badgePositive: true,
      description: '112 of 165 topics completed',
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Study Hours Logged',
      value: '142.5 h',
      badge: '38.5 hrs this week',
      badgePositive: true,
      description: 'Average 5.5 hrs/student',
      icon: Clock,
      iconBg: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Pending Tasks',
      value: '8',
      badge: '3 urgent reviews',
      badgePositive: false,
      description: '5 assignments, 3 revisions due',
      icon: AlertCircle,
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card
            key={idx}
            className="p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-200 group bg-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{card.title}</span>
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${card.iconBg}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                {card.value}
              </span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  card.badgePositive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {card.badge}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-1.5 font-medium">{card.description}</p>
          </Card>
        );
      })}
    </div>
  );
}
