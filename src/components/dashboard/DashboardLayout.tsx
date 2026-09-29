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
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

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
    { name: 'Assignments', icon: CheckSquare, badge: 4, badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { name: 'Revision', icon: RotateCcw, badge: 2, badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Calendar', icon: Calendar },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col md:flex-row antialiased text-slate-800">
      {/* Mobile Top App Bar */}
      <div className="md:hidden h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">StudyTrack</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                PRO
              </span>
            </div>
            <span className="block text-[10px] text-slate-400 font-medium">Academic OS</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition active:scale-95"
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
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-600/15">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                StudyTrack
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                OS
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400 tracking-wider">
              Plan • Learn • Track • Improve
            </p>
          </div>
        </div>

        {/* 12 Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>Academic Management</span>
            <span className="text-[9px] text-slate-300 font-mono">12 Sections</span>
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-indigo-50/80 text-indigo-900 font-semibold border border-indigo-100/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-600" />
                )}

                <Icon
                  className={`w-4 h-4 transition-colors shrink-0 ${
                    isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="truncate">{item.name}</span>

                {item.badge && (
                  <span
                    className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Current Academic Term Footer Card */}
        <div className="p-3 border-t border-slate-100">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-slate-50 to-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Term 2026-27</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Class 9 & 10 Secondary Cohort • 34 Students
            </p>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Top Header */}
        <header className="h-18 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          {/* Welcome Message & Context */}
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
                Welcome back, Professor Anwar! 👋
              </h1>
              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Systems Active
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
              Academic Term 2026-27 • Real-time student syllabus & study time tracking
            </p>
          </div>

          {/* Search, Notifications & Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input with ⌘K badge */}
            <div className="relative w-44 sm:w-64 lg:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search students, topics, notes..."
                className="w-full pl-9 pr-12 py-2 rounded-xl bg-slate-100/70 border border-slate-200/60 focus:border-indigo-500 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 outline-none transition shadow-2xs"
              />
              <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-400 border border-slate-200 shadow-3xs">
                ⌘K
              </kbd>
            </div>

            {/* Notification Icon */}
            <button
              title="Notifications"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200/80">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center ring-2 ring-indigo-500/20 shadow-2xs">
                  AH
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Sir Anwar Hossain</div>
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
