
import React, { useState, useMemo } from 'react';
import { YEARLY_DATA, PROGRAM_STATS_2024 } from './constants';
import { StatCard } from './components/StatCard';
import { PerformanceTrendChart, BalancedRadarChart, CultureBarChart } from './components/Charts';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filtering Logic
  const filteredTableData = useMemo(() => {
    if (selectedCategory === 'All') return YEARLY_DATA;
    return YEARLY_DATA.filter(d => d.category === selectedCategory);
  }, [selectedCategory]);

  const categories = useMemo(() => ['All', ...new Set(YEARLY_DATA.map(d => d.category))], []);

  // Performance Data Helpers
  const getMetric = (name: string) => YEARLY_DATA.find(d => d.metric === name);
  const getSpark = (name: string) => {
    const m = getMetric(name);
    return m ? [m.y2022, m.y2023, m.y2024] : [0,0,0];
  };
  const getTrend = (name: string) => {
    const m = getMetric(name);
    if (!m) return { direction: 'up' as const, value: '0%' };
    const diff = ((m.y2024 - m.y2023) / m.y2023) * 100;
    return { direction: diff >= 0 ? 'up' as const : 'down' as const, value: `${Math.abs(diff).toFixed(1)}%` };
  };

  // Radar Data Mapping
  const radarData = [
    { subject: '독서활동', value: (getMetric('방과후 독서 30분↑')?.y2024 || 0) * 2 },
    { subject: '학업태도', value: ((getMetric('학습 습관·태도 점수')?.y2024 || 0) / 5) * 100 },
    { subject: '기초체력', value: ((getMetric('평소 건강 관리 점수')?.y2024 || 0) / 5) * 100 },
    { subject: '정서안정', value: (5 - (getMetric('우울감 지표')?.y2024 || 0)) / 5 * 100 },
    { subject: '디지털절제', value: (5 - (getMetric('스마트폰 의존도')?.y2024 || 0)) / 5 * 100 },
  ];

  // Culture Data Mapping
  const cultureMetrics = [
    '과학관·박람회 관람', '공연·전시 관람', '도서관·서점 방문', '운동경기장 방문', '극장 관람'
  ];
  const cultureData = cultureMetrics.map(m => ({
    name: m.split(' ')[0],
    value: getMetric(m)?.y2024 || 0
  }));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <i className="fa-solid fa-layer-group text-lg"></i>
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-800 leading-none">읽걷쓰 성과</h2>
              <span className="text-[10px] text-indigo-500 font-black uppercase tracking-widest bg-indigo-50 px-1.5 py-0.5 rounded mt-1 inline-block">V2.0</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          <section>
            <p className="px-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Navigation</p>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-50 transition-all text-sm text-left">
              <i className="fa-solid fa-chart-pie"></i>
              대시보드 홈
            </button>
          </section>

          <section>
            <p className="px-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories</p>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                    selectedCategory === cat ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                  {cat}
                </button>
              ))}
            </div>
          </section>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden group">
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Developer</p>
            <h3 className="text-sm font-black tracking-tight mb-3">johaeung</h3>
            <a href="https://github.com/johaeung" target="_blank" className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 hover:text-indigo-300">
              <i className="fa-brands fa-github"></i>
              GitHub Profile
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">읽걷쓰_성과대시보드_v2</h1>
            <p className="text-sm text-slate-400 font-medium">인천광역시교육청 통합 성과 지표 체계</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-600">데이터 실시간 연동 중</span>
             </div>
          </div>
        </header>

        {/* Top Storyline Quote */}
        <div className="bg-white border-l-4 border-indigo-600 rounded-2xl p-6 shadow-sm mb-8 flex items-center gap-6">
          <div className="hidden md:flex w-12 h-12 bg-indigo-50 rounded-full items-center justify-center text-indigo-600 shrink-0">
            <i className="fa-solid fa-quote-left text-xl"></i>
          </div>
          <p className="text-lg font-medium text-slate-700 italic leading-relaxed">
            “읽걷쓰 프로그램 운영 이후 <span className="font-bold text-indigo-600 underline underline-offset-4">독서·이동·문화활동</span> 등 일상 행동 지표가 개선되었으며, 이는 학습 태도 및 정서 안정성 지표의 긍정적 변화로 이어졌습니다.”
          </p>
        </div>

        <div className="space-y-8">
          {/* STEP 1 & 2 Combined row for balance */}
          <div className="grid grid-cols-12 gap-8">
            {/* Step 1: Input (Infrastructure) */}
            <div className="col-span-12 xl:col-span-4 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black bg-slate-800 text-white px-2 py-1 rounded">01 투입</span>
                <h3 className="font-black text-slate-800 uppercase tracking-tight">Infrastructure</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <StatCard title="2024 총 예산" value="8.7" unit="십억원" icon="fa-coins" color="bg-indigo-500" subValue="인천광역시교육청 예산" />
                <StatCard title="인천 사서 배치율" value="33.46" unit="%" icon="fa-id-card-clip" color="bg-rose-500" trend={{ direction: 'up', value: '우수' }} />
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                   <h4 className="text-[11px] font-black text-slate-400 uppercase mb-4">핵심 연수 이수율</h4>
                   <div className="space-y-4">
                      {PROGRAM_STATS_2024.training.slice(0, 2).map((t, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-[11px] mb-1 font-bold text-slate-600">
                            <span>{t.name}</span>
                            <span className="text-indigo-600">{t.rate}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${t.rate}%` }}></div>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Step 2: Action (Behavioral Changes) */}
            <div className="col-span-12 xl:col-span-8 space-y-4">
               <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-1 rounded">02 행동 변화</span>
                <h3 className="font-black text-slate-800 uppercase tracking-tight">Behavioral Changes</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard title="도서관 방문인구" value="8.31" unit="백만명" icon="fa-users" color="bg-sky-500" trend={getTrend('도서관 방문인구')} sparklineData={getSpark('도서관 방문인구')} />
                <StatCard title="월평균 이동거리" value="99.5" unit="km" icon="fa-route" color="bg-emerald-500" trend={getTrend('1인당 월평균 이동거리')} sparklineData={getSpark('1인당 월평균 이동거리')} />
                <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
                   <div className="flex-1">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase mb-6">문화활동 참여 확대 추이 (2024)</h4>
                      <CultureBarChart data={cultureData} />
                   </div>
                   <div className="w-full md:w-64 space-y-4 flex flex-col justify-center">
                      <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                         <p className="text-[10px] font-black text-indigo-400 uppercase mb-1">독서 참여</p>
                         <p className="text-xl font-black text-indigo-700">43.7%</p>
                         <p className="text-[10px] text-indigo-400 font-bold">방과후 30분 이상 독서</p>
                      </div>
                      <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                         <p className="text-[10px] font-black text-emerald-400 uppercase mb-1">운동 참여</p>
                         <p className="text-xl font-black text-emerald-700">25.1%</p>
                         <p className="text-[10px] text-emerald-400 font-bold">방과후 30-60분 운동</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: Outcomes (Achievement) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-1 rounded">03 결과 달성</span>
              <h3 className="font-black text-slate-800 uppercase tracking-tight">Outcome Achievement</h3>
            </div>
            <div className="grid grid-cols-12 gap-8">
              {/* Radar - Left */}
              <div className="col-span-12 lg:col-span-5 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                 <div className="w-full text-center mb-4">
                    <h4 className="text-lg font-black text-slate-800">지표별 균형 성취도</h4>
                    <p className="text-xs text-slate-400 font-medium">읽걷쓰 가치 내재화 분석</p>
                 </div>
                 <div className="w-full h-[320px]">
                    <BalancedRadarChart data={radarData} />
                 </div>
                 <div className="flex gap-4 w-full justify-center">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                       <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 2024 성취도
                    </div>
                 </div>
              </div>

              {/* Trends - Right */}
              <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 h-full">
                    <PerformanceTrendChart data={YEARLY_DATA} title="학습 습관·태도 점수 트렌드" metricName="학습 습관·태도 점수" />
                    <div className="mt-4 pt-4 border-t border-slate-50 text-[11px] text-slate-400 font-medium">
                       * 학습 태도는 2024년 3.42점으로 전년대비 0.03점 소폭 상승
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 h-full">
                    <PerformanceTrendChart data={YEARLY_DATA} title="평소 건강 관리 점수 트렌드" metricName="평소 건강 관리 점수" />
                    <div className="mt-4 pt-4 border-t border-slate-50 text-[11px] text-slate-400 font-medium">
                       * 꾸준한 걷기 활동으로 건강 관리 인식 지표 지속 개선 중
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Detailed Data View */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-800">지표 상세 데이터</h3>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                 <button onClick={() => setSelectedCategory('All')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>All</button>
                 <button className="px-4 py-1.5 text-slate-400 text-xs font-bold">Export</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[9px] uppercase tracking-widest font-black">
                    <th className="px-10 py-4">지표명</th>
                    <th className="px-10 py-4 text-center">2022</th>
                    <th className="px-10 py-4 text-center">2023</th>
                    <th className="px-10 py-4 text-center text-indigo-600">2024</th>
                    <th className="px-10 py-4 text-center">증감률</th>
                    <th className="px-10 py-4 text-center">단위</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTableData.map((row, idx) => {
                    const trendValue = ((row.y2024 - row.y2023) / row.y2023) * 100;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-10 py-4 text-sm text-slate-700 font-bold">{row.metric}</td>
                        <td className="px-10 py-4 text-sm text-slate-400 text-center">{row.y2022.toLocaleString()}</td>
                        <td className="px-10 py-4 text-sm text-slate-400 text-center">{row.y2023.toLocaleString()}</td>
                        <td className="px-10 py-4 text-sm text-slate-900 font-black text-center">{row.y2024.toLocaleString()}</td>
                        <td className="px-10 py-4 text-center">
                          <span className={`text-[11px] font-black ${trendValue >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {trendValue >= 0 ? '+' : ''}{trendValue.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-10 py-4 text-[10px] text-slate-400 text-center font-black">{row.unit}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
