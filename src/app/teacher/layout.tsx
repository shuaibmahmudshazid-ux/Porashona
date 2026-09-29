import React from 'react';
import { TeacherSidebar } from '@/components/navigation/TeacherSidebar';
import { TeacherHeader } from '@/components/navigation/TeacherHeader';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TeacherHeader />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
