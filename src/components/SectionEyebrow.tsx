import React from 'react';

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#B5662A] ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#B5662A] inline-block" />
      <span>{children}</span>
    </div>
  );
};
