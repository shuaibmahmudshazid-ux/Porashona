import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.985] select-none';

    const variants = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-xs shadow-indigo-600/20 border border-indigo-700/30 focus-visible:ring-indigo-600',
      secondary:
        'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-xs shadow-slate-900/10 border border-slate-800 focus-visible:ring-slate-900',
      outline:
        'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50/80 hover:text-slate-900 hover:border-slate-300 shadow-2xs focus-visible:ring-slate-400',
      ghost:
        'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 focus-visible:ring-slate-300',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs shadow-rose-600/20 border border-rose-700/30 focus-visible:ring-rose-500',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-xs shadow-emerald-600/20 border border-emerald-700/30 focus-visible:ring-emerald-500',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-xs sm:text-sm px-3.5 py-2 gap-2 h-9',
      lg: 'text-sm px-5 py-2.5 gap-2.5 h-10',
      icon: 'p-2 w-9 h-9',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
