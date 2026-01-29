
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend
} from 'recharts';
import { YearlyPerformance } from '../types';

interface TrendChartProps {
  data: YearlyPerformance[];
  title: string;
  metricName: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-xl border border-slate-100 text-xs font-bold min-w-[140px]">
        <p className="text-slate-800 mb-2 border-b border-slate-50 pb-1">{label}</p>
        {payload.map((p: any, i: number) => {
          // 레이더 차트인 경우 실제(raw) 수치 표시 로직 추가
          const rawValue = p.payload[`raw${p.dataKey.slice(1)}`];
          const displayValue = rawValue !== undefined ? `${rawValue.toLocaleString()}${p.payload.unit || ''}` : p.value.toFixed(1);
          
          return (
            <div key={i} className="flex justify-between items-center gap-4 mb-1">
              <span className="opacity-70" style={{ color: p.color || p.stroke }}>{p.name}</span>
              <span className="font-black" style={{ color: p.color || p.stroke }}>{displayValue}</span>
            </div>
          );
        })}
        {payload[0]?.payload?.desc && (
          <p className="mt-2 pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-medium leading-tight whitespace-pre-wrap">
            {payload[0].payload.desc}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const PerformanceTrendChart: React.FC<TrendChartProps> = ({ data, title, metricName }) => {
  const metricData = data.find(d => d.metric === metricName);
  const chartData = [
    { name: '22년', value: metricData?.y2022 },
    { name: '23년', value: metricData?.y2023 },
    { name: '24년', value: metricData?.y2024 },
  ];

  const values = chartData.map(d => d.value || 0);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const padding = range === 0 ? 1 : range * 0.4;

  return (
    <div className="h-full w-full flex flex-col">
      <h4 className="text-sm font-black text-slate-800 mb-4">{title}</h4>
      <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} 
              domain={[min - padding, max + padding]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" name="수치" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" dot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
  const chartData = data.map((v) => ({ val: v }));
  return (
    <ResponsiveContainer width={60} height={30}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="val" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const BalancedRadarChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: '800' }} />
            <Radar
              name="2022년"
              dataKey="y2022"
              stroke="#cbd5e1"
              fill="#cbd5e1"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="2024년"
              dataKey="y2024"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.5}
              strokeWidth={3}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '15px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const CultureBarChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 'bold'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 'bold'}} />
          <Tooltip 
            cursor={{fill: '#f8fafc'}}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" name="참여율(%)" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
