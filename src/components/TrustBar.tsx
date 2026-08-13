import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Zap, HeartHandshake, DollarSign } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const items = [
    { icon: Zap, label: 'Fast Service', sub: 'Short wait times' },
    { icon: Truck, label: 'Free Home Delivery', sub: '4 days a week' },
    { icon: RefreshCw, label: 'Easy Transfers', sub: 'We handle everything' },
    { icon: ShieldCheck, label: 'Most Insurance', sub: 'Accepted here' },
    { icon: HeartHandshake, label: 'Medication Support', sub: 'Personal guidance' },
    { icon: DollarSign, label: 'Competitive Pricing', sub: 'Affordable cash rates' },
  ];

  return (
    <div className="bg-white border-y border-slate-200 py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F7F8FA] transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="w-10 h-10 rounded-full bg-[#21468C]/10 text-[#21468C] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif font-semibold text-sm text-[#16305F] leading-tight">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {item.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
