import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: string; // Hex or CSS color
  showLabel?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full flex items-center gap-3', className)}>
      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50', heights[size])}>
        <div
          className={cn(
            'h-full transition-all duration-700 ease-out rounded-full',
            !color && 'bg-gradient-to-r from-indigo-500 to-indigo-600'
          )}
          style={{
            width: `${clampedValue}%`,
            backgroundColor: color ? color : undefined,
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-bold text-slate-700 min-w-[38px] text-right font-mono tabular-nums">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}
