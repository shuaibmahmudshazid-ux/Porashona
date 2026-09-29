'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarClock,
  FileText,
  CheckSquare,
  RotateCcw,
  BarChart3,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function TeacherSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Overview', href: '/teacher/dashboard', icon: LayoutDashboard },
    { label: 'Students', href: '/teacher/students', icon: Users },
    { label: 'Curriculum & Topics', href: '/teacher/curriculum', icon: BookOpen },
    { label: 'Study Planner', href: '/teacher/planner', icon: CalendarClock },
    { label: 'Notes & Materials', href: '/teacher/notes', icon: FileText },
    { label: 'Assignments', href: '/teacher/assignments', icon: CheckSquare },
    { label: 'Revision Tracker', href: '/teacher/revision', icon: RotateCcw },
    { label: 'Cohort Analytics', href: '/teacher/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">PORASHONA</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              Teacher
            </span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Academic Mentor OS</div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Management
        </div>
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              )}
            >
              <Icon
                className={cn('w-4 h-4 transition-colors', isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400')}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/60">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-transparent border border-indigo-100 dark:border-indigo-900/30">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Term</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Academic Session 2026-27 • 2 Students Enrolled
          </p>
        </div>
      </div>
    </aside>
  );
}
