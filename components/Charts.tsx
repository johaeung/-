
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer as ReContainer
} from 'recharts';
import { YearlyPerformance, RegionalLibrarianRate } from '../types';

interface TrendChartProps {
  data: YearlyPerformance[];
  title: string;
  metricName: string;
}

export const PerformanceTrendChart: React.FC<TrendChartProps> = ({ data, title, metricName }) => {
  const chartData = [
    { name: '22', value: data.find(d => d.metric === metricName)?.y2022 },
    { name: '23', value: data.find(d => d.metric === metricName)?.y2023 },
    { name: '24', value: data.find(d => d.metric === metricName)?.y2024 },
  ];

  return (
    <div className="h-full w-full">
      <h4 className="text-sm font-semibold text-slate-700 mb-4">{title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" dot={{ r: 3, fill: '#6366f1' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
  const chartData = data.map((v, i) => ({ val: v }));
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
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <Radar
            name="성취도"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.4}
          />
          <Tooltip 
             contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CultureBarChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
          <Tooltip 
            cursor={{fill: '#f8fafc'}}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
