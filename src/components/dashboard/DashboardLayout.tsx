'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  CalendarClock,
  TrendingUp,
  FileText,
  CheckSquare,
  RotateCcw,
  Calendar,
  BarChart3,
  Settings,
  GraduationCap,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNav: string;
  onNavClick: (navName: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function DashboardLayout({
  children,
  activeNav,
  onNavClick,
  searchQuery,
  onSearchChange,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Students', icon: Users },
    { name: 'Subjects', icon: BookOpen },
    { name: 'Syllabus', icon: Layers },
    { name: 'Study Plan', icon: CalendarClock },
    { name: 'Progress', icon: TrendingUp },
    { name: 'Notes', icon: FileText },
    { name: 'Assignments', icon: CheckSquare },
    { name: 'Revision', icon: RotateCcw },
    { name: 'Calendar', icon: Calendar },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased text-slate-800">
      {/* Mobile Header Bar */}
      <div className="md:hidden h-16 bg-white border-b border-slate-200/80 px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900">StudyTrack</span>
            <span className="block text-[10px] text-slate-400 font-medium leading-none">Academic OS</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 md:translate-x-0 md:static ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand & Tagline */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                StudyTrack
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Plan • Learn • Track • Improve
            </p>
          </div>
        </div>

        {/* 12 Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Academic Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  onNavClick(item.name);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                />
                <span>{item.name}</span>
                {item.name === 'Revision' && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                    2
                  </span>
                )}
                {item.name === 'Assignments' && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800">
                    4
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Current Academic Term Footer */}
        <div className="p-3 border-t border-slate-100">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-50 via-slate-50 to-white border border-indigo-100/80">
            <div className="flex items-center gap-1.5 text-indigo-700 font-semibold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Term 2026-27 Active</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Class 9 & 10 Secondary Cohort • 34 Students
            </p>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Header */}
        <header className="h-18 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          {/* Welcome Message */}
          <div className="min-w-0 pr-4">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
              Welcome back, Professor Anwar! 👋
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Here is your students&apos; academic progress and today&apos;s study schedule.
            </p>
          </div>

          {/* Search, Notifications & Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative w-44 sm:w-64 lg:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search students, topics, notes..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-100/70 border border-transparent focus:border-indigo-500/30 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 outline-none transition"
              />
            </div>

            {/* Notification Icon */}
            <button
              title="Notifications"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center ring-2 ring-indigo-500/20">
                AH
              </div>
              <div className="hidden lg:block">
                <div className="text-xs font-semibold text-slate-900 leading-tight">Sir Anwar Hossain</div>
                <div className="text-[10px] text-slate-400 font-medium">Head Academic Mentor</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
