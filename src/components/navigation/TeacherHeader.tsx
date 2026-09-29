'use client';

import React from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';
import { useRouter } from 'next/navigation';

export function TeacherHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-72 sm:w-96">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search students, topics, notes (Cmd+K)..."
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-transparent focus:border-indigo-500/30 focus:bg-white dark:focus:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none transition"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Switch perspective demo button */}
        <RoleSwitcher currentEmail="teacher@porashona.com" />

        {/* Notifications */}
        <button
          title="Notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold text-xs flex items-center justify-center ring-2 ring-indigo-500/20">
            AH
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">Sir Anwar Hossain</div>
            <div className="text-[10px] text-slate-400">Head Mentor</div>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
