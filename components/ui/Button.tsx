
import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  'aria-label'?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, 'aria-label': ariaLabel, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
    
    const variants = {
      primary: "bg-black text-white hover:bg-gray-800 shadow-lg",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "bg-transparent border border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-gray-50",
      ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
      premium: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
    };

    const sizes = {
      sm: "px-4 py-1.5 text-xs rounded-full",
      md: "px-6 py-3 text-sm rounded-2xl",
      lg: "px-10 py-4 text-base rounded-3xl",
      icon: "p-2.5 rounded-full"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && <span className="mr-2 shrink-0" aria-hidden="true">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="ml-2 shrink-0" aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
