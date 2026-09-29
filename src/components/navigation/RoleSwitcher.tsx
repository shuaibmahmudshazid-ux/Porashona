'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UserCheck, Shield, GraduationCap, ChevronDown } from 'lucide-react';

interface RoleSwitcherProps {
  currentEmail?: string;
}

export function RoleSwitcher({ currentEmail }: RoleSwitcherProps) {
  const router = useRouter();

  const handleSwitch = async (email: string) => {
    try {
      await fetch('/api/auth/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      router.refresh();
      if (email === 'teacher@porashona.com') {
        router.push('/teacher/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-xs font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition">
        <UserCheck className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Switch Perspective</span>
        <ChevronDown className="w-3 h-3 text-indigo-500" />
      </button>

      <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-100">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Demo Persona Switcher
        </div>

        <button
          onClick={() => handleSwitch('teacher@porashona.com')}
          className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition ${
            currentEmail === 'teacher@porashona.com' ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="p-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-medium">Sir Anwar Hossain</div>
            <div className="text-[10px] text-slate-400">Teacher / Admin</div>
          </div>
        </button>

        <button
          onClick={() => handleSwitch('rahim@student.com')}
          className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition ${
            currentEmail === 'rahim@student.com' ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="p-1 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-600">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-medium">Rahim Ahmed</div>
            <div className="text-[10px] text-slate-400">Class 9 Student</div>
          </div>
        </button>

        <button
          onClick={() => handleSwitch('fatima@student.com')}
          className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition ${
            currentEmail === 'fatima@student.com' ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-medium">Fatima Khan</div>
            <div className="text-[10px] text-slate-400">Class 9 Student</div>
          </div>
        </button>
      </div>
    </div>
  );
}
