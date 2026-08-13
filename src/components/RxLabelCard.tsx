import React from 'react';
import { LucideIcon } from 'lucide-react';

interface RxLabelCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  benefits?: string[];
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  badgeText?: string;
  className?: string;
  children?: React.ReactNode;
}

export const RxLabelCard: React.FC<RxLabelCardProps> = ({
  title,
  subtitle,
  description,
  benefits,
  icon: Icon,
  actionText,
  onAction,
  badgeText = 'Rx',
  className = '',
  children,
}) => {
  return (
    <div className={`rx-label-card p-6 flex flex-col justify-between group relative overflow-hidden ${className}`}>
      {/* Top Rx Monogram Circular Badge */}
      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#21468C] text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm group-hover:bg-[#B5662A] transition-colors duration-200">
        {badgeText}
      </div>

      <div>
        {/* Header with Icon and Title */}
        <div className="flex items-start gap-3.5 pr-8 mb-3">
          {Icon && (
            <div className="p-2.5 rounded-md bg-[#F7F8FA] text-[#B5662A] group-hover:bg-[#21468C] group-hover:text-white transition-colors duration-200 flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="font-serif font-semibold text-lg text-[#16305F] leading-snug group-hover:text-[#21468C] transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="font-mono text-xs text-[#B5662A] font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Perforated Dashed Rule (Pharmacy Label Signature Edge) */}
        <div className="rx-dashed-divider pb-2 mb-3" />

        {/* Card Body / Description */}
        {description && (
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Benefits list if available */}
        {benefits && benefits.length > 0 && (
          <ul className="space-y-1.5 mb-4 text-xs text-slate-600 font-medium">
            {benefits.map((b, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B5662A]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>

      {/* Action CTA Button */}
      {actionText && (
        <div className="pt-2 mt-auto">
          <button
            onClick={onAction}
            className="w-full py-2.5 px-4 rounded bg-[#F7F8FA] hover:bg-[#21468C] text-[#21468C] hover:text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 border border-slate-200 hover:border-[#21468C]"
          >
            <span>{actionText}</span>
            <span className="font-mono text-xs">→</span>
          </button>
        </div>
      )}
    </div>
  );
};
