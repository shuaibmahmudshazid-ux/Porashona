import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: string; // Hex or tailwind class
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  color,
  showLabel = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full flex items-center gap-3', className)}>
      <div className={cn('w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out rounded-full',
            !color && 'bg-gradient-to-r from-indigo-500 to-indigo-600'
          )}
          style={{
            width: `${clampedValue}%`,
            backgroundColor: color ? color : undefined,
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 min-w-[36px] text-right">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}
