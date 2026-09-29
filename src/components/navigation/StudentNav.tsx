'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  CalendarDays,
  BookOpen,
  FileText,
  CheckSquare,
  RotateCcw,
  GraduationCap,
  LogOut,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoleSwitcher } from './RoleSwitcher';

interface StudentNavProps {
  studentName?: string;
  studentEmail?: string;
}

export function StudentNav({ studentName = 'Rahim Ahmed', studentEmail = 'rahim@student.com' }: StudentNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { label: "Today's Plan", href: '/student/dashboard', icon: CalendarDays },
    { label: 'Syllabus', href: '/student/syllabus', icon: BookOpen },
    { label: 'Notebook', href: '/student/notes', icon: FileText },
    { label: 'Tasks', href: '/student/assignments', icon: CheckSquare },
    { label: 'Revision', href: '/student/revision', icon: RotateCcw },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">PORASHONA</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                Student
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Class 9 Science</div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Study streak pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>4 Day Streak</span>
          </div>

          <RoleSwitcher currentEmail={studentEmail} />

          {/* Profile & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 font-bold text-xs flex items-center justify-center ring-2 ring-sky-500/20">
              {studentName.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">{studentName}</div>
              <div className="text-[10px] text-slate-400">Student ID: STD-001</div>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-medium transition',
                isActive
                  ? 'text-sky-600 dark:text-sky-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Sub-navigation Header */}
      <div className="hidden sm:block border-b border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150',
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
