import React from 'react';
import { cn } from '@/lib/utils';
import { PriorityLevel, TopicStatus } from '@/types';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'sm', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    neutral: 'bg-slate-50 text-slate-600 border border-slate-200/60',
    outline: 'border border-slate-200 text-slate-600 bg-white',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200/80',
    info: 'bg-indigo-50 text-indigo-800 border border-indigo-200/80',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-full font-medium tracking-wide',
    md: 'text-xs px-3 py-1 rounded-full font-medium tracking-wide',
  };

  return <span className={cn('inline-flex items-center gap-1.5 leading-none shrink-0 select-none', variants[variant], sizes[size], className)} {...props} />;
}

export function PriorityBadge({ priority }: { priority: PriorityLevel }) {
  switch (priority) {
    case 'URGENT':
      return (
        <Badge variant="danger">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
          Urgent
        </Badge>
      );
    case 'HIGH':
      return (
        <Badge variant="warning">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          High Priority
        </Badge>
      );
    case 'MEDIUM':
      return (
        <Badge variant="info">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          Medium Priority
        </Badge>
      );
    case 'LOW':
    default:
      return (
        <Badge variant="neutral">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Low Priority
        </Badge>
      );
  }
}

export function TopicStatusBadge({ status }: { status: TopicStatus }) {
  switch (status) {
    case 'COMPLETED':
      return (
        <Badge variant="success">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          Completed
        </Badge>
      );
    case 'IN_PROGRESS':
      return (
        <Badge variant="info">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          In Progress
        </Badge>
      );
    case 'NEEDS_REVISION':
      return (
        <Badge variant="warning">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Needs Revision
        </Badge>
      );
    case 'NOT_STARTED':
    default:
      return (
        <Badge variant="neutral">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          Not Started
        </Badge>
      );
  }
}
