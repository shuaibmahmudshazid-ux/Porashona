import React from 'react';
import { cn } from '@/lib/utils';
import { PriorityLevel, TopicStatus } from '@/types';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'sm', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    outline: 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300',
    success: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    danger: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    info: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
  };

  return <span className={cn('inline-flex items-center gap-1 leading-none', variants[variant], sizes[size], className)} {...props} />;
}

export function PriorityBadge({ priority }: { priority: PriorityLevel }) {
  switch (priority) {
    case 'URGENT':
      return <Badge variant="danger">Urgent Priority</Badge>;
    case 'HIGH':
      return <Badge variant="warning">High Priority</Badge>;
    case 'MEDIUM':
      return <Badge variant="info">Medium Priority</Badge>;
    case 'LOW':
    default:
      return <Badge variant="default">Low Priority</Badge>;
  }
}

export function TopicStatusBadge({ status }: { status: TopicStatus }) {
  switch (status) {
    case 'COMPLETED':
      return <Badge variant="success">Completed</Badge>;
    case 'IN_PROGRESS':
      return <Badge variant="info">In Progress</Badge>;
    case 'NEEDS_REVISION':
      return <Badge variant="warning">Needs Revision</Badge>;
    case 'NOT_STARTED':
    default:
      return <Badge variant="default">Not Started</Badge>;
  }
}
