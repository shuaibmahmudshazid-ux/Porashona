import React from 'react';
import { StudentNav } from '@/components/navigation/StudentNav';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col pb-20 sm:pb-8">
      <StudentNav />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">{children}</main>
    </div>
  );
}
