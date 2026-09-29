'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface StudySessionTask {
  id: string;
  subject: string;
  badgeStyle?: string;
  topic: string;
  chapter: string;
  plannedMinutes: number;
  actualMinutes: number;
  status?: string;
  type?: string;
}

interface StudyTimerModalProps {
  task: StudySessionTask | null;
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete: (task: StudySessionTask, minutesStudied: number) => void;
}

export function StudyTimerModal({
  task,
  isOpen,
  onClose,
  onSessionComplete,
}: StudyTimerModalProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isOpen) {
      setSeconds(0);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [isOpen]);

  if (!isOpen || !task) return null;

  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    const minutesStudied = Math.max(1, Math.round(seconds / 60));
    onSessionComplete(task, minutesStudied);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              task.badgeStyle || 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30'
            }`}
          >
            {task.subject}
          </span>
          <span className="text-xs text-indigo-300 font-medium">{task.chapter}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
          {task.topic}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Target Session Goal: <strong className="text-slate-200">{task.plannedMinutes} minutes</strong>
        </p>

        {/* Stopwatch Display */}
        <div className="my-8 py-6 rounded-2xl bg-black/40 border border-slate-800/80 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isRunning ? 'Session Active — Stay Focused' : 'Session Paused'}</span>
          </div>
          <div className="font-mono text-5xl sm:text-6xl font-black tracking-widest text-emerald-400 drop-shadow-sm">
            {formatTimer(seconds)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border-slate-700 gap-2 py-3"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Resume
              </>
            )}
          </Button>

          <Button
            onClick={handleFinish}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white gap-2 py-3 shadow-lg shadow-indigo-600/30"
          >
            <CheckCircle2 className="w-4 h-4" /> Record & Finish
          </Button>
        </div>
      </div>
    </div>
  );
}
