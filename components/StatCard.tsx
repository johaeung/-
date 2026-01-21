
import React from 'react';
import { Sparkline } from './Charts';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
  sparklineData?: number[];
  icon: string;
  color: string;
  subValue?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, unit, trend, sparklineData, icon, color, subValue }) => {
  const colorHex = color.includes('indigo') ? '#6366f1' : color.includes('sky') ? '#0ea5e9' : color.includes('emerald') ? '#10b981' : '#f59e0b';

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className={`p-2.5 rounded-lg ${color} text-white`}>
          <i className={`fa-solid ${icon} text-lg`}></i>
        </div>
        <div className="flex flex-col items-end">
           {trend && (
            <div className={`flex items-center text-xs font-bold ${trend.direction === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              <i className={`fa-solid fa-caret-${trend.direction} mr-1`}></i>
              {trend.value}
            </div>
          )}
          {sparklineData && (
            <div className="mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
              <Sparkline data={sparklineData} color={colorHex} />
            </div>
          )}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">{value}</h3>
          <span className="text-xs text-slate-400 font-bold">{unit}</span>
        </div>
        {subValue && (
           <p className="text-[10px] text-slate-400 mt-1 font-medium italic">{subValue}</p>
        )}
      </div>
    </div>
  );
};
