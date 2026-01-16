
import React, { useState, forwardRef, useId } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, type, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const id = useId();
    const errorId = `${id}-error`;
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label 
            htmlFor={id} 
            className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors pointer-events-none" aria-hidden="true">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            type={inputType}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`
              w-full px-4 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none 
              transition-all duration-200 focus:bg-white focus:border-indigo-500 
              focus:ring-2 focus:ring-indigo-500/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-12' : ''}
              ${isPassword || rightIcon ? 'pr-12' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${className}
            `}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
            >
              {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true">
              {rightIcon}
            </div>
          ) : null}
        </div>
        {error && (
          <p id={errorId} className="text-xs font-medium text-red-500 ml-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
