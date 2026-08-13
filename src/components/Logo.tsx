import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-11', variant = 'dark' }) => {
  const isLightText = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 font-sans select-none ${className}`}>
      {/* Official Brand Logo Image from public/logo.png */}
      <img
        src="/logo.png"
        alt="MED RX PHARMACY Logo"
        className="h-11 w-11 object-contain flex-shrink-0"
      />

      {variant !== 'icon' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1">
            <span className={`font-serif font-bold text-xl tracking-tight ${isLightText ? 'text-white' : 'text-[#21468C]'}`}>
              MED RX
            </span>
            <span className="font-mono text-xs font-bold text-[#D98A4F] tracking-wider uppercase">
              PHARMACY
            </span>
          </div>
          <span className={`font-sans text-[11px] font-medium tracking-tight ${isLightText ? 'text-slate-200' : 'text-slate-600'}`}>
            Bronx, NY · Independent Care
          </span>
        </div>
      )}
    </div>
  );
};
