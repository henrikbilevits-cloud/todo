import React from 'react';
import { CheckSquare, Sparkles, Calendar, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({ completedCount, totalCount }) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const today = new Date().toLocaleDateString('da-DK', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface via-surface/90 to-[#1e1b4b] border border-border p-6 md:p-8 shadow-2xl mb-8">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2 font-medium text-sm">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="capitalize">{today}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Huskeliste</span>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold tracking-wide">
              PRO
            </span>
          </h1>
          <p className="text-textSecondary mt-1 text-sm md:text-base">
            Organiser din dag, nå dine mål og hold overblikket med stil.
          </p>
        </div>

        {/* Progress Card */}
        <div className="flex items-center gap-4 bg-[#1a1a1a]/80 backdrop-blur-md border border-border/80 px-5 py-4 rounded-2xl shadow-inner">
          <div className="relative flex items-center justify-center">
            {/* Circular progress representation */}
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="currentColor"
                strokeWidth="4"
                className="text-border fill-none"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={138.2}
                strokeDashoffset={138.2 - (138.2 * percentage) / 100}
                strokeLinecap="round"
                className="text-primary fill-none transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {percentage}%
            </div>
          </div>
          <div>
            <div className="text-xs text-textSecondary font-medium">Fuldførte opgaver</div>
            <div className="text-lg font-bold text-white flex items-baseline gap-1">
              <span>{completedCount}</span>
              <span className="text-xs text-textSecondary font-normal">/ {totalCount} opgaver</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
