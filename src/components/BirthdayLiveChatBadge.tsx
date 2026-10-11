import React from 'react';

interface BirthdayLiveChatBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BirthdayLiveChatBadge: React.FC<BirthdayLiveChatBadgeProps> = ({
  className = '',
  size = 'md',
}) => {
  const heights = {
    sm: 'h-8',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 220 110"
        className={`${heights[size]} w-auto drop-shadow-md`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cursive "Birthday" script on top */}
        <text
          x="110"
          y="42"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Playfair Display', 'Brush Script MT', cursive, Georgia, serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="36"
          letterSpacing="0.5"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
        >
          Birthday
        </text>

        {/* Red Rounded Pill Container */}
        <rect
          x="10"
          y="52"
          width="200"
          height="52"
          rx="26"
          fill="#E11D48"
          stroke="#FDA4AF"
          strokeWidth="1.5"
        />

        {/* Text "Live Chat" inside the red pill */}
        <text
          x="30"
          y="88"
          fill="#FFFFFF"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="24"
          letterSpacing="-0.5"
        >
          Live Chat
        </text>

        {/* Stylized "2.0" with Chat Bubble Outline */}
        <g transform="translate(154, 58)">
          {/* Chat bubble contour */}
          <path
            d="M 18 5 C 27 5 34 11 34 20 C 34 26 30 31 24 33 L 26 40 L 19 35 C 18.5 35 18 35 17 35 C 8 35 1 29 1 20 C 1 11 8 5 18 5 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Text "2.0" */}
          <text
            x="17"
            y="25"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize="15"
          >
            2.0
          </text>
        </g>
      </svg>
    </div>
  );
};
