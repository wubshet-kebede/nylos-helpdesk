// src/components/common/Input.tsx
import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, id, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        <label
          htmlFor={id}
          className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
        >
          {label}
        </label>
        <div className="relative rounded-xl shadow-sm">
          {Icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Icon size={16} />
            </div>
          )}

          <input
            id={id}
            ref={ref}
            className={`block w-full rounded-xl border bg-white py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
              Icon ? "pl-10" : "px-3.5"
            } ${
              error
                ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500/20"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-slate-300"
            }`}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-600 animate-pulse">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
