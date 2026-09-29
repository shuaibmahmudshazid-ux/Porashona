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

interface StudyActivityChartProps {
  loggedHours?: number;
}

export function StudyActivityChart({ loggedHours = 0 }: StudyActivityChartProps) {
  const [mounted, setMounted] = useState(false);

  // When loggedHours is 0, chart shows 0 across the days
  const weeklyData: StudyActivityData[] = [
    { day: 'Mon', hours: 0, target: 4.0, topicsCount: 0 },
    { day: 'Tue', hours: 0, target: 4.0, topicsCount: 0 },
    { day: 'Wed', hours: 0, target: 4.0, topicsCount: 0 },
    { day: 'Thu', hours: 0, target: 4.0, topicsCount: 0 },
    { day: 'Fri', hours: 0, target: 4.0, topicsCount: 0 },
    { day: 'Sat', hours: loggedHours, target: 5.0, topicsCount: loggedHours > 0 ? 1 : 0 },
    { day: 'Sun', hours: 0, target: 5.0, topicsCount: 0 },
  ];

  const [selectedDay, setSelectedDay] = useState<StudyActivityData | null>(weeklyData[5]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalWeeklyHours = loggedHours;
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
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {totalWeeklyHours > 0 ? '+100% initial session' : '0 hrs this week'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cohort Average: <strong className="text-slate-700">{avgDailyHours} hrs/day</strong> • Start study sessions to track daily activity
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
            data={weeklyData}
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
              domain={[0, Math.max(6, Math.ceil(loggedHours + 2))]}
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
                        <span>Daily Target:</span>
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
              {weeklyData.map((entry, index) => {
                const isSelected = selectedDay?.day === entry.day;
                const isAboveTarget = entry.hours >= entry.target;
                return (
                  <Cell
                    key={`cell-${index}`}
                    cursor="pointer"
                    fill={
                      isSelected && entry.hours > 0
                        ? '#3730a3'
                        : isAboveTarget && entry.hours > 0
                        ? '#4f46e5'
                        : entry.hours > 0
                        ? '#6366f1'
                        : '#e2e8f0'
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
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 inline-block" /> No Activity / 0h
          </span>
        </div>
        <span className="text-slate-400 font-medium">Click any day to inspect</span>
      </div>
    </div>
  );
}
