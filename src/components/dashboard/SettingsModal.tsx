'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  Laptop,
  Check,
  ShieldCheck,
  Download,
  RotateCcw,
  Sparkles,
  Bell,
  Volume2,
  Clock,
  School,
  User,
  Sliders,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTheme } from '@/components/theme/ThemeProvider';
import { dataStore } from '@/lib/store';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReset?: () => void;
}

export function SettingsModal({ isOpen, onClose, onDataReset }: SettingsModalProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Settings form state
  const [appName, setAppName] = useState('StudyTrack');
  const [academicTerm, setAcademicTerm] = useState('2026-27');
  const [mentorName, setMentorName] = useState('Shuaib Mahmud');
  const [dailyGoalHours, setDailyGoalHours] = useState('4.5');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const handleExportBackup = () => {
    const jsonStr = dataStore.exportAllJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studytrack_settings_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleResetData = () => {
    if (confirm('Warning: This will reset all classes, subjects, syllabus topics, and students to zero. Proceed?')) {
      dataStore.resetAll();
      if (onDataReset) onDataReset();
      alert('All system data has been reset to zero.');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Platform Settings & Preferences"
      description="Configure appearance, dark mode, academic defaults, and administrative controls."
      maxWidth="lg"
    >
      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: APPEARANCE & DARK MODE */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Appearance & Theme Mode
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 ml-auto">
              Currently: {resolvedTheme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Light Mode Option */}
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                theme === 'light'
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                {theme === 'light' && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <span className="block font-bold text-xs text-slate-900 dark:text-white">Light Mode</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  High-contrast paper white for daytime focus
                </span>
              </div>
            </button>

            {/* Dark Mode Option */}
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                {theme === 'dark' && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <span className="block font-bold text-xs text-slate-900 dark:text-white">Dark Mode</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Midnight dark slate, reduces eye strain
                </span>
              </div>
            </button>

            {/* System Mode Option */}
            <button
              type="button"
              onClick={() => setTheme('system')}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                theme === 'system'
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                  <Laptop className="w-4 h-4" />
                </div>
                {theme === 'system' && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <span className="block font-bold text-xs text-slate-900 dark:text-white">System Auto</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Match device OS day/night schedule
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* SECTION 2: ACADEMIC PLATFORM PREFERENCES */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <School className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Academic Program Configuration
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Application Display Name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g. StudyTrack"
            />
            <Input
              label="Academic Term / Cohort"
              value={academicTerm}
              onChange={(e) => setAcademicTerm(e.target.value)}
              placeholder="e.g. 2026-27"
            />
            <Input
              label="Head Mentor / Teacher Name"
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
              placeholder="e.g. Shuaib Mahmud"
            />
            <Input
              label="Daily Study Goal (Hours)"
              type="number"
              step="0.5"
              value={dailyGoalHours}
              onChange={(e) => setDailyGoalHours(e.target.value)}
              placeholder="e.g. 4.5"
            />
          </div>
        </div>

        {/* SECTION 3: AUDIO & NOTIFICATIONS */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Study Timer & Alerts
            </h3>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    Timer Completion Chime
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    Play audio chime when study session completes
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    Assignment Deadline Alerts
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    Show upcoming submission reminders
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
            </label>
          </div>
        </div>

        {/* SECTION 4: SECURE ADMIN & DATA CONTROLS */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Secure Administrative Modification Portal
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Directly add, modify, or delete classes, subjects, syllabus topics, and students.
                </p>
              </div>
            </div>

            <Link
              href="/secure-admin"
              onClick={onClose}
              className="inline-flex items-center justify-center text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition shrink-0 ml-3"
            >
              Open Admin
            </Link>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={handleExportBackup}
              className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Backup</span>
            </button>

            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data to Zero</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" className="gap-2">
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Settings!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
