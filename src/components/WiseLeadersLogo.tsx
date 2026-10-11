import React from 'react';

interface WiseLeadersLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: 'dark' | 'light';
}

export const WiseLeadersLogo: React.FC<WiseLeadersLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'light',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm sm:text-base',
    lg: 'text-lg sm:text-xl',
  };

  const titleColor = theme === 'dark' ? 'text-white' : 'text-[#0B1A38]';
  const subtitleColor = theme === 'dark' ? 'text-amber-400' : 'text-[#0B1A38]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Symbol: Open Book with Radiant Rising Sun */}
      <div className={`${iconSizes[size]} shrink-0 flex items-center justify-center p-0.5 rounded-xl bg-white shadow-xs`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sun Rays Gradient */}
            <linearGradient id="sunRayGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            {/* Sun Core Gradient */}
            <radialGradient id="sunCoreGrad" cx="50%" cy="100%" r="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </radialGradient>

            {/* Book Pages Gradient */}
            <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1A38" />
              <stop offset="100%" stopColor="#142C5E" />
            </linearGradient>
          </defs>

          {/* 8 Radiant Sun Rays */}
          <path d="M 32 30 L 37 34" stroke="url(#sunRayGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 40 20 L 45 26" stroke="url(#sunRayGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 50 14 L 53 22" stroke="url(#sunRayGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 60 10 L 60 18" stroke="url(#sunRayGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 69 13 L 66 22" stroke="url(#sunRayGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 79 19 L 74 26" stroke="url(#sunRayGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 87 29 L 81 34" stroke="url(#sunRayGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 93 41 L 86 43" stroke="url(#sunRayGrad)" strokeWidth="4.5" strokeLinecap="round" />

          {/* Rising Sun Semicircle */}
          <path d="M 42 46 A 20 20 0 0 1 78 46 Z" fill="url(#sunCoreGrad)" />

          {/* Top Page Edges */}
          <path d="M 60 46 C 50 43 38 45 28 47 L 28 50 C 38 48 50 46 60 50 Z" fill="#CBD5E1" />
          <path d="M 60 46 C 70 43 82 45 92 47 L 92 50 C 82 48 70 46 60 50 Z" fill="#CBD5E1" />

          {/* Open Book Cover & Body */}
          <path d="M 60 50 C 50 46 36 47 26 50 L 26 86 C 36 84 50 83 60 90 Z" fill="url(#bookCoverGrad)" />
          <path d="M 60 50 C 70 46 84 47 94 50 L 94 86 C 84 84 70 83 60 90 Z" fill="url(#bookCoverGrad)" />

          {/* Center Book Spine */}
          <path d="M 58 50 C 59 52 59 86 58 90 C 60 91 60 91 62 90 C 61 86 61 52 62 50 Z" fill="#1E3A78" />
        </svg>
      </div>

      {/* Official Typography from uploaded Logo */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight uppercase leading-none ${titleColor} ${textSizes[size]}`}>
            WISE LEADERS
          </span>
          <span className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider leading-tight mt-0.5 ${subtitleColor}`}>
            WORKSHOP
          </span>
          <span className="text-[9px] sm:text-[10px] italic font-medium tracking-normal text-slate-300 leading-tight mt-0.5">
            ..Raising Quintessential Leaders
          </span>
        </div>
      )}
    </div>
  );
};
