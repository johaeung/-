
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
  icon: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, unit, trend, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} text-white`}>
          <i className={`fa-solid ${icon} text-xl`}></i>
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend.direction === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
            <i className={`fa-solid fa-caret-${trend.direction} mr-1`}></i>
            {trend.value}
          </div>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <div className="flex items-baseline">
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
          <span className="ml-1 text-sm text-slate-400 font-normal">{unit}</span>
        </div>
      </div>
    </div>
  );
};
