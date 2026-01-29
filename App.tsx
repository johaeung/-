
import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend
} from 'recharts';

// --- Types ---
export interface YearlyPerformance {
  category: string;
  metric: string;
  y2022: number;
  y2023: number;
  y2024: number;
  unit: string;
}

export interface TrainingPerformance {
  name: string;
  rate: number;
}

export interface ProgramStats2024 {
  budget: number;
  training: TrainingPerformance[];
}

// --- Constants ---
const YEARLY_DATA: YearlyPerformance[] = [
  { category: '실제 독서·문해력', metric: '도서관 방문인구', y2022: 7850000, y2023: 8020000, y2024: 8310000, unit: '명' },
  { category: '실제 독서·문해력', metric: '도서관 대출 자료 수', y2022: 4278287, y2023: 4414475, y2024: 4511991, unit: '건' },
  { category: '실제 독서·문해력', metric: '방과후 독서 30분↑', y2022: 41.5, y2023: 41.8, y2024: 43.7, unit: '%' },
  { category: '학업 성취', metric: '학습 습관·태도 점수', y2022: 3.39, y2023: 3.39, y2024: 3.42, unit: '점' },
  { category: '학업 성취', metric: '방과후 공부 3시간↑', y2022: 21.1, y2023: 21.7, y2024: 23.2, unit: '%' },
  { category: '기초체력·건강', metric: '1인당 월평균 이동거리', y2022: 94.2, y2023: 96.8, y2024: 99.5, unit: 'km' },
  { category: '기초체력·건강', metric: '평소 건강 관리 점수', y2022: 3.70, y2023: 3.72, y2024: 3.74, unit: '점' },
  { category: '기초체력·건강', metric: '방과후 운동 30~60분', y2022: 23.9, y2023: 24.8, y2024: 25.1, unit: '%' },
  { category: '정서 안정성', metric: '스마트폰 의존도', y2022: 2.37, y2023: 2.29, y2024: 2.30, unit: '점' },
  { category: '정서 안정성', metric: '우울감 지표', y2022: 2.56, y2023: 2.51, y2024: 2.54, unit: '점' },
  { category: '문화활동 경험', metric: '과학관·박람회 관람', y2022: 18.4, y2023: 19.6, y2024: 21.3, unit: '%' },
  { category: '문화활동 경험', metric: '공연·전시 관람', y2022: 24.7, y2023: 25.9, y2024: 27.5, unit: '%' },
  { category: '문화활동 경험', metric: '도서관·서점 방문', y2022: 46.2, y2023: 47.8, y2024: 50.1, unit: '%' },
  { category: '문화활동 경험', metric: '운동경기장 방문', y2022: 17.9, y2023: 18.6, y2024: 19.4, unit: '%' },
  { category: '문화활동 경험', metric: '극장 관람', y2022: 32.1, y2023: 34.5, y2024: 36.8, unit: '%' },
];

const PROGRAM_STATS_2024: ProgramStats2024 = {
  budget: 8700000000,
  training: [
    { name: '교원 저자 되기', rate: 100.0 },
    { name: '말랑말랑 공감', rate: 88.2 },
    { name: '읽걷쓰 실천가', rate: 89.1 }
  ]
};

// --- Sub-Components: Charts ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-xl border border-slate-100 text-xs font-bold min-w-[150px]">
        <p className="text-slate-800 mb-2 border-b border-slate-50 pb-1">{label}</p>
        {payload.map((p: any, i: number) => {
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

const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => (
  <ResponsiveContainer width={60} height={30}>
    <LineChart data={data.map(v => ({ val: v }))}>
      <Line type="monotone" dataKey="val" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const PerformanceTrendChart: React.FC<{ data: YearlyPerformance[], title: string, metricName: string }> = ({ data, title, metricName }) => {
  const metricData = data.find(d => d.metric === metricName);
  const chartData = [
    { name: '22년', value: metricData?.y2022 },
    { name: '23년', value: metricData?.y2023 },
    { name: '24년', value: metricData?.y2024 },
  ];
  const values = chartData.map(d => d.value || 0);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = (max - min) === 0 ? 1 : (max - min) * 0.4;

  return (
    <div className="h-full w-full flex flex-col">
      <h4 className="text-sm font-black text-slate-800 mb-4">{title}</h4>
      <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} domain={[min - padding, max + padding]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" name="수치" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" dot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const BalancedRadarChart: React.FC<{ data: any[] }> = ({ data }) => (
  <div className="h-full w-full flex flex-col">
    <div className="flex-1 min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: '800' }} />
          <Radar name="2022년" dataKey="y2022" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.3} strokeWidth={2} />
          <Radar name="2024년" dataKey="y2024" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} strokeWidth={3} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '15px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const CultureBarChart: React.FC<{ data: any[] }> = ({ data }) => (
  <div className="h-full w-full">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 'bold'}} />
        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 'bold'}} />
        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px -1px rgb(0 0 0 / 0.1)' }} />
        <Bar dataKey="value" name="참여율(%)" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={32} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- Sub-Components: StatCard ---
const StatCard: React.FC<{ title: string, value: string, unit: string, trend?: { direction: 'up' | 'down', value: string }, sparklineData?: number[], icon: string, color: string, subValue?: string }> = ({ title, value, unit, trend, sparklineData, icon, color, subValue }) => {
  const colorHex = color.includes('indigo') ? '#6366f1' : color.includes('sky') ? '#0ea5e9' : color.includes('emerald') ? '#10b981' : '#f59e0b';
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className={`p-2.5 rounded-lg ${color} text-white`}><i className={`fa-solid ${icon} text-lg`}></i></div>
        <div className="flex flex-col items-end">
          {trend && <div className={`flex items-center text-xs font-bold ${trend.direction === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}><i className={`fa-solid fa-caret-${trend.direction} mr-1`}></i>{trend.value}</div>}
          {sparklineData && <div className="mt-1 opacity-60 group-hover:opacity-100 transition-opacity"><Sparkline data={sparklineData} color={colorHex} /></div>}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">{title}</p>
        <div className="flex items-baseline gap-1"><h3 className="text-xl font-black text-slate-800 tracking-tight">{value}</h3><span className="text-xs text-slate-400 font-bold">{unit}</span></div>
        {subValue && <p className="text-[10px] text-slate-400 mt-1 font-medium italic">{subValue}</p>}
      </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const filteredTableData = useMemo(() => selectedCategory === 'All' ? YEARLY_DATA : YEARLY_DATA.filter(d => d.category === selectedCategory), [selectedCategory]);
  const categories = useMemo(() => ['All', ...new Set(YEARLY_DATA.map(d => d.category))], []);

  const getMetric = (name: string) => YEARLY_DATA.find(d => d.metric === name);
  const getSpark = (name: string) => {
    const m = getMetric(name);
    return m ? [m.y2022, m.y2023, m.y2024] : [0,0,0];
  };
  const getTrend = (name: string) => {
    const m = getMetric(name);
    if (!m) return { direction: 'up' as const, value: '0%' };
    const diff = ((m.y2024 - m.y2022) / m.y2022) * 100;
    return { direction: diff >= 0 ? 'up' as const : 'down' as const, value: `${Math.abs(diff).toFixed(1)}%` };
  };

  const radarMetrics = [
    { label: '독서활동', metric: '방과후 독서 30분↑', min: 38, max: 46, desc: '방과후 30분 이상 독서 실천 비율(%)' },
    { label: '학업태도', metric: '학습 습관·태도 점수', min: 3.35, max: 3.45, desc: '학습 습관 및 태도 자가진단 (5점 만점)' },
    { label: '기초체력', metric: '평소 건강 관리 점수', min: 3.65, max: 3.78, desc: '평소 건강 관리 노력도 (5점 만점)' },
    { label: '정서안정', metric: '우울감 지표', min: 2.60, max: 2.50, desc: '우울감 빈도 (낮을수록 우수)' },
    { label: '디지털절제', metric: '스마트폰 의존도', min: 2.45, max: 2.25, desc: '스마트폰 사용 의존도 (낮을수록 우수)' },
  ];

  const radarData = radarMetrics.map(m => {
    const data = getMetric(m.metric);
    const val22 = data?.y2022 || 0;
    const val24 = data?.y2024 || 0;
    const normalize = (val: number) => {
      const res = ((val - m.min) / (m.max - m.min)) * 100;
      return Math.max(0, Math.min(100, Math.abs(res)));
    };
    return { subject: m.label, y2022: normalize(val22), y2024: normalize(val24), raw2022: val22, raw2024: val24, desc: m.desc, unit: data?.unit || '' };
  });

  const cultureData = ['과학관·박람회 관람', '공연·전시 관람', '도서관·서점 방문', '운동경기장 방문', '극장 관람'].map(m => ({
    name: m.split(' ')[0], value: getMetric(m)?.y2024 || 0
  }));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100"><i className="fa-solid fa-layer-group text-lg"></i></div>
          <div><h2 className="text-sm font-black text-slate-800 leading-none">읽걷쓰 성과</h2><span className="text-[10px] text-indigo-500 font-black uppercase tracking-widest bg-indigo-50 px-1.5 py-0.5 rounded mt-1 inline-block">V2.0</span></div>
        </div>
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          <section><p className="px-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Navigation</p>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-50 transition-all text-sm text-left"><i className="fa-solid fa-chart-pie"></i>대시보드 홈</button>
          </section>
          <section><p className="px-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories</p>
            <div className="space-y-1">{categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${selectedCategory === cat ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}><div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>{cat}</button>
            ))}</div>
          </section>
        </nav>
        <div className="p-4 mt-auto"><div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden group"><p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Developer</p><h3 className="text-sm font-black tracking-tight mb-3">johaeung</h3><a href="https://github.com/johaeung" target="_blank" className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 hover:text-indigo-300"><i className="fa-brands fa-github"></i>GitHub Profile</a></div></div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div><h1 className="text-3xl font-black text-slate-900 tracking-tight">읽걷쓰_성과대시보드_v2</h1><p className="text-sm text-slate-400 font-medium">인천광역시교육청 통합 성과 지표 체계</p></div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="text-xs font-bold text-slate-600">데이터 실시간 연동 중</span></div>
        </header>

        <div className="bg-white border-l-4 border-indigo-600 rounded-2xl p-6 shadow-sm mb-8 flex items-center gap-6">
          <div className="hidden md:flex w-12 h-12 bg-indigo-50 rounded-full items-center justify-center text-indigo-600 shrink-0"><i className="fa-solid fa-quote-left text-xl"></i></div>
          <p className="text-lg font-medium text-slate-700 italic leading-relaxed">“읽걷쓰 프로그램 운영 이후 <span className="font-bold text-indigo-600 underline underline-offset-4">독서·이동·문화활동</span> 등 일상 행동 지표가 2022년 대비 꾸준히 개선되었으며, 핵심 역량 간 균형 있는 성장이 확인됩니다.”</p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 xl:col-span-4 space-y-4">
              <div className="flex items-center gap-3 mb-2"><span className="text-[10px] font-black bg-slate-800 text-white px-2 py-1 rounded">01 투입</span><h3 className="font-black text-slate-800 uppercase tracking-tight">Infrastructure</h3></div>
              <div className="grid grid-cols-1 gap-4">
                <StatCard title="2024 총 예산" value="8.7" unit="십억원" icon="fa-coins" color="bg-indigo-500" subValue="인천광역시교육청 예산" />
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase mb-4">핵심 연수 이수율 (3종)</h4>
                  <div className="space-y-4">{PROGRAM_STATS_2024.training.map((t, idx) => (
                    <div key={idx}><div className="flex justify-between text-[11px] mb-1 font-bold text-slate-600"><span>{t.name}</span><span className="text-indigo-600 font-black">{t.rate}%</span></div><div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${t.rate}%` }}></div></div></div>
                  ))}</div>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-8 space-y-4">
              <div className="flex items-center gap-3 mb-2"><span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-1 rounded">02 행동 변화</span><h3 className="font-black text-slate-800 uppercase tracking-tight">Behavioral Changes</h3></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <StatCard title="도서관 방문인구" value="8.31" unit="백만명" icon="fa-users" color="bg-sky-500" trend={getTrend('도서관 방문인구')} sparklineData={getSpark('도서관 방문인구')} />
                <StatCard title="월평균 이동거리" value="99.5" unit="km" icon="fa-route" color="bg-emerald-500" trend={getTrend('1인당 월평균 이동거리')} sparklineData={getSpark('1인당 월평균 이동거리')} />
                <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
                  <div className="flex-1"><h4 className="text-[11px] font-black text-slate-400 uppercase mb-6">문화활동 참여 확대 추이 (2024)</h4><CultureBarChart data={cultureData} /></div>
                  <div className="w-full md:w-64 space-y-4 flex flex-col justify-center">
                    <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100"><p className="text-[10px] font-black text-indigo-400 uppercase mb-1">독서 참여</p><div className="flex items-baseline gap-1"><p className="text-xl font-black text-indigo-700">43.7%</p><span className="text-[10px] text-emerald-500 font-bold">(22년 대비 +2.2%p)</span></div><p className="text-[10px] text-indigo-400 font-bold leading-tight mt-1">방과후 30분 이상 독서 실천 학생</p></div>
                    <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100"><p className="text-[10px] font-black text-emerald-400 uppercase mb-1">운동 참여</p><div className="flex items-baseline gap-1"><p className="text-xl font-black text-emerald-700">25.1%</p><span className="text-[10px] text-emerald-500 font-bold">(22년 대비 +1.2%p)</span></div><p className="text-[10px] text-emerald-400 font-bold leading-tight mt-1">방과후 30-60분 운동 실천 학생</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2"><span className="text-[10px] font-black bg-rose-600 text-white px-2 py-1 rounded">03 결과 달성</span><h3 className="font-black text-slate-800 uppercase tracking-tight">Outcome Achievement</h3></div>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-5 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
                <div className="w-full text-center mb-6"><h4 className="text-lg font-black text-slate-800">지표별 균형 성취도 비교 (2022 vs 2024)</h4><p className="text-[11px] text-slate-400 font-medium">변화 가독성을 위해 각 지표별 유효 범위 확대 정규화 적용</p></div>
                <div className="w-full flex-1"><BalancedRadarChart data={radarData} /></div>
              </div>
              <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col"><PerformanceTrendChart data={YEARLY_DATA} title="학습 습관·태도 점수 변화" metricName="학습 습관·태도 점수" /><div className="mt-auto pt-4 border-t border-slate-50 text-[11px] text-slate-400 font-medium leading-relaxed">* 세밀한 Y축 조정으로 확인되는 0.03p의 가치있는 성장</div></div>
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col"><PerformanceTrendChart data={YEARLY_DATA} title="평소 건강 관리 점수 변화" metricName="평소 건강 관리 점수" /><div className="mt-auto pt-4 border-t border-slate-50 text-[11px] text-slate-400 font-medium leading-relaxed">* 지속적인 걷기 실천이 건강 인식 개선으로 직결됨</div></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center">
              <div><h3 className="text-lg font-black text-slate-800">지표 상세 데이터 (2022-2024)</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Growth rate calculation: ((2024 / 2022) - 1) * 100</p></div>
              <div className="flex bg-slate-100 p-1 rounded-xl"><button onClick={() => setSelectedCategory('All')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>All View</button></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="bg-slate-50/50 text-slate-400 text-[9px] uppercase tracking-widest font-black"><th className="px-10 py-4">성과 분류 / 지표명</th><th className="px-10 py-4 text-center">2022</th><th className="px-10 py-4 text-center">2023</th><th className="px-10 py-4 text-center text-indigo-600">2024</th><th className="px-10 py-4 text-center">증감률(22→24)</th><th className="px-10 py-4 text-center">단위</th></tr></thead>
                <tbody className="divide-y divide-slate-100">{filteredTableData.map((row, idx) => {
                  const growthRate = ((row.y2024 - row.y2022) / row.y2022) * 100;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-10 py-4"><p className="text-[9px] text-slate-300 font-black uppercase mb-0.5">{row.category}</p><p className="text-sm text-slate-700 font-black group-hover:text-indigo-600 transition-colors">{row.metric}</p></td>
                      <td className="px-10 py-4 text-sm text-slate-400 text-center font-medium">{row.y2022.toLocaleString()}</td>
                      <td className="px-10 py-4 text-sm text-slate-400 text-center font-medium">{row.y2023.toLocaleString()}</td>
                      <td className="px-10 py-4 text-sm text-slate-900 font-black text-center">{row.y2024.toLocaleString()}</td>
                      <td className="px-10 py-4 text-center"><span className={`text-[11px] font-black px-2.5 py-1 rounded-lg ${growthRate >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{growthRate >= 0 ? '▲' : '▼'} {Math.abs(growthRate).toFixed(1)}%</span></td>
                      <td className="px-10 py-4 text-[10px] text-slate-400 text-center font-black">{row.unit}</td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
