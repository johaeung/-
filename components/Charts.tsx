
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { YearlyPerformance, RegionalLibrarianRate } from '../types';

interface TrendChartProps {
  data: YearlyPerformance[];
  title: string;
  metricName: string;
}

export const PerformanceTrendChart: React.FC<TrendChartProps> = ({ data, title, metricName }) => {
  const chartData = [
    { name: '2022', value: data.find(d => d.metric === metricName)?.y2022 },
    { name: '2023', value: data.find(d => d.metric === metricName)?.y2023 },
    { name: '2024', value: data.find(d => d.metric === metricName)?.y2024 },
  ];

  return (
    <div className="h-full w-full">
      <h4 className="text-sm font-semibold text-slate-700 mb-4">{title}</h4>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RegionalBarChart: React.FC<{ data: RegionalLibrarianRate[] }> = ({ data }) => {
  return (
    <div className="h-full w-full">
      <h4 className="text-sm font-semibold text-slate-700 mb-4">지역별 사서 배치율 (%)</h4>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
          <XAxis type="number" hide />
          <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={50} />
          <Tooltip 
            cursor={{fill: '#f8fafc'}}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#cbd5e1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
