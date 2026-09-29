'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

interface StudyActivityData {
  day: string;
  hours: number;
  target: number;
  topicsCount: number;
}

const WEEKLY_DATA: StudyActivityData[] = [
  { day: 'Mon', hours: 4.5, target: 4.0, topicsCount: 3 },
  { day: 'Tue', hours: 5.2, target: 4.0, topicsCount: 4 },
  { day: 'Wed', hours: 3.8, target: 4.0, topicsCount: 2 },
  { day: 'Thu', hours: 6.0, target: 4.0, topicsCount: 5 },
  { day: 'Fri', hours: 4.2, target: 4.0, topicsCount: 3 },
  { day: 'Sat', hours: 7.5, target: 5.0, topicsCount: 6 },
  { day: 'Sun', hours: 5.8, target: 5.0, topicsCount: 4 },
];

export function StudyActivityChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedDay, setSelectedDay] = useState<StudyActivityData | null>(WEEKLY_DATA[5]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalWeeklyHours = WEEKLY_DATA.reduce((acc, curr) => acc + curr.hours, 0);
  const avgDailyHours = (totalWeeklyHours / 7).toFixed(1);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-50/50 rounded-2xl animate-pulse">
        <div className="text-xs text-slate-400 font-medium">Loading activity analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
              {totalWeeklyHours.toFixed(1)} hrs
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              +14% vs last week
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cohort Average: <strong className="text-slate-700">{avgDailyHours} hrs/day</strong> across active students
          </p>
        </div>

        {selectedDay && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs">
            <span className="font-bold text-indigo-900">{selectedDay.day}:</span>
            <span className="font-extrabold text-slate-900 font-mono">{selectedDay.hours} hrs</span>
            <span className="text-indigo-600 font-medium">• {selectedDay.topicsCount} topics studied</span>
          </div>
        )}
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={WEEKLY_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onClick={(state: any) => {
              if (state && state.activePayload && state.activePayload.length > 0) {
                setSelectedDay(state.activePayload[0].payload as StudyActivityData);
              }
            }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(v) => `${v}h`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(67, 56, 202, 0.04)', radius: 8 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as StudyActivityData;
                  return (
                    <div className="rounded-xl bg-slate-900 text-white p-3 shadow-xl text-xs space-y-1.5 border border-slate-800">
                      <div className="font-bold text-slate-100 flex justify-between gap-6 pb-1 border-b border-slate-800">
                        <span>{data.day} Study Session</span>
                        <span className="text-indigo-300 font-mono font-bold">{data.hours} hrs</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex justify-between gap-4">
                        <span>Target Goal:</span>
                        <span>{data.target} hrs</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 flex justify-between gap-4 font-medium">
                        <span>Topics Mastered:</span>
                        <span>{data.topicsCount} topics</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="hours" radius={[6, 6, 2, 2]}>
              {WEEKLY_DATA.map((entry, index) => {
                const isSelected = selectedDay?.day === entry.day;
                const isAboveTarget = entry.hours >= entry.target;
                return (
                  <Cell
                    key={`cell-${index}`}
                    cursor="pointer"
                    fill={
                      isSelected
                        ? '#3730a3' // Deep Iris Selected
                        : isAboveTarget
                        ? '#4f46e5' // Primary Iris
                        : '#cbd5e1' // Neutral Slate Muted
                    }
                    className="transition-all duration-200 hover:opacity-90"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 inline-block" /> Goal Achieved (≥4h)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block" /> Below Target
          </span>
        </div>
        <span className="text-slate-400 font-medium">Click any day to inspect breakdown</span>
      </div>
    </div>
  );
}
