import React from 'react';

export const DrStomachAvatar: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Glow / Shadow */}
    <ellipse cx="100" cy="180" rx="50" ry="10" fill="rgba(0,0,0,0.15)" />
    
    {/* Stomach J-Shape Body */}
    <path
      d="M70 45 C70 30 130 30 145 55 C165 90 170 130 135 155 C110 172 75 165 60 140 C45 115 55 85 70 45 Z"
      fill="url(#stomachGrad)"
      stroke="#E11D48"
      strokeWidth="6"
      strokeLinecap="round"
    />
    
    <defs>
      <linearGradient id="stomachGrad" x1="50" y1="30" x2="150" y2="170" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDA4AF" />
        <stop offset="100%" stopColor="#F43F5E" />
      </linearGradient>
      <linearGradient id="muscleGrad" x1="0" y1="0" x2="0" y2="100">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="pepsinGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
    </defs>

    {/* Cute Face */}
    {/* Left Eye */}
    <circle cx="95" cy="85" r="12" fill="white" stroke="#334155" strokeWidth="3" />
    <circle cx="98" cy="84" r="5" fill="#1E293B" />
    <circle cx="100" cy="82" r="2" fill="white" />

    {/* Right Eye */}
    <circle cx="125" cy="80" r="12" fill="white" stroke="#334155" strokeWidth="3" />
    <circle cx="128" cy="79" r="5" fill="#1E293B" />
    <circle cx="130" cy="77" r="2" fill="white" />

    {/* Cheeks */}
    <ellipse cx="85" cy="98" rx="8" ry="5" fill="#FB7185" opacity="0.8" />
    <ellipse cx="137" cy="93" rx="8" ry="5" fill="#FB7185" opacity="0.8" />

    {/* Happy Smile */}
    <path d="M102 102 Q 115 118 128 102" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Doctor Headband / Cross */}
    <rect x="90" y="38" width="50" height="14" rx="4" fill="white" stroke="#E11D48" strokeWidth="3" />
    <path d="M112 41 V 49 M 108 45 H 116" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />

    {/* Little Arms Waving */}
    <path d="M55 105 Q 35 95 45 80" stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" fill="none" />
    <circle cx="43" cy="77" r="6" fill="#FDA4AF" />

    <path d="M148 125 Q 170 120 165 105" stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" fill="none" />
    <circle cx="167" cy="101" r="6" fill="#FDA4AF" />
  </svg>
);

export const MuscleAvatar: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="175" rx="45" ry="8" fill="rgba(0,0,0,0.15)" />
    {/* Body */}
    <rect x="65" y="70" width="70" height="85" rx="20" fill="url(#muscleGrad)" stroke="#B45309" strokeWidth="5" />
    {/* Muscles lines */}
    <path d="M85 90 C95 105 105 105 115 90" stroke="#B45309" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M80 115 Q 100 130 120 115" stroke="#B45309" strokeWidth="4" strokeLinecap="round" fill="none" />
    
    {/* Left Arm Bicep */}
    <path d="M65 85 Q 40 70 45 100 Q 50 115 65 110" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
    {/* Right Arm Bicep */}
    <path d="M135 85 Q 160 70 155 100 Q 150 115 135 110" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />

    {/* Face */}
    <circle cx="85" cy="50" r="8" fill="#1E293B" />
    <circle cx="115" cy="50" r="8" fill="#1E293B" />
    <path d="M92 58 Q 100 66 108 58" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
    <text x="78" y="30" fontSize="16" fontWeight="bold" fill="#B45309">FLEX!</text>
  </svg>
);

export const PepsinAvatar: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="175" rx="45" ry="8" fill="rgba(0,0,0,0.15)" />
    {/* Enzyme Body */}
    <circle cx="100" cy="95" r="50" fill="url(#pepsinGrad)" stroke="#5B21B6" strokeWidth="5" />
    
    {/* Goggles */}
    <circle cx="82" cy="85" r="15" fill="white" stroke="#334155" strokeWidth="4" />
    <circle cx="118" cy="85" r="15" fill="white" stroke="#334155" strokeWidth="4" />
    <line x1="97" y1="85" x2="103" y2="85" stroke="#334155" strokeWidth="4" />
    <circle cx="84" cy="85" r="6" fill="#38BDF8" />
    <circle cx="116" cy="85" r="6" fill="#38BDF8" />

    {/* Smile */}
    <path d="M90 120 Q 100 130 110 120" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Scissors / Chemical tool */}
    <path d="M135 125 L165 155 M165 125 L135 155" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
    <circle cx="150" cy="140" r="8" fill="#D97706" />
  </svg>
);

export const AcidDropAvatar: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="175" rx="35" ry="6" fill="rgba(0,0,0,0.15)" />
    {/* Drop body */}
    <path d="M100 35 C100 35 145 95 145 130 C145 155 125 170 100 170 C75 170 55 155 55 130 C55 95 100 35 100 35 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="5" />
    
    {/* Face */}
    <circle cx="85" cy="120" r="6" fill="#1E293B" />
    <circle cx="115" cy="120" r="6" fill="#1E293B" />
    <path d="M92 138 Q 100 145 108 138" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
    
    {/* HCl Badge */}
    <rect x="75" y="80" width="50" height="24" rx="6" fill="white" stroke="#B45309" strokeWidth="3" />
    <text x="88" y="97" fontSize="14" fontWeight="bold" fill="#B45309">HCl</text>
  </svg>
);

export const MouthChibiAvatar: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="175" rx="45" ry="8" fill="rgba(0,0,0,0.15)" />
    <path d="M50 80 C50 50 150 50 150 80 C150 130 120 150 100 150 C80 150 50 130 50 80 Z" fill="#FEE2E2" stroke="#EF4444" strokeWidth="6" />
    {/* Teeth */}
    <rect x="65" y="70" width="15" height="20" rx="4" fill="white" stroke="#DC2626" strokeWidth="3" />
    <rect x="85" y="68" width="15" height="22" rx="4" fill="white" stroke="#DC2626" strokeWidth="3" />
    <rect x="105" y="68" width="15" height="22" rx="4" fill="white" stroke="#DC2626" strokeWidth="3" />
    <rect x="125" y="70" width="15" height="20" rx="4" fill="white" stroke="#DC2626" strokeWidth="3" />
    {/* Tongue */}
    <path d="M75 120 Q 100 150 125 120 Z" fill="#FB7185" />
    {/* Eyes */}
    <circle cx="75" cy="50" r="5" fill="#1E293B" />
    <circle cx="125" cy="50" r="5" fill="#1E293B" />
  </svg>
);

export const IntestineChibiAvatar: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="175" rx="45" ry="8" fill="rgba(0,0,0,0.15)" />
    <path d="M60 70 Q 100 50 140 70 Q 160 100 130 130 Q 100 160 70 130 Q 40 100 60 70 Z" fill="#A7F3D0" stroke="#059669" strokeWidth="6" />
    <circle cx="85" cy="95" r="8" fill="#047857" />
    <circle cx="115" cy="95" r="8" fill="#047857" />
    <path d="M92 118 Q 100 126 108 118" stroke="#047857" strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>
);
