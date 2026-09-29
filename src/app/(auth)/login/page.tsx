'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Shield, User, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('teacher@porashona.com');
  const [password, setPassword] = useState('teacher123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (data.user.role === 'TEACHER') {
        router.push('/teacher/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6">
      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
          <GraduationCap className="w-7 h-7" />
        </div>
        <div className="text-left">
          <div className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">PORASHONA</div>
          <div className="text-[11px] text-slate-400 font-medium">Academic Mentorship Platform</div>
        </div>
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Sign In to Your Portal</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access your personalized syllabus, daily study plans, and assignments.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" isLoading={isLoading} className="w-full mt-2 gap-2">
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Quick Demo Logins Section */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Quick 1-Click Demo Profiles
            </span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickFill('teacher@porashona.com', 'teacher123')}
              className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                email === 'teacher@porashona.com'
                  ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Sir Anwar Hossain</div>
                  <div className="text-[10px] text-slate-400">Teacher / Admin Account</div>
                </div>
              </div>
              <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400">Select</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('rahim@student.com', 'student123')}
              className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                email === 'rahim@student.com'
                  ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Rahim Ahmed</div>
                  <div className="text-[10px] text-slate-400">Class 9 Student (Science)</div>
                </div>
              </div>
              <span className="text-[10px] font-medium text-sky-600 dark:text-sky-400">Select</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
